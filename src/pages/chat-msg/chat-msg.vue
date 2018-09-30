<template>
  <div class="chat">
    <scroll-view scroll-y class="chat-container" :scroll-into-view="scrollId" @scrolltoupper="loadMore">
      <div class="chat-list">
        <div class="line-view"></div>
        <div class="chat-item" v-for="(item, index) in nowChat" :key="index" :id="'item' + index">
          <div class="item-time" v-if="item.is_showtime">
            <span class="time-box">{{item.time}}</span>
          </div>
          <section class="chat-content" v-if="item.from_account_id !== imAccount">
            <img :src="currentMsg.avatar" class="avatar" mode="aspectFill">
            <div class="chat-msg-box other" v-if="item.type * 1 === 1">
              <div class="arrow-box">
                <div class="gray-arrow">
                  <div class="white-arrow"></div>
                </div>
              </div>
              <div class="chat-msg-content-max-box">
                <rich-text class="chat-msg-content other" :nodes="item.html"></rich-text>
              </div>
            </div>
            <chat-welcome :welcomeMsg="welcomeMsg" v-if="item.type * 1 === 10000"></chat-welcome>
            <div class="chat-msg-new-goods other" v-if="item.type * 1 == 3 || item.type * 1 == 4 || item.type * 1 == 5" @click="toDetail(item)">
              <div class="new-goods-top">
                <div class="shop-title">
                  <image :src="item.avatar" class="shop-icon" mode="aspectFill"></image>
                  <div class="shop-name">{{item.shop_name}}</div>
                </div>
                <div class="goods-title">
                  <img :src="imgUrl + '/ws-image/radar/pic-spell@2x.png'" class="title-icon" v-if="item.type * 1 == 4 && imgUrl">
                  <img :src="imgUrl + '/ws-image/radar/icon-bargain@2x.png'" class="title-icon" v-if="item.type * 1 == 5 && imgUrl">
                  <span>原价{{item.original_price}}元的{{item.title}}，{{item.type * 1 == 4 ? '团购价' : '底价'}}只要{{item.goods_price}}元！</span>
                </div>
                <image :src="item.url" class="goods-img" mode="aspectFill"></image>
              </div>
              <div class="new-goods-down border-top-1px">
                <img :src="imgUrl + '/ws-image/radar/pic-logo_zb@2x.png'" v-if="imgUrl" class="down-icon">
                <span>赞播微店</span>
              </div>
            </div>
            <div class="chat-msg-qrCode other" v-if="item.type * 1 === 6">
              <button class="qrCode-content" open-type="contact" :session-from="'request_friend,' + employeeId" send-message-title="点击下方消息加微信" :send-message-img="imgUrl + '/ws-image/ws1.2/pic-additivepeople@2x.png'" :show-message-card="true">
                <p class="qrCode-title">欢迎光临我的小店</p>
                <div class="qrCode-text-content">
                  <div class="qrCode-txt">点击本条消息加微信，随时找我聊天</div>
                  <img :src="imgUrl + '/ws-image/pic-code@2x.png'" v-if="imgUrl" class="qrCode-img">
                </div>
              </button>
            </div>
            <div class="chat-msg-qrCode other" v-if="item.type * 1 === 7">
              <button class="qrCode-content" open-type="contact" :session-from="'wx_group,' + employeeId" send-message-title="点击下方消息进群" :send-message-img="imgUrl + '/ws-image/ws1.2/pic-additivegroup@2x.png'" :show-message-card="true">
                <p class="qrCode-title">欢迎加入我的微信福利群</p>
                <div class="qrCode-text-content">
                  <div class="qrCode-txt">点击本条消息加入微信群，不定时抢购福利</div>
                  <img :src="imgUrl + '/ws-image/pic-code@2x.png'" v-if="imgUrl" class="qrCode-img">
                </div>
              </button>
            </div>
            <image class="chat-msg-img other" :src="item.url" v-if="item.type * 1 == 20" mode="widthFix" @click="showPic(item, index)"></image>
          </section>
          <section class="chat-content mine" v-if="item.from_account_id === imAccount">
            <div class="chat-msg-box mine" v-if="item.type * 1 === 1">
              <div class="chat-msg-content-max-box">
                <rich-text class="chat-msg-content mine" :nodes="item.html"></rich-text>
              </div>
              <div class="arrow-box">
                <div class="green-arrow"></div>
              </div>
            </div>
            <div class="chat-msg-new-goods mine" v-if="item.type * 1 == 3 || item.type * 1 == 4 || item.type * 1 == 5" @click="toDetail(item)">
              <div class="new-goods-top">
                <div class="shop-title">
                  <image :src="item.avatar" class="shop-icon" mode="aspectFill"></image>
                  <div class="shop-name">{{item.shop_name}}</div>
                </div>
                <div class="goods-title">
                  <img :src="imgUrl + '/ws-image/radar/pic-spell@2x.png'" class="title-icon" v-if="item.type * 1 == 4 && imgUrl">
                  <img :src="imgUrl + '/ws-image/radar/icon-bargain@2x.png'" class="title-icon" v-if="item.type * 1 == 5 && imgUrl">
                  <span>原价{{item.original_price}}元的{{item.title}}，{{item.type * 1 == 4 ? '团购价' : '底价'}}只要{{item.goods_price}}元！</span>
                </div>
                <image :src="item.url" class="goods-img" mode="aspectFill"></image>
              </div>
              <div class="new-goods-down border-top-1px">
                <img :src="imgUrl + '/ws-image/radar/pic-logo_zb@2x.png'" v-if="imgUrl" class="down-icon">
                <span>赞播微店</span>
              </div>
            </div>
            <img class="chat-msg-img mine" :src="item.url" v-if="item.type * 1 == 20" mode="widthFix" @click="showPic(item, index)"/>
            <div class="chat-msg-goods" v-if="item.type * 1 === 2">
              <img :src="item.url" class="goods-img" mode="widthFix">
              <p class="goods-title">{{item.title}}</p>
            </div>
            <img :src="userInfo.avatar" class="avatar" mode="aspectFill">
          </section>
        </div>
      </div>
    </scroll-view>
    <div class="chat-input border-top-1px">
      <div class="chat-input-box">
        <div class="face-box" @click.stop="showEmoji">
          <img :src="imgUrl + '/ws-image/radar/icon-emoji@2x.png'" v-if="imgUrl" class="face-icon">
        </div>
        <div class="input-container" :class="system === 'android' ? 'android' : ''" ref="textBox">
          <textarea auto-height="true" class="textarea" maxlength="-1" @input="textInput" :value="inputMsg" cursor-spacing="15" :focus="focus" @focus="textFocus"></textarea>
        </div>
        <div class="addimg-box" v-if="!inputMsg" @click.stop="showMoreList">
          <img :src="imgUrl + '/ws-image/radar/icon-add_im@2x.png'" v-if="imgUrl" class="addimg-icon">
        </div>
        <div class="submit-btn" @click="sendMsg" v-if="inputMsg">发送</div>
      </div>
      <div class="more-box">
        <div class="emoji-list" v-if="emojiShow">
          <div class="emoji-item" v-for="(item, index) in emojiList" :key="index" @click.stop="chioceEmoji(item)">
            <img :src="item.url" class="emoji-icon">
          </div>
        </div>
        <div class="addimg-list" v-if="mortListShow">
          <div class="addimg-item" v-for="(item, index) in moreLists" :key="index" @click="nextWork(item)">
            <div class="img-box">
              <img :src="item.icon" class="item-icon">
            </div>
            <p class="item-txt">{{item.txt}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { Im } from 'api'
  import { emotionsFaceArr, TIMELAG } from 'utils/im-plugins'
  import ChatWelcome from 'components/chat-welcome/chat-welcome'
  import {app} from '@/main'

  const _this = app
  const webimHandler = _this.$webimHandler
  const ERR_OK = _this.$ERR_OK
  const wx = _this.$wx
  const wechat = _this.$wechat
  const MORELIST = [
    {txt: '图片', icon: _this.$imageUrl + '/ws-image/radar/icon-picture@2x.png', type: 1}
  ]
  export default {
    components: {
      ChatWelcome
    },
    data() {
      return {
        imgUrl: this.$imageUrl,
        inputMsg: '',
        id: '',
        userInfo: {},
        imAccount: '',
        scrollId: 'item0',
        moreLists: MORELIST,
        emojiList: emotionsFaceArr,
        emojiShow: false,
        mortListShow: false,
        shopName: '',
        welcomeMsg: {},
        from: '',
        focus: false,
        shopId: ''
      }
    },
    created() {
    },
    onShow() {
      this._setNowChatNum()
      wx.setNavigationBarTitle({title: this.currentMsg.nickName || ''})
    },
    onLoad() {
      this._getSystemInfo()
      this._getChatParams()
      this.setNowChat([])
      this.setImIng(true)
      this._getWelcomeInfo()
      this._getMsgList()
    },
    onUnload() {
      this.setNowChat([])
      this.setImIng(false)
    },
    computed: {
      ...mapGetters([
        'currentMsg',
        'nowChat',
        'imLogin'
      ]),
      endDate() {
        if (this.nowChat.length) {
          if (!this.nowChat[0].created_at && !this.nowChat[0].msgTimeStamp) {
            return this.nowChat[1] ? this.nowChat[1].created_at ? this.nowChat[1].created_at : this.nowChat[1].msgTimeStamp : ''
          } else {
            return this.nowChat[0].created_at ? this.nowChat[0].created_at : this.nowChat[0].msgTimeStamp
          }
        } else {
          return ''
        }
      }
    },
    methods: {
      ...mapActions([
        'setNowChat',
        'setImIng',
        'setNowCountNum',
        'setShowType',
        'setChatGoods'
      ]),
      _getChatParams() {
        this.shopId = wx.getStorageSync('shopId')
        this.userInfo = wx.getStorageSync('userInfo')
        this.imAccount = this.userInfo.im_account
      },
      _setNowChatNum() {
        if (this.imLogin) {
          webimHandler.getC2CMsgList(this.currentMsg.account) // 消息已读处理
          this.setNowCountNum(0)
        } else {
          wx.showToast({title: '网络连接异常', icon: 'none', duration: 1000})
          setTimeout(() => {
            wx.navigateBack()
          }, 1000)
        }
      },
      _getSystemInfo() {
        let phoneInfo = wx.getSystemInfoSync()
        let system = phoneInfo.system
        if (system.indexOf('IOS') !== -1) {
          this.system = 'iphone'
        } else {
          this.system = 'android'
        }
      },
      _getWelcomeInfo() {
        let msgData = {
          shop_id: this.shopId,
          customer_id: this.userInfo.id
        }
        Im.getWelcomeMsg(msgData).then((res) => {
          if (res.error === ERR_OK) {
            this.shopName = res.data.name
            this.welcomeMsg = res.data || {}
          }
        })
      },
      _getMsgList() {
        let data = {
          end_date: this.endDate,
          limit: 40,
          customer_im_account: this.userInfo.im_account,
          shop_im_account: this.currentMsg.account
        }
        Im.getMsgList(data).then((res) => {
          if (res.error === ERR_OK) {
            let list = res.data.reverse()
            if (!list.length) {
              this.setNowChat([{type: 10000}])
            } else {
              this.setNowChat(list)
            }
            this.scrollId = 'item' + (list.length - 1)
          }
          wechat.hideLoading()
        })
      },
      textFocus() {
        this.mortListShow = false
        this.emojiShow = false
        setTimeout(() => {
          this.focus = true
        }, 20)
      },
      // toActivity() {
      //   let url
      //   if (this.welcomeMsg.activity_id) {
      //     url = `/pages/goods-detail/goods-detail?ActivityId=${this.welcomeMsg.activity_id}&type=${this.welcomeMsg.activity_type}`
      //     wx.redirectTo({url})
      //   } else {
      //     url = `/pages/poster/poster`
      //     wx.switchTab({url})
      //   }
      // },
      // groupShow() {
      //   if (this.welcomeMsg.group_qrcode_url) {
      //     this.setShowType(true)
      //     wx.previewImage({urls: [this.welcomeMsg.group_qrcode_url]})
      //   } else {
      //     this.$showToast('商家暂时没有上传群二维码，给商家留言吧！')
      //   }
      // },
      // weixinShow() {
      //   if (this.welcomeMsg.have_personal_qrcode) return
      //   this.$showToast('商家暂时没有上传微信，给商家留言吧！')
      // },
      showPic(item) {
        this.setShowType(true)
        this.scrollId = ''
        wx.previewImage({urls: [item.url]})
      },
      toDetail(item) {
        let type = item.type * 1
        let url
        switch (type) {
          case 3:
            url = `/pages/goods-detail/goods-detail?goodId=${item.goods_id}&type=0`
            break
          case 4:
            url = `/pages/goods-detail/goods-detail?ActivityId=${item.goods_id}&type=1`
            break
          case 5:
            url = `/pages/goods-detail/goods-detail?ActivityId=${item.goods_id}&type=3`
            break
          default:
            break
        }
        wx.redirectTo({url})
      },
      loadMore() {
        if (this.noMore) return
        let data = {
          end_date: this.endDate,
          limit: 40,
          customer_im_account: this.userInfo.im_account,
          shop_im_account: this.currentMsg.account
        }
        Im.getMsgList(data).then((res) => {
          if (res.error === ERR_OK) {
            if (res.data.length) {
              let resData = res.data.reverse()
              let list = [...resData, ...this.nowChat]
              this.setNowChat(list)
            } else {
              this.noMore = true
            }
          }
          wechat.hideLoading()
        })
      },
      sendMsg() {
        let value = this.inputMsg.trim()
        if (!value) {
          this.$showToast('发送消息不能为空')
          return
        }
        let timeStamp = parseInt(Date.now() / 1000)
        let msg = {
          from_account_id: this.userInfo.im_account,
          avatar: this.userInfo.avatar,
          content: value,
          time: timeStamp,
          msgTimeStamp: timeStamp,
          nickName: this.userInfo.nickname,
          sessionId: this.userInfo.im_account,
          unreadMsgCount: 0,
          type: 1
        }
        if (this.nowChat.length) {
          let lastItem = this.nowChat[this.nowChat.length - 1]
          let lastTime = lastItem.created_at ? lastItem.created_at : lastItem.msgTimeStamp
          msg.is_showtime = timeStamp - lastTime > TIMELAG
        } else {
          msg.is_showtime = true
        }
        let list = [...this.nowChat, msg]
        this.setNowChat(list)
        this.focus = false
        setTimeout(() => {
          this.inputMsg = ''
        }, 100)
        this.emojiShow = false
        this.scrollId = 'item' + (list.length - 1)
        webimHandler.onSendMsg(value, this.currentMsg.account).then(res => {
        }, () => {
          this.$showToast('消息发送失败，尝试重新发送')
        })
      },
      textInput(e) {
        this.inputMsg = e.mp.detail.value
      },
      async nextWork(item) {
        let type = item.type * 1
        switch (type) {
          case 1:
            this.setShowType(true)
            let res = await wechat.chooseImage()
            if (res.errMsg === 'chooseImage:ok') {
              this.$cos.uploadFiles(this.$cosFileType.IMAGE_TYPE, [res.tempFilePaths[0]]).then((res) => {
                const resData = res[0]
                let data = {
                  image_id: resData.id,
                  url: resData.url
                }
                let desc = {log_type: 20}
                let ext = '20005'
                data = JSON.stringify(data)
                desc = JSON.stringify(desc)
                let opt = {
                  data,
                  desc,
                  ext
                }
                let timeStamp = parseInt(Date.now() / 1000)
                let msg = {
                  from_account_id: this.userInfo.im_account,
                  avatar: this.userInfo.avatar,
                  content: '',
                  time: timeStamp,
                  url: resData.url,
                  msgTimeStamp: timeStamp,
                  nickName: this.userInfo.nickname,
                  sessionId: this.userInfo.im_account,
                  unreadMsgCount: 0,
                  type: 20
                }
                if (this.nowChat.length) {
                  let lastItem = this.nowChat[this.nowChat.length - 1]
                  let lastTime = lastItem.created_at ? lastItem.created_at : lastItem.msgTimeStamp
                  msg.is_showtime = timeStamp - lastTime > TIMELAG
                } else {
                  msg.is_showtime = true
                }
                let list = [...this.nowChat, msg]
                this.setNowChat(list)
                this.mortListShow = false
                this.scrollId = 'item' + (list.length - 1)
                webimHandler.onSendCustomMsg(opt, this.currentMsg.account).then(res => {
                }, () => {
                  this.$showToast('消息发送失败，尝试重新发送')
                })
              })
            }
            break
          default:
            break
        }
      },
      chioceEmoji(item) {
        this.inputMsg = this.inputMsg + item.txt
      },
      showEmoji() {
        this.focus = false
        this.emojiShow = !this.emojiShow
        this.mortListShow = false
      },
      showMoreList() {
        this.focus = false
        this.mortListShow = !this.mortListShow
        this.emojiShow = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  @import '~common/stylus/base'
  .chat
    width: 100vw
    height: 100vh
    background: #F1F1F2
    position: relative
    .chat-container
      width: 100%
      height: 100vh
      padding-bottom: 50px
      box-sizing: border-box
      .chat-list
        padding-bottom: 40px
      .line-view
        height: 20px
        width: 100%
      .chat-item
        padding: 0 15px
        margin-top: 15px
        .item-time
          padding-bottom: 15px
          text-align: center
          .time-box
            display: inline-block
            padding: 4px 8px
            background: #D6D6D9
            border-radius: 2px
            font-family: $font-family-regular
            font-size: $font-size-12
            color: #fff
            line-height: 14px
        .chat-content
          display: flex
          .avatar
            width: 45px
            height: 45px
            border-radius: 2px
          .chat-msg-box
            flex: 1
            overflow: hidden
            display: flex
            .chat-msg-content-max-box
              flex: 1
              overflow: hidden
              display: flex
            .chat-msg-content
              padding: 13px 15px
              border-radius: 8px
              line-height: 19px
              font-size: $font-size-14
              font-family: $font-family-regular
              word-wrap: break-word
              word-break: break-all
              vertical-align: middle
            .chat-msg-content.other
              background: #fff
              border: 0.5px solid #D6DCE0
            .chat-msg-content.mine
              background: #A1E563
          .other.chat-msg-box
            margin-right: 50px
            .arrow-box
              width: 10px
              height: 45px
              position: relative
              .gray-arrow
                width: 0
                height: 0
                border-width: 5px 6px 5px 0
                border-style: solid
                border-color: transparent #D6DCE0 transparent transparent /*透明 灰 透明 透明 */
                position: absolute
                right: 0
                top: 17.5px
                .white-arrow
                  width: 0
                  height: 0
                  border-width: 5px 6px 5px 0
                  border-style: solid
                  border-color: transparent #FFF transparent transparent /*透明 灰 透明 透明 */
                  position: absolute
                  left: 1px
                  top: -5px
          .mine.chat-msg-box
            margin-left: 50px
            .chat-msg-content-max-box
              justify-content: flex-end
            .arrow-box
              width: 10px
              height: 45px
              position: relative
              .green-arrow
                width: 0
                height: 0
                border-width: 5px 0 5px 6px
                border-style: solid
                border-color: transparent transparent transparent #A1E563 /*透明 灰 透明 透明 */
                position: absolute
                left: 0
                top: 17.5px
          .chat-msg-img
            width: 200px
            border-radius: 4px
          .other.chat-msg-img
            margin-left: 10px
          .mine.chat-msg-img
            margin-right: 10px
          .chat-msg-qrCode
            margin-left: 10px
            .qrCode-content
              width: 230px
              padding: 10px 12px
              border: 0.5px solid rgba(0, 0, 0, 0.10)
              border-radius: 4px
              background: #fff
              overflow: hidden
              text-align: left
              &:before, &:after
                border: 0 none
              .qrCode-title
                font-family: $font-family-regular
                font-size: $font-size-16
                color: #20202E
                margin-bottom: 6px
              .qrCode-text-content
                width: 100%
                display: flex
                font-size: 0
                .qrCode-txt
                  flex: 1
                  overflow: hidden
                  line-height: 18px
                  font-size: $font-size-12
                  color: #888
                  font-family: $font-family-regular
                .qrCode-img
                  width: 45px
                  height: 45px
                  margin-left: 12px
          .chat-msg-new-goods
            width: 226px
            border: 0.5px solid rgba(0, 0, 0, 0.10)
            border-radius: 4px
            background: #fff
            overflow: hidden
            font-size: 0
            .new-goods-top
              padding: 12.5px
              box-sizing: border-box
              .shop-title
                display: flex
                height: 20px
                align-items: center
                margin-bottom: 8px
                .shop-icon
                  width: 18px
                  height: 18px
                  border: 0.5px solid rgba(0, 0, 0, 0.10)
                  border-radius: 50%
                  margin-right: 6px
                .shop-name
                  flex: 1
                  overflow: hidden
                  white-space: nowrap
                  text-overflow: ellipsis
                  font-family: $font-family-regular
                  font-size: $font-size-12
                  color: #828AA2
                  letter-spacing: 0.26px
              .goods-title
                line-height: 21px
                font-family: $font-family-regular
                font-size: $font-size-14
                color: #374B63
                letter-spacing: 0.3px
                word-wrap: break-word
                word-break: break-all
                .title-icon
                  display: inline-block
                  width: 33.5px
                  height: 14px
                  margin-right: 6px
              .goods-img
                width: 200px
                height: 200px
            .new-goods-down
              height: 25px
              display: flex
              align-items: center
              font-family: $font-family-regular
              font-size: $font-size-10
              color: #828AA2
              letter-spacing: 0.4px
              .down-icon
                width: 11.45px
                height: 11.75px
                margin-right: 4px
                margin-left: 12.5px
          .other.chat-msg-new-goods
            margin-left: 10px
          .mine.chat-msg-new-goods
            margin-right: 10px
          .chat-msg-goods
            width: 200px
            border: 0.5px solid rgba(0, 0, 0, 0.10)
            border-radius: 8px
            background: #fff
            margin-right: 10px
            overflow: hidden
            font-size: 0
            .goods-img
              width: 100%
            .goods-title
              line-height: 30px
              font-size: $font-size-12
              font-family: $font-family-regular
              padding: 0 10px
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
              color: #374B63
        .chat-content.mine
          justify-content: flex-end
    .chat-input
      width: 100%
      box-sizing: border-box
      min-height: 38px
      background: #f9f9f9
      padding: 6px 0
      position: absolute
      left: 0
      right: 0
      bottom: 0
      z-index: 50
      .chat-input-box
        display: flex
        align-items: flex-end
        min-height: 38px
        .face-box
          width: 53px
          display: flex
          align-items: center
          .face-icon
            margin-left: 10px
            width: 28px
            height: 28px
            padding: 5px
        .addimg-box
          width: 53px
          display: flex
          align-items: center
          .addimg-icon
            margin-left: 5px
            width: 28px
            height: 28px
            padding: 5px
        .submit-btn
          width: 43px
          height: 36px
          margin: 0 5px
          border: 1px solid rgba(0, 0, 0, 0.10)
          border-radius: 2px
          background: #fff
          text-align: center
          line-height: 36px
          font-size: $font-size-14
          font-family: $font-family-regular
          box-sizing: border-box
        .input-container
          flex: 1
          min-height: 36px
          border: 1px solid rgba(0, 0, 0, 0.10)
          background: #fff
          overflow-y: auto
          padding: 0 10px
          display: flex
          align-items: center
          .textarea
            width: 100%
            max-height: 100px
            padding: 0
            margin: 0
            border: 0 none
            font-size: $font-size-14
        .android.input-container
          min-height: 28px
          padding-top: 8px
      .more-box
        width: 100%
        .emoji-list
          display: flex
          flex-wrap: wrap
          padding: 6.666666vw 8vw 0
          .emoji-item
            width: 6.666666vw
            height: 6.666666vw
            margin-bottom: 6.666666vw
            &:not(:nth-child(7n))
              margin-right: 6.2vw
            .emoji-icon
              width: 6.666666vw
              height: 6.666666vw
              display: inline-block
        .addimg-list
          height: 140px
          padding: 25px 0 0 30px
          display: flex
          .addimg-item
            width: 16vw
            display: flex
            flex-direction: column
            font-size: 0
            margin-right: 6.6666vw
            margin-bottom: 15px
            position: relative
            .img-box
              width: 16vw
              height: 16vw
              border-1px(#ccc, 12px)
              display: flex
              justify-content: center
              align-items: center
              .item-icon
                width: 33px
                height: 33px
            .item-txt
              margin-top: 5px
              font-size: $font-size-12
              font-family: $font-family-regular
              color: #828AA2
              text-align: center
            .image-file
              position: absolute
              left: 0
              top: 0
              opacity: 0
              width: 100%
              height: 100%
              z-index: 10
</style>
