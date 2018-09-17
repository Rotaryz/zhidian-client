<template>
  <div class="test-poster">
    <article class="share-container">
      <div class="goods-wrapper">
        <header class="header">
          <img class="avatar" :src="avatarUrl" alt="">
          <div class="name">{{name}}</div>
        </header>
        <img class="goods-img" mode="aspectFill" :src="goodsUrl" alt="">
        <footer class="footer">
          <div class="title">{{title}}</div>
          <div class="explain">{{explain}}</div>
          <div class="mark">{{mark}}</div>
          <div class="mark">{{mark}}</div>
          <div class="unit">¥</div>
          <div class="money">{{money}}</div>
          <img class="qr-code" mode="aspectFill" :src="qrCodeUrl" alt="">
        </footer>
      </div>
    </article>
    <we-paint ref="wePaint" :options="options"></we-paint>
  </div>
</template>

<script type="text/ecmascript-6">
  // import lib from 'common/we-paint/wx-lib'
  // import Info from 'common/we-paint/paint-el-info'
  // import wx from 'wx'
  import WePaint from 'components/we-paint/we-paint'
  // import { deviceInfo } from 'common/js/contants'

  // const width = deviceInfo.width
  // const vw = width / 100

  // console.log(lib)
  export default {
    components: {
      WePaint
    },
    data () {
      return {
        // options: {
        //   canvasId: 'we-paint',
        //   multiple: 3,
        //   panel: {el: '.share-container'}
        // },
        name: '赞播的小店',
        avatarUrl: 'http://tx.haiqq.com/uploads/allimg/170510/0RSQ4G-9.jpg',
        goodsUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534756115295&di=5b3cffa3efac9df8274256cf3526978e&imgtype=0&src=http%3A%2F%2Fimage2.wbiao.co%2Fgoods%2Fa%2F201301%2F23%2F00_10615_08_53_01.jpg',
        title: '赞播微店手表',
        explain: '个性十足回头率爆棚，具备爆款基因,个性十足回头率爆棚，具备爆款基因,个性十足回头率爆棚，具备爆款基因',
        mark: '剩余2件',
        money: '298',
        qrCodeUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534756283227&di=84a8fa39c76fbf95fafed60a1f18b196&imgtype=jpg&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D1251039570%2C2689978911%26fm%3D214%26gp%3D0.jpg'
      }
    },
    mounted () {
      let option = {
        canvasId: 'we-paint',
        multiple: 1,
        panel: {
          el: '.share-container',
          width: 305,
          height: 498,
          top: 79,
          left: 35
        },
        els: [{
          el: '.share-container',
          width: 305,
          height: 498,
          top: 79,
          left: 35,
          drawType: 'rect'
        }, {
          el: '.avatar',
          width: 24,
          height: 24,
          top: 99.5,
          left: 55,
          drawType: 'img',
          source: this.avatarUrl,
          shape: 'circle',
          shapeBg: '#fff',
          shadow: [0, 2, 3, 'rgba(74,144,226,0.15)', '#fff', 3]
        }, {
          el: '.qr-code',
          drawType: 'img',
          source: this.qrCodeUrl
        }, {
          el: '.name',
          drawType: 'text',
          source: this.name,
          fontSize: 12,
          color: '#374b63'
        }, {
          el: '.goods-img',
          width: 265,
          height: 265,
          top: 144,
          left: 55,
          drawType: 'img',
          source: this.goodsUrl,
          mode: 'aspectFill',
          unLoad: false
        }, {
          el: '.title',
          drawType: 'text',
          source: this.title,
          fontSize: 16,
          color: '#374b63'
        }, {
          el: '.explain',
          drawType: 'text-area',
          source: this.explain,
          textMargin: 1.2,
          fontSize: 11,
          color: '#828AA2'
        }, {
          el: '.mark',
          isSelectAll: true,
          drawType: 'text',
          sourceArr: [this.mark, this.mark],
          fontSize: 11,
          color: '#F94C5F'
        }, {
          el: '.unit',
          // width: 14,
          // height: 14,
          // top: 531,
          // left: 55,
          drawType: 'text',
          source: '¥',
          fontSize: 14,
          color: '#374b63'
        }, {
          el: '.money',
          // width: 40.5,
          // height: 28,
          // top: 519,
          // left: 69,
          drawType: 'text',
          source: this.money,
          fontSize: 28,
          color: '#374b63'
        }]
      }
      this.$refs.wePaint.action(option)
    },
    methods: {
      test () {
        this.$refs.wePaint.action()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .test-poster
    fill-box(fixed)
    .share-container
      margin-top: 79px
      margin-left : 35px
      height: 498px
      width : 305px
      box-sizing :border-box
      poster-shadow()
      overflow: hidden
      .goods-wrapper
        width: 100%
        height: 100%
        box-sizing: border-box
        padding: 0 20px
        position: relative
        .header
          height: 69px
          layout(row, block, nowrap)
          align-items: center
          .avatar
            width: 24px
            height: 24px
            border-radius: 50%
            border: 3px solid #FFFFFF;
            box-shadow: 0 8px 16px 0 rgba(74, 144, 226, 0.15)
            margin-right: 10px
          .name
            flex: 1
            font-family: $font-family-regular
            font-size: 12px
            color: $color-374B63
            line-height: 1
          .icon
            height: 17.06vw
            width: 29.06vw
            position: absolute
            right: 0
            top: 0
        .goods-img
          height: 265px
          width: 265px
        .footer
          height: 147.5px
          box-sizing: border-box
          padding-top: 5px
          font-family: $font-family-regular
          color: $color-374B63
          line-height: 1
          position: relative
          .title
            font-size: 16px
            letter-spacing: 1px
          .explain
            margin-top: 11px
            font-size: 12px
            color: $color-828AA2
            letter-spacing: 1.2px
          .mark
            margin-top: 5px
            font-family: $font-family-meddle
            font-size: 12px
            color: $color-F94C5F
          .unit
            font-family: $font-family-meddle
            font-size: 14px
            position: absolute
            bottom: 12.5px
            left: 0
          .money
            position: absolute
            bottom: 9.5px
            left: 14px
            font-family: $font-family-bold
            font-size: 28px
          .qr-code
            width: 70px
            height: 70px
            position: absolute
            bottom: 0
            right: 0
</style>
