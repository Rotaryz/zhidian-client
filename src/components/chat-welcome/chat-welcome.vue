<template>
  <article class="welcome-msg">
    <div class="welcome-txt">您好，欢迎来到{{welcomeMsg.store ? welcomeMsg.store.name : ''}}。添加我的个人微信，有更多精彩等你哦！</div>
    <section class="btn-group">
      <div class="btn-item" @click.stop="toMobile">
        <div class="txt">拨打我的电话</div>
        <img class="icon" v-if="imgUrl" :src="imgUrl + '/zd-image/1.1/icon-activity.png'" alt="">
      </div>
      <div class="btn-item" @click.stop="copyWX">
        <div class="txt">添加我的微信</div>
        <img class="icon" v-if="imgUrl" :src="imgUrl + '/zd-image/1.1/icon-weixin.png'" alt="">
      </div>
    </section>
    <!--<div class="welcome-activity" @click.stop="toActivity" v-if="false">-->
    <!--<div class="activity-title">参加拼团/砍价活动</div>-->
    <!--<img :src="imgUrl + '/ws-image/radar/icon-activity.png'" v-if="imgUrl" class="title-icon">-->
    <!--</div>-->
    <!--<section class="welcome-group" :open-type="welcomeMsg.have_personal_qrcode ? 'contact' : ''" :session-from="'request_friend,' + employeeId" send-message-title="点击下方消息加微信" :send-message-img="imgUrl + '/ws-image/ws1.2/pic-additivepeople@2x.png'" :show-message-card="true" @click="weixinShow">-->
    <!--<div class="group-top">-->
    <!--<div class="activity-title">添加我的微信号</div>-->
    <!--<img :src="imgUrl + '/ws-image/radar/icon-weixin.png'" v-if="imgUrl" class="title-icon">-->
    <!--</div>-->
    <!--<image :src="imgUrl + '/ws-image/radar/pic-zd-group@2x.png'" v-if="imgUrl" class="group-icon" mode="widthFix"></image>-->
    <!--</section>-->
    <!--<div class="welcome-activity" @click.stop="weixinShow" v-if="false">-->
    <!--<div class="activity-title">添加我的微信号</div>-->
    <!--<img :src="imgUrl + '/ws-image/radar/icon-weixin.png'" v-if="imgUrl" class="title-icon">-->
    <!--</div>-->
  </article>
</template>

<script type="text/ecmascript-6">
  import imMixin from 'common/mixins/im-mixin'

  export default {
    mixins: [imMixin],
    props: {
      welcomeMsg: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        imgUrl: this.$parent.$imageUrl
      }
    },
    methods: {
      toMobile() {
        this.sendCustomMsg(60001)
        let mobile = this.welcomeMsg.store ? this.welcomeMsg.store.telephone : ''
        if (!mobile) {
          this.$showToast('商家暂未上传手机号码')
          return
        }
        this.$wx.makePhoneCall && this.$wx.makePhoneCall({phoneNumber: mobile})
        this.setShowType(true)
      },
      copyWX() {
        let wxCode = this.welcomeMsg.employee.wx_code
        if (!wxCode) {
          this.$showToast('商家暂未上传微信号')
          return
        }
        this.$wechat.setClipboardData(wxCode).then(res => {
          let msg = `微信号：${wxCode}已复制至剪切板`
          this.$showToast(msg)
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  @import '~common/stylus/base'

  .welcome-msg
    width: 210px
    padding: 15px
    background: #fff
    margin-left: 10px
    border-radius: 4px
    border: 1px solid #D6DCE
    .welcome-txt
      font-family: $font-family-regular
      font-size: $font-size-14
      color: #374B63
      line-height: 19px
      margin-bottom: 15px
    .btn-group
      background-image: linear-gradient(-134deg, #FF7C7C 0%, #FF5555 100%)
      border-radius: 4px
      padding: 15px 10px
      .btn-item
        height: 40px
        font-family: PingFangSC-Regular
        font-size: 14px
        color: #455A64
        layout(row, block, nowrap)
        align-items: center
        justify-content :space-between
        padding :0 15px
        margin-bottom: 15px
        background: #FFFFFF
        border-1px(rgba(153,160,170,0.10))
        box-shadow: 0 5px 13px 0 rgba(0,0,0,0.10)
        border-radius: 3px
        &:last-child
          margin-bottom: 0
        .icon
          width: 27px
          height: 27px
    .welcome-activity
      width: 100%
      height: 40px
      display: flex
      border: 0.5px solid #E0E0E0
      border-radius: 2px
      align-items: center
      justify-content: space-between
    .activity-title
      font-family: $font-family-regular
      font-size: $font-size-14
      margin-left: 10px
    .title-icon
      width: 27px
      height: 27px
      margin-right: 6px
    .welcome-group
      width: 100%
      border: 0.5px solid #E0E0E0
      border-radius: 4px
      overflow: hidden
      font-size: 0
      margin-top: 15px
      background: #fff
      padding: 0
      &:before, &:after
        border: 0 none
      .group-top
        height: 40px
        width: 100%
        display: flex
        align-items: center
        justify-content: space-between
      .group-icon
        width: 100%
</style>
