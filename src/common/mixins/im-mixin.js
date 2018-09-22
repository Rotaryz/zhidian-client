import { Im } from 'api'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      // 'currentMsg',
      // 'imIng',
      // 'behaviorList',
      // 'imLogin',
      // 'descMsg',
      'fromMsg'
      // 'postUpImage'
    ])
  },
  methods: {
    async loginIm() {
      let userInfo = wx.getStorageSync('userInfo')
      let imAccount = userInfo.im_account
      this.$checkIsMyShop(() => {
        console.log(this.$isBoss())
        console.log(this.$isMyShop())
        console.log(this.$hasShop())
      })
      // let shopId = wx.getStorageSync('myShopId')
      // Im.checkHasShop(false).then((res) => {
      //   if (res.error === this.$ERR_OK) {
      //     if (res.data.is_shop) {
      //       wx.setStorageSync('myShopId', res.data.employee_id)
      //     }
      //     this.setBoss(res.data.is_boss)
      //   }
      // })
      Im.getImInfo(imAccount, false).then(async (res) => {
        if (res.error === this.$ERR_OK) {
          let imInfo = res.data
          let loginInfo = {
            'sdkAppID': imInfo.im_sdk_appid, // 用户所属应用id,必填
            'appIDAt3rd': imInfo.im_sdk_appid, // 用户所属应用id，必填
            'accountType': imInfo.im_sdk_acounttype, // 用户所属应用帐号类型，必填
            'identifier': imInfo.im_account, // 当前用户ID,必须是否字符串类型，选填
            'identifierNick': userInfo.nickname, // 当前用户昵称，选填
            'userSig': imInfo.sig // 当前用户身份凭证，必须是字符串类型，选填
          }

          // 监听事件
          let listeners = {
            'onConnNotify': (resp) => {
              this.$webimHandler.onConnNotify(resp)
            }, // 选填
            'onMsgNotify': async (msg) => {
              let res = await this.$webimHandler.onMsgNotify(msg)
              console.log(res)
              // if (this.currentMsg.account && (res.fromAccount === this.currentMsg.account)) {
              //   if (!this.imIng) {
              //     this.setNowCount('add')
              //   } else {
              //     this.addNowChat(res)
              //   }
              // }
            }, // 监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
            'onGroupSystemNotifys': (msg) => {
            } // 监听（多终端同步）群系统消息事件，必填
          }

          let options = {
            'isAccessFormalEnv': true, // 是否访问正式环境，默认访问正式，选填
            'isLogOn': false// 是否开启控制台打印日志,默认开启，选填
          }

          let avatar = userInfo.avatar
          this.$webimHandler.sdkLogin(loginInfo, listeners, options, avatar).then(async () => {
            // this.setImLogin(true)
            // await this.getEmployeeConect()
          })
        }
      }).catch(e => console.error(e))
    },
    async getEmployeeConect() {
      const wx = this.$wx
      let userInfo = wx.getStorageSync('userInfo')
      // 建立连接
      let shopId = wx.getStorageSync('shopId')
      if (shopId) {
        let reqData = {
          customer_id: userInfo.id,
          shop_id: shopId,
          source: this.fromMsg.source,
          from_type: this.fromMsg.fromType,
          from_id: this.fromMsg.fromId
        }
        let resData = await Im.getConect(reqData, false)
        console.log(resData, '==========')
        if (resData.error === this.$ERR_OK) {
          let currentMsg = {
            shopId: resData.data.shop_id,
            flowId: resData.data.flow_id,
            nickName: resData.data.shop_name,
            avatar: resData.data.shop_avatar,
            account: resData.data.shop_im_account
          }
          let descMsg = {
            flow_id: resData.data.flow_id,
            card_holder_id: resData.data.card_holder_id,
            merchant_id: resData.data.merchant_id,
            shop_id: resData.data.shop_id,
            customer_id: userInfo.id,
            customer_name: userInfo.nickname
          }
          console.log(currentMsg)
          console.log(descMsg)
          // wx.setStorageSync('merchantId', resData.data.merchant_id)
          // this.setCurrentMsg(currentMsg)
          // this.setDescMsg(descMsg)
          // // 执行待完成的行为动作数组
          // if (this.behaviorList.length && shopId) {
          //   Promise.all(this.behaviorList.map((item) => {
          //     let opt = Object.assign({}, item, { desc: JSON.stringify(descMsg) })
          //     return this.$webimHandler.onSendCustomMsg(opt, this.currentMsg.account)
          //   })).then(() => {
          //     this.clearBehaviorList()
          //   })
          // }
          // // 读取当前员工的未读信息, 没有则设置成1(欢迎语)
          // if (resData.data.ever_talked) {
          //   let count = await this.$webimHandler.getAnyUnread(this.currentMsg.account)
          //   this.setNowCountNum(count)
          // } else {
          //   this.setNowCountNum(1)
          // }
        }
      }
    },
    async sendCustomMsg(code, obj) {
      let descMsg
      if (!descMsg) return // todo
      if (code * 1 === 20005) {
        let type = obj.type * 1
        switch (type) {
          case 0:
            descMsg = Object.assign({}, this.descMsg, {log_type: 3})
            break
          case 1:
            descMsg = Object.assign({}, this.descMsg, {log_type: 4})
            break
          case 3:
            descMsg = Object.assign({}, this.descMsg, {log_type: 5})
            break
        }
      } else {
        descMsg = Object.assign({}, this.descMsg, {log_type: 1})
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
