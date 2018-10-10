<template>
  <div class="shop-header">
    <scroll-view :scroll-x="true" class="media-wrapper">
      <div class="item video" @click="playVideo" v-if="shopInfo.video && shopInfo.video.image_url">
        <img mode="aspectFill" class="pic" :src="shopInfo.video.image_url" alt="">
        <div class="video-mask">
          <img class="icon-btn" v-if="imageUrl" :src="imageUrl + '/zd-image/1.1/icon-video@2x.png'" alt="">
        </div>
      </div>
      <div class="item pics" @click="toPhotos" v-if="photoInfo.list && photoInfo.list.length" v-for="(item, index) in photoInfo.list" :key="index">
        <img mode="aspectFill" class="pic" v-if="item.url" :src="item.url" alt="">
        <div class="button-pic" v-if="index === 0">
          <img class="icon-pic" v-if="imageUrl" :src="imageUrl + '/zd-image/1.1/icon-pic@2x.png'" alt="">
          <span class="txt">{{photoInfo.total}}</span>
        </div>
      </div>
      <div class="item empty" v-if="photoInfo.list && photoInfo.list.length > 2"></div>
    </scroll-view>
    <div class="shop-name">{{shopInfo.name}}</div>
    <div class="evaluate">
      <div class="star" v-for="(item, idx) in shopInfo.rate" :key="idx">
        <img class="star-icon" mode="widthFix" v-if="imageUrl && item === 0.5" :src="imageUrl + '/zd-image/1.1/icon-halfstar@2x.png'" alt="">
        <img class="star-icon" mode="widthFix" v-if="imageUrl && item === 1" :src="imageUrl + '/zd-image/1.1/icon-star@2x.png'" alt="">
        <img class="star-icon" mode="widthFix" v-if="imageUrl && item === 0" :src="imageUrl + '/zd-image/1.1/icon-greystar@2x.png'" alt="">
      </div>
      <span class="txt">大众点评</span>
    </div>
    <div class="explain open-time">营业时间：{{shopInfo.opening_hours}}</div>
    <section class="distance-wrapper">
      <article class="left">
        <div class="explain address">{{shopInfo.address}}</div>
        <div class="distance">{{shopInfo.distance}}</div>
      </article>
      <article class="btn-group">
        <img class="icon left" v-if="imageUrl" :src="imageUrl + '/zd-image/1.1/icon-maps@2x.png'" alt="" @click="toMap">
        <div class="line"></div>
        <img class="icon right" v-if="imageUrl" :src="imageUrl + '/zd-image/1.1/icon-tel@2x.png'" alt="" @click="toMobile">
      </article>
    </section>
    <video class="my-video" id="my-video" v-if="shopInfo.video && shopInfo.video.url" :src="shopInfo.video.url" @fullscreenchange="videoChange" @play="videoPlay" @pause="videoPause"></video>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      shopInfo: {
        type: Object,
        default: {
          rate: new Array(5).fill(0)
        }
      },
      employee: {
        type: Object,
        default: {}
      },
      photoInfo: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        ctx: null,
        isPlay: false
      }
    },
    onLoad() {
    },
    onUnload() {
      this.ctx = null
      this.isPlay = false
    },
    methods: {
      videoPlay() {
        this.isPlay = true
      },
      videoPause() {
        this.isPlay = false
      },
      playVideo() {
        const ctx = this.$wx.createVideoContext('my-video')
        ctx.play()
        ctx.requestFullScreen({ direction: 90 })
        this.ctx = ctx
        this.setShowType(true)
      },
      videoChange() {
        this.isPlay && this.ctx && this.ctx.pause()
      },
      toPhotos() {
        this.$wx.navigateTo({ url: '/pages/album' })
      },
      async toMap() {
        try {
          const name = this.shopInfo.name
          const address = this.shopInfo.address
          const latitude = this.shopInfo.latitude
          const longitude = this.shopInfo.longitude
          if (!latitude || !longitude) {
            this.$showToast('商家暂未上传门店地址')
            return
          }
          this.$wechat.showLoading()
          await this.$wechat.openLocation({ latitude, longitude, name, address })
          this.$wechat.hideLoading()
          this.setShowType(true)
        } catch (e) {
          console.error(e)
        }
      },
      toMobile() {
        this.$wx.makePhoneCall && this.$wx.makePhoneCall({ phoneNumber: '' + this.shopInfo.telephone })
        this.setShowType(true)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .my-video
    position: absolute
    left: -200vw
    top: 0

  .shop-header
    padding: 0 15px
    position: relative
    overflow: hidden
    .media-wrapper
      padding: 18px 15px 18px 0
      width: 100vw
      height: 33.33vw
      white-space: nowrap
      .item
        display: inline-block
        width: 44.66vw
        height: 33.33vw
        position: relative
        border-radius: 2px
        overflow: hidden
        margin-right: 10px
        &.empty
          width: 15px
          height: 10px
        .video-mask
          fill-box()
          background: transparent
          z-index: 2
          layout()
          justify-content: center
          align-items: center
          .icon-btn
            transform: scale(0.5)
            width: 80px
            height: 80px
            border-radius: 50%
            border: 1px solid $color-FFFFFF
            box-sizing: border-box
        .pic
          width: 100%
          height: 100%
        .button-pic
          position: absolute
          right: 6px
          bottom: 6px
          opacity: 0.4
          height: 20px
          background: $color-455A64
          border-radius: 20px
          padding: 0 8.5px
          layout(row, block, nowrap)
          align-items: center
          .icon-pic
            width: 11.5px
            height: 10px
            margin-right: 3px
          .txt
            font-family: $font-family-bold
            font-size: $font-size-12
            color: $color-FFFFFF
            line-height: 1.2
    .shop-name
      font-family: $font-family-medium
      font-size: $font-size-20
      color: $color-1F1F1F
    .evaluate
      layout(row, block, nowrap)
      margin: 8px 0 25px
      position: relative
      left: 1px
      .star
        width: 15px
        height: 15px
        margin-right: 3.4px
        border-radius: 4px
        .star-icon
          width: 100%
          height: 100%
          display: block
      .txt
        margin-left: 3px
        font-size: $font-size-12
        color: $color-99A0AA
        letter-spacing: 0.28px
        line-height: 15px
    .explain
      font-size: $font-size-14
      color: $color-1F1F1F
      letter-spacing: 0.6px
    .distance-wrapper
      layout(row, block, nowrap)
      align-items: center
      padding-bottom: 20px
      .left
        width: 67%
        .address
          width: 100%
          min-height: 1px
          margin: 25px 0 6px
          text-align: justify
          word-break: break-all
        .distance
          width: 95%
          font-size: $font-size-12
          color: $color-99A0AA
          padding-bottom: 40px
          text-align: justify
          word-break: break-all
      .btn-group
        flex: 1
        overflow: hidden
        layout(row)
        justify-content: flex-end
        .line
          width: 1px
          height: 19px
          background: $color-99A0AA
          opacity: 0.3
          margin: 3px 15px
        .icon
          width: 24px
          height: 24px
</style>
