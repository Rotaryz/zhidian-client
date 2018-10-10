<template>
  <div class="order-detail">
    <div class="order-normal" v-if="detail">
      <!-- 商品信息-->
      <div class="order-box">
        <div class="order-shop" @click="_goShop()">
          <img v-if="imageUrl" :src="imageUrl + '/zd-image/mine/icon-shop_order@2x.png'" class="home">
          <p class="order-name" v-if="detail.shop_data">
            {{detail.shop_data.name}}
            <img v-if="imageUrl" :src="imageUrl + '/zd-image/mine/icon-pressed@2x.png'" class="way">
          </p>
        </div>
        <div class="order-msg" @click="_goCommodity()">
          <img :src="detail.goods_image_url" class="order-pic" mode="aspectFill">
          <div class="shop-content">
            <p class="shop-name">{{detail.goods_title}}</p>
            <p class="money">总计：<span class="price">¥{{detail.total}}</span></p>
          </div>
          <img v-if="imageUrl" :src="imageUrl + '/zd-image/mine/icon-pressed@2x.png'" class="way">
        </div>
      </div>
      <!-- 团购信息-->
      <div class="ground-status" v-if="groupDetail">
        <div class="ground-name">
          <div class="ground-text">拼团状态</div>
          <div class="ground-time-name">剩余时间:</div>
          <div class="ground-time" :class="groupDetail.group_status !== 0 || timeEnd ? 'time-down' : ''">{{groupDetail.group_status > 2 ? '00:00:00' : groupEndTime}}</div>
        </div>
        <div class="progress-success">
          <!--<span class="progress-item"></span>-->
          <div class="line-box">
            <div class="line" :class="{'line-active': groundNow - 1 > index}" v-for="(item, index) in groundStatus.length - 1" :key="index" :style="{width: (83.47 / (groundStatus.length - 1) + 'vw')}"></div>
          </div>
          <span class="progress-item progress-item-active" v-for="item in groundNow - 1" :key="item"></span>
          <img v-if="imageUrl" :key="item" :src="imageUrl + '/zd-image/mine/pic-progress@2x.png'" class="progress-icon">
          <span class="progress-item" v-for="item in groundStatus.length - groundNow" :key="item"></span>
        </div>
        <div class="progress-title">
          <span class="progress-title-item" :class="{'progress-title-item-active':  groundNow > index }" v-for="(item, index) in groundStatus" :key="index">{{item}}</span>
        </div>
      </div>
      <!--服务券码-->
      <div class="coupon" v-if="detail.coupon_details && detail.coupon_details.length">
        <div class="coupon-title">服务券码</div>
        <div class="coupon-item" v-for="(coupon, index) in detail.coupon_details" :key="index">
          <div class="coupon-left">
            <img v-if="imageUrl && coupon.status !== 0" :src="imageUrl + '/zd-image/mine/icon-coupon_used@2x.png'" mode="aspectFill" class="coupon-icon">
            <img v-if="imageUrl && coupon.status === 0" :src="imageUrl + '/zd-image/mine/icon-coupon@2x.png'" mode="aspectFill" class="coupon-icon">
            <p class="coupon-text">券{{index + 1}}:</p>
            <p class="coupon-sn">{{coupon.code}}</p>
          </div>
          <div class="coupon-btn" @click="_useCoupon(coupon)" :class="{'coupon-btn-disable' : coupon.status !== 0}">{{coupon.status === 0 ? '待使用' : coupon.status === 1 ? '已使用' : '已过期'}}</div>
        </div>
      </div>
      <!--订单详情-->
      <div class="order-msg-content">
        <div class="order-title">订单信息</div>
        <div class="order-item">订单编号 : <span class="msg-detail">{{detail.order_sn}}</span></div>
        <div class="order-item">手机号码 : <span class="msg-detail">{{detail.mobile}}</span></div>
        <div class="order-item order-last">下单时间 : <span class="msg-detail">{{detail.create_at}}</span></div>
        <div class="order-item order-first">购买数量 : <span class="msg-detail">{{detail.order_details ? detail.order_details[0].num : ''}}</span></div>
        <div class="order-item">购买价格 : <span class="msg-detail">{{detail.order_details ? detail.order_details[0].total : ''}}</span></div>
      </div>
      <!--按钮-->
      <div class="order-btn" v-if="detail.status === 'payment' || detail.status === 'waiting_groupon' || detail.status === 'success_groupon' || detail.status === 'fail_groupon'">
        <div class="btn" @click="_deal(item)">{{manager[detail.status]}}</div>
      </div>
    </div>
    <coupon-code ref="couponCode" :couponMsg.sync="couponDetail" @cancel="cancel"></coupon-code>
  </div>
</template>

<script>
  import { Order } from 'api'
  import CouponCode from 'components/coupon-code/coupon-code'

  const MANAGER = { payment: '去支付', waiting_groupon: '拼团详情', success_groupon: '拼团详情', fail_groupon: '拼团详情' }
  let timer = ''
  const GROUND_STATUS = ['拼团中', '拼团成功']
  const GROUND_END = ['拼团中', '拼团失败', '退款成功']
  export default {
    name: 'order-detail',
    data() {
      return {
        groundStatus: GROUND_STATUS,
        groundNow: 2,
        detail: null,
        manager: MANAGER,
        couponDetail: {},
        timeEnd: false,
        groupEndTime: '00:00:00',
        groupDetail: null
      }
    },
    async onShow() {
      let id = this.$root.$mp.page.options.id
      await this._orderDetail(id, true)
    },
    onUnload() {
      clearInterval(timer)
    },
    methods: {
      async cancel() {
        await this._orderDetail(this.detail.id, false)
        this.couponDetail = {}
      },
      _useCoupon(coupon) {
        if (coupon.status !== 0) {
          return
        }
        this.couponDetail = { name: this.detail.goods_title, goods_image: this.detail.goods_image_url, time: coupon.end_at, qrcode_url: coupon.qrcode_url, code: coupon.code }
        this.$refs.couponCode.show()
      },
      async _goShop() {
        //  跳转店铺首页，切店
        await this.$turnShop({ id: this.detail.shop_id, url: '/pages/guide' })
      },
      async _goCommodity() {
        let url
        switch (this.detail.order_type * 1) {
          case 1:
            url = `/pages/goods-detail?goodsId=${this.detail.attach.recommend_goods_id}`
            break
          case 4:
            url = `/pages/activity-detail?activityId=${this.detail.attach.recommend_activity_id}&activityType=group`
            break
          case 7:
            url = `/pages/activity-detail?activityId=${this.detail.attach.recommend_activity_id}&activityType=bargain`
            break
        }
        await this.$turnShop({ id: this.detail.shop_id, url })
        //  跳转商品详情，切店
      },
      async _deal() {
        switch (this.detail.status) {
          case 'payment':
            let res = await Order.payOrder({ pay_method_id: 1, order_id: this.detail.id })
            // 支付
            this.$wechat.hideLoading()
            if (res.error !== this.$ERR_OK) {
              this.$showToast(res.message)
              return
            }
            let payRes = res.data
            const { timestamp, nonceStr, signType, paySign } = payRes
            wx.requestPayment({
              timeStamp: timestamp,
              nonceStr,
              package: payRes.package,
              signType,
              paySign,
              success: async () => {
                this.$wechat.showLoading()
                setTimeout(async () => {
                  await this._orderDetail(this.detail.id, false)
                }, 2000)
              },
              fail() {
              }
            })
            break
          default:
            // wx.navigateTo({ url: `/pages/group-detail?groupId=${this.groupDetail.group_id}` })
            await this.$turnShop({ id: this.detail.shop_id, url: `/pages/group-detail?groupId=${this.groupDetail.group_id}` })
        }
      },
      async _orderDetail(id, loading) {
        let res = await Order.orderDetail(id, loading)
        if (res.error !== this.$ERR_OK) {
          this.$showToast(res.message)
          this.$wechat.hideLoading()
          return
        }
        this.detail = res.data
        this.groupDetail = this.detail.groupon_data.length === 0 ? null : this.detail.groupon_data
        if (this.groupDetail) {
          let status = this.groupDetail.group_status
          // 拼团状态
          this.groundNow = status + 1
          switch (status) {
            case 0:
              this.groundStatus = GROUND_STATUS
              break
            case 1:
              this.groundStatus = GROUND_STATUS
              break
            case 2:
              this.groundStatus = GROUND_END
              break
          }
          this._groupTimePlay()
        }
        this.$wechat.hideLoading()
      },
      _groupTimePlay() {
        clearInterval(timer)
        let res = this._groupTimeCheckout(this.groupDetail.group_end_timestamp, this.groupDetail.group_status)
        this.groupEndTime = `${res.hour}:${res.minute}:${res.second}`
        timer = setInterval(() => {
          let res = this._groupTimeCheckout(this.groupDetail.group_end_timestamp, this.groupDetail.group_status)
          this.groupEndTime = `${res.hour}:${res.minute}:${res.second}`
          if (this.timeEnd) {
            clearInterval(timer)
          }
        }, 1000)
      },
      // 引入时间戳（秒）换算出时间差
      _groupTimeCheckout(time, status) {
        let nowSecond = parseInt(Date.now() / 1000)
        let differ = time * 1 - nowSecond
        let hour = Math.floor(differ / (60 * 60))
        hour = hour >= 10 ? hour : '0' + hour
        let minute = Math.floor(differ / 60) - (hour * 60)
        minute = minute >= 10 ? minute : '0' + minute
        let second = Math.floor(differ) - (hour * 60 * 60) - (minute * 60)
        second = second >= 10 ? second : '0' + second
        let times
        if (differ > 0 && +status === 0) {
          times = {
            hour,
            minute,
            second
          }
        } else {
          times = {
            hour: '00',
            minute: '00',
            second: '00'
          }
          this.timeEnd = true
        }
        return times
      }
    },
    components: {
      CouponCode
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .order-detail
    min-height: 100vh
    padding-bottom: 60px
    box-sizing: border-box
    background: $color-background

  .order-normal
    /*店铺信息*/
    .order-box
      background: $color-white
      padding: 18px 15px 15px
      .order-shop
        display: flex
        position: relative
        padding-bottom: 20px
        align-items: center
        .home
          width: 18px
          height: 18px
        .order-name
          height: $font-size-16
          line-height: 1
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
      .order-msg
        display: flex
        position: relative
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
        .way
          col-center()
          right: 0
          width: 5.5px
          height: 10.5px
    /*团购状态*/
    .ground-status
      height: 122.5px
      box-sizing: border-box
      margin-top: 10px
      background: $color-white
      padding: 18px 15px 20px
      .ground-name
        display: flex
        align-items: center
        line-height: 1
        .ground-text
          letter-spacing: 0.6px
          color: $color-1F1F1F
          font-family: $font-family-medium
        .ground-time-name
          letter-spacing: 0.3px
          font-family: $font-family-regular
          font-size: $font-size-14
          color: $color-455A64
          margin-left: 10px
        .ground-time
          margin-left: 8px
          font-size: $font-size-14
          font-family: $font-family-regular
          color: $color-D32F2F
        .time-down
          color: $color-455A64
      .progress-success
        width: 88%
        display: flex
        margin-top: 27.5px
        margin-left: 15.5px
        position: relative
        justify-content: space-between
        align-items: center
        .progress-item
          height: 7.5px
          width: 7.5px
          border-radius: 50%
          background: $color-D2D2D2
          position: relative
          z-index: 2
        .progress-item-active
          background: $color-D32F2F
        .progress-icon
          position: relative
          z-index: 2
          height: 12px
          width: 12px
      .progress-title
        display: flex
        margin-top: 14px
        font-family: $font-family-regular
        color: $color-B1B1B1
        font-size: $font-size-14
        justify-content: space-between
        .progress-title-item-active
          color: $color-1F1F1F
      .line-box
        col-center()
        width: 100%
        height: 1px
        transform: scale(1, 0.5)
        display: flex
        .line
          background: $color-D2D2D2
        .line-active
          background: $color-D32F2F

    /*订单详情*/
    .order-msg-content
      padding: 15px 15px 0
      height: 270x
      box-sizing: border-box
      margin-top: 10px
      background: $color-FFFFFF
      color: $color-1F1F1F
      .order-title
        font-family: $font-family-medium
        font-size: $font-size-16
        margin-bottom: 20px
      .order-item
        font-size: $font-size-14
        font-family: $font-family-regular
        padding-bottom: 24px
        .msg-detail
          letter-spacing: 0.3px
          margin-left: 8px
          color: $color-000028
      .order-last
        padding-bottom: 17px
        border-bottom-1px(rgba(153, 160, 170, 0.3))
      .order-first
        padding-top: 17px
    /* 按钮*/
    .order-btn
      background: $color-white
      position: fixed
      bottom: 0
      left: 0
      width: 100vw
      height: 50px
      display: flex
      justify-content: flex-end
      padding: 0 15px
      box-sizing: border-box
      align-items: center
      .btn
        normal-button-style(normal, 92.5px, 32px, 16.25px)
    .coupon
      box-sizing: border-box
      padding: 18px 15px 15px
      background: $color-white
      margin-top: 10px
      .coupon-title
        font-family: $font-family-medium
        margin-bottom: 12px
        font-size: $font-size-16
      .coupon-item
        height: 45px
        display: flex
        align-items: center
        justify-content: space-between
        border-bottom-1px()
        &:last-child
          border-none()
        .coupon-left
          display: flex
          align-items: center
        .coupon-icon
          margin-right: 10px
          height: 15px
          width: 17px
        .coupon-text
          font-size: $font-size-14
          font-family: $font-family-regular
        .coupon-sn
          margin-left: 8px
          font-family: DINAlternate-Bold
          font-size: $font-size-16
        .coupon-btn
          share-button-style(nomal, 57px, 29px)
        .coupon-btn-disable
          share-button-style(un-click, 57px, 29px)

</style>
