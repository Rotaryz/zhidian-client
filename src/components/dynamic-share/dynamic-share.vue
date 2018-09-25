<template>
  <div class="every-day" v-if="item">
    <!--<canvas class="canvas" canvas-id="dynamic-share" :style="canvasStyle"></canvas>-->
    <article class="panel">
      <header class="header">
        <img class="h-bg" mode="aspectFill" :src="imageUrl + '/zd-image/dynamic/bg-card_trends@2x.png'" alt="">
        <img class="h-avatar" id="h-avatar" :src="avatarUrlTmp" alt="" mode="aspectFill">
        <div class="h-name">{{name}}</div>
        <div class="h-title">{{hTitle}}</div>
      </header>
      <section class="content">
        <div class="time-wrapper">
          <img class="icon" id="icon" :src="imageUrl + '/zd-image/dynamic/icon-time@2x.png'" alt="">
          <div class="time" id="time">{{item.created_at}}</div>
        </div>
        <text class="words">{{item.content}}</text>
        <div class="find-item img-more" v-if="item.live_log_detail[0].type === 1 && item.live_log_detail.length > 2">
          <div class="img-item-more">
            <!---->
            <img class="img-item" mode="aspectFill" v-for="(items, idx) in item.live_log_detail" :key="idx" :src="items.file_url">
          </div>
        </div>
        <div class="find-item img-two" v-if="item.live_log_detail[0].type === 1 && item.live_log_detail.length === 2">
          <div class="img-item-two">
            <img class="img-item" mode="aspectFill" v-for="(items, idx) in item.live_log_detail" :key="idx" :src="items.file_url">
          </div>
        </div>
        <div class="find-item img-one" v-if="item.live_log_detail[0].type === 1 && item.live_log_detail.length === 1">
          <div class="img-item-one">
            <img class="img-item" mode="widthFix" v-for="(items, idx) in item.live_log_detail" :key="idx" :src="items.file_url">
          </div>
        </div>
      </section>
      <footer class="footer">
        <div class="qr-code-wrapper">
          <img v-if="qrCodeUrlTmp" class="qr-code" :src="qrCodeUrlTmp">
        </div>
        <div class="line"></div>
        <div class="right">
          <div class="txt">{{qrCodeTxt[0]}}</div>
          <div class="txt">{{qrCodeTxt[1]}}</div>
        </div>
      </footer>
    </article>
    <we-paint ref="wePaint" @drawDone="drawDone"></we-paint>
    <!--<toast ref="toast"></toast>-->
  </div>
</template>

<script>
  import WePaint from 'components/we-paint/we-paint'

  export default {
    name: 'dynamic-share',
    components: {
      WePaint
    },
    props: {
      item: {
        type: Object,
        default: null
      },
      qrCodeUrlTmp: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        avatarUrl: '',
        name: '',
        avatarUrlTmp: '',
        hTitle: `每 日 动 态`,
        qrCodeTxt: ['扫一扫', '获得更多资讯']
      }
    },
    created() {
    },
    onLoad() {
    },
    methods: {
      setUser(qrCodeUrl) {
      },
      drawDone(res) {
        this.$emit('drawDone', res)
      },
      action() {
        const dynamicList = this.item
        this.name = dynamicList.employee_name
        this.avatarUrlTmp = dynamicList.employee_image_url
        const content = dynamicList.content
        const createdAt = '' + dynamicList.created_at
        const newImgArr = dynamicList.live_log_detail.map(item => item.file_url)
        let cnameImgs = ''
        let modeImgs = 'aspectFill'
        if (this.item.live_log_detail[0].type === 1 && this.item.live_log_detail.length > 2) {
          cnameImgs = `.img-more > .img-item-more > .img-item`
        }
        if (this.item.live_log_detail[0].type === 1 && this.item.live_log_detail.length === 2) {
          cnameImgs = `.img-two > .img-item-two > .img-item`
        }
        if (this.item.live_log_detail[0].type === 1 && this.item.live_log_detail.length === 1) {
          cnameImgs = `.img-one > .img-item-one > .img-item`
          modeImgs = 'widthFix'
        }
        let options = {
          canvasId: 'we-paint',
          multiple: 1,
          panel: {
            el: '.panel'
          },
          els: [
            {
              el: '.panel',
              drawType: 'rect',
              color: '#fff'
            },
            {
              el: '.h-avatar',
              drawType: 'img',
              source: this.avatarUrlTmp,
              mode: 'aspectFill',
              unLoad: false
            },
            {
              el: '.h-bg',
              drawType: 'img',
              source: this.imageUrl + '/zd-image/dynamic/bg-card_trends@2x.png',
              unLoad: false
            },
            {
              el: '.h-name',
              drawType: 'text',
              source: this.name,
              fontSize: 20,
              align: 'center',
              color: '#fff',
              yAdjust: -3
            },
            {
              el: '.h-title',
              drawType: 'text',
              source: this.hTitle,
              fontSize: 12,
              align: 'center',
              color: '#fff',
              yAdjust: -3
            },
            {
              el: '#icon',
              drawType: 'img',
              source: this.imageUrl + '/zd-image/dynamic/icon-time@2x.png',
              unLoad: false
            },
            {
              el: '#time',
              drawType: 'text',
              source: createdAt,
              fontSize: 12,
              color: '#828AA2',
              yAdjust: -3
            },
            {
              el: '.content > .words',
              drawType: 'text-area',
              source: content,
              fontSize: 16,
              color: '#333'
            },
            {
              el: cnameImgs,
              drawType: 'img',
              isSelectAll: true,
              sourceArr: newImgArr,
              mode: modeImgs,
              unLoad: false
            },
            {
              el: '.right > .txt',
              drawType: 'text',
              isSelectAll: true,
              sourceArr: this.qrCodeTxt,
              color: '#828AA2',
              fontSize: 12
            },
            {
              el: '.line',
              drawType: 'rect',
              color: '#EDEDEF'
            },
            {
              el: '.qr-code-wrapper',
              drawType: 'img',
              source: this.qrCodeUrlTmp,
              unLoad: false
            }
          ]
        }
        this.$refs.wePaint.action(options)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .panel
    opacity: 0
    width: 315px
    box-sizing: border-box
    z-index: -100
    background: rgba(0, 0, 0, 0)
    position: fixed
    left: 0
    top: 0
    .header
      height: 130px
      position: relative
      padding-top: 17px
      box-sizing: border-box
      color: $color-FFFFFF
      display: flex
      align-items: center
      layout()
      .h-bg
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        fill-box()
      .h-avatar
        width: 51px
        height: 51px
        margin: 0 auto
      .h-name
        position: relative
        margin: 6px auto 5px
        font-family: $font-family-medium
        font-size: $font-size-20
        letter-spacing: 2px
        height: 23.5px
        line-height: 23.5px
      .h-title
        position: relative
        margin: 0 auto
        font-family: $font-family-regular
        font-size: $font-size-12
        height: 12px
        line-height: 12px
    .content
      layout()
      padding: 0 35px
      .time-wrapper
        margin-top: 15.5px
        layout(row)
        justify-content: flex-start
        width: 100%
        box-sizing: border-box
        .icon
          width: 11px
          height: 11px
          margin-right: 5px
        .time
          font-family: $font-family-regular
          font-size: $font-size-12
          color: $color-828AA2
          line-height: $font-size-12
      .words
        display: block
        word-break: break-word
        margin-top: 10px
        margin-bottom: 8px
        width: 220px
        box-sizing: border-box
        font-family: $font-family-regular
        font-size: $font-size-16
        color: #333
        line-height: 24px

      .find-item
        word-break: break-word
        line-height: 1
        padding-top: 14px
        background: $color-white

      .img-more
        .img-item-more
          display: flex
          flex-wrap: wrap
          transform: translateX(-3.5px)
          .img-item
            box-sizing: border-box
            height: 78px
            width: @height
            margin-left: 3.5px
            margin-top: 3.5px

      .img-one
        .img-item-one
          box-sizing: border-box
          width: 128px
          .img-item
            display: inline-block
            width: 100%

      .img-two
        .img-item-two
          display: flex
          justify-content: space-between
          .img-item
            box-sizing: border-box
            height: 82px
            width: 118px
            margin-right: 5px
    .footer
      layout(row)
      height: 96px
      padding: 13.6px 0 19.8px
      box-sizing: border-box
      justify-content: center
      align-items: center
      .qr-code-wrapper
        width: 62.6px
        height: @width
        .qr-code
          width: 100%
          height: 100%
      .line
        margin-left: 19.7px
        margin-right: 16.9px
        width: 1px
        height: 35.5px
        background: rgba(32, 32, 46, 0.1)
      .right
        font-family: $font-family-regular
        font-size: $font-size-12
        color: $color-828AA2

</style>
