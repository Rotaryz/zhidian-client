<template>
  <article>
    <div class="hello">
      <a href="/pages/two">to two</a>
      <a href="/pages/page-a">to page-a</a>
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">登录小程序</button>
      <h1 @click="loginIM">im-login</h1>
      <hr>
      <h2 @click="sendTest">sendMsg</h2>
      <hr>
      <h3 @click="sendCustomTest">sendCustomTest</h3>
      <hr>
      <h3 @click="gettest">getRecentContact</h3>
      <hr>
      <h4 @click="getAnyUnread">getAnyUnread</h4>
      <hr>
      <h4 @click="initUnread">initUnread</h4>
      <hr>
      <h4 @click="getC2CMsgList">getC2CMsgList</h4>
      <hr>
      <h4 @click="sdkLogout">sdkLogout</h4>
    </div>
  </article>
</template>

<script type="text/ecmascript-6">
  import * as wechat from 'common/js/wechat'
  import { Im } from 'api'
  import { ERR_OK } from 'api/config'
  // import WebIm from 'common/we-im'
  import WEIM from 'common/we-im'

  // const webimHandler = new WebIm({})
  const w = new WEIM({hello: 22})
  export default {
    onLoad() {
    },
    onUnload() {
    },
    onReady() {
    },
    onShow() {
    },
    methods: {
      async sdkLogout() {
        let res = await w.sdkLogout()
        console.log(res, 'ashdkadajhdgajd-=-=-')
      },
      async getC2CMsgList() {
        let account = 'e101251'
        let res = await w.getC2CMsgList(account)
        console.log(res, '=========asdaksdads------------')
      },
      async initUnread() {
        let data = [{employee: {im_account: 'e101092'}}]
        let list = await w.initUnread(data)
        console.log(list, '=------------asdbakjdabkdajds')
      },
      async getAnyUnread() {
        let account = 'e101092'
        let read = await w.getAnyUnread(account)
        console.log(read, '=========12313131321')
      },
      async gettest() {
        let res = await w.getRecentContact()
        console.log(res, 'ashdakjsdhasjdahsjdasa')
      },
      async sendCustomTest() {
        let userInfo = wx.getStorageSync('userInfo')
        let account = userInfo.im_account
        account = 'e101251'
        let descMsg = Object.assign({}, {log_type: 20})
        let code = 20005
        let desc = JSON.stringify(descMsg)
        let ext = code.toString()
        let data = JSON.stringify({url: 'http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg'})
        let option = {
          desc,
          data,
          ext
        }
        w.onSendCustomMsg(option, account)
      },
      async sendTest() {
        let userInfo = wx.getStorageSync('userInfo')
        let account = userInfo.im_account
        account = 'e101251'
        w.onSendMsg('hello', account)
        // let descMsg = Object.assign({}, 'ahsdkjahsdjahskdass', { log_type: 1 })
        // let code = 60013
        // let desc = JSON.stringify(descMsg)
        // let ext = code.toString()
        // let data = JSON.stringify({})
        // let option = {
        //   desc,
        //   data,
        //   ext
        // }
        // webimHandler.onSendCustomMsg(option, account)
      },
      async loginIM() {
        let userInfo = wx.getStorageSync('userInfo')
        let imAccount = userInfo.im_account
        Im.getImInfo(imAccount, false).then(async (res) => {
          if (res.error === ERR_OK) {
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
                w.onConnNotify(resp)
              }, // 选填
              'onMsgNotify': async (msg) => {
                let res = await w.onMsgNotify(msg)
                console.error(res)
              }, // 监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
              'onGroupSystemNotifys': (msg) => {
              } // 监听（多终端同步）群系统消息事件，必填
            }

            let options = {
              'isAccessFormalEnv': true, // 是否访问正式环境，默认访问正式，选填
              'isLogOn': true// 是否开启控制台打印日志,默认开启，选填
            }

            let avatar = userInfo.avatar
            await w.sdkLogin(loginInfo, listeners, options, avatar)
          }
        })
      },
      async _authorization() {
        const wxUser = await wechat.getUserInfo()
        let resCode = await wechat.login()
        let code = resCode.code
        const data = {
          code,
          iv: wxUser.iv,
          encryptedData: wxUser.encryptedData,
          weixin: 'jike-weishang'
        }
        let Json = await Im.getToken(data)
        if (Json.error !== ERR_OK && this.authorizationCount <= 5) {
          this.authorizationCount++
          await this._authorization()
          return
        } else if (Json.error !== ERR_OK && this.authorizationCount > 5) {
          wx.showToast({title: '登录失败，请重新登录', icon: 'none', duration: 1000})
          return false
        }
        this.authorizationCount = 1
        const res = Json.data
        let token = res.access_token
        let userInfo = res.customer_info
        return {
          token,
          userInfo
        }
      },
      async onGotUserInfo(e) {
        let res = e.mp.detail
        if (res.errMsg !== 'getUserInfo:ok') return
        let iv = res.iv
        let encryptedData = res.encryptedData
        let resCode = await wechat.login()
        let code = resCode.code
        let data = {
          iv,
          encryptedData,
          code,
          weixin: 'jike-weishang'
        }
        Im.getToken(data).then(async (resData) => {
          if (resData.error === ERR_OK) {
            let resMsg = resData.data
            let userInfo, token
            if (resMsg.unauthorized) {
              let resMsgJson = await this._authorization()
              userInfo = resMsgJson.userInfo
              token = resMsgJson.token
            } else {
              userInfo = resMsg.customer_info
              token = resMsg.access_token
            }
            wx.setStorageSync('userInfo', userInfo)
            wx.setStorageSync('token', token)
          } else {
            wx.showToast({title: '登录失败，请重新登录', icon: 'none', duration: 1000})
          }
          wechat.hideLoading()
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .hello
    color: red
    font-size: 28px
</style>
