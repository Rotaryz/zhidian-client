<template>
  <div class="guide-header">
    <section class="logo-wrapper">
      <img v-if="storeInfo.cover_url" class="img" mode="aspectFill" :src="storeInfo.cover_url" alt="">
      <img v-else-if="imageUrl" class="img" mode="aspectFill" :src="imageUrl + '/zd-image/1.5/pic-mrbg@2x.png'" alt="">
      <div class="cover-down"></div>
    </section>
    <section class="content">
      <div class="msg-box">
        <div class="msg-left">
          <div class="avatar-box">
            <img v-if="storeInfo.logo_url" class="avatar-img" mode="aspectFill" :src="storeInfo.logo_url" alt="">
            <img v-else-if="imageUrl" :src="imageUrl + '/zd-image/1.5/pic-mrtx@2x.png'" class="avatar-img" mode="aspectFill">
          </div>
          <div class="msg-detail">
            <div class="detail-top"><span class="top-name">{{storeInfo.name}}</span></div>
          </div>
        </div>
        <div class="msg-right">
          <button class="share-btn" open-type="share">
            <img class="share-icon" v-if="imageUrl" :src="imageUrl + '/zd-image/1.2/icon-share_dg@2x.png'" alt="">
          </button>
        </div>
      </div>
      <div class="height-10px-box" v-if="!shopInfo.lucky_draw_status"></div>
      <form report-submit v-if="shopInfo.lucky_draw_status" class="prize-box" @submit="$getFormId">
        <button hover-class="none" formType="submit" class="prize-box" @click="navToWheel">
          <img class="prize-img" v-if="imageUrl" :src="imageUrl + '/zd-image/1.2/pic-gift_banner@2x.png'">
        </button>
      </form>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import imMixin from 'common/mixins/im-mixin'

  export default {
    mixins: [imMixin],
    props: {
      shopInfo: {
        type: Object,
        default: {}
      },
      employee: {
        type: Object,
        default: {}
      },
      isMyShop: {
        type: Boolean,
        default: false
      },
      showBackBtn: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    computed: {
      storeInfo() {
        let storeInfo = this.shopInfo.store || {}
        return storeInfo
      }
    },
    // onShareAppMessage() {
    //   this.setShowType(true)
    //   this.sendCustomMsg(10004) // 转发给好友
    //   let id = wx.getStorageSync('userInfo').id
    //   let shopId = wx.getStorageSync('shopId')
    //   let imageUrl = this.storeInfo.cover_url || `${this.$imageUrl}/zd-image/1.5/pic-mrbg@2x.png`
    //   let title = this.storeInfo.name
    //   return {
    //     title,
    //     path: `/pages/guide?fromType=3&fromId=${id}&shopId=${shopId}`,
    //     imageUrl,
    //     success: (res) => {
    //       // 转发成功
    //     },
    //     fail: (res) => {
    //       // 转发失败
    //     }
    //   }
    // },
    created() {
    },
    methods: {
      navToWheel() {
        this.$wx.navigateTo({url: `/pages/wheel`})
      },
      async editorAvatar() {
        try {
          this.setShowType(true)
          let res = await this.$wechat.chooseImage()
          let file = res.tempFilePaths[0]
          getApp().globalData.imgUrl = file
          this.$wx.navigateTo({ url: '/pages/cut-picture?cutType=avatar' })
        } catch (e) {
          console.error(e)
        }
      },
      backShop() {
        this.$emit('goBack')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  button
    reset-button()
  .height-10px-box
    height: 6px
    background: $color-white

  .guide-header
    position: relative
    .logo-wrapper
      height: 42.66666666666667vw
      overflow :hidden
      .img
        height: 100%
        width: 100%
        display: block
        background: $color-white
      .cover-down
        position :absolute
        top:0
        left :0
        display: block
        width: 100vw
        height: 42.66666666666667vw
        opacity :0.25
        background: #000
    .content
      display: block
      padding: 0 15px
      margin-top: -16px
      background: $color-white
      border-radius: 15px 15px 0 0
      position: relative
      padding-top: 10px
      .msg-box
        width: 100%
        height: 64px
        position: absolute
        top: -74px
        left: 0
        padding: 0 15px
        box-sizing: border-box
        display: flex
        align-items: center
        justify-content: space-between
        .msg-left
          flex: 1
          overflow: hidden
          display: flex
          align-items: center
          .avatar-box
            width: 55px
            height: @width
            border: 1px solid rgba(255,255,255,0.6)
            box-shadow: 0 2px 10px 0 rgba(31,31,31,0.10)
            border-radius: 6px
            box-sizing :border-box
            .avatar-img
              width: 100%
              height: 100%
              border-radius: 6px
          .msg-detail
            flex: 1
            overflow: hidden
            display: flex
            height: 64px
            justify-content: center
            flex-direction: column
            padding :0 8px
            .detail-top
              width: 100%
              overflow: hidden
              display: flex
              align-items: center
              position :relative
              top:10px
              .top-name
                font-family: $font-family-medium
                color: $color-white
                font-size: 18px
                white-space: nowrap
                overflow: hidden
                text-overflow: ellipsis
                line-height: 18px
        .msg-right
          font-size: 0
          width: 42px
          height: 32px
          position: relative
          .share-btn
            top: 13px
            margin-left: 10px
            height: 29px
            width: @height
            border-radius: 50%
            opacity: 1
            .share-icon
              height: 29px
              width: @height
      .prize-box
        padding-bottom: 27.82%
        position: relative
        .prize-img
          position: absolute
          left: 0
          top: 0
          width: 100%
          height: 100%
</style>
