<template>
  <div class="chat">
    <head-item :title="chatMsgTitle" :showArrow="true"></head-item>
    <div class="chat-container" :style="{paddingTop: pageHeadH + 'px'}">
      <div class="chat-list">
        <div class="line-view"></div>
        <div class="chat-item" v-for="(item, index) in list" :key="index" :id="'item' + index">
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
                  <div class="shop-name">{{item.nickName}}</div>
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
                <span>赞播智店</span>
              </div>
            </div>
            <div class="chat-msg-qrCode other" v-if="item.type * 1 === 6">
              <!--<button class="qrCode-content" open-type="contact" :session-from="'request_friend,' + employeeId" send-message-title="点击下方消息加微信" :send-message-img="imgUrl + '/ws-image/ws1.2/pic-additivepeople@2x.png'" :show-message-card="true">-->
                <!--<p class="qrCode-title">添加我的个人微信，更多优惠！</p>-->
                <!--<div class="qrCode-text-content">-->
                  <!--<div class="qrCode-txt">点击本条消息，长按识别添加，随时找我聊天。</div>-->
                  <!--<img :src="imgUrl + '/ws-image/pic-code@2x.png'" v-if="imgUrl" class="qrCode-img">-->
                <!--</div>-->
              <!--</button>-->
              <div class="qrCode-content" @click="copyWX">
                <p class="qrCode-title">添加我的个人微信，更多优惠！</p>
                <div class="qrCode-text-content">
                  <div class="qrCode-txt">点击本条消息，复制微信号添加，随时找我聊天。</div>
                  <img :src="imgUrl + '/ws-image/pic-code@2x.png'" v-if="imgUrl" class="qrCode-img">
                </div>
              </div>
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
            <div class="chat-msg-coupon mine" v-if="item.type * 1 === 30">
              <div class="coupon-content" @click="showCouponModel(item)">
                <img :src="imgUrl + '/zd-image/1.5/pic-coupon_bg@2x.png'" class="coupon-bc">
                <div class="coupon-container">
                  <div class="coupon-left">
                    <div class="left-money" v-if="item.coupon_type == 3">
                      <span class="money-icon">¥</span>
                      <span class="money-txt">{{item.coupon_num}}</span>
                    </div>
                    <div class="left-money" v-if="item.coupon_type == 4">
                      <span class="money-txt">{{item.coupon_num}}</span>
                      <span class="discount-txt">折</span>
                    </div>
                  </div>
                  <div class="coupon-right">
                    <div class="coupon-title">{{item.title}}</div>
                    <div class="coupon-time">有效期至{{item.end_at}}</div>
                  </div>
                </div>
              </div>
            </div>
            <image class="chat-msg-img other" :style="{height: (200 / item.width * item.height) + 'px'}" :src="item.url" v-if="item.type * 1 == 20" @click="showPic(item, index)"></image>
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
                  <div class="shop-name">{{item.nickName}}</div>
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
                <span>赞播智店</span>
              </div>
            </div>
            <img class="chat-msg-img mine" :style="{height: (200 / item.width * item.height) + 'px'}" :src="item.url" v-if="item.type * 1 == 20" @click="showPic(item, index)"/>
            <div class="chat-msg-goods" v-if="item.type * 1 === 2">
              <img :src="item.url" class="goods-img" mode="widthFix">
              <p class="goods-title">{{item.title}}</p>
            </div>
            <img :src="userInfo.avatar" class="avatar" mode="aspectFill">
          </section>
        </div>
      </div>
    </div>
    <modal-coupon ref="coupon" @submit="submitHandleModal"></modal-coupon>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { Im, Guide, Goods } from 'api'
  import { TIMELAG, radarTimeFormat, labelEscape, msgFaceToHtml } from 'utils/im-plugins'
  import ChatWelcome from 'components/chat-welcome/chat-welcome'
  import HeadItem from 'components/head-item/head-item'
  import {app} from '@/main'
  import ModalCoupon from 'components/modal-coupon/modal-coupon'

  const _this = app
  const webimHandler = _this.$webimHandler
  const ERR_OK = _this.$ERR_OK
  const wx = _this.$wx
  const wechat = _this.$wechat
  export default {
    components: {
      ChatWelcome,
      ModalCoupon,
      HeadItem
    },
    data() {
      return {
        imgUrl: this.$imageUrl,
        inputMsg: '',
        id: '',
        list: [],
        userInfo: {},
        imAccount: '',
        scrollId: 'item0',
        emojiShow: false,
        mortListShow: false,
        shopName: '',
        welcomeMsg: {},
        from: '',
        page: 1,
        focus: false,
        shopId: '',
        noMore: false,
        hasLoadMore: false, // 是否加载了另一页
        timer: '',
        weixinNo: '' // 门店微信
      }
    },
    created() {
    },
    onShow() {
      let title = this.currentMsg.nickName || ''
      this.setImTitle(title + '的记录')
    },
    onLoad() {
      this._getSystemInfo()
      this._getChatParams()
      this._getWelcomeInfo()
      this._getMsgList()
      this._getShopInfo()
    },
    onReachBottom() {
      if (this.noMore) return
      this.page++
      let data = {
        page: this.page,
        limit: 40,
        sort: 1,
        customer_im_account: this.userInfo.im_account,
        shop_im_account: this.currentMsg.account
      }
      Im.getMsgList(data).then((res) => {
        if (res.error === ERR_OK) {
          if (res.data.length) {
            this.hasLoadMore = true
            let resData = res.data.map((item, index) => {
              let time = item.created_at ? item.created_at : item.msgTimeStamp
              item.time = radarTimeFormat(time).time
              item.content = labelEscape(item.content)
              item.html = msgFaceToHtml(item.content)
              item.nickName = item.shop_name // 名称映射
              return item
            })
            this.list = [...this.list, ...resData]
          } else {
            this.noMore = true
            this.page--
          }
        }
        wechat.hideLoading()
      })
    },
    computed: {
      ...mapGetters([
        'currentMsg',
        'chatMsgTitle'
      ])
    },
    methods: {
      ...mapActions([
        'setShowType'
      ]),
      showCouponModel(item) {
        Goods.getCouponDetail(item.coupon_id, false).then(res => {
          if (res.error === this.$ERR_OK) {
            let content = {
              type: res.data.coupon_type,
              name: res.data.coupon_name
            }
            let couponRes = Object.assign({}, res.data, content)
            this.$refs.coupon.show(couponRes, 'chatMsg')
          } else {
            this.$showToast(res.message)
          }
        })
      },
      submitHandleModal(fn, item) {
        this[fn](item)
      },
      getCoupon(item) {
        Goods.getCoupon({coupon_id: item.id}).then(res => {
          wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            this.$refs.coupon.update('useFreshCTM')
          } else {
            this.$showToast(res.message)
          }
        })
      },
      _navTo() {
        this.$refs.coupon.cancel()
        let url = `/pages/shop`
        wx.switchTab({ url })
      },
      _getChatParams() {
        this.shopId = wx.getStorageSync('shopId')
        this.userInfo = wx.getStorageSync('userInfo')
        this.imAccount = this.userInfo.im_account
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
      _getShopInfo() {
        Guide.getShopInfo().then(res => {
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          this.weixinNo = res.data.employee.weixin_no
        })
      },
      _getMsgList() {
        let data = {
          page: 1,
          limit: 40,
          sort: 1,
          customer_im_account: this.userInfo.im_account,
          shop_im_account: this.currentMsg.account
        }
        Im.getMsgList(data).then((res) => {
          if (res.error === ERR_OK) {
            let list = res.data.map((item, index) => {
              let time = item.created_at ? item.created_at : item.msgTimeStamp
              item.time = radarTimeFormat(time).time
              item.content = labelEscape(item.content)
              item.html = msgFaceToHtml(item.content)
              item.nickName = item.shop_name // 名称映射
              return item
            })
            this.list = [{type: 10000}, ...list]
          }
          wechat.hideLoading()
        })
      },
      copyWX() {
        if (!this.weixinNo) {
          this.$showToast('商家暂未上传微信号')
          return
        }
        this.$wechat.setClipboardData(this.weixinNo).then(res => {
          let msg = `微信号：${this.weixinNo}已复制至剪切板`
          this.$showToast(msg)
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
            // this.$wx.navigateTo({ url: `/pages/goods-detail?goodsId=${item.recommend_goods_id}` })
            // url = `/pages/goods-detail?goodsId=${item.recommend_goods_id}`
            url = `/pages/goods-detail?goodsId=${item.goods_id}`
            break
          case 4:
            url = `/pages/activity-detail?activityId=${item.goods_id}&activityType=group`
            break
          case 5:
            url = `/pages/activity-detail?activityId=${item.goods_id}&activityType=bargain`
            break
          default:
            break
        }
        wx.redirectTo({url})
        // let activityType
        // switch (item.rule_id) {
        //   case 1:
        //     activityType = 'group'
        //     break
        //   case 3:
        //     activityType = 'bargain'
        //     break
        //   default:
        //     break
        // }
        // this.$wx.navigateTo({url: `/pages/activity-detail?activityId=${item.recommend_activity_id}&activityType=${activityType}`})
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
                  url: resData.url,
                  width: resData.width,
                  height: resData.height
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
                  type: 20,
                  width: resData.width,
                  height: resData.height
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
        padding-bottom: 15px
        background: #F1F1F2
      .line-view
        height: 20px
        width: 100%
      .history-box
        display: flex
        justify-content: center
        margin-bottom: 15px
        height: 20px
        .history-content
          display: flex
          align-items: center
          background: #D6D6D9
          border-radius: 4px
          padding: 0 10px
          .history-txt
            font-size: $font-size-12
            font-family: $font-family-regular
            color: $color-white
            margin-right: 3px
          .arrow
            height: 8px
            width: 4.5px
            display: block
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
            width: 39px
            height: 39px
            border-radius: 50%
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
              font-size: $font-size-16
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
          .chat-msg-coupon
            margin-left: 10px
            .coupon-content
              width: 232px
              height: 67px
              padding: 9px
              border: 0.5px solid rgba(0, 0, 0, 0.10)
              border-radius: 4px
              background: $color-white
              overflow: hidden
              position: relative
              .coupon-bc
                width: 100%
                height: 100%
              .coupon-container
                position: absolute
                left: 9px
                top: 9px
                right: 9px
                bottom: 9px
                display: flex
                .coupon-left
                  width: 29%
                  display: flex
                  align-items: center
                  justify-content: center
                  overflow: hidden
                  .left-money
                    display: flex
                    align-items: flex-end
                    margin-bottom: 5px
                    .money-icon
                      font-family: $font-family-bold
                      font-size: $font-size-15
                      color: $color-white
                      margin-bottom: 4px
                      line-height: 15px
                    .money-txt
                      font-family: $font-family-bold
                      font-size: 30px
                      color: $color-white
                      margin: 0 1px
                      line-height: 30px
                    .discount-txt
                      font-family: $font-family-regular
                      font-size: $font-size-14
                      color: $color-white
                      margin-bottom: 4px
                      line-height: 14px
                .coupon-right
                  width: 71%
                  display: flex
                  flex-direction: column
                  justify-content: center
                  box-sizing: border-box
                  padding-left: 10px
                  .coupon-title
                    font-family: $font-family-medium
                    color: $color-white
                    opacity: 0.9px
                    font-size: $font-size-15
                    line-height: 15px
                    margin-bottom: 17px
                  .coupon-time
                    font-family: $font-family-regular
                    color: $color-white
                    opacity: 0.7
                    font-size: $font-size-11
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
              box-sizing: content-box
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
                font-size: $font-size-16
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
        height: 0
        transition: all 0.3s
        &.show
          height: 46.666662vw
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
          height: 39.999996vw
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
              background: $color-white
              display: flex
              justify-content: center
              align-items: center
              border-radius: 16px
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
