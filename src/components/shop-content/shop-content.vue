<template>
  <div class="shop-content">
    <section class="tab-container">
      <ul class="tab-wrapper">
        <li class="tab-item" v-for="(item, index) in tabList" :key="index" @click="changeTab(index)">{{item.title}}</li>
      </ul>
      <div class="tab-line-wrapper" :style="'transform: translate3d(' + selectTab*100 + '%,0,0)'">
        <div class="tab-line"></div>
      </div>
    </section>
    <ul class="server-wrapper">
      <li class="coupon-item">
        <div class="logo"><img class="logo-pic" mode="aspectFill" :src="url" alt=""></div>
        <article class="detail">
          <div class="title">养发项目优惠券套餐</div>
          <div class="money">
            <div class="price">¥99</div>
            <span class="old-price">599元</span>
          </div>
        </article>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  const tabList = [{title: '服务项目'}, {title: '品牌故事'}]
  export default {
    data() {
      return {
        url: this.$parent.$imageUrl + `/zd-image/test-img/4@1x.png`,
        tabList,
        selectTab: 0,
        header: [1, 1, 1]
      }
    },
    created() {
    },
    methods: {
      changeTab(index) {
        if (this.selectTab === index) return
        this.selectTab = index
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .shop-content
    position: relative
    &:after
      content: ""
      position: absolute
      top: 33px
      right: 0
      width: 100%
      transform: scaleY(.5) translateZ(0)
      border-bottom: 1px solid $color-col-line
    .tab-container
      height: 30px
      margin: 0 15px
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
          text-align: center
      .tab-line-wrapper
        position: absolute
        width: 50%
        height: 3px
        transform: translate3d(0, 0, 0)
        transition: all 0.3s
        .tab-line
          margin: 0 auto
          height: 3px
          width: 65px
          background: $color-D32F2F
          border-radius: 3px
    .server-wrapper
      padding: 0 20px
      .coupon-item
        margin-top: 20px
        layout(row, block, nowrap)
        &:last-child
          margin-bottom: 37.5px
        .logo
          width: 76px
          height: 76px
          border-radius: 2px
          margin-right: 10px
          .logo-pic
            width: 100%
            height: 100%
        .detail
          flex: 1
          padding: 3px 0
          layout()
          justify-content: space-between
          .title
            font-size: $font-size-16
            color: $color-1F1F1F
            letter-spacing: 0.6px
          .money
            layout(row, block, nowrap)
            align-items: flex-end
            .price
              font-family: $font-family-bold
              font-size: 26px
              color: #000028
              &:first-letter
                font-size: $font-size-12
                margin-right: 3px
            .old-price
              margin: 0 7.5px
              font-size: 15px
              color: $color-99A0AA
              text-decoration: line-through
              vertical-align: bottom
</style>
