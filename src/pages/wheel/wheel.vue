<template>
  <div class="wheel" :style="pageStyle">
    <img style="width: 100%" mode="widthFix" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-turntable_bg@2x.png'" alt="">
    <article class="container">
      <wheel-header></wheel-header>
      <section class="content-wrapper">
        <article class="wheel-wrapper">
          <img class="icon-img pos-a" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-wheel-bg@2x.png'" alt="">
          <figure class="wheel-outer" :style="outerWheelAction">
            <img class="icon-img" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-rose@2x.png'" alt="">
            <ul class="light-dot" v-for="(item, index) in '1234567'" :key="index" :class="'light-'+index">
              <li class="dot" v-if="imageUrl" v-for="(it, idx) in '12'" :key="idx" :style="{backgroundImage: 'url(' + imageUrl+'/zd-image/wheel/pic-light-dot@3x.png)'}">
              </li>
            </ul>
          </figure>
          <figure class="wheel-inner" :style="innerWheelAction">
            <img class="icon-img" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-thrntable@2x.png'" alt="">
            <div class="prize-item" v-for="(item, index) in '123456'" :key="index" :class="'prize-'+index">
              <p class="name">{{item}}</p>
              <div class="img-wrapper">
                <img class="pic" mode="aspectFill" v-if="imageUrl" :src="imageUrl + '/zd-image/test-img/1@1x.png'" alt="">
              </div>
            </div>
          </figure>
          <figure class="wheel-pointer" @click.stop="action">
            <div class="pointer">
              <img class="icon-img" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-turntable_go@2x.png'" alt="">
            </div>
          </figure>
        </article>
        <dl class="footer">
          <dt class="title">你还有 <span class="number">3</span> 次机会</dt>
          <dd class="card-item-wrapper">
            <wheel-card></wheel-card>
          </dd>
          <dd class="card-item-wrapper">
            <wheel-card></wheel-card>
          </dd>
        </dl>
      </section>
    </article>
  </div>
</template>

<script type="text/ecmascript-6">
  import WheelHeader from 'components/wheel-header/wheel-header'
  import WheelCard from 'components/wheel-card/wheel-card'

  const system = wx.getSystemInfoSync()
  console.log(system)
  export default {
    components: {
      WheelHeader,
      WheelCard
    },
    computed: {
      pageStyle() {
        return system.screenWidth < 375 ? 'max-height: 105vh' : ''
      },
      wheelActionStyle() {
        return this.active ? 'active' : ''
      },
      innerWheelAction() {
        return `transform :rotate(${(360 * this.activeStep) + this.randomDeg}deg); transition : transform 3s cubic-bezier(1,0,.58,1)`
      },
      outerWheelAction() {
        return `transform :rotate(${(-360 * this.activeStep) + this.randomDeg}deg); transition : transform 3s cubic-bezier(1,0,.58,1)`
      }
    },
    data() {
      return {
        running: false,
        randomDeg: 0,
        activeStep: 0
      }
    },
    methods: {
      action() {
        if (this.running) return
        setTimeout(() => {
          this.running = false
        }, 3050)
        this.running = true
        let range = 20
        this.randomDeg = Math.random() * range * 2 - range
        this.activeStep += ~~Math.random() * 3 + 2
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
    position :absolute
    top:0
    left :0

  .wheel
    position: relative
    min-height: 100vh
    max-height: 100vh
    overflow: hidden
    transform: translate3d(0,0,0)
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
            position :absolute
            top: -1.6%
            left :0%
            height :89.86666666666666vw
            width: @height
            padding :7.418397626112759%
            box-sizing :border-box
            transform: rotate(0deg)
            transition : transform 3s cubic-bezier(n,n,n,n)
            .light-dot
              position: absolute
              top: 0
              left: 48.5%
              width: 3%
              height: 100%
              box-sizing: border-box
              layout()
              justify-content :space-between
              align-items :center
              padding : 6% 0
              for $i in 0 1 2 3 4 5 6
                &.light-{$i}
                  z-index: (-($i) + 8)
                  transform: rotateZ($i * 25.714285714285715deg)
              .dot
                width :3.2vw
                height :@width
                background-repeat: no-repeat
                background-size: 100% 100%
                border-radius 50%
          .wheel-inner
            position :absolute
            top: -1.6%
            left :0%
            height :89.86666666666666vw
            width: @height
            padding :10.385756676557865%
            box-sizing :border-box
            transform: rotate(0deg)
            transition : transform 3s ease-in-out
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
                margin: 28% 0 3%
                font-size: 2.67vw
                color: rebeccapurple
              .img-wrapper
                width: 37.04%
                height: 13.11%
                margin: 0 auto
                box-sizing: border-box
                .pic
                  max-width: 100%
                  max-height: 100%
          .wheel-pointer
            position :absolute
            top: -1.6%
            left :0%
            height :89.86666666666666vw
            width: @height
            layout()
            justify-content :center
            align-items :center
            .pointer
              margin-top: -5%
              width :22.7vw
              height:27.3vw
</style>

