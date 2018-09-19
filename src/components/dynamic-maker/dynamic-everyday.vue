<template>
  <div class="every-day" v-if="item">
    <div v-if="showCanvas" class="canvas-box">
      <canvas class="canvas" canvas-id="dynamic-share" :style="canvasStyle"></canvas>
    </div>
    <article class="panel">
      <header class="header">
        <img class="h-bg" mode="aspectFill" src="/static/img/every-day/bg-card_trends@2x.png" alt="">
        <img class="h-avatar" v-if="avatarUrlTmp" :src="avatarUrlTmp" alt="">
        <div class="h-name">{{name}}</div>
        <div class="h-title">{{hTitle}}</div>
      </header>
      <section class="content">
        <div class="time-wrapper">
          <img class="icon" id="icon" src="/static/img/every-day/icon-time@2x.png" alt="">
          <div class="time" id="time">{{item.created_at}}</div>
        </div>
        <text class="words">{{item.content}}</text>
        <div class="find-item img-more" v-if="item.live_log_detail[0].type === 1 && item.live_log_detail.length > 2">
          <div class="img-item-more">
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
          <img v-if="qrCodeUrl" class="qr-code" :src="qrCodeUrl" alt="">
        </div>
        <div class="line"></div>
        <div class="right">
          <div class="txt">{{qrCodeTxt[0]}}</div>
          <div class="txt">{{qrCodeTxt[1]}}</div>
        </div>
      </footer>
    </article>
  </div>
</template>

<script type="text/ecmascript-6">
  import wx from 'wx'
  import dynamicShare from 'common/mixins/dynamic-share'

  export default {
    mixins: [dynamicShare],
    props: {
      item: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        avatarUrl: '',
        name: '',
        avatarUrlTmp: '',
        qrCodeUrlTmp: '',
        hTitle: `每 日 动 态`,
        qrCodeTxt: ['扫一扫', '获得更多资讯'],
        showCanvas: true
      }
    },
    onLoad () {
    },
    methods: {
      action () {
        this.showCanvas = true
        const drawInfo = getApp().globalData.drawInfo
        // console.log(drawInfo, '++++++++++++')
        this.name = this.item.is_default ? drawInfo.defaultName : drawInfo.name
        this.avatarUrlTmp = this.item.is_default ? drawInfo.defaultAvatar : drawInfo.avatarUrl
        this.qrCodeUrlTmp = getApp().globalData.drawInfo.qrCodeUrl
        this._loadImgs(this._drawShare)
      },
      _drawShare () {
        const dynamicList = this.item
        const SketchUp = this.sketchUp
        const content = dynamicList.content
        const createdAt = '' + dynamicList.created_at
        const newImgArr = this.newImgArr
        const prop = this.prop
        let cnameImgs = ''
        if (this.item.live_log_detail[0].type === 1 && this.item.live_log_detail.length > 2) {
          cnameImgs = `.img-more > .img-item-more > .img-item`
        }
        if (this.item.live_log_detail[0].type === 1 && this.item.live_log_detail.length === 2) {
          cnameImgs = `.img-two > .img-item-two > .img-item`
        }
        if (this.item.live_log_detail[0].type === 1 && this.item.live_log_detail.length === 1) {
          cnameImgs = `.img-one > .img-item-one > .img-item`
        }
        // .img-more > .img-item-two > .two-item
        this._getRelativePosition(() => {
          let query = wx.createSelectorQuery()
          SketchUp
            .select(query, '.panel')
            .select(query, '.h-avatar')
            .select(query, '.h-bg')
            .select(query, '.h-name')
            .select(query, '.h-title')
            .select(query, '#icon')
            .select(query, '#time')
            .select(query, '.content > .words')
            .selectAll(query, cnameImgs)
            .selectAll(query, '.right > .txt')
            .select(query, '.line')
            .select(query, '.qr-code-wrapper')
          query.exec(res => {
            SketchUp.fillRect('#fff', res[0])
            SketchUp.drawImg(this.avatarUrlTmp, res[1])
            SketchUp.drawImg('/static/img/every-day/bg-card_trends@2x.png', res[2])
            SketchUp.drawText(this.name, '#fff', 20 * prop, 'center', res[3], 'top', '', 0, -3)
            SketchUp.drawText(this.hTitle, '#fff', 12 * prop, 'center', res[4], 'top', '', 0, -3)
            SketchUp.drawImg('/static/img/every-day/icon-time@2x.png', res[5])
            SketchUp.drawText(createdAt, '#828AA2', 12 * prop, 'left', res[6], 'top', '', 0, -3)
            SketchUp.drawMultiText(content, '#333', 16 * prop, 'left', res[7])
            res[8].forEach((item, index) => {
              SketchUp.drawImg(newImgArr[index].imgUrl, item, 0, 0, 'aspectFill', newImgArr[index].imgInfo)
            })
            res[9].forEach((item, index) => {
              SketchUp.drawText(this.qrCodeTxt[index], '#828AA2', 12 * prop, 'left', item)
            })
            SketchUp.fillRect('#EDEDEF', res[10])
            SketchUp.drawImg(this.qrCodeUrlTmp, res[11])
            this._canvasDraw()
          })
        }, '.panel')
      },
      /**
       * 下载动态图片的信息
       */
      _loadImgs (callback) {
        const dynamicList = this.item
        let imgs = dynamicList.live_log_detail.map(item => item.file_url)
        // imgs.push(this.avatarUrl)
        // imgs.push(this.qrCodeUrl)
        this._downloadPictures(imgs, res => {
          // this.qrCodeUrlTmp = imgs.pop()
          // this.avatarUrlTmp = imgs.pop()
          let imgArr = res.map(item => item.tempFilePath)
          this._getImgArrInfo(imgArr, newImgArr => {
            this.newImgArr = newImgArr
            // wechat.hideLoading() // todo
            callback()
          })
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .canvas-box
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    visibility: hidden
    opacity: 0
    .canvas
      position: absolute
      top: 0
      left: -200vw

  .panel
    opacity: 0
    width: 315px
    box-sizing: border-box
    z-index: -120
    background: $color-FFFFFF
    position: fixed
    left: 0
    top: 0
    .header
      height: 130px
      position: relative
      padding-top: 17px
      box-sizing: border-box
      color: $color-FFFFFF
      layout()
      .h-bg
        width: 100%
        height: 100%
        fill-box()
      .h-avatar
        display: block
        width: 51px
        height: 51px
        margin: 0 auto
      .h-name
        position: relative
        margin: 6px auto 5px
        font-family: $font-family-meddle
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
        width: 245px
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
