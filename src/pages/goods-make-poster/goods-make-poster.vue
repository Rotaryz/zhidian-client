<template>
  <div class="goods-make-poster">
    <canvas class="canvas" canvas-id="dynamic-share" :style="canvasStyle" v-if="showCanvas"></canvas>
    <article class="share-container">
      <div class="goods-wrapper">
        <header class="header">
          <img class="avatar" :src="avatarUrl" alt="">
          <div class="name">{{name || '海报'}}</div>
          <img class="icon" :src="posterIconUrl" v-if="posterIconUrl">
        </header>
        <img class="goods-img" mode="aspectFill" :src="goodsUrl" alt="">
        <footer class="footer">
          <div class="title">{{title || '拼团'}}</div>
          <div class="explain">{{explain || '海报'}}</div>
          <div class="mark">{{mark || '海报'}}</div>
          <div class="unit">￥</div>
          <div class="empty"></div>
          <div class="money">{{money || '100'}}</div>
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
  </div>
</template>

<script type="text/ecmascript-6">
  import { ActiveCode } from 'api'
  import SketchUp from 'common/js/sketch-up'
  import { mapGetters } from 'vuex'
  import imMixin from 'common/mixins/im-mixin'

  const device = wx.getSystemInfoSync()
  const width = device.windowWidth
  const prop = 1
  const vw = width / 100 * prop
  const canvasId = 'dynamic-share'

  export default {
    mixins: [imMixin],
    name: 'goods-make-poster',
    components: {
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
        price: '',
        ctx: null, // canvas上下文
        sketchUp: null,
        canvasStyle: '',
        divW: 0, // 目标盒子宽度
        divH: 0, // 目标盒子高度
        prop,
        vw,
        showCanvas: true
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
      this.ctx = null // canvas上下文
      this.sketchUp = null
      this.canvasStyle = ''
      this.divW = 0 // 目标盒子宽度
      this.divH = 0 // 目标盒子高度
    },
    onShow () {
      this._getDrawPosterInfo()
    },
    onLoad (option) {
      this._loadStatic()
      if (!this.ctx || !this.sketchUp) {
        this.ctx = this.$wx.createCanvasContext(canvasId)
        this.sketchUp = new SketchUp({ctx: this.ctx})
      }
      this._getParams(option)
    },
    onShareAppMessage (res) {
      let title = this.title
      let id = this.$wx.getStorageSync('userInfo').id
      let shopId = this.$wx.getStorageSync('shopId')
      let path
      if (this.useType * 1 === 0) {
        path = `pages/goods-detail?type=${this.useType * 1}&fromType=3&fromId=${id}&shopId=${shopId}&goodId=${this.id}`
      } else {
        path = `pages/goods-detail?type=${this.useType * 1}&fromType=3&fromId=${id}&shopId=${shopId}&ActivityId=${this.id}`
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
      shareFriend () {
        let title = this.title
        let data = {title}
        let dataJson = JSON.stringify(data)
        switch (this.useType * 1) {
          case 0:
          case 1:
            this.sendCustomMsg(30002, dataJson)
            break
          case 3:
            this.sendCustomMsg(30016, dataJson)
            break
        }
      },
      _getParams (option) {
        this.useType = Number(option.type)
        if (this.useType !== 0) {
          this.$wx.setNavigationBarTitle({
            title: '活动海报'
          })
        }
        this.id = option.id
        const {explain, goodsImg, mark, price, title} = this.goodsDrawInfo
        console.log(this.goodsDrawInfo, 'drawinfo')
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
          type: t
        }
        switch (this.useType) {
          case 0:
            data.goods_id = g
            break
          case 1:
          case 3:
            data.activity_id = a
            break
          default:
            break
        }
        return data
      },
      // 画图基础信息
      _getDrawPosterInfo () {
        this.$wechat.showLoading()
        const userInfo = this.$wx.getStorageSync('userInfo')
        let avatarUrl = userInfo.avatar || `${this.imageUrl}/ws-image/pic-headshot@2x.png`
        let name = userInfo.name || ''
        let qrCodeUrl = ''
        const qrData = this._formateQrCodeData()
        const data = {
          'type': 'goods-detail',
          data: qrData
        }
        ActiveCode.createMiniCode(data, false).then(res => {
          if (res.error !== this.$ERR_OK) {
            // this.$refs.toast.show(res.message)
            return
          }
          qrCodeUrl = res.data.image_url || (this.imageUrl + '/ws-image/pic-headshot@2x.png')
          let arr = [avatarUrl, qrCodeUrl]
          console.log(arr, 'download')
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
      _draw () {
        this.showCanvas = true
        let arr = [this.goodsUrl]
        let goodsImgs = arr
        const SketchUp = this.sketchUp
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
        const ctx = this.ctx
        this._getRelativePosition(() => {
          let query = this.$wx.createSelectorQuery()
          SketchUp
            .select(query, '.goods-wrapper')
            .select(query, '.header > .avatar')
            .select(query, '.header > .name')
            .select(query, '.header > .icon')
            .select(query, '.goods-img')
            .select(query, '.footer > .title')
            .select(query, '.footer > .explain')
            .select(query, '.footer > .mark')
            .select(query, '.footer > .unit')
            .select(query, '.footer > .money')
            .select(query, '.footer > .qr-code')
          query.exec(res => {
            SketchUp.fillRect('#fff', res[0])
            ctx.save()
            ctx.beginPath()
            ctx.setFillStyle('#fff')
            SketchUp.drawCircle((res[1].width / 2 + 3) * this.prop, res[1])
            ctx.setShadow(0, 0.5 * vw, 10, 'rgba(74, 144, 226, 0.15)')
            // 0 8px 16px 0 rgba(74, 144, 226, 0.15)
            ctx.fill()
            ctx.restore()
            ctx.save()
            ctx.beginPath()
            SketchUp.drawCircle(res[1].width / 2 * this.prop, res[1])
            // ctx.setShadow(0, 0.5 * vw, 10, 'rgba(55,75,99,0.15)')
            ctx.clip()
            SketchUp.drawImg(this.avatarUrl, res[1])
            ctx.restore()
            SketchUp.drawText(this.name, '#374B63', 3.2 * vw, 'left', res[2])
            SketchUp.drawImg(iconUrl, res[3])
            SketchUp.drawImg(goodsImgs[0].imgUrl, res[4], 0, 0, 'aspectFill', goodsImgs[0].imgInfo, '#fff')
            let linePro = 1
            // let linePro = this._formatStr(this.title)
            SketchUp.drawMultiText(this.title, '#374B63', 4.26 * vw, 'left', res[5], 1.4, 'top', 'all', 0, 0, linePro)
            // linePro = this._formatStr(this.explain)
            SketchUp.drawMultiText(this.explain, '#828AA2', 3.2 * vw, 'left', res[6], 1.4, 'top', 'all', 0, 0, linePro)
            SketchUp.drawText(this.mark, '#F94C5F', 2.9 * vw, 'left', res[7])
            SketchUp.drawText('￥', '#374B63', 3.33 * vw, 'left', res[8])
            SketchUp.drawText(this.money, '#374B63', 7.46 * vw, 'left', res[9])
            SketchUp.drawImg(this.qrCodeUrl, res[10])
            this._canvasDraw()
          })
        }, '.goods-wrapper')
      },
      _formatStr (str) {
        let reg = /[\u4e00-\u9fa5]/g
        let pro = str.match(reg).length / str.length * 0.9 / 0.3953488372093023
        return Math.min(1, pro)
      },
      /**
       * canvas绘图
       * @private
       */
      _canvasDraw () {
        const ctx = this.sketchUp.ctx
        this.$wechat.draw(ctx).then(res => {
          setTimeout(() => {
            this._canvasToFile(ctx)
          }, 380)
        }).catch(err => {
          console.info(err)
          this.$wechat.hideLoading()
          this.$showToast('绘图失败，请重新尝试！')
        })
      },
      /**
       * 导出canvas绘图
       * @param ctx 上下文
       * @private
       */
      _canvasToFile (ctx) {
        this.$wechat.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: this.divW * this.prop,
          height: this.divH * this.prop,
          destWidth: this.divW * 3,
          destHeight: this.divH * 3,
          canvasId: canvasId,
          fileType: 'jpg'
        }, ctx).then(res => {
          this.$wechat.hideLoading()
          this.showCanvas = false
          this.$wechat.saveImageToPhotosAlbum({filePath: res.tempFilePath}).then(resp => {
            if (resp.errMsg === 'saveImageToPhotosAlbum:ok') {
              this.$wechat.tipSuccess('保存成功')
              this.$wechat.previewImage({urls: [res.tempFilePath]})
            }
          }).catch(err => {
            console.info(err)
          })
          console.info(res.tempFilePath)
        }).catch(err => {
          console.info(err)
          this.$wechat.hideLoading()
          this.$showToast('请重新尝试！')
        })
      },
      /**
       * 获取目标元素的相对位置
       * @param callback 回调函数
       * @param cBoard 目标元素的信息
       * @private
       */
      _getRelativePosition (callback, cBoard = '.target-div') {
        if (this.canvasStyle) {
          callback && callback()
          return
        }
        let query = this.$wx.createSelectorQuery()
        this.sketchUp.select(query, cBoard)
        query.exec(res => {
          this.divW = res[0].width
          this.divH = res[0].height
          this.canvasStyle = `opacity: 0;width: ${100 * this.prop}vw;height: ${this.divH / this.divW * 100 * this.prop}vw;transform: scale(${1 / this.prop})`
          this.sketchUp.setParams(prop, res[0], width)
          setTimeout(() => {
            callback && callback()
          }, 300)
        })
      },
      /**
       * 下载动态图片的信息
       */
      _loadImgs (imgs, callback) {
        this._downloadPictures(imgs, res => {
          let imgArr = res.map(item => item.tempFilePath)
          this._getImgArrInfo(imgArr, newImgArr => {
            callback(newImgArr)
          })
        })
      },
      /**
       * 获取动态评论的图片信息
       * @param arr
       * @param callback
       * @private
       */
      _getImgArrInfo (arr, callback) {
        let newArr = []
        let infoArr = arr.map(item => {
          return new Promise((resolve, reject) => {
            this.$wx.downloadFile({
              url: item,
              success: resolve,
              fail: reject
            })
          })
        })
        Promise.all(infoArr).then((res) => {
          arr.map((item, index) => {
            newArr.push({imgUrl: item, imgInfo: res[index]})
          })
          callback(newArr)
        }).catch((err) => {
          console.warn(err)
        })
      },
      saveImage () {
        this.$wechat.showLoading()
        let title = this.title
        let data = {title}
        let dataJson = JSON.stringify(data)
        this.sendCustomMsg(30003, dataJson)
        this._draw()
        // this.sendCustomMsg(60005) // 保存图片
        // if (this.useType) {
        //   this.downLoadSave()
        // } else {
        //   this.$wechat.saveImageToPhotosAlbum({filePath: this.shareImg}).then(res => {
        //     if (res.errMsg === 'saveImageToPhotosAlbum:ok') {
        //       this.$wechat.tipSuccess('保存成功')
        //       this.$wechat.previewImage({urls: [this.shareImg]})
        //     }
        //   })
        // }
      },
      downLoadSave () {
        // const self = this
        // this.$wechat.showLoading()
        // this.$wechat.downloadFile({url: this.shareImg}).then(res => {
        //   if (res.errMsg === 'downloadFile:ok') {
        //     this.$wechat.hideLoading()
        //     const filePath = res.tempFilePath
        //     this.$wechat.saveImageToPhotosAlbum({filePath}).then(res => {
        //       if (res.errMsg === 'saveImageToPhotosAlbum:ok') {
        //         this.$wechat.tipSuccess('保存成功')
        //         this.$wechat.previewImage({urls: [filePath]})
        //       }
        //     }).catch(() => {
        //       self.$refs.toast.show('保存失败')
        //     })
        //   }
        // })
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
      poster-shadow()
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
            border: 3px solid #FFFFFF;
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
