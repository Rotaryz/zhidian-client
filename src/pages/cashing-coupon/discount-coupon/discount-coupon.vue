<template>
  <div class="discount-coupon">
    <div class="coupon-bg">
      <img class="coupon-bg-img" v-if="imageUrl" :src="imageUrl + '/zd-image/ai-2.1/pic-couponlq@2x.png'" alt="">
    </div>
    <div class="wrapper">
      <section class="left">
        <div class="money-wrapper">
          <p v-if="dataInfo.coupon_type === 3" class="unit">¥</p>
          <p class="number">{{dataInfo.denomination}}</p>
          <p v-if="dataInfo.coupon_type === 4" class="unit">折</p>
        </div>
        <div v-if="dataInfo.condition" class="explain">满{{dataInfo.condition}}元可用</div>
      </section>
      <ul class="right" :style="{flex: rightFlex}">
        <li class="title">{{dataInfo.coupon_name}}</li>
        <li class="date">{{dataInfo.range_type === 0? '全商品可用' : '指定商品可用'}}</li>
        <li class="date">有效期{{dataInfo.start_at}}至{{dataInfo.end_at}}</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'DISCOUNT_COUPON'
  export default {
    name: COMPONENT_NAME,
    props: {
      dataInfo: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        // bgImage: `url("${baseURL.image}/zd-image/ai-2.1/pic-couponlq@2x.png")`,
        // rightFlex: 2.3,
        // paddingTop: 85 / 315
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .coupon-bg
    fill-box(absolute)
    .coupon-bg-img
      width :100%
      height :100%

  .discount-coupon
    width: 100%
    height :0
    position :relative
    padding-top :26.984126984126984%
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
        flex: 2.3
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
