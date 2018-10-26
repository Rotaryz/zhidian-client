<template>
  <div class="wheel" :style="pageStyle">
    <img style="width: 100%" mode="widthFix" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-turntable_bg@2x.png'" alt="">
    <article class="container">
      <wheel-header></wheel-header>
      <section class="content-wrapper">
        <article class="wheel-wrapper">
          <img class="icon-img" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-wheel-bg@2x.png'" alt="">
          <div class="wheel-box">
            <div class="wheel-box-wrapper">
              <div class="bg">
                <img class="icon-img" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-rose@2x.png'" alt="">
              </div>
              <!--<ul class="dots-wrapper">-->
                <!--<li class="dots-item-wrapper">-->
                  <!--<img class="icon-img" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-light-dot@3x.png'" alt="">-->
                <!--</li>-->
              <!--</ul>-->
            </div>
          </div>
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
        return system.screenWidth < 375 ? 'max-height: 102vh' : ''
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .icon-img
    width: 100%
    height: 100%

  .wheel
    position: relative
    min-height: 100vh
    max-height: 100vh
    overflow: hidden
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
          .bg
            fill-box(absolute)
          .wheel-box-wrapper
            width :85.31157270029674%
            height :0
            padding-top :100%

</style>

