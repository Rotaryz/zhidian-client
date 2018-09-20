import {Im} from 'api'

const shareArr = [1007, 1008, 1036, 1044, 1073, 1074]
const qrCordArr = [1047, 1048, 1049, 1011, 1012, 1013]

// 判定场景值 0普通 1分享 2扫码
function _entryType(options) {
  if (!options && options.scene) return 0
  let scene = +options.scene
  let isShare = shareArr.includes(scene)
  let isQrcord = qrCordArr.includes(scene)
  let source = isShare ? 1 : isQrcord ? 2 : 0
  return source
}
export default {
  data() {
    return {
      formId: '',
      imageUrl: this.$imageUrl
    }
  },
  methods: {
    $showToast(title, duration = 1500, mask = true, icon = 'none') {
      if (!title) return
      this.$wx.showToast({ title, icon, duration, mask })
    },
    $openSetting() {
      // todo
    },
    $getFormId(e) {
      this.formId = e.mp.detail.formId
    },
    $entryType(options) {
      return _entryType(options)
    },
    async $getEmployeeConect() {
      let userInfo = wx.getStorageSync('userInfo')
      // 建立连接
      let employeeId = wx.getStorageSync('employeeId')
      if (employeeId) {
        let reqData = {
          customer_id: userInfo.id,
          employee_id: employeeId,
          source: this.fromMsg.source,
          from_type: this.fromMsg.fromType,
          from_id: this.fromMsg.fromId
        }
        let resData = await Im.getConect(reqData, false)
        if (resData.error === this.$ERR_OK) {
          let currentMsg = {
            employeeId: resData.data.employee_id,
            flowId: resData.data.flow_id,
            nickName: resData.data.employee_name,
            avatar: resData.data.employee_avatar,
            account: resData.data.employee_im_account
          }
          let descMsg = {
            flow_id: resData.data.flow_id,
            card_holder_id: resData.data.card_holder_id,
            merchant_id: resData.data.merchant_id,
            employee_id: resData.data.employee_id,
            customer_id: userInfo.id,
            customer_name: userInfo.nickname
          }
          // wx.setStorageSync('merchantId', resData.data.merchant_id)
          this.setCurrentMsg(currentMsg)
          this.setDescMsg(descMsg)
          // 执行待完成的行为动作数组
          if (this.behaviorList.length && employeeId) {
            Promise.all(this.behaviorList.map((item) => {
              let opt = Object.assign({}, item, { desc: JSON.stringify(descMsg) })
              return this.$webimHandler.onSendCustomMsg(opt, this.currentMsg.account)
            })).then(() => {
              this.clearBehaviorList()
            })
          }
          // 读取当前员工的未读信息, 没有则设置成1(欢迎语)
          if (resData.data.ever_talked) {
            let count = await this.$webimHandler.getAnyUnread(this.currentMsg.account)
            this.setNowCountNum(count)
          } else {
            this.setNowCountNum(1)
          }
        }
      }
    },
    async $sendCustomMsg(code, obj) {
      let descMsg
      if (!descMsg) return // todo
      if (code * 1 === 20005) {
        let type = obj.type * 1
        switch (type) {
          case 0:
            descMsg = Object.assign({}, this.descMsg, { log_type: 3 })
            break
          case 1:
            descMsg = Object.assign({}, this.descMsg, { log_type: 4 })
            break
          case 3:
            descMsg = Object.assign({}, this.descMsg, { log_type: 5 })
            break
        }
      } else {
        descMsg = Object.assign({}, this.descMsg, { log_type: 1 })
      }
      let desc = JSON.stringify(descMsg)
      let ext = code.toString()
      let data = JSON.stringify({})
      switch (code * 1) {
        case 20005:
          data = obj.product
          break
        case 20002:
        case 20003:
        case 20004:
        case 20009:
        case 20010:
        case 20011:
        case 20012:
        case 20013:
        case 20014:
        case 20015:
        case 20016:
        case 20017:
        case 20018:
        case 20019:
        case 20020:
        case 60008:
        case 60009:
        case 60010:
        case 60011:
        case 60012:
        case 60013:
          data = obj
          break
      }
      let option = {
        desc,
        data,
        ext
      }
      if (this.imLogin && this.descMsg.flow_id) {
        let account = this.currentMsg.account
        this.$webimHandler.onSendCustomMsg(option, account)
      } else {
        this.setBehaviorList(option)
      }
    }
  }
}
