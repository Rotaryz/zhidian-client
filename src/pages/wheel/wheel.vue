<template>
  <div class="wheel" :style="pageStyle">
    <head-item :title="title" :showArrow="true"></head-item>
    <div class="page-wrapper">
      <img class="wheel-bg" style="width: 100%" mode="widthFix" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-turntable_bg@2x.png'" alt="">
      <article class="container">
        <wheel-header @showRule="showRule"></wheel-header>
        <section class="content-wrapper">
          <article class="wheel-wrapper">
            <img class="icon-img pos-a" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-wheel-bg@2x.png'" alt="">
            <figure class="wheel-outer" :style="outerWheelAction">
              <img class="icon-img" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-rose@2x.png'" alt="">
              <ul class="light-dot" v-for="(item, index) in '1234567'" :key="index" :class="'light-'+index">
                <li class="dot" v-if="imageUrl" v-for="(it, idx) in '12'" :key="idx">
                </li>
              </ul>
            </figure>
            <figure class="wheel-inner" :style="innerWheelAction">
              <img class="icon-img" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-thrntable@2x.png'" alt="">
              <div class="prize-item" v-for="(item, index) in wheelList" :key="index" :class="'prize-'+index">
                <p class="name">{{item.title}}</p>
                <div class="img-wrapper">
                  <img class="pic" mode="aspectFit" v-if="item.image_url" :src="item.image_url" alt="">
                </div>
              </div>
            </figure>
            <figure class="wheel-pointer">
              <div class="pointer" @click.stop="">
                <img class="icon-img" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-turntable_go@2x.png'" alt="">
              </div>
            </figure>
          </article>
          <dl class="footer">
            <dt class="title">你还有 <span class="number">{{usable_times}}</span> 次机会</dt>
            <dd class="card-item-wrapper">
              <wheel-card></wheel-card>
            </dd>
            <dd class="card-item-wrapper">
              <wheel-card></wheel-card>
            </dd>
          </dl>
        </section>
        <ul style="position: fixed;top:0;left: 0;display: flex;color:#fff; ">
          <li @click="choosePrize(index)" style="height: 50px;width: 50px" v-for="(item,index) in wheelList" :key="index">中将{{index}}</li>
        </ul>
        <wheel-modal ref="modal"></wheel-modal>
      </article>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import HeadItem from 'components/head-item/head-item'
  import WheelHeader from 'components/wheel-header/wheel-header'
  import WheelCard from 'components/wheel-card/wheel-card'
  import WheelModal from 'components/wheel-modal/wheel-modal'
  import { ActiveExtend } from 'api'

  const system = wx.getSystemInfoSync()

  export default {
    components: {
      WheelHeader,
      WheelCard,
      WheelModal,
      HeadItem
    },
    computed: {
      pageStyle() {
        return system.screenWidth < 375 ? 'height: 105vh' : ''
      },
      wheelActionStyle() {
        return this.active ? 'active' : ''
      },
      innerWheelAction() {
        return `transform :rotate(${360 * this.activeStep}deg); transition : transform ${this.wheelSeconds}ms ${this.wheelCvs}`
      },
      outerWheelAction() {
        return `transform :rotate(${-360 * this.activeStep}deg); transition : transform ${this.wheelSeconds}ms ${this.wheelCvs}`
      }
    },
    data() {
      return {
        title: '幸运大转盘',
        running: false,
        randomDeg: 0,
        activeStep: 0,
        lastStep: 0,
        wheelSeconds: 6000,
        wheelCvs: `cubic-bezier(.71,0,.58,1)`,
        wheelList: [
          {
            title: '谢谢参与',
            image_url: `${this.$imageUrl}/zd-image/wheel/pic-face@2x.png`
          }
        ],
        usable_times: 0
      }
    },
    onLoad() {
      this._getWheelInfo()
    },
    methods: {
      showRule() {
        this.$refs.modal.show('prize')
      },
      _getWheelInfo() {
        ActiveExtend.getWheelInfo().then(res => {
          this.$wechat.hideLoading()
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          let arr = []
          arr.concat(res.data.activity_prizes)
          this.wheelList = arr
          this.usable_times = res.data.usable_times
        })
      },
      action(index) {
        if (this.running) return
        setTimeout(() => {
          this.running = false
        }, 3050)
        this.running = true
        // 随机数
        let range = 20
        this.randomDeg = Math.random() * range * 2 - range
        // 转的位置
        this.activeStep += (this.lastStep + ~~Math.random() * 3 + 6 - (index * 60 - this.randomDeg) / 360)
        this.lastStep = (index * 60 - this.randomDeg) / 360
      },
      choosePrize(index) {
        this.action(index)
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

  .wheel
    position: relative
    height: 100vh
    transform: translate3d(0, 0, 0)
    .page-wrapper
      position: fixed
      top: 64px
      left: 0
      right: 0
      bottom: 0
      .container
        fill-box(absolute)
        .content-wrapper
          position: absolute
          right: 0
          left: 0
          top: 34.8vw
          .footer
            .title
              font-family: PingFangSC-Regular;
              font-size: 3.733333333333334vw
              color: #FFE6C2;
              text-align: center;
              padding-bottom: 5vw
              .number
                font-family: PingFang-SC-Bold;
                font-size: 6.4vw
                color: #F8E71C;
            .card-item-wrapper
              margin 0 6.666666666666667vw 1.3333333333333335vw
          .wheel-wrapper
            margin: 0 auto
            width: 89.86666666666666vw
            height: 91.2vw
            position: relative
            .wheel-outer
              position: absolute
              top: -1.6%
              left: 0%
              height: 89.86666666666666vw
              width: @height
              padding: 7.418397626112759%
              box-sizing: border-box
              transform: rotate(0deg)
              transition: transform 3s cubic-bezier(n, n, n, n)
              .light-dot
                position: absolute
                top: 0
                left: 48.5%
                width: 3%
                height: 100%
                box-sizing: border-box
                layout()
                justify-content: space-between
                align-items: center
                padding: 6% 0
                for $i in 0 1 2 3 4 5 6
                  &.light-{$i}
                    z-index: (-($i) + 8)
                    transform: rotateZ($i * 25.714285714285715deg)
                .dot
                  width: 3.2vw
                  height: @width
                  background-repeat: no-repeat
                  background-size: 100% 100%
                  border-radius 50%
                  background-image url("./pic-light-dot@3x.png")
            .wheel-inner
              position: absolute
              top: -1.6%
              left: 0%
              height: 89.86666666666666vw
              width: @height
              padding: 10.385756676557865%
              box-sizing: border-box
              transform: rotate(0deg)
              transition: transform 3s ease-in-out
              .prize-item
                position: absolute
                top: 0
                left: 27.7%
                width: 45%
                height: 100%
                box-sizing: border-box
                text-align: center
                for $i in 0 1 2 3 4 5
                  &.prize-{$i}
                    z-index: (-($i) + 6)
                    transform: rotate($i * 60deg)
                .name
                  font-family: $font-family-bold
                  line-height: 1.2
                  margin: 28% auto 3%
                  max-width: 37%
                  font-size: 2.67vw
                  color: #6d54ca
                  no-wrap()
                .img-wrapper
                  width: 37.04%
                  height: 13.11%
                  margin: 0 auto
                  box-sizing: border-box
                  .pic
                    width: 100%
                    height: 100%
            .wheel-pointer
              position: absolute
              top: -1.6%
              left: 0%
              height: 89.86666666666666vw
              width: @height
              layout()
              justify-content: center
              align-items: center
              .pointer
                margin-top: -5%
                width: 22.7vw
                height: 27.3vw
</style>

