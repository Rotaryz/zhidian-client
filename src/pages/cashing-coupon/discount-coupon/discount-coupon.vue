<template>
  <div class="discount-coupon" :style="{paddingTop: paddingTop * 100 + '%',backgroundImage: bgImage}">
    <div class="wrapper">
      <section class="left">
        <div class="money-wrapper">
          <p v-if="false" class="unit">¥</p>
          <p class="number">9.9</p>
          <p v-if="true" class="unit">折</p>
        </div>
        <div class="explain">满100元可用</div>
      </section>
      <ul class="right" :style="{flex: rightFlex}">
        <li class="title">国颐堂新手优惠券</li>
        <li class="date">全商品可用</li>
        <li class="date">有效期至2019-10-01</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { baseURL } from 'api/config'
  const COMPONENT_NAME = 'DISCOUNT_COUPON'
  export default {
    name: COMPONENT_NAME,
    props: {
    },
    data() {
      return {
        bgImage: `url("${baseURL.image}/zd-image/ai-2.1/pic-couponlq@2x.png")`,
        rightFlex: 2.3,
        paddingTop: 85 / 315
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .discount-coupon
    width: 100%
    height :0
    background-size :100% 100%
    background-position :center center
    position :relative
    .wrapper
      fill-box(absolute)
      layout(row,block,nowrap)
      .left
        flex:1
        overflow :hidden
        layout(column,block,nowrap)
        justify-content :center
        align-items :center
        color: #F94346;
        .explain
          font-family: $font-family-regular
          font-size: 2.666666666666667vw
        .money-wrapper
          display :flex
          overflow :hidden
          align-items :flex-end
          font-family: DINAlternate-Bold;
          .unit
            font-size: 5.333333333333334vw
            position :relative
            bottom :1.6vw
          .number
            font-size: 9.6vw
      .right
        overflow :hidden
        padding :2.933333333333333vw
        layout(column,block,nowrap)
        justify-content :space-around
        .title
          font-family: $font-family-medium
          font-size: 4.266666666666667vw
          color: #333333;
          no-wrap()
        .date
          opacity: 0.6;
          font-family: $font-family-regular
          font-size: 3.2vw
          color: #666666;
          letter-spacing: 0.3px;
          no-wrap()
</style>
