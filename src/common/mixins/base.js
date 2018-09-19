const shareArr = [1007, 1008, 1036, 1044, 1073, 1074]
const qrCordArr = [1047, 1048, 1049, 1011, 1012, 1013]

// 判定场景值 0普通 1分享 2扫码
function _entryType (options) {
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
      formId: ''
    }
  },
  methods: {
    $showToast(title, duration = 1500, mask = true, icon = 'none') {
      if (!title) return
      this.$wx.showToast({title, icon, duration, mask})
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
    async sendCustomMsg(code, obj) {
      let descMsg
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
