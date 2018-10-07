import { Im, Guide } from 'api'
import { mapGetters, mapActions } from 'vuex'
const DEFAULTOBJ = {
  event_no: 0,
  log_type: 0,
  goods_id: 0,
  activity_id: 0,
  flow_id: 0,
  store_id: 0,
  merchant_id: 0,
  shop_id: 0,
  customer_id: 0,
  total: '',
  title: '',
  customer_name: ''
}

export default {
  computed: {
    ...mapGetters([
      'currentMsg',
      'imIng',
      'behaviorList',
      'imLogin',
      'descMsg',
      'fromMsg',
      'behaviorListToServer'
    ])
  },
  methods: {
    ...mapActions([
      'setImLogin',
      'setCurrentMsg',
      'setDescMsg',
      'addNowChat',
      'clearBehaviorList',
      'setNowCountNum',
      'setNowCount',
      'setBehaviorList',
      'setBehaviorListToServers'
    ]),
    async loginIm() {
      let userInfo = wx.getStorageSync('userInfo')
      let imAccount = userInfo.im_account
      this.$checkIsMyShop(() => {})
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
              if (this.currentMsg.account && (res.fromAccount === this.currentMsg.account)) {
                if (!this.imIng) {
                  this.setNowCount('add')
                } else {
                  this.addNowChat(res)
                }
              }
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
            this.setImLogin(true)
            await this.getEmployeeConect()
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
            store_id: resData.data.store_id,
            merchant_id: resData.data.merchant_id,
            shop_id: resData.data.shop_id,
            customer_id: userInfo.id,
            customer_name: userInfo.nickname,
            employee_id: resData.data.employee_id || 0
          }
          if (!resData.data.shop_avatar) {
            let shopRes = await Guide.getShopInfo({}, false)
            if (shopRes.error === this.$ERR_OK) {
              currentMsg.avatar = shopRes.data.employee.avatar
            }
          }
          wx.setStorageSync('merchantId', resData.data.merchant_id)
          this.setCurrentMsg(currentMsg)
          this.setDescMsg(descMsg)
          // 执行待完成的行为动作数组
          if (this.behaviorList.length && shopId) {
            Promise.all(this.behaviorList.map((item) => {
              let opt = Object.assign({}, item, {desc: JSON.stringify(descMsg)})
              return this.$webimHandler.onSendCustomMsg(opt, this.currentMsg.account)
            })).then(() => {
              this.clearBehaviorList()
            })
            // 行为消息清空--发送至服务器
            Promise.all(this.behaviorListToServer.map((item) => {
              let obj = Object.assign({}, item, descMsg)
              return this._ImSendRecordToServer(obj)
            })).then(() => {
              this.setBehaviorListToServers([])
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
    async sendCustomMsg(code, obj = {}) {
      code = +code
      let descMsg
      if (code === 20005) {
        let type = +obj.type
        descMsg = Object.assign({}, this.descMsg, {log_type: type})
      } else {
        descMsg = Object.assign({}, this.descMsg, {log_type: 1})
      }
      let desc = JSON.stringify(descMsg)
      let ext = code.toString()
      let data = JSON.stringify(obj)
      let sendObj = {
        event_no: code,
        log_type: 1,
        total: obj.total || '',
        title: obj.title || '',
        goods_id: obj.goods_id || 0,
        activity_id: obj.activity_id || 0
      }
      switch (code) {
        case 20005:
          data = JSON.stringify(obj.product)
          break
        default:
          break
      }
      let option = {
        desc,
        data,
        ext
      }
      let option4Servers = Object.assign({}, DEFAULTOBJ, this.descMsg, sendObj)
      // im登录再执行发送
      if (this.imLogin && this.descMsg.flow_id) {
        let account = this.currentMsg.account
        // todo 商品跳转发送？
        console.log(option, ' // todo 商品跳转发送？')
        this.$webimHandler.onSendCustomMsg(option, account)
        this._ImSendRecordToServer(option4Servers)
      } else {
        this.setBehaviorList(option)
        this.setBehaviorListToServers(option4Servers)
      }
    },
    _ImSendRecordToServer(obj) {
      Im.sendRecord(obj)
    }
  }
}
