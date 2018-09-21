<template>
  <div class="shop-header">
    <section class="media-wrapper">
      <div class="item video" @click="playVideo">
        <img mode="aspectFill" class="pic" :src="url" alt="">
        <div class="video-mask">
          <img class="icon-btn" v-if="imageUrl" :src="imageUrl + '/zd-image/1.1/icon-video@2x.png'" alt="">
        </div>
      </div>
      <div class="item pics">
        <img mode="aspectFill" class="pic" :src="url" alt="">
        <div class="button-pic">
          <img class="icon-pic" v-if="imageUrl" :src="imageUrl + '/zd-image/1.1/icon-pic@2x.png'" alt="">
          <span class="txt">66</span>
        </div>
      </div>
    </section>
    <div class="shop-name">国颐堂养发SPA馆（白云店）</div>
    <div class="evaluate">
      <div class="star" v-for="(item, idx) in stars" :key="idx">
        <img class="star-icon" mode="widthFix" v-if="imageUrl && item === 0.5" :src="imageUrl + '/zd-image/1.1/icon-halfstar@2x.png'" alt="">
        <img class="star-icon" mode="widthFix" v-if="imageUrl && item === 1" :src="imageUrl + '/zd-image/1.1/icon-star@2x.png'" alt="">
        <img class="star-icon" mode="widthFix" v-if="imageUrl && item === 0" :src="imageUrl + '/zd-image/1.1/icon-greystar@2x.png'" alt="">
      </div>
      <span class="txt">大众点评</span>
    </div>
    <div class="explain open-time">营业时间：11:00-21:00</div>
    <section class="distance-wrapper">
      <article class="left">
        <div class="explain address">广州市海珠区 TIT 创意园A9</div>
        <div class="distance">距你340m，步行需要9分钟</div>
      </article>
      <article class="btn-group">
        <img class="icon left" v-if="imageUrl" :src="imageUrl + '/zd-image/1.1/icon-maps@2x.png'" alt="" @click="toMap">
        <div class="line"></div>
        <img class="icon right" v-if="imageUrl" :src="imageUrl + '/zd-image/1.1/icon-tel@2x.png'" alt="" @click="toMobile">
      </article>
    </section>
    <video class="my-video" id="my-video" :src="video"></video>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      shopInfo: {
        type: Object,
        default: {}
      },
      employee: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        url: this.$parent.$imageUrl + `/zd-image/test-img/5@1x.png`,
        video: 'http://14.29.86.17/vlive.qqvideo.tc.qq.com/AuOCHUj_W0--tQeJANCWNmtOqXc5ZjplRKBdW5LSw1Vk/m0200c2wagp.p201.1.mp4?level=0&vkey=9897261EB2D341D0AEF807E49A29F6FBA9B95815912FB21A55F674FB72A98A91BD1BB9C0943FC026576483868EF21587F2B80F5B90A0BDF1D1822E3226EF18EB9E0F52091D20F7215F0001FE81470D37574F42D2BF747672150194DF8DB2B914DBD40C2104BCEE4EA88B8F9EC423B8344581AC018693EC79&sdtfrom=&fmt=shd&platform=10901&locid=97f27211-cd66-44cd-ad0c-56244cbde333&size=2562617&ocid=350887852',
        stars: [1, 1, 1, 0.5, 0]
      }
    },
    methods: {
      playVideo() {
        const ctx = this.$wx.createVideoContext('my-video')
        ctx.requestFullScreen({direction: 90})
        ctx.play()
      },
      async toMap() {
        try {
          this.$wechat.showLoading()
          const res = await this.$wechat.getLocation('gcj02')
          const {latitude, longitude, name = '国颐堂养发SPA馆（白云店', address = '广州市海珠区 TIT 创意园A9'} = res
          await this.$wechat.openLocation({latitude, longitude, name, address})
          this.$wechat.hideLoading()
        } catch (e) {
          console.error(e)
        }
      },
      toMobile() {
        console.log(this.$wx)
        this.$wx.makePhoneCall && this.$wx.makePhoneCall({phoneNumber: '15197865308'})
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
    .media-wrapper
      layout(row, block, nowrap)
      justify-content: space-between
      padding: 18px 0 15px
      .item
        width: 44.66vw
        height: 33.33vw
        position: relative
        border-radius: 2px
        overflow: hidden
        .video-mask
          fill-box()
          background: transparent
          z-index: 2
          layout()
          justify-content: center
          align-items: center
          .icon-btn
            width: 40px
            height: 40px
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
      .left
        width: 67%
        .address
          width: 100%
          margin: 25px 0 6px
          text-align: justify
          word-break :break-all
        .distance
          width: 95%
          font-size: $font-size-12
          color: $color-99A0AA
          padding-bottom: 40px
          text-align: justify
          word-break :break-all
      .btn-group
        flex: 1
        margin-top: 31px
        layout(row)
        justify-content :flex-end
        .line
          width: 1px
          height: 19px
          background: $color-99A0AA
          opacity: 0.3
          margin :3px 15px
        .icon
          width: 24px
          height: 24px
</style>
