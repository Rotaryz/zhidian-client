<template>
  <div class="big-mine" :style="{paddingTop: pageHeadH + 'px'}">
    <head-item :title="title" :showArrow="false"></head-item>
    <back-shop v-if="!mineShop && hasShop" :shopName="shopName"></back-shop>
    <div class="mine">
      <!--<div class="back-box" @click="backShop" v-if="!mineShop && hasShop">-->
        <!--<img class="back-icon" v-if="imageUrl" :src="imageUrl + '/zd-image/1.2/icon-shop_my@2x.png'">-->
        <!--<div class="back-txt">返回店铺</div>-->
      <!--</div>-->
      <div class="mine-msg">
        <img v-if="userInfo.avatar" class="mine-header" mode="aspectFill" :src="userInfo.avatar">
        <p class="mine-name">{{userInfo.nickname}}</p>
      </div>
      <div class="order-tab">
        <navigator :url="'/pages/order-list?status=' + item.status" hover-class="none" class="order-tab-item" v-for="(item, index) in order" :key="index">
          <img v-if="imageUrl" :src="imageUrl + item.image" class="order-tab-icon">
          <p class="order-tab-title">{{item.title}}</p>
        </navigator>
      </div>
      <div class="manager-list">
        <navigator hover-class="none" :url="item.url" class="manager-item" v-for="(item, index) in manager" :key="index">
          <img v-if="imageUrl" :src="imageUrl + item.image" class="manager-image">
          <p class="manager-image-title">{{item.title}}</p>
          <div class="mine-serve-avatar-box" v-if="index === manager.length - 1">
            <div class="mine-serve-avatarBox-item" v-for="(items, idx) in shopList" :key="idx">
              <img v-if="items.image_url" class="mine-serve-avatarBox-img" :src="items.image_url" mode="aspectFill">
            </div>
            <span class="shop-num">{{length}}家</span>
          </div>
          <img v-if="imageUrl" :src="imageUrl + '/zd-image/mine/icon-pressed@2x.png'" class="way">
        </navigator>
        <!--<button class="manager-item" v-if="!hasShop" open-type="contact" :session-from="'open_service,' + shopId" :send-message-img="imageUrl + '/zd-image/mine/pic-openshop@2x.png'" send-message-title="点击下方消息开店" show-message-card="true">-->
          <!--<img :src="imageUrl + '/zd-image/mine/icon-openshop@2x.png'" class="manager-image" v-if="imageUrl">-->
          <!--<p class="manager-image-title">我要开店</p>-->
          <!--<img :src="imageUrl + '/zd-image/mine/icon-pressed@2x.png'" class="way" v-if="imageUrl">-->
        <!--</button>-->
      </div>
      <frozen ref="frozen"></frozen>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import { Order, Guide } from 'api'
  import { mapActions } from 'vuex'
  import BackShop from 'components/back-shop/back-shop'
  import HeadItem from 'components/head-item/head-item'
  import Frozen from 'components/frozen/frozen'

  const ORDER = [
    { title: '待付款', status: 'payment', image: '/zd-image/1.5/icon-obligation@2x.png' },
    { title: '待成团', status: 'waiting_groupon', image: '/zd-image/1.5/icon-staygroup@2x.png' },
    { title: '待使用', status: 'waiting_received', image: '/zd-image/1.5/icon-used@2x.png' },
    { title: '全部订单', status: '', image: '/zd-image/1.5/icon-alloeder@2x.png' }]
  const MANAGER = [
    { title: '奖品券', url: '/pages/exchange-coupon', image: '/zd-image/1.5/icon-coupon_prize@2x.png' },
    { title: '优惠券', url: '/pages/mine-coupon', image: '/zd-image/1.5/icon-coupon_my@2x.png' },
    { title: '砍价活动', url: '/pages/mine-bargain', image: '/zd-image/1.5/icon-sale@2x.png' },
    { title: '浏览过的店铺', url: '/pages/browse-shop', image: '/zd-image/mine/icon-shop_my@2x.png' }]

  export default {
    data() {
      return {
        order: ORDER,
        manager: MANAGER,
        imageUrl: this.$imageUrl,
        length: 1,
        shopList: [],
        userInfo: {},
        shopId: '',
        mineShop: false, // 是我的店
        hasShop: false, // 有店铺
        shopName: '',
        title: '我的',
        isFirstLoad: true // 是否是第一次加载，第一次则loading
      }
    },
    onHide() {
      this.$refs.frozen.close()
    },
    async onShow() {
      this.$showForzen()
      this.$checkIsMyShop(() => {
        this.hasShop = this.$hasShop()
        this.mineShop = this.$isMyShop()
      })
      this.userInfo = wx.getStorageSync('userInfo')
      this.shopId = wx.getStorageSync('shopId')
      this._getBrowserList(this.isFirstLoad)
      if (this.isFirstLoad) {
        this.isFirstLoad = false
      }
      await this._getShopInfo({}, false)
    },
    methods: {
      ...mapActions(['setBrowseList']),
      backShop() {
        let userInfoExtend = wx.getStorageSync('userInfoExtend')
        this.$turnShop({ id: userInfoExtend.shop_id, url: '/pages/guide' })
      },
      _getBrowserList(loading = true) {
        Order.summary(loading).then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            this.length = res.data.total
            this.shopList = res.data.list
          } else {
            this.$showToast(res.message)
          }
        })
      },
      async _getShopInfo(location, loading) {
        try {
          let res = await Guide.getShopInfo(location, loading)
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          this.shopInfo = res.data || {}
          this.shopName = this.shopInfo.name
        } catch (e) {
          console.error(e)
        }
      }
    },
    components: {
      BackShop,
      HeadItem,
      Frozen
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .mine
    font-family: $font-family-regular
    padding: 0px 14px 0
    box-sizing: border-box
    position: relative
    .back-box
      position: absolute
      right: 0
      top: 36px
      font-family: $font-family-regular
      background-image: linear-gradient(90deg, #FE7754 0%, #ED2B2B 100%)
      border-radius: 100px 0 0 100px
      layout(row, block, nowrap)
      align-items: center
      font-size: 0
      width: 97px
      height: 32px
      .back-icon
        width: 17px
        height: 15px
        margin-left: 11px
      .back-txt
        font-size: $font-size-14
        color: $color-white
        margin-left: 6px
        line-height: 14px
    .mine-msg
      padding-top: 15.5px
      display: flex
      align-items: center
      .mine-header
        background: $color-background
        border-radius: 50%
        height: 75px
        width: 75px
      .mine-name
        letter-spacing: 0.9px
        margin-left: 15px
        color: $color-1F1F1F
        font-size: $font-size-18
        font-family: $font-family-medium
        word-break: break-all
        flex: 1
        margin-right: 85px
    .order-tab
      margin-top: 23.5px
      box-sizing: border-box
      justify-content: space-between
      padding: 0 9.33vw
      height: 95px
      display: flex
      border-1px(rgba(153, 160, 170, 0.10), 6px)
      box-shadow: 0 5px 12px 0 rgba(0, 0, 0, 0.10)
      border-radius: 6px
      .order-tab-item
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        .order-tab-icon
          height: 25px
          width: @height
          margin-bottom: 8.5px
        .order-tab-title
          font-size: $font-size-12
          color: $color-6E6E6E
    .manager-list
      margin-top: 20px
      .manager-item
        height: 56px
        display: flex
        position: relative
        align-items: center
        background: $color-white
        padding: 0
        &:after
          border: none
        .manager-image
          height: 18px
          width: 18px
        .way
          position: absolute
          col-center()
          right: 0px
          width: 7.5px
          height: 12.5px
        .manager-image-title
          margin-left: 15.5px
          color: $color-1F1F1F
          letter-spacing: 0.8px
          font-size: $font-size-16
        .mine-serve-avatar-box
          position: absolute
          right: 4px
          display: flex
          margin-right: 10.5px
          align-items: center
          height: 100%
        .shop-num
          font-size: $font-size-14
          margin-left: 16px
          color: $color-99A0AA
          line-height: 1
        .mine-serve-avatarBox-item
          width: 25px
          height: 25px
          box-sizing: border-box
          border-radius: 50%
          margin-right: -11px
          .mine-serve-avatarBox-img
            width: 25px
            height: 25px
            border: 1.5px solid $color-FFFFFF
            border-radius: 50%
            position: relative
            box-sizing: border-box
            .bargain-circle-box
              position: absolute
              all-center()
              display: flex
              align-items: center
              justify-content: center
              width: 100%
              .bargain-circle
                display: inline-block
                background: #B6B6B6
                border-radius: 100%
                height: 2px
                width: 2px
                margin: 0 0.7px

</style>
