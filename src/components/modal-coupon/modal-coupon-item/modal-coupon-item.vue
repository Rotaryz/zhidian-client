<template>
  <div class="modal-coupon-item">
    <div class="coupon-bg">
      <img class="coupon-bg-img" v-if="imageUrl" :src="imageUrl + '/zd-image/ai-2.1/pic-coupon_bg@2x.png'" alt="">
    </div>
    <div class="wrapper">
      <section class="left">
        <div class="money-wrapper">
          <p v-if="dataInfo.type === 3" class="unit">¥</p>
          <p class="number">{{dataInfo.denomination}}</p>
          <p v-if="dataInfo.type === 4" class="unit">折</p>
        </div>
        <div v-if="dataInfo.condition" class="explain">满{{dataInfo.condition}}元可用</div>
      </section>
      <ul class="right">
        <li class="title">{{dataInfo.name}}</li>
        <li class="date">{{dataInfo.range_type === 0? '全商品可用' : '指定商品可用'}}</li>
        <li class="date">有效期{{dataInfo.start_at}}至{{dataInfo.end_at}}</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'MODAL_COUPON_ITEM'

  export default {
    name: COMPONENT_NAME,
    props: {
      dataInfo: {
        type: Object,
        default: () => {}
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

  .modal-coupon-item
    width: 100%
    height :0
    padding-top :28.879310344827587%
    position :relative
    z-index :2
    .wrapper
      fill-box(absolute)
      layout(row,block,nowrap)
      .left
        flex:1
        overflow :hidden
        layout(column,block,nowrap)
        justify-content :center
        align-items :center
        color: #fff;
        .explain
          font-family: $font-family-regular
          font-size: 10px;
        .money-wrapper
          display :flex
          overflow :hidden
          align-items :flex-end
          font-family: DINAlternate-Bold;
          .unit
            font-size: 12px;
            position :relative
            bottom :6px
          .number
            margin :0 1px
            font-size: 26px;
      .right
        flex: 2.15
        overflow :hidden
        padding :8px
        layout(column,block,nowrap)
        justify-content :space-around
        color: #fff;
        text-align :left
        .title
          font-family: $font-family-medium
          font-size: 15px;
          no-wrap()
        .date
          opacity: 0.7;
          font-family: $font-family-regular
          font-size: 10px;
          letter-spacing: 0.3px;
          no-wrap()
</style>
