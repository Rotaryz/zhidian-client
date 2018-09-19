<template>
  <div class="detail-container">
    <div class="f4-line"></div>
    <div class="store-container">
      <div class="detail-title border-bottom-1px">门店信息</div>
      <div class="store-detail">
        <div class="store-left">
          <div class="store-title">{{goodsDetail.shop_data ? goodsDetail.shop_data.name : ''}}</div>
          <div class="store-sub-title">距你340m，步行需要9分钟</div>
        </div>
        <div class="store-right">
          <div class="right-icon-box" @click="showLocation">
            <img :src="imageUrl + '/zd-image/mine/icon-maps@2x.png'" v-if="imageUrl" class="right-icon">
          </div>
          <div class="meddle-line"></div>
          <div class="right-icon-box" @click="callShop">
            <img :src="imageUrl + '/zd-image/mine/icon-tel@2x.png'" v-if="imageUrl" class="right-icon">
          </div>
        </div>
      </div>
    </div>
    <div class="f4-line"></div>
    <div class="store-container">
      <div class="detail-title border-bottom-1px">服务套餐</div>
      <div class="service-detail" v-if="goodsDetail.detail_config && goodsDetail.detail_config.length">
        <div class="service-content border-bottom-1px">
          <div class="service-item" v-for="(item, index) in goodsDetail.detail_config" :key="index">
            <span class="item-left">{{item.servie}}</span>
            <span class="item-right">
              <span>{{item.number}}次</span>
              <span>¥ {{item.price}}</span>
            </span>
          </div>
        </div>
        <div class="img-content">
          <img :src="item.image ? item.image.url : ''" class="img-item" mode="widthFix" v-for="(item, index) in goodsDetail.goods_images" :key="index">
        </div>
      </div>
    </div>
    <div class="f4-line"></div>
    <div class="store-container">
      <div class="detail-title border-bottom-1px">购买须知</div>
      <div class="know-detail">
        <div class="know-item">
          <div class="know-title">有效期</div>
          <div class="know-down">{{goodsDetail.start_at}} 至 {{goodsDetail.end_at}}</div>
        </div>
        <div class="know-item">
          <div class="know-title">预约信息</div>
          <div class="know-down">请提前2小时预约</div>
        </div>
        <div class="know-item">
          <div class="know-title">温馨提示</div>
          <div class="know-down">如需团购发票，请您在消费时向商家咨询</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['goodsDetail'],
    data () {
      return {
        imageUrl: this.$imageUrl
      }
    },
    methods: {
      showLocation() {
        let data = {
          longitude: this.goodsDetail.shop_data.longitude,
          latitude: this.goodsDetail.shop_data.latitude,
          address: this.goodsDetail.shop_data.shop_data,
          name: this.goodsDetail.shop_data.name
        }
        wx.openLocation(data)
      },
      callShop() {
        wx.makePhoneCall({
          phoneNumber: this.goodsDetail.shop_data.telephone
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  @import "~common/stylus/base"
  .detail-container
    width: 100vw
    background: $color-white
    .f4-line
      width: 100%
      height: 10px
      background: $color-F4F5F7
    .detail-title
      line-height: 50px
      font-size: $font-size-16
      color: $color-1F1F1F
      font-family: $font-family-medium
      letter-spacing: 0.8px
    .store-container
      padding-left: 15px
      .store-detail
        height: 70px
        display: flex
        justify-content: space-between
        align-items: center
        .store-left
          flex: 1
          overflow: hidden
          .store-title
            font-family: $font-family-regular
            color: $color-1F1F1F
            font-size: $font-size-14
            width: 100%
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
            margin-bottom: 6px
          .store-sub-title
            font-family: $font-family-regular
            color: $color-99A0AA
            font-size: $font-size-12
            width: 100%
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
        .store-right
          display: flex
          align-items: center
          height: 32px
          .right-icon-box
            width: 52px
            height: 32px
            display: flex
            align-items: center
            justify-content: center
            .right-icon
              width: 22px
              height: 22px
          .meddle-line
            width: 1px
            height: 19px
            background: rgba(153,160,170,0.3)

      .service-detail
        padding-right: 15px
        .service-content
          padding: 10px 0
          .service-item
            height: 32px
            display: flex
            align-items: center
            font-family: $font-family-regular
            font-size: 14px
            color: $color-1F1F1F
            .item-left
              flex: 1
            .item-right
              flex: 1
              display: flex
              justify-content: space-between
        .img-content
          padding: 10px 0
          font-size: 0
          .img-item
            margin-bottom: 10px
            width: 100%
      .know-detail
        padding: 20px 15px 20px 0
        .know-item
          margin-bottom: 15px
          .know-title
            font-family: $font-family-regular
            font-size: $font-size-14
            coloe: $color-6E6E6E
            letter-spacing: 0.6px
            margin-bottom: 10px
          .know-down
            font-family: $font-family-regular
            font-size: $font-size-14
            color: $color-black
            display: flex
            align-items: center
            &:before
              content: ''
              display: block
              width: 2px
              height: 2px
              border-radius: 50%
              background: $color-black
              margin-right: 8px
              margin-left: 2px


</style>
