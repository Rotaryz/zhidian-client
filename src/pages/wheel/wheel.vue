<template>
  <div class="wheel">
    <img class="background-img" model="aspectFill" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-background@2x.png'"/>
    <article class="content">
      <div class="title-wrapper">
        <img class="img" model="widthFix" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-header_title@2x.png'"/>
      </div>
      <div class="wheel-wrapper">
        <div class="wheel">
          <div class="wheel-pointer" @click="drawPrize">
            <img class="img" model="aspectFill" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-pointer@2x.png'"/>
          </div>
          <div class="wheel-content" ref="wheel">
            <img class="img" model="aspectFill" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-zp@2x.png'"/>
            <div class="wheel-relative">
              <div class="prize" v-for="(item, index) in wheelList"
                   :class="'prize-' + index">
                <p class="name">{{item.promotion_title}}</p>
                <div class="img-wrapper">
                  <img class="img" :src="item.promotion_img" alt="">
                </div>
              </div>
              <div class="prize prize-5">
                <p class="name">谢谢惠顾</p>
                <div class="img-wrapper">
                  <img class="img" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-bottom_pan@2x.png'"/>
                  <!--<img class="img" src="./pic-face@2x.png" alt="">-->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--<div class="bottom-pan">-->
        <!--<img class="img" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-face@2x.png'"/>-->
        <!--</div>-->
        <p class="count-wrapper">您剩余 <span class="number">{{count}}</span> 次抽奖机会
        </p>
      </div>
    </article>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        imageUrl: this.$imageUrl,
        wheelList: [],
        count: 0,
        rotate: 0,
        wheeling: false,
        prize: {},
        luckers: [],
        rulesList: [],
        activeIndex: 0,
        emotion: 'success'
      }
    },
    created() {
      this.direction = 'vertical'
    },
    destroyed() {
      this.timer && clearInterval(this.timer)
    },
    methods: {
      doLucky() {
        return new Promise((resolve, reject) => {
          resolve({
            error: 0,
            data: {
              id: 11,
              promotion_type: 'coupon',
              customer_id: 66,
              redpacket_id: 4,
              activity_id: 6,
              price: 451,
              is_used: 0,
              promotion_title: 'h-w'
            }
          })
        })
      },
      drawPrize() {
        this.$refs.load.show()
        this.wheeling = true
        const data = {
          activity_id: this.activityId
        }
        this.doLucky(data).then((res) => {
          // this.$refs.load.hide()
          if (res.error === this.$ERR_OK) {
            res = res.data
            this.prize = res
            let index
            const noPrice = res.id === 0
            if (noPrice) {
              index = 5
            } else {
              index = this.wheelList.findIndex((item) => item.id === res.id)
            }
            let addAngle = 0
            if (this.rotate > 0) {
              let beforeAngle = this.rotate % 360
              addAngle = 360 - beforeAngle
            }
            let angle = index * 60
            let random = Math.floor(Math.random() * 10 + 5)
            this.rotate = this.rotate + random * 360 + angle + addAngle
            let duration = random / 2
            // this.$refs.wheel.style[transitionDuration] = duration + 's'
            // this.$refs.wheel.style[transform] = `rotate(-${this.rotate}deg)`
            setTimeout(() => {
              if (noPrice) {
                this.emotion = 'fail'
              } else {
                this.emotion = 'success'
              }
              // this.showPrizeModal()
              this.wheeling = false
              // this._setIntervalUser() // todo
              // this._getLuckyUser()
              // this._getLuckyNum()
            }, duration * 1000)
          } else {
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./stylus/mixin.styl"
  @import "./stylus/variable.styl"

  .wheel
    position: relative
    min-height: 100vh
    overflow: hidden
    background-color: #232347
    .background-img
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
    .content
      position: relative
      padding-top: 43px
      .title-wrapper
        height: 23.866666666666vw
        margin-top: 10px
        padding: 0 30px
        .img
          width: 100%
          height: 100%
      .wheel-wrapper
        width: 100%
        padding: 0 10%
        box-sizing: border-box
        .wheel
          position: relative
          width: 300px
          height: 300px
          .wheel-pointer
            position: absolute
            top: 50%
            left: 50%
            width: 28.6666666666666vw
            height: @width
            z-index: 50
            transform: translate(-50%, -50%)
            background-size: 100% 100%
            .img
              width: 100%
              height: 100%
          .wheel-content
            position: absolute
            top: 0
            left: 0
            display: flex
            justify-content: center
            width: 100%
            height: 100%
            transition-timing-function: ease-in-out
            transition-property: transform
            .img
              position absolute
              width: 100%
              height: 100%
            .wheel-relative
              position: relative
              width: 100%
              height: 100%
              .prize
                position: absolute
                top: 0
                left: 27.7%
                width: 45%
                height: 100%
                box-sizing: border-box
                padding-top: 11%
                text-align: center
                for $i in 0 1 2 3 4 5
                  &.prize-{$i}
                    z-index: (-($i) + 6)
                    transform: rotate($i * 60deg)
                .name
                  margin-bottom: 10vw
                  font-size: $font-size-small-s
                  color: $color-orange
                .img-wrapper
                  width: 37.04vw
                  height: 13.11vw
                  margin: 0 auto
                  box-sizing: border-box
                  .img
                    max-width: 100%
                    max-height: 100%
        .bottom-pan
          width: 100%
          height: 0
          margin-top: -3%
          padding-top: 7.6%
          background-size: 44.9333333% 100%
          background-repeat: no-repeat
          background-position: center
        .count-wrapper
          width: 100%
          margin-top: 10px
          text-align: center
          color: $color-white
          font-size: $font-size-small
          .number
            color: $color-yellow
</style>

