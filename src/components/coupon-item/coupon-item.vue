<template>
    <div class="coupon-item">
      <img v-if="imageUrl" :src="imageUrl + '/zd-image/mine/pic-coupon@2x.png'" class="coupon-bg">
      <div class="coupon-box">
        <div class="coupon-left">
          <img  :src="couponInfo.imgUrl" class="coupon-img" :class="{'coupon-unused' : coupontype * 1 === 1}"  mode="aspectFill">
          <div class="coupon-info">
            <div class="title" :class="{'color-unused' : coupontype * 1 === 1}">{{couponInfo.title}}</div>
            <div class="end-tiem" :class="{'color-unused' : coupontype * 1 === 1}">有效期至{{couponInfo.time}}</div>
          </div>
        </div>
        <div class="coupon-right" v-if="coupontype * 1 === 0">
          <div class="coupon-btn">去使用</div>
        </div>
        <div class="coupon-right" v-if="coupontype * 1 === 1">
          <div class="coupon-used">已使用</div>
          <img v-if="imageUrl" :src="imageUrl + '/zd-image/mine/icon_overdue@2x.png'" class="ununsed-img" mode="aspectFill">
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  const DEFAULTDATA = {title: '国颐堂养发SPA馆瑶发堂洗发水', time: '2018-09-09', imgUrl: `https://img.jerryf.cn/defaults/zd-image/test-img/9@1x.png`}
  export default {
    name: 'coupon-item',
    props: {
      coupontype: {
        type: Number,
        default: 0 // 未使用: 0 不可用: 1
      },
      couponInfo: {
        type: Object,
        default: DEFAULTDATA
      }
    },
    data() {
      return {
        status: 0
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .coupon-item
    position: relative
    width: 100%
    height: 0
    padding-bottom: 31%
    margin-bottom: 8.5px
    .coupon-bg
      position: absolute
      width: 100%
      height: 100%
      display: block
      z-index: 2
    .coupon-box
      position: absolute
      width: 100%
      height: 100%
      z-index: 3
      layout(row)
      padding: 0 1.3%
      align-items: center
      box-sizing: border-box
      .coupon-left
        width: 74%
        height: 100%
        layout(row)
        align-items: center
        padding: 0 15px
        box-sizing: border-box
        overflow: hidden
        .coupon-img
          width: 74px
          height: 74px
          border-radius: 2px
          margin-right: 15px
        .coupon-unused
          opacity: 0.5
        .coupon-info
          flex: 1
          layout()
          height: 74px
          overflow: hidden
          justify-content: space-between
          .title
            font-family: $font-family-regular
            color: $color-1F1F1F
            font-size: $font-size-14
            word-wrap:break-word
            text-overflow: -o-ellipsis-lastline
            overflow: hidden
            text-overflow: ellipsis
            display: -webkit-box
            width: 100%
            -webkit-line-clamp: 2
            -webkit-box-orient: vertical
          .end-tiem
            font-family: $font-family-regular
            color: $color-99A0AA
            font-size: $font-size-12
          .color-unused
            color: $color-B1B1B1
      .coupon-right
        width: 26%
        position: relative
        height: 100%
        layout(row)
        .coupon-btn
          normal-button-style(normal, 60px, 24px, 12px, $font-size-12)
          all-center()
        .ununsed-img
          width: 67px
          height: 67px
          all-center()
        .coupon-used
          width: 60px
          height: 24px
          font-size: $font-size-12
          text-align: center
          line-height: 24px
          color: $color-D2D2D2
          border-1px($color-D2D2D2, 12px)
          all-center()
  .z
    width: 11px
</style>
