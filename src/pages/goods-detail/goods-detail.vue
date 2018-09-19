<template>
  <div class="goods-detail">
    <div class="banner-box">
      <swiper class="banner" @change="bannerChange">
        <block v-for="(item, index) in bannerImgs" :key="index">
          <swiper-item class="banner-item">
            <img :src="item.image.url" class="item-img" mode="aspectFill">
          </swiper-item>
        </block>
      </swiper>
      <span class="page-box"><text class="currentNum">{{currentNum}}</text>/{{bannerImgs.length}}</span>
    </div>
    <div class="goods-msg">
      <div class="goods-msg-left">
        <div class="goods-title">国颐堂皇室养发套餐</div>
        <div class="goods-money-box">
          <span class="big-money-box"><span class="red-money-icon">¥</span><span class="red-big-money">100</span></span>
          <span class="del-money">699元</span>
        </div>
      </div>
      <div class="goods-msg-right">
        <div class="right-box-container" @click="showShareModel">
          <span class="msg-right-txt">0人分享</span>
          <img :src="imageUrl + '/zd-image/mine/icon-share@2x.png'" v-if="imageUrl" class="msg-right-icon">
        </div>
      </div>
    </div>
    <detail-content ref="detailContent"></detail-content>
    <div class="pay-order-bottom border-top-1px">
      <div class="left-box">
        <div class="left-item">
          <img :src="imageUrl + '/zd-image/mine/icon-shop_xq@2x.png'" v-if="imageUrl" class="item-icon">
          <div class="item-txt">进店铺</div>
        </div>
        <div class="left-item">
          <img :src="imageUrl + '/zd-image/mine/icon-service@2x.png'" v-if="imageUrl" class="item-icon">
          <div class="item-txt">客服</div>
        </div>
      </div>
      <div class="right-box" @click="payOrderMsg">立即购买</div>
    </div>
    <payment ref="payment"></payment>
    <share ref="share"></share>
  </div>
</template>

<script type="text/ecmascript-6">
  import DetailContent from 'components/detail-content/detail-content'
  import Payment from 'components/payment/payment'
  import Share from 'components/share/share'
  export default {
    data() {
      return {
        imageUrl: this.$imageUrl,
        bannerImgs: [{image: {url: 'https://img.jerryf.cn/defaults/zd-image/test-img/5@1x.png'}},
          {image: {url: 'https://img.jerryf.cn/defaults/zd-image/test-img/5@1x.png'}},
          {image: {url: 'https://img.jerryf.cn/defaults/zd-image/test-img/5@1x.png'}}],
        currentNum: 1
      }
    },
    onLoad() {
    },
    methods: {
      test() {
        this.$showToast('askjdhakdhashd')
      },
      bannerChange(e) {
        this.currentNum = e.mp.detail.current * 1 + 1
      },
      showShareModel() {
        this.$refs.share.show()
      },
      payOrderMsg() {
        this.$refs.payment.showOrder()
      }
    },
    components: {
      DetailContent,
      Payment,
      Share
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .goods-detail
    background: $color-white
    padding-bottom: 70px
    .banner-box
      width: 100vw
      height: 75vw
      position: relative
      .banner
        width: 100vw
        height: 75vw
        .banner-item
          width: 100%
          height: 100%
          .item-img
            width: 100%
            height: 100%
            background: #ccc
      .page-box
        position: absolute
        right: 15px
        bottom: 10px
        padding: 2px 7px
        border-radius: 10px
        background: rgba(69,90,100,0.4)
        font-family: DINAlternate-Bold
        font-size: $font-size-12
        color: $color-white
        vertical-align: text-bottom
        .currentNum
          font-family: DINAlternate-Bold
          font-size: $font-size-16
          color: $color-white
    .goods-msg
      padding: 10px 15px
      background: $color-white
      display: flex
      justify-content: space-between
      .goods-msg-left
        flex: 1
        overflow: hidden
        .goods-title
          font-family: $font-family-medium
          color: $color-1F1F1F
          font-size: $font-size-16
          line-height: 21px
          letter-spacing: 0.6px
          overflow: hidden
          width: 100%
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-line-clamp: 2
          -webkit-box-orient: vertical
          margin-bottom: 10px
        .goods-money-box
          display: flex
          align-items: flex-end
          .big-money-box
            margin-right: 10px
            .red-money-icon
              font-family: $font-family-medium
              font-size: $font-size-14
              color: $color-D32F2F
              margin-right: 2px
              margin-bottom: 2px
            .red-big-money
              font-family: DINAlternate-Bold
              font-size: 28px
              color: $color-D32F2F
          .del-money
            text-decoration: line-through
            font-family: $font-family-regular
            color: $color-99A0AA
            font-size: $font-size-14
            margin-bottom: 2px
      .goods-msg-right
        width: 85px
        display: flex
        align-items: center
        justify-content: flex-end
        .right-box-container
          height: 36px
          display: flex
          align-items: center
          justify-content: flex-end
          font-size: 0
          .msg-right-txt
            font-family: $font-family-regular
            color: $color-99A0AA
            font-size: $font-size-14
            margin-right: 5px
          .msg-right-icon
            width: 16px
            height: 16px

    .pay-order-bottom
      width: 100vw
      height: 60px
      position: fixed
      left: 0
      bottom: 0
      z-index: 20
      background: $color-white
      display: flex
      align-items: center
      .left-box
        width: 110px
        display: flex
        align-items: center
        .left-item
          flex: 1
          display: flex
          font-size: 0
          height: 100%
          flex-direction: column
          align-items: center
          justify-content: center
          .item-icon
            width: 22px
            height: 22px
            margin-bottom: 4px
          .item-txt
            font-size: $font-size-10
            font-family: $font-family-regular
            color: $color-455A64
      .right-box
        flex: 1
        overflow: hidden
        margin-right: 10px
        height: 45px
        line-height: 44px
        font-size: $font-size-16
        font-family: $font-family-medium
        color: $color-white
        button-style(normal, 22.5px)
</style>
