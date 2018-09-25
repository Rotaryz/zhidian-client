<template>
  <div>
    <scroll-view scroll-y class="order-list">
      <div class="order-item" v-for="(item, index) in list" :key="index">
        <div class="order-shop">
          <p class="order-name">{{item.cut_time}}</p>
          <p class="order-status">倒计时:{{item.endTime ? item.endTime.day ? item.endTime.day + '天' : '' : ''}}{{item.endTime ? item.endTime.hour ? item.endTime.hour : '' : ''}}时{{item.endTime ? item.endTime.minute ? item.endTime.minute : '' : ''}}分{{item.endTime ? item.endTime.second ? item.endTime.second : '' : ''}}</p>
        </div>
        <div class="order-msg" @click="toDetail(item)">
          <img :src="item.image_url" mode="aspectFill" class="order-pic">
          <div class="shop-content">
            <p class="shop-name">{{item.activity_name}}</p>
            <p class="shop-price">￥{{item.current_price}}</p>
            <div class="mine-serve-avatar-box">
              <div class="mine-serve-avatarBox-item" v-for="(items, idx) in item.join_list" :key="idx" v-if="idx < 3">
                <img class="mine-serve-avatarBox-img" :src="items">
              </div>
              <div class="more" v-if="item.join_list && item.join_list.length > 3">
                <span class="more-item"></span>
                <span class="more-item"></span>
                <span class="more-item"></span>
              </div>
              <span class="shop-num">{{item.join_count}}人正在参与</span>
            </div>
          </div>
          <img class="arrow" :src="imageUrl + '/zd-image/mine/icon-pressed@2x.png'" v-if="imageUrl">
        </div>
        <div class="order-status">
          <div class="order-type">{{item.status * 1 === 1 ? '砍价中' : '砍价结束'}}</div>
          <div class="border-btn">
            <button open-type="share" hover-class="none" class="btn-one" :data-item="item">找人砍价</button>
            <div class="btn" @click="payOrder(item)">立即购买</div>
          </div>
        </div>
      </div>
    </scroll-view>
    <payment ref="payment" @bargainPay="bargainPay"></payment>
  </div>
</template>

<script>
  import Payment from 'components/payment/payment'
  import {Customer} from 'api'
  export default {
    name: 'order-list',
    data() {
      return {
        list: [],
        timer: '',
        code: '',
        hasPhone: false
      }
    },
    onShareAppMessage(res) {
      let title, path, imageUrl
      if (res.from === 'button') {
        // 来自页面内转发按钮
        let item = res.target.dataset.item
        title = `我正在参与${item.activity_name}, 快来和我一起砍！`
        let id = wx.getStorageSync('userInfo').id
        let shopId = wx.getStorageSync('shopId')
        imageUrl = item.image_url
        path = `/pages/activity-detail?type=bargain&fromType=3&fromId=${id}&shopId=${shopId}&activityId=${item.recommend_activity_id}`
      }
      return {
        title,
        path,
        imageUrl
      }
    },
    onLoad() {
      this._getBargainList()
    },
    methods: {
      toDetail(item) {
        let url = `/pages/activity-detail?type=bargain&activityId=${item.recommend_activity_id}`
        this.$turnShop({ id: item.shop_data.id, url })
      },
      bargainPay() {
        this._getBargainList()
      },
      _getBargainList() {
        Customer.getMyBargain().then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            this.list = res.data
            this._endTimePlay()
          }
        })
      },
      _endTimePlay() {
        clearInterval(this.timer)
        this.list = this.list.map((item) => {
          item.endTime = this._groupTimeCheckout(item.end_at_timestamp)
          return item
        })
        this.timer = setInterval(() => {
          this.list = this.list.map((item) => {
            item.endTime = this._groupTimeCheckout(item.end_at_timestamp)
            return item
          })
        }, 1000)
      },
      _groupTimeCheckout(time) {
        let nowSecond = parseInt(Date.now() / 1000)
        let differ = time * 1 - nowSecond
        let day = Math.floor(differ / (60 * 60 * 24))
        day = day >= 10 ? day : '0' + day
        let hour = Math.floor(differ / (60 * 60)) - (day * 24)
        hour = hour >= 10 ? hour : '0' + hour
        let minute = Math.floor(differ / 60) - (day * 24 * 60) - (hour * 60)
        minute = minute >= 10 ? minute : '0' + minute
        let second = Math.floor(differ) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
        second = second >= 10 ? second : '0' + second
        let times
        if (differ > 0) {
          times = {
            day,
            hour,
            minute,
            second
          }
        } else {
          times = {
            day: '00',
            hour: '00',
            minute: '00',
            second: '00'
          }
        }
        return times
      },
      async payOrder(item) {
        await this._checkHasPhone()
        let userInfo = wx.getStorageSync('userInfo')
        let paymentMsg = {
          price: item.current_price,
          originPrice: item.original_price,
          image: item.image_url,
          title: item.activity_name,
          stock: 1,
          goods_id: item.goods_id,
          recommend_activity_id: item.recommend_activity_id,
          phoneNum: userInfo.mobile,
          code: this.code,
          hasPhone: this.hasPhone,
          shopName: item.shop_data.name,
          shopImg: item.shop_data.image_url
        }
        let msgData = {title: item.activity_name, activity_id: item.recommend_activity_id}
        this.$refs.payment.showOrder(paymentMsg, 'bargain')
        this.sendCustomMsg(30021, msgData)
      },
      async _checkHasPhone() {
        let userInfo = wx.getStorageSync('userInfo')
        if (!userInfo.mobile) {
          this.hasPhone = false
          let login = await this.$wechat.login()
          if (login.errMsg === 'login:ok') {
            this.code = login.code
          }
        } else {
          this.hasPhone = true
        }
      }
    },
    components: {
      Payment
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .order-list
    word-break: break-all
    height: 100vh
    background: $color-background
    box-sizing: border-box
    font-family: $font-family-regular
    .order-item
      width: 92vw
      box-sizing: border-box
      padding: 0px 10px 8px
      margin: 15px auto 0
      height: 195px
      background: $color-FFFFFF
      box-shadow: 0 0 10px 0 rgba(141, 151, 158, 0.20)
      border-radius: 6px
      .order-shop
        display: flex
        position: relative
        height: 45px
        align-items: center
        justify-content: space-between
        color: $color-455A64
        font-size: $font-size-14
        white-space: nowrap
      .order-msg
        display: flex
        padding: 15px 0 16px
        border-bottom-1px(#e0e0e0, dashed)
        border-top-1px(#e0e0e0, dashed)
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
          no-wrap()
        .shop-price
          color: $color-455A64
        .money
          font-family: $font-family-regular
          line-height: 1
          color: $color-1F1F1F
          font-size: $font-size-14
          .price
            font-family: $font-family-medium
        .arrow
          position: absolute
          col-center()
          right: 0
          width: 7.5px
          height: 12.5px

      .order-status
        align-items: center
        justify-content: space-between
        height: 44px
        display: flex
        .order-type
          font-size: $font-size-14
          color: $color-D32F2F
        .border-btn
          display: flex
          .btn
            margin-left: 10px
            manager-button-style()
          .btn-one
            reset-button()
            width: 77px
            font-family: $font-family-regular
            font-size: $font-size-12
            border-radius: 15px
            text-align: center
            line-height: 29px
            height: 29px
            border-1px($color-6E6E6E, 15px)
            color: $color-6E6E6E

  .mine-serve-avatar-box
    display: flex
    margin-right: 10.5px
    align-items: center

  .shop-num
    font-size: $font-size-12
    margin-left: 5px
    color: $color-455A64
    line-height: 1

  .mine-serve-avatarBox-item
    width: 23px
    height: 23px
    box-sizing: border-box
    border-radius: 50%
    margin-right: -5px
    .mine-serve-avatarBox-img
      box-sizing: border-box
      width: 23px
      height: 23px
      border: 1.5px solid $color-FFFFFF
      border-radius: 50%
      position: relative
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

  .more
    margin-top: 2px
    margin-left: 10px
    display: flex
    width: 12px
    justify-content: space-between
    .more-item
      height: 3px
      width: 3px
      background: #e0e0e0
      border-radius: 50%
</style>
