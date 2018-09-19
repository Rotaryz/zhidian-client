<template>
    <div class="exchange">
      <section class="tab-container">
        <div class="tab-box">
          <ul class="tab-wrapper">
            <li class="tab-item" v-for="(item, index) in tabList" :key="index" @click="changeTab(index)">{{item.title}}</li>
          </ul>
          <div class="tab-line-wrapper" :style="'transform: translate3d(' + selectTab*100 + '%,0,0)'">
            <div class="tab-line"></div>
          </div>
        </div>
      </section>
      <div class="used-box" v-if="selectTab * 1 === 0">
        <coupon-item></coupon-item>
      </div>
      <div class="used-box" v-if="selectTab * 1 === 1">
        <coupon-item :coupontype="1"></coupon-item>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import CouponItem from 'components/coupon-item/coupon-item'

  const tabList = [{title: '未使用'}, {title: '不可用'}]
  export default {
    name: 'exchange-coupon',
    data() {
      return {
        tabList,
        selectTab: 0
      }
    },
    methods: {
      changeTab(index) {
        if (this.selectTab === index) return
        this.selectTab = index
      }
    },
    components: {
      CouponItem
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .exchange
    min-height: 100vh
    background: $color-background
    padding: 65px 15px 15px
    box-sizing: border-box
  .tab-container
    height: 50px
    padding: 0 15px
    position: fixed
    line-height: 50px
    top: 0
    left: 0
    width: 100%
    z-index: 10
    box-sizing: border-box
    background: $color-FFFFFF
    .tab-box
      width: 100%
      height: 100%
      position: relative
      .tab-wrapper
        position: relative
        height: 100%
        width: 100%
        layout(row, block, nowrap)
        font-family: $font-family-medium
        font-size: $font-size-16
        color: $color-1F1F1F
        letter-spacing: 0.6px
        line-height: 1
        .tab-item
          flex: 1
          line-height: 47px
          text-align: center
      .tab-line-wrapper
        position: absolute
        width: 50%
        height: 3px
        transform: translate3d(0, 0, 0)
        transition: all 0.3s
        bottom: 0
        .tab-line
          margin: 0 auto
          height: 3px
          width: 65px
          background: $color-D32F2F
          border-radius: 3px
  .z
    width: 11px
</style>
