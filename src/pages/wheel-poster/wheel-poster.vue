<template>
  <div class="wheel-poster">
    <head-item :title="title" :showArrow="true"></head-item>
    <div style="height: 64px"></div>
    <div class="top-box"></div>
    <div class="content">
      <img class="icon-img pos-a" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-share_img.png'" alt="">
      <section class="info-wrapper">
        <div class="left">
          <img class="icon-img" mode="aspectFill" v-if="employeeInfo.avatar" :src="employeeInfo.avatar" alt="">
        </div>
        <div class="middle">
          <div class="name">{{employeeInfo.name}}</div>
          <div class="note">邀请你参加活动!</div>
        </div>
        <div class="right">
          <div class="qr-code">
            <img class="icon-img" v-if="qrCodeUrl" :src="qrCodeUrl" alt="">
          </div>
          <p class="txt">长按或扫码一起参与!</p>
        </div>
      </section>
    </div>
    <div class="btn" @click="_action">保存图片{{test}}</div>
    <we-paint ref="wePaint" @drawDone="drawDone" @downloadFile="downloadFile"></we-paint>
  </div>
</template>

<script type="text/ecmascript-6">
  import WePaint from 'components/we-paint/we-paint'
  import HeadItem from 'components/head-item/head-item'
  import wx from 'wx'
  import { ActiveCode } from 'api'

  const system = wx.getSystemInfoSync()
  const vw = system.screenWidth / 100
  export default {
    components: {
      WePaint,
      HeadItem
    },
    data() {
      return {
        title: '幸运大转盘',
        qrCodeUrl: '',
        employeeInfo: {}
      }
    },
    onLoad(options) {
      this._getActiveCode()
      this.employeeInfo = options
    },
    methods: {
      _getActiveCode() {
        const data = {
          type: 'wheel',
          source: 'c'
        }
        ActiveCode.createMiniCode(data, false).then(res => {
          this.$wechat.hideLoading()
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
          }
          this.qrCodeUrl = (res.data && res.data.image_url) || ''
        })
      },
      drawDone(filePath) {
        this.setShowType(true)
        this.$wechat.saveImageToPhotosAlbum({ filePath })
      },
      downloadFile() {
      },
      async _action() {
        let img = ''
        try {
          img = await this.$wechat.getImageInfo({src: this.qrCodeUrl})
        } catch (e) {
          img = ''
        }
        if (!img) {
          this.$wechat.hideLoading()
          this.$showToast('未能获取小程序二维码')
          return
        }
        let backgroundImg = this.imageUrl + '/zd-image/wheel/pic-share_img.png'
        let avatarImg = this.employeeInfo.avatar
        let name = this.employeeInfo.name
        let note = `邀请你参加活动!`
        let qrCodeImg = this.qrCodeUrl
        let qrCodeTxt = `长按或扫码一起参与!`
        let options = {
          canvasId: 'we-paint',
          multiple: 1,
          panel: {
            el: '.content'
          },
          els: [
            {
              el: '.content',
              drawType: 'img',
              source: backgroundImg
            },
            {
              el: '.left',
              drawType: 'img',
              shape: 'circle',
              shapeBg: '#fff',
              source: avatarImg,
              mode: 'aspectFill',
              shadow: [0, 6, 10, 'rgba(74,144,226,0.15)', '#fff', 0]
            },
            {
              el: '.name',
              drawType: 'text',
              source: name,
              fontSize: 4.266666666666667 * vw,
              color: '#464646'
            },
            {
              el: '.note',
              drawType: 'text',
              source: note,
              fontSize: 3.2 * vw,
              color: '#464646'
            },
            {
              el: '.qr-code',
              drawType: 'img',
              source: qrCodeImg,
              mode: 'aspectFill'
            },
            {
              el: '.txt',
              drawType: 'text',
              source: qrCodeTxt,
              fontSize: 2.666666666666667 * vw,
              color: '#464646'
            }
          ]
        }
        this.$refs.wePaint.action(options)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .icon-img
    width: 100%
    height: 100%

  .pos-a
    position: absolute
    top: 0
    left: 0

  .wheel-poster
    layout()
    align-items: center
    height: 100vh
    background: #ebebeb
    .top-box
      height: 8vw
    .btn
      height: 41px
      width: 200px
      background: #FF4B69;
      border-radius: 41px;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #FFFFFF;
      text-align: center;
      line-height: @height
      margin-top: 8vw
    .content
      position: relative
      width: 74.7vw
      height: 120vw
      .info-wrapper
        position: relative
        height: 100%
        width: 100%
        box-sizing: border-box
        padding 115.74105865522174% 6.61659513590844% 0 5.007153075822603%
        layout(row, block, nowrap)
        .left
          width: 10.666666666666668vw
          height: @width
          margin: 6.8vw 2.666666666666667vw 0 0
          border-radius: 50%
          overflow: hidden
        .middle
          margin-top: 7.333333333333333vw
          flex: 1
          overflow: hidden
          .name
            max-width: 100%
            font-family: PingFangSC-Medium;
            font-size: 4.266666666666667vw;
            color: #464646;
            line-height: 1
          .note
            margin-top: 1.2vw
            font-family: PingFangSC-Light;
            font-size: 3.2vw
            color: #464646;
            line-height: 1
        .right
          margin-top: 1.866666666666667vw
          .qr-code
            margin: 0 auto
            height: 22.8vw
            width: @width
          .txt
            margin-top: 1.2vw
            font-family: PingFangSC-Light;
            font-size: 2.666666666666667vw
            color: #464646;
</style>
