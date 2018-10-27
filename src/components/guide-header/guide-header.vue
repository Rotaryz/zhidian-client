<template>
  <div class="guide-header">
    <section class="logo-wrapper">
      <img class="img" mode="aspectFill" :src="shopInfo.image_url" alt="">
      <div class="back-box" @click="backShop" v-if="showBackBtn">
        <img class="back-icon" v-if="imageUrl" :src="imageUrl + '/zd-image/1.2/icon-shop_my@2x.png'">
        <div class="back-txt">返回店铺</div>
      </div>
      <div class="cover-down"></div>
    </section>
    <section class="content">
      <div class="msg-box">
        <div class="msg-left">
          <div class="avatar-box">
            <img :src="shopInfo.avatar" class="avatar-img" mode="aspectFill">
          </div>
          <div class="msg-detail">
            <div class="detail-top"><span class="top-name">{{employee.name || employee.nickname}}</span><span class="top-position">{{employee.position}}</span></div>
            <div class="detail-down">我的小店开张了，欢迎大家光临！</div>
          </div>
        </div>
        <div class="msg-right">
          <img class="btn-editor" v-if="isMyShop && imageUrl" :src="imageUrl + '/zd-image/1.2/icon-exchange@2x.png'" alt="" @click="editorAvatar">
          <button class="share-btn" open-type="share">
            <img class="share-icon" v-if="imageUrl" :src="imageUrl + '/zd-image/1.2/icon-share_dg@2x.png'" alt="">
          </button>
        </div>
      </div>
      <div class="height-10px-box" v-if="!shopInfo.lucky_draw_status"></div>
      <div class="prize-box" v-if="shopInfo.lucky_draw_status" @click="navToWheel">
        <img class="prize-img" v-if="imageUrl" :src="imageUrl + '/zd-image/1.2/pic-gift_banner@2x.png'">
      </div>
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
    onShareAppMessage() {
      this.setShowType(true)
      this.sendCustomMsg(10004) // 转发给好友
      let id = wx.getStorageSync('userInfo').id
      let shopId = wx.getStorageSync('shopId')
      return {
        title: this.shopInfo.name,
        path: `/pages/guide?fromType=3&fromId=${id}&shopId=${shopId}`,
        imageUrl: this.shopInfo.image_url,
        success: (res) => {
          // 转发成功
        },
        fail: (res) => {
          // 转发失败
        }
      }
    },
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
    // computed: {
    //   eName() {
    //     let name = this.employee.name || this.employee.nickname || ''
    //     return name ? name.substring(0, 5) : ''
    //   },
    //   shopName() {
    //     let name = this.shopInfo.name || ''
    //     return name ? name.substring(0, 11) : ''
    //   }
    // }
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
      height: 80vw
      .img
        height: 100%
        width: 100%
        display: block
        background: $color-white
      .cover-down
        display: block
        width: 100%
        height: 28.66vw
        opacity: 0.5
        background-image: linear-gradient(180deg, rgba(7,7,7,0.00) 10%, rgba(0,0,0,0.10) 23%, rgba(0,0,0,0.80) 89%)
        margin-top: -28.66vw
      .back-box
        position: absolute
        right: 0
        top: 18.6vw
        font-family: $font-family-regular
        background-image: linear-gradient(90deg, #FE7754 0%, #ED2B2B 100%)
        border-radius: 100px 0 0 100px
        layout(row, block, nowrap)
        align-items: center
        font-size: 0
        width: 97px
        height: 32px
        .back-icon
          width: 17px
          height: 15px
          margin-left: 11px
        .back-txt
          font-size: $font-size-14
          color: $color-white
          margin-left: 6px
          line-height: 14px
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
            width: 60px
            height: 60px
            border: 2px solid $color-white
            border-radius: 50%
            overflow: hidden
            margin-right: 10px
            .avatar-img
              width: 100%
              height: 100%
          .msg-detail
            flex: 1
            overflow: hidden
            display: flex
            height: 64px
            justify-content: center
            flex-direction: column
            .detail-top
              width: 100%
              overflow: hidden
              display: flex
              align-items: flex-end
              .top-name
                font-family: $font-family-medium
                color: $color-white
                font-size: 25px
                letter-spacing: 2px
                max-width: 70%
                white-space: nowrap
                overflow: hidden
                line-height: 25px
              .top-position
                font-family: $font-family-regular
                color: $color-white
                letter-spacing: 0.8px
                font-size: $font-size-16
                margin-left: 2px
                max-width: 30%
                overflow: hidden
                line-height: 16px
                margin-bottom: 2px
            .detail-down
              font-family: $font-family-regular
              color: $color-white
              font-size: $font-size-12
              letter-spacing: 0.6px
              width: 100%
              overflow: hidden
              white-space: nowrap
              text-overflow: ellipsis
              line-height: 12px
              margin-top: 5px
        .msg-right
          font-size: 0
          width: 42px
          height: 32px
          position: relative
          .btn-editor
            position: absolute
            right: 0
            top: -45px
            width: 32px
            height: 32px
          .share-btn
            margin-left: 10px
            height: 32px
            width: 32px
            border-radius: 50%
            background: rgba(0, 0, 0, 0.15)
            opacity: 1
            .share-icon
              width: 32px
              height: 32px
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
