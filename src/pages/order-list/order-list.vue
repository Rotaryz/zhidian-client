<template>
  <div class="order-list" :class="{'order-none': showNone,'add-padding': !status}" :style="{paddingTop: !status ? (pageHeadH * 1 + 40) + 'px' : pageHeadH + 'px'}">
    <head-item :title="title" :showArrow="true" pageType="orderList" @cancelMenu="cancelMenu" @showMenu="showMenu" :menuShow="menuShow"></head-item>
    <div class="order-box border-bottom-1px" v-if="!status" :style="{top: pageHeadH + 'px'}">
      <div class="order-tab" hover-class="none" v-for="(item, index) in order" :key="index" @click="_goOrderTab(item,index)">
        <div class="order-tab-item" :class="selectTab * 1 === index * 1 ? 'active-font' : ''">{{item.title}}</div>
      </div>
      <div class="order-active">
        <div class="move" :style="'transform: translateX(' + selectTab * 100 + '%)'">
          <div class="move-box"></div>
        </div>
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
        <img :src="items.image_url_thumb" mode="aspectFill" class="order-pic">
        <div class="shop-content">
          <p class="shop-name">{{items.goods_title}}</p>
          <p class="money">总计：<span class="price">¥{{item.total}}</span></p>
        </div>
      </div>
      <div class="order-status">
        <div class="order-type">{{item.order_type}}</div>
        <div class="btn" @click.stop="_goUse(item)" :class="{'btn-disable' : item.status === 'success_groupon' && item.coupon_status}">{{item.status === 'success_groupon' ? item.coupon_status ? '已使用' : '未使用' : manager[item.status]}}</div>
      </div>
    </div>
    <div class="block" v-if="!showNone"></div>
    <panel-end v-if="showEnd"></panel-end>
    <Blank v-if="showNone"></Blank>
    <div class="model">
      <transition name="fade">
        <div class="bg" v-if="menuShow" @click="cancelMenu"></div>
      </transition>
      <div class="box" :class="{'show': menuShow}">
        <p class="item border-bottom-1px" @click="selectType('service')">服务订单</p>
        <p class="item" @click="selectType('goods')">商品订单</p>
        <p class="item cancel" @click="cancelMenu">取消</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { Order } from 'api'
  import PanelEnd from 'components/panel-end/panel-end'
  import HeadItem from 'components/head-item/head-item'
  import Blank from 'components/blank/blank'
  import {mapActions} from 'vuex'

  const ORDER = [ { title: '全部', status: '' }, { title: '待付款', status: 'payment' }, { title: '待成团', status: 'waiting_groupon' }, { title: '待使用', status: 'waiting_received' }, { title: '已退款', status: 'refund' } ]
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
        order: ORDER,
        selectTab: '0',
        title: '服务订单',
        menuShow: false,
        listType: 'service',
        noSelect: false,
        tabStatus: ''
      }
    },
    computed: {
      showEnd() {
        return this.orderList.length > 0 && (this.length === this.orderList.length || this.orderList.length < 15)
      },
      orderKind() { // 1实体商品，2虚拟，3服务
        return this.listType === 'service' ? 3 : 1
      }
    },
    async onLoad(option, item, index) {
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
            let res = await Order.payOrder({ pay_method_id: 1, order_id: item.id, order_kind: this.orderKind })
            // 支付
            this.$wechat.hideLoading()
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
      async _goOrderTab(item, index) {
        let status = item.status
        this.tabStatus = item.status
        this.selectTab = index
        let res = await Order.customerOrder({ limit: 10, page: 1, status: status, order_kind: this.orderKind })
        if (res.error !== this.$ERR_OK) {
          this.$showToast(res.message)
          this.$wechat.hideLoading()
          return
        }
        this.$wechat.pageScrollTo()
        this.length = res.meta.total
        this.page = res.meta.current_page
        if (this.page === 1) {
          this.orderList = res.data
          this.showNone = !this.orderList.length
        } else {
          this.orderList = this.orderList.concat(res.data)
        }
        this.$wechat.hideLoading()
      },
      async _getOrderList() {
        let data = {
          limit: 10,
          page: this.page,
          status: this.status || this.tabStatus,
          order_kind: this.orderKind
        }
        let res = await Order.customerOrder(data)
        if (res.error !== this.$ERR_OK) {
          this.$showToast(res.message)
          this.$wechat.hideLoading()
          return
        }
        this.length = res.meta.total
        this.page = res.meta.current_page
        if (this.page === 1) {
          this.orderList = res.data
          this.showNone = !this.orderList.length
        } else {
          this.orderList = this.orderList.concat(res.data)
        }
        this.$wechat.hideLoading()
      },
      showMenu() {
        this.menuShow = true
      },
      cancelMenu() {
        this.menuShow = false
      },
      selectType(type) {
        if (this.noSelect) return
        this.noSelect = true
        setTimeout(() => {
          this.noSelect = false
        }, 500)
        this.listType = type
        this.title = type === 'service' ? '服务订单' : '商品订单'
        this._getOrderList()
        this.cancelMenu()
      }
    },
    components: {
      PanelEnd,
      Blank,
      HeadItem
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
    position: relative
    &.add-padding
      padding-top: 104px
    .order-box
      box-sizing: border-box
      display: flex
      background: $color-FFFFFF
      width: 100%
      height: 40px
      justify-content: space-between
      position: fixed
      left: 0
      z-index:10
      .order-tab
        height: 40px
        flex: 1
        text-align: center
        .order-tab-item
          width: 100%
          height: 100%
          font-family: $font-family-regular
          font-size: $font-size-14
          color: $color-1F1F1F
          letter-spacing: 0.52px
          line-height: 40px
          text-align: center
          transition: all 0.1s
        .active-font
          font-size: $font-size-16
      .order-active
        position: absolute
        bottom: 0
        left: 0
        width: 100%
        height: 3px
        .move
          width: 20vw
          height: 100%
          transition: all 0.2s
          .move-box
            width: 30px
            height: 100%
            background: $color-ED2C2B
            margin: 0 auto
            border-radius: 3px
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
          color: $color-ED2C2B
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
          padding: 3px 0
        .shop-name
          margin-top: -5px
          width: 60vw
          font-size: $font-size-14
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
          &.btn-disable
            manager-button-style(un-click)


    .bg
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      background: rgba(0,0,0,0.8)
      z-index: 40
    .box
      position: fixed
      bottom: -200px
      left: 0
      font-size: 14px
      font-family: $font-family-regular
      color: $color-27273E
      width: 100%
      height: 175px
      line-height: 55px
      text-align: center
      background: #F6F6F6
      transition: all 0.3s
      z-index: 40
      .item
        background: $color-white
      .item:first-child
        border-bottom-1px(#E6E6E6)
      .cancel
        margin-top: 10px
    .show
      bottom: 0
  .order-none
    background: $color-white
</style>
