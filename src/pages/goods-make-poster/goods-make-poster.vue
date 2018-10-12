<template>
  <div class="goods-make-poster">
    <canvas class="canvas" canvas-id="dynamic-share" :style="canvasStyle" v-if="showCanvas"></canvas>
    <article class="share-container">
      <div class="goods-wrapper">
        <header class="header">
          <img class="avatar" :src="avatarUrl" alt="">
          <div class="name">{{name}}</div>
          <img class="icon" :src="posterIconUrl" v-if="posterIconUrl">
        </header>
        <img class="goods-img" mode="aspectFill" :src="goodsUrl" alt="">
        <footer class="footer">
          <div class="title">{{title}}</div>
          <div class="explain">{{explain}}</div>
          <div class="mark">{{mark}}</div>
          <div class="unit">￥</div>
          <div class="empty"></div>
          <div class="money">{{money}}</div>
          <img class="qr-code" mode="aspectFill" :src="qrCodeUrl" alt="">
        </footer>
      </div>
    </article>
    <section class="tool-bar">
      <button class="btn-wrapper" open-type="share" @click="shareFriend">
        <div class="btn-wrapper">
          <img :src="imageUrl + '/ws-image/icon-friendster@2x.png'" v-if="imageUrl" class="icon">
          <div class="txt">转发</div>
        </div>
      </button>
      <div class="btn-wrapper" @click="saveImage">
        <img :src="imageUrl + '/ws-image/icon-album@2x.png'" v-if="imageUrl" class="icon">
        <div class="txt">保存</div>
      </div>
    </section>
    <we-paint ref="wePaint" @drawDone="drawDone" @downloadFile="downloadFile"></we-paint>
  </div>
</template>

<script type="text/ecmascript-6">
  import { ActiveCode, Guide } from 'api'
  import { mapGetters, mapActions } from 'vuex'
  import imMixin from 'common/mixins/im-mixin'
  import WePaint from 'components/we-paint/we-paint'

  // const width = wx.getSystemInfoSync().width
  // const vw = width / 100
  export default {
    mixins: [imMixin],
    name: 'goods-make-poster',
    components: {
      WePaint
    },
    data () {
      return {
        shareImg: '',
        useType: 0,
        id: '',
        avatarUrl: '',
        name: '',
        qrCodeUrl: '',
        goodsUrl: '',
        groupPic: '',
        cutPic: '',
        title: '',
        explain: '',
        mark: '',
        money: '',
        price: ''
      }
    },
    onUnload () {
      this.shareImg = ''
      this.useType = 0
      this.id = ''
      this.avatarUrl = ''
      this.name = ''
      this.qrCodeUrl = ''
      this.goodsUrl = ''
      this.groupPic = ''
      this.cutPic = ''
      this.title = ''
      this.explain = ''
      this.mark = ''
      this.money = ''
      this.price = ''
    },
    onShow () {
      this._getDrawPosterInfo()
    },
    onLoad (option) {
      this._loadStatic()
      this._getParams(option)
    },
    onShareAppMessage (res) {
      let title = this.title
      let id = this.$wx.getStorageSync('userInfo').id
      let shopId = this.$wx.getStorageSync('shopId')
      let path
      if (this.useType * 1 === 0) {
        path = `pages/goods-detail?fromType=3&fromId=${id}&shopId=${shopId}&goodId=${this.id}`
      } else if (this.useType * 1 === 1) {
        path = `pages/activity-detail?activityType=group&fromType=3&fromId=${id}&shopId=${shopId}&activityId=${this.id}`
      } else if (this.useType * 1 === 3) {
        path = `pages/activity-detail?activityType=bargain&fromType=3&fromId=${id}&shopId=${shopId}&activityId=${this.id}`
      }
      if (res.from === 'button') {
        // 来自页面内转发按钮
      }
      return {
        title: title,
        path,
        imageUrl: this.goodsUrl
      }
    },
    methods: {
      ...mapActions(['setShowType']),
      shareFriend () {
        let title = this.title
        let id = this.goodsDrawInfo.id
        let dataJson = {title, activity_id: id}
        switch (this.useType * 1) {
          case 0:
            this.sendCustomMsg(40004, {title, goodsId: id})
            break
          case 1:
            this.sendCustomMsg(30002, dataJson)
            break
          case 3:
            this.sendCustomMsg(30016, dataJson)
            break
        }
      },
      _getParams (option) {
        this.useType = +this.goodsDrawInfo.type
        if (this.useType !== 0) {
          this.$wx.setNavigationBarTitle({
            title: '活动海报'
          })
        }
        this.id = this.goodsDrawInfo.id
        const {explain, goodsImg, mark, price, title} = this.goodsDrawInfo
        this.title = title
        this.explain = explain
        this.mark = mark
        this.money = price
        this.goodsUrl = goodsImg
      },
      // 加载静态资源
      _loadStatic () {
        let groupPic = this.imageUrl + '/ws-image/poster-goods/pic-collage@2x.png'
        let cutPic = this.imageUrl + '/ws-image/poster-goods/pic-cut@2x.png'
        let arr = [groupPic, cutPic]
        this._downloadPictures(arr, res => {
          this.groupPic = res[0].tempFilePath
          this.cutPic = res[1].tempFilePath
        })
      },
      _formateQrCodeData () {
        const f = 'c' + this.$wx.getStorageSync('userInfo').id
        const e = this.$wx.getStorageSync('shopId')
        const t = this.useType
        let a = this.id
        let g = this.id
        let data = {
          from_id: f,
          shopId: e,
          rule_id: t
        }
        switch (this.useType) {
          case 0:
            data.recommend_goods_id = g
            break
          case 1:
          case 3:
            data.recommend_activity_id = a
            break
          default:
            break
        }
        return data
      },
      // 画图基础信息
      async _getDrawPosterInfo () {
        this.$wechat.showLoading()
        const houseInfo = await Guide.getShopInfo()
        let avatarUrl = houseInfo.data.employee.avatar || `${this.imageUrl}/ws-image/pic-headshot@2x.png`
        let name = houseInfo.data.name || ''
        let qrCodeUrl = ''
        const qrData = this._formateQrCodeData()
        const data = {
          'type': this.useType ? 'activity_detail' : 'goods_detail',
          'source': 'c',
          ...qrData
        }
        ActiveCode.createMiniCode(data, false).then(res => {
          this.$wechat.hideLoading()
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
          }
          qrCodeUrl = (res.data && res.data.image_url) || (this.imageUrl + '/ws-image/pic-headshot@2x.png')
          let arr = [avatarUrl, qrCodeUrl]
          this._downloadPictures(arr, res => {
            this.avatarUrl = res[0].tempFilePath
            this.qrCodeUrl = res[1].tempFilePath
            this.name = name
            this.$wechat.hideLoading()
          })
        })
      },
      _downloadPictures (arr, callback) {
        // this.$wechat.showLoading()
        let flag = arr.every(val => val)
        if (!flag) {
          // this.$wechat.hideLoading()
          // return this.$refs.toast.show('请添加图片')
        }
        arr = arr.map(item => {
          return new Promise((resolve, reject) => {
            this.$wx.downloadFile({
              url: item,
              success: resolve,
              fail: reject
            })
          })
        })
        Promise.all(arr).then(callback).catch((err) => {
          console.warn(err)
          // this.$wechat.hideLoading()
          // this.$refs.toast.sho、w('下载图片失败，请重新尝试！')
        })
      },
      _action () {
        const useType = this.useType
        let iconUrl = ''
        // 0普通 1团购 3砍价
        switch (useType) {
          case 1 : {
            iconUrl = this.groupPic
            break
          }
          case 3 : {
            iconUrl = this.cutPic
            break
          }
          default: {
            break
          }
        }
        let options = {
          canvasId: 'we-paint',
          multiple: 1,
          panel: {
            el: '.goods-wrapper'
          },
          els: [
            {
              el: '.goods-wrapper',
              drawType: 'rect'
            },
            {
              el: '.avatar',
              drawType: 'img',
              shape: 'circle',
              shapeBg: '#fff',
              source: this.avatarUrl,
              unLoad: true,
              shadow: [0, 6, 10, 'rgba(74,144,226,0.15)', '#fff', 0]
            },
            {
              el: '.name',
              drawType: 'text',
              source: this.name,
              fontSize: 12,
              color: '#374b63'
            },
            {
              el: '.icon',
              drawType: 'img',
              source: iconUrl,
              unLoad: true
            },
            {
              el: '.goods-img',
              drawType: 'img',
              source: this.goodsUrl,
              mode: 'aspectFill',
              unLoad: false
            },
            {
              el: '.title',
              drawType: 'text',
              source: this.title,
              fontSize: 16,
              color: '#374b63'
            },
            {
              el: '.explain',
              drawType: 'text-area',
              source: this.explain,
              textMargin: 1.2,
              fontSize: 11,
              color: '#828AA2'
            },
            {
              el: '.mark',
              drawType: 'text',
              source: this.mark,
              fontSize: 11,
              color: '#F94C5F'
            },
            {
              el: '.unit',
              drawType: 'text',
              source: '¥',
              fontSize: 14,
              color: '#374b63'
            },
            {
              el: '.money',
              drawType: 'text',
              source: this.money,
              fontSize: 28,
              color: '#374b63'
            },
            {
              el: '.qr-code',
              drawType: 'img',
              source: this.qrCodeUrl,
              unLoad: true
            }
          ]
        }
        this.$refs.wePaint.action(options)
      },
      saveImage () {
        this.$wechat.showLoading()
        let title = this.title
        let id = this.goodsDrawInfo.id
        let dataJson = {title, activity_id: id}
        switch (this.useType * 1) {
          case 0:
            this.sendCustomMsg(40005, { title, goodsId: id })
            break
          case 1:
            this.sendCustomMsg(30003, dataJson)
            break
          case 3:
            this.sendCustomMsg(30017, dataJson)
            break
        }
        this._action()
      },
      drawDone() {
        this.setShowType(true)
      }
    },
    computed: {
      ...mapGetters(['goodsDrawInfo']),
      posterIconUrl () {
        // 0普通 1团购 3砍价
        const useType = this.useType
        return useType === 1 ? this.groupPic : useType === 3 ? this.cutPic : ''
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  @import "~common/stylus/private"

  .canvas
    position: fixed
    top: 0
    left: -200vw
    z-index: -1
    visibility: hidden
    opacity: 0

  button
    padding: 0
    margin: 0
    border-radius: 0
    font-family: $font-family-regular
    font-size: $font-size-12
    color: $color-828AA2
    background-color: transparent
    line-height: 1
    border-none()
    &.share-btn
      position: relative
    .btn-wrapper
      layout()
      align-items: center
      .icon
        width: 22px
        height: 22px
        margin-bottom: 8.5px

  .goods-make-poster
    min-height: 100vh
    .share-container
      margin: 4vw 9.3vw 6.1vw
      min-height: 132.8vw
      box-shadow: 0 4px 9px 0 rgba(55, 75, 99, 0.15)
      border-radius: 6px
      overflow: hidden
      .goods-wrapper
        width: 100%
        height: 100%
        box-sizing: border-box
        padding: 0 5.33vw
        position: relative
        .header
          height: 17.06vw
          layout(row, block, nowrap)
          align-items: center
          .avatar
            width: 6.4vw
            height: 6.4vw
            border-radius: 50%
            border: 3px solid $color-FFFFFF
            box-shadow: 0 8px 16px 0 rgba(74, 144, 226, 0.15)
            margin-right: 2.66vw
          .name
            flex: 1
            font-family: $font-family-regular
            font-size: 3.2vw
            color: $color-374B63
            line-height: 1
          .icon
            height: 17.06vw
            width: 29.06vw
            position: absolute
            right: 0
            top: 0
        .goods-img
          height: 70.66vw
          width: 70.66vw
        .footer
          min-height: 39.33vw
          box-sizing: border-box
          padding-top: 4vw
          font-family: $font-family-regular
          color: $color-374B63
          line-height: 1
          position: relative
          .title
            font-size: 4.26vw
            letter-spacing: 1px
            word-break: break-all
            margin-right: 5px
            line-height: 1.2
          .explain
            margin-top: 2.93vw
            font-size: 3.2vw
            color: $color-828AA2
            letter-spacing: 1.2px
            word-break: break-all
            margin-right: 5px
            line-height: 1.2
          .mark
            margin-top: 4vw
            font-family: $font-family-meddle
            font-size: 2.93vw
            color: $color-F94C5F
          .unit
            font-family: $font-family-meddle
            font-size: 3.73vw
            position: absolute
            bottom: 3.33vw
            left: 0
          .empty
            height: 18.66vw
            margin-bottom: 5.3vw
          .money
            position: absolute
            bottom: 2.53vw
            left: 3.73vw
            font-family: $font-family-bold
            font-size: 7.46vw
          .qr-code
            width: 18.66vw
            height: 18.66vw
            position: absolute
            bottom: 0
            right: 0

    .tool-bar
      layout(row)
      padding: 0 20.8vw
      justify-content: space-between
      font-family: $font-family-regular
      font-size: $font-size-12
      color: $color-828AA2
      line-height: 1
      .btn-wrapper
        layout()
        align-items: center
        .icon
          width: 22px
          height: 22px
          margin-bottom: 8.5px

</style>
