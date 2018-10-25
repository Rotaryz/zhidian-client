<template>
  <div class="order-list" :class="{'order-none': showNone}">
    <div class="order-box border-bottom-1px" v-if="!status">
      <div class="order-tab" hover-class="none" v-for="(item, index) in order" :key="index">
        <p class="order-tab-item" @click="_goOrderTab(item)">{{item.title}}</p>
        <div class="active"></div>
      </div>
    </div>
    <div class="order-item" @click="_goDetail(item.id)" v-for="(item, index) in orderList" :key="index">
      <div class="order-shop" @click.stop="_goShop(item)">
        <img v-if="imageUrl" :src="imageUrl + '/zd-image/mine/icon-shop_order@2x.png'" class="home">
        <p class="order-name">
          {{item.shop_data.name}}
          <img v-if="imageUrl" :src="imageUrl + '/zd-image/mine/icon-pressed@2x.png'" class="way">
        </p>
        <p class="order-status">{{item.status_str}}</p>
      </div>
      <div class="order-msg" v-for="(items, idx) in item.order_details" :key="idx">
        <img :src="items.goods_image_url" mode="aspectFill" class="order-pic">
        <div class="shop-content">
          <p class="shop-name">{{items.goods_title}}</p>
          <p class="money">总计：<span class="price">¥{{item.total}}</span></p>
        </div>
      </div>
      <div class="order-status">
        <div class="order-type">{{item.order_type}}</div>
        <div class="btn" @click.stop="_goUse(item)">{{manager[item.status]}}</div>
      </div>
    </div>
    <div class="block" v-if="!showNone"></div>
    <panel-end v-if="showEnd"></panel-end>
    <Blank v-if="showNone"></Blank>
  </div>
</template>

<script>
  import { Order } from 'api'
  import PanelEnd from 'components/panel-end/panel-end'
  import Blank from 'components/blank/blank'
  import {mapActions} from 'vuex'

  const ORDER = [ { title: '全部订单', status: '' }, { title: '待付款', status: 'payment' }, { title: '待成团', status: 'waiting_groupon' }, { title: '待使用', status: 'waiting_use' }, { title: '已退款', status: 'refund' } ]
  const MANAGER = { payment: '付款', waiting_received: '去使用', finish: '查看订单', close: '查看订单', refund: '退款进度', waiting_groupon: '拼团详情', success_groupon: '去使用', fail_groupon: '退款进度' }
  export default {
    name: 'order-list',
    data() {
      return {
        orderList: [],
        page: 1,
        status: '',
        length: 0,
        manager: MANAGER,
        showNone: false,
        order: ORDER
      }
    },
    computed: {
      showEnd() {
        return this.orderList.length > 0 && (this.length === this.orderList.length || this.orderList.length < 15)
      }
    },
    async onLoad(option) {
      this.status = option.status || ''
      await this._getOrderList()
    },
    async onReachBottom() {
      this.page++
      if (this.length === this.orderList.length) {
        return
      }
      await this._getOrderList()
    },
    methods: {
      ...mapActions([
        'setShowType'
      ]),
      _goDetail(id) {
        wx.navigateTo({
          url: `/pages/order-detail?id=${id}`
        })
      },
      async _goShop(item) {
        //  跳转店铺首页，切店
        await this.$turnShop({ id: item.shop_id, url: '/pages/guide' })
      },
      async _goUse(item) {
        let status = item.status
        switch (status) {
          case 'payment': // 付款
            let res = await Order.payOrder({ pay_method_id: 1, order_id: item.id })
            // 支付
            this.$wechat.hideLoading()
            console.log(res)
            if (res.error !== this.$ERR_OK) {
              this.$showToast(res.message)
              return
            }
            let payRes = res.data
            const { timestamp, nonceStr, signType, paySign } = payRes
            this.setShowType(true)
            wx.requestPayment({
              timeStamp: timestamp,
              nonceStr,
              package: payRes.package,
              signType,
              paySign,
              success: async () => {
                this.$wechat.showLoading()
                setTimeout(async () => {
                  this.$wechat.hideLoading()
                  this.page = 1
                  await this._getOrderList()
                }, 2000)
              },
              fail() {
              }
            })
            break
          case 'waiting_groupon': // 拼团详情
            await this.$turnShop({ id: item.shop_id, url: `/pages/group-detail?groupId=${item.groupon_data.group_id}` })
            break
          case 'fail_groupon': // 退款详情
          case 'refund':
            wx.navigateTo({
              url: `/pages/order-refund?id=${item.id}`
            })
            break
          default: // 跳转订单详情
            wx.navigateTo({
              url: `/pages/order-detail?id=${item.id}`
            })
            break
        }
      },
      async _goOrderTab(item) {
        // console.log(this.orderList)
        let status = item.status
        let res = await Order.customerOrder({ limit: 10, page: 1, status: status })
        console.log(res)
        this.orderList = res.data
      },
      async _getOrderList() {
        let res = await Order.customerOrder({ limit: 10, page: this.page, status: this.status })
        if (res.error !== this.$ERR_OK) {
          this.$showToast(res.message)
          this.$wechat.hideLoading()
          return
        }
        this.length = res.meta.total
        if (this.page === 1) {
          this.orderList = res.data
          this.showNone = !this.orderList.length
        } else {
          this.orderList = this.orderList.concat(res.data)
        }
        this.$wechat.hideLoading()
      }
    },
    components: {
      PanelEnd,
      Blank
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .order-list
    word-break: break-all
    min-height: 100vh
    background: $color-background
    box-sizing: border-box
    font-family: $font-family-regular
    .order-box
      box-sizing: border-box
      display: flex
      background: $color-FFFFFF
      height: 40px
      justify-content: space-between
      padding: 0 25px
      .order-tab
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        .active
          height:3px
        .order-tab-item
          font-family: $font-family-regular
          font-size: $font-size-14
          color: $color-1F1F1F
          letter-spacing: 0.52px
    .block
      height: 15px
      background: $color-background
    .order-item
      width: 92vw
      box-sizing: border-box
      padding: 0px 10px 8px
      margin: 15px auto 0
      height: 195px
      background: $color-FFFFFF
      box-shadow: 0 0 10px 0 rgba(141, 151, 158, 0.20)
      border-radius: 6px
      &:first-child
        margin-top: 0
      .order-shop
        display: flex
        position: relative
        height: 45px
        align-items: center
        .home
          width: 18px
          height: 18px
        .order-name
          min-height: $font-size-16
          font-family: $font-family-medium
          font-size: $font-size-16
          color: $color-1F1F1F
          margin-left: 5px
          position: relative
          padding-right: 15.5px
          max-width: 65%
          no-wrap()
          .way
            col-center()
            right: 0
            width: 5.5px
            height: 10.5px
        .order-status
          color: $color-D32F2F
          font-size: $font-size-14
          col-center()
          right: 0
      .order-msg
        display: flex
        padding: 15px 0 16px
        border-bottom-1px(#e0e0e0, dashed)
        border-top-1px(#e0e0e0, dashed)
        .order-pic
          height: 75px
          width: 75px
          padding-right: 10px
        .shop-content
          display: flex
          flex-direction: column
          justify-content: space-between
        .shop-name
          margin-top: -5px
          width: 60vw
          font-size: $font-size-16
          line-height: 21px
          font-family: $font-family-regular
          color: $color-1F1F1F
          no-wrap-plus(2)
        .money
          font-family: $font-family-regular
          line-height: 1
          color: $color-1F1F1F
          font-size: $font-size-14
          .price
            font-family: $font-family-medium

      .order-status
        align-items: center
        justify-content: space-between
        height: 44px
        display: flex
        .order-type
          font-size: $font-size-14
          color: $color-1F1F1F
        .btn
          manager-button-style()

  .order-none
    background: $color-white
</style>
