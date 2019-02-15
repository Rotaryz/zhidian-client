<template>
  <div class="payment">
    <div class="payment-cover" v-show="orderShow" @click.top="hideOrder" @touchmove.parent=""></div>
    <div class="payment-content" :class="orderShow ? 'show' : ''" @click.stop="" @touchmove="">
      <div class="payment-top border-bottom-1px">
        <div class="payment-img-box">
          <img :src="paymentMsg.image" class="payment-img" mode="aspectFill">
        </div>
        <div class="payment-top-right">
          <div class="payment-title">{{paymentMsg.title}}</div>
          <div class="payment-money">
            <span class="price-left"><span class="price-icon">¥</span><span class="big-money">{{paymentMsg.price}}</span></span>
            <span class="del-money">¥{{paymentMsg.originPrice}}</span>
          </div>
        </div>
      </div>
      <div class="payment-detail border-bottom-1px">
        <div class="detail-item">
          <div class="detail-title">数量</div>
          <div class="num-box">
            <div class="num-btn-box">
              <img :src="imageUrl + '/zd-image/mine/icon-subtract@2x.png'" v-if="imageUrl" class="num-btn" @click="subNum">
              <img :src="imageUrl + '/zd-image/mine/icon-subtract_disable@2x.png'" v-show="orderNum <= 1" v-if="imageUrl" class="num-btn" @click.stop="">
            </div>
            <div class="payment-num">{{orderNum}}</div>
            <div class="num-btn-box">
              <img :src="imageUrl + '/zd-image/mine/icon-add@2x.png'" v-if="imageUrl" class="num-btn" @click.stop="addNum">
              <img :src="imageUrl + '/zd-image/mine/icon-add_disable@2x.png'" v-if="imageUrl && orderNum >= paymentMsg.stock" class="num-btn">
            </div>
          </div>
        </div>
        <div class="detail-item">
          <div class="detail-title">价格</div>
          <div class="payment-money"><span class="money-icon">¥</span>{{total}}</div>
        </div>
      </div>
      <div class="phone-auth">
        <div class="detail-title">手机号码</div>
        <div class="phone-right">
          <button class="phone-get-btn" open-type="getPhoneNumber" @getphonenumber="getPhone" v-if="!paymentMsg.phoneNum">
            <span class="get-btn-txt">授权手机方便商家联系</span>
            <img :src="imageUrl + '/zd-image/mine/icon-pressed@2x.png'" v-if="imageUrl" class="get-btn-icon">
          </button>
          <div class="phone-num" v-if="paymentMsg.phoneNum">{{paymentMsg.phoneNum}}</div>
        </div>
      </div>
      <navigator url="/pages/chioce-coupon" hover-class="none" v-if="showDiscount">
        <div class="discount-li border-top-1px">
          <div class="li-left">使用优惠券</div>
          <div class="li-right">
            <div class="right-content">
              <div class="discount-txt" v-if="!selectCoupon.id">{{canUseNum}}张可用</div>
              <div class="discount-num" v-if="selectCoupon.id">{{selectCoupon.coupon_type == 3 ? '-¥' + selectCoupon.denomination : selectCoupon.denomination + '折'}}</div>
              <img class="right-icon" v-if="imageUrl" :src="imageUrl + '/zd-image/mine/icon-pressed@2x.png'" alt="">
            </div>
          </div>
        </div>
      </navigator>
      <div class="discount-li" v-if="showDiscount">
        <div class="li-left">实付金额</div>
        <div class="li-right">
          <div class="right-content">
            <div class="right-txt">已优惠</div>
            <div class="right-red-num">¥{{discountNum}}</div>
            <div class="right-black-icon">¥</div>
            <div class="right-black-num">{{payTotal}}</div>
          </div>
        </div>
      </div>
      <div class="buy-btn-box">
        <div class="buy-btn" @click.stop="submitOrder">立即购买</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Customer, Goods, Mine } from 'api'
  import { mapActions, mapGetters } from 'vuex'
  import ImMixin from 'common/mixins/im-mixin'

  export default {
    mixins: [ImMixin],
    data() {
      return {
        imageUrl: this.$imageUrl,
        orderShow: false,
        orderNum: 1,
        total: '',
        paymentMsg: {}, // 支付信息
        code: '',
        type: '',
        showDiscount: false, // 是否显示优惠券
        discountNum: 0
      }
    },
    created() {
    },
    onUnload() {
      this.orderShow = false
      this.orderNum = 1
      this.paymentMsg = {}
      this.code = ''
      this.type = ''
      this.setSelectCoupon({})
      this.showDiscount = false
      this.discountNum = 0
    },
    computed: {
      ...mapGetters([
        'canUseNum',
        'selectCoupon'
      ]),
      payTotal() {
        if (this.showDiscount && this.selectCoupon.id) {
          let total
          if (+this.selectCoupon.coupon_type === 3) {
            total = (+this.total - +this.selectCoupon.denomination).toFixed(2)
            this.discountNum = +this.selectCoupon.denomination
          } else {
            total = (this.total * this.selectCoupon.denomination / 10).toFixed(2)
            this.discountNum = (this.total - total).toFixed(2)
          }
          return total
        } else {
          return this.total
        }
      }
    },
    methods: {
      ...mapActions([
        'setShowType',
        'setOrderResultMsg',
        'checkoutCoupon',
        'setSelectCoupon',
        'setCouponList'
      ]),
      async showOrder(msg, type = 'default') {
        this.type = type
        this.showDiscount = type === 'default'
        this.paymentMsg = msg
        this.code = msg.code
        this.orderShow = true
        this.orderNum = 1
        this.total = (this.orderNum * this.paymentMsg.price).toFixed(2)
        this._checkCoupon()
      },
      // 获取我的优惠券列表
      async _getMineCouponList() {
        let data = {
          shop_id: wx.getStorageSync('shopId'),
          has_page: false,
          status: 0
        }
        let res = await Mine.getCouponList(data, false)
        if (res.error === this.$ERR_OK) {
          this.setCouponList(res.data)
          this._checkCoupon()
        }
      },
      hideOrder() {
        this.orderShow = false
      },
      initDiscount() {
        this.setSelectCoupon({})
        this.discountNum = 0
        this._getMineCouponList()
      },
      _checkCoupon() {
        if (this.showDiscount) {
          let condition = {
            goodsId: this.paymentMsg.goods_id,
            money: this.total
          }
          this.checkoutCoupon(condition)
        }
      },
      addNum() {
        this.orderNum++
        this.total = (this.orderNum * this.paymentMsg.price).toFixed(2)
        this._checkCoupon()
      },
      subNum() {
        this.orderNum--
        this.total = (this.orderNum * this.paymentMsg.price).toFixed(2)
        this._checkCoupon()
      },
      getPhone(event) {
        const e = event.mp
        if (e.detail.errMsg !== 'getPhoneNumber:ok') {
          return
        }
        const iv = e.detail.iv
        const encryptedData = e.detail.encryptedData
        const data = { iv, encrypted_data: encryptedData, code: this.code }
        Customer.setCustomerPhone(data).then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            let userInfo = res.data
            this.paymentMsg.phoneNum = res.data.mobile
            wx.setStorageSync('userInfo', userInfo)
            this.$emit('getPhone')
          } else {
            this.$showToast(res.message)
          }
        })
      },
      submitOrder() {
        /** if (!this.paymentMsg.phoneNum) {
          this.$showToast('请先授权手机号')
          return
        } **/
        let data, msgCode
        let goods = [{
          goods_id: this.paymentMsg.goods_id,
          num: this.orderNum,
          goods_title: this.paymentMsg.title
        }]
        let msgData = {
          title: this.paymentMsg.title,
          total: this.total
        }
        switch (this.type) {
          case 'default':
            data = {
              goods,
              pay_method_id: 1,
              order_id: 0,
              recommend_goods_id: this.paymentMsg.recommend_goods_id,
              type: this.paymentMsg.type,
              customer_coupon_id: this.selectCoupon.id || ''
            }
            msgCode = 40006
            msgData.goods_id = this.paymentMsg.recommend_goods_id
            break
          case 'group':
            data = {
              goods,
              pay_method_id: 1,
              order_id: 0,
              activity_type: 1,
              group_type: this.paymentMsg.groupType,
              group_id: this.paymentMsg.groupJoinId,
              recommend_activity_id: this.paymentMsg.recommend_activity_id
            }
            msgCode = 30010
            msgData.activity_id = this.paymentMsg.recommend_activity_id
            break
          case 'bargain':
            data = {
              goods,
              pay_method_id: 1,
              order_id: 0,
              activity_type: 3,
              recommend_activity_id: this.paymentMsg.recommend_activity_id
            }
            msgCode = 30023
            msgData.activity_id = this.paymentMsg.recommend_activity_id
            break
        }
        Goods.payOrder(data).then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            switch (this.type) {
              case 'group':
                this.sendCustomMsg(30009, msgData)
                break
              case 'bargain':
                this.sendCustomMsg(30022, msgData)
                break
            }
            let payRes = res.data
            const { timestamp, nonceStr, signType, paySign } = payRes
            if (this.type === 'default') {
              this.initDiscount()
            }
            this.setShowType(true)
            wx.requestPayment({
              timeStamp: timestamp,
              nonceStr,
              package: payRes.package,
              signType,
              paySign,
              success: () => {
                this.sendCustomMsg(msgCode, msgData)
                if (this.type === 'group' && this.paymentMsg.currentPage !== 'groupDetail') {
                  this.$wechat.showLoading()
                  setTimeout(() => {
                    this.$wechat.hideLoading()
                    let url = `/pages/group-detail?groupId=${payRes.group_id}`
                    this.orderShow = false
                    wx.navigateTo({ url })
                  }, 2000)
                  return
                } else if (this.type === 'group' && this.paymentMsg.currentPage === 'groupDetail') {
                  this.orderShow = false
                  this.$emit('paySuccess')
                  return
                }
                if (this.type === 'bargain') {
                  this.$emit('bargainPay')
                }
                let resultData = {
                  avatar: this.paymentMsg.shopImg,
                  nickName: this.paymentMsg.shopName
                }
                this.setOrderResultMsg(resultData)
                let url = '/pages/order-result?orderId=' + payRes.order_id
                this.orderShow = false
                wx.navigateTo({ url })
              },
              fail() {
              }
            })
          } else {
            this.$showToast(res.message)
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  @import "~common/stylus/base"

  .payment
    .payment-cover
      position: fixed
      left: 0
      top: 0
      bottom: 0
      right: 0
      z-index: 100
      background: rgba(31, 31, 31, 0.8)
    .payment-content
      position: fixed
      z-index: 150
      left: 0
      bottom: -130%
      width: 100%
      background: $color-white
      border-radius: 10px 10px 0 0
      padding: 0 15px
      box-sizing: border-box
      transition: all .3s
      .payment-top
        position: relative
        height: 97px
        display: flex
        .payment-img-box
          width: 100px
          height: 100px
          border: 1px solid rgba(153, 160, 170, 0.10)
          box-shadow: 0 4px 16px 0 rgba(55, 75, 99, 0.10)
          border-radius: 12px
          position: absolute
          left: 15px
          bottom: 23px
          background: $color-white
          overflow: hidden
          .payment-img
            width: 100%
            height: 100%
        .payment-top-right
          margin-left: 130px
          flex: 1
          overflow: hidden
          padding-top: 15px
          .payment-title
            font-family: $font-family-medium
            font-size: 16px
            height: 32px
            line-height: 16px
            color: $color-1F1F1F
            letter-spacing: 0.6px
            margin-bottom: 17px
            overflow: hidden
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 2
            -webkit-box-orient: vertical
          .payment-money
            display: flex
            align-items: flex-end
            .price-left
              margin-right: 8px
              .price-icon
                font-family: $font-family-medium
                font-size: $font-size-12
                color: $color-455A64
                margin-right: 2px
              .big-money
                font-family: DINAlternate-Bold
                font-size: 26px
                color: $color-000028
            .del-money
              position: relative
              bottom: 3px
              text-decoration: line-through
              font-family: $font-family-regular
              color: $color-99A0AA
              font-size: $font-size-14
      .payment-detail
        height: 126px
        .detail-item
          display: flex
          align-items: center
          justify-content: space-between
          height: 63px
          .detail-title
            font-family: $font-family-regular
            color: $color-1F1F1F
            font-size: $font-size-16
          .num-box
            display: flex
            align-items: center
            .num-btn-box
              width: 55px
              height: 32px
              position: relative
              .num-btn
                width: 100%
                height: 100%
                position: absolute
                left: 0
                top: 0
            .payment-num
              width: 35px
              text-align: center
              font-family: $font-family-medium
              font-size: $font-size-18
              color: $color-1F1F1F
          .payment-money
            font-size: $font-size-16
            font-family: PingFang-SC-Bold
            color: $color-1F1F1F
            .money-icon
              font-size: $font-size-12
              margin-right: 1px
      .phone-auth
        height: 66px
        display: flex
        align-items: center
        justify-content: space-between
        .detail-title
          font-family: $font-family-regular
          color: $color-1F1F1F
          font-size: $font-size-16
        .phone-right
          .phone-get-btn
            reset-button()
            height: 30px
            padding-left: 10px
            display: flex
            align-items: center
            font-size: 0
            .get-btn-txt
              font-family: $font-family-regular
              color: $color-6E6E6E
              font-size: $font-size-16
              margin-right: 5px
            .get-btn-icon
              width: 7.5px
              height: 12.5px
          .phone-num
            font-family: $font-family-regular
            color: $color-1F1F1F
            font-size: $font-size-16
      .discount-li
        height: 64px
        display: flex
        justify-content: space-between
        align-items: center
        .li-left
          font-family: $font-family-regular
          font-size: $font-size-16
          color: $color-1F1F1F
        .li-right
          display: flex
          align-items: center
          .right-content
            display: flex
            align-items: center
            .discount-num
              font-family: $font-family-medium
              font-size: $font-size-16
              color: $color-ED2C2B
            .discount-txt
              font-family: $font-family-regular
              font-size: $font-size-16
              color: $color-ED2C2B
            .right-icon
              width: 7.5px
              height: 12.5px
              margin-left: 7px
            .right-txt
              font-family: $font-family-regular
              font-size: $font-size-16
              color: $color-1f1f1f
              margin-right: 5px
            .right-red-num
              font-family: $font-family-regular
              font-size: $font-size-16
              color: $color-ED2C2B
              margin-right: 10px
            .right-black-icon
              font-family: $font-family-medium
              font-size: $font-size-18
              color: $color-1f1f1f
              margin-right: 1px
            .right-black-num
              font-family: $font-family-medium
              font-size: 25px
              line-height: 25px
              color: $color-1f1f1f
              padding-bottom: 3px
      .buy-btn-box
        padding: 15px 0
        .buy-btn
          height: 45px
          line-height: 44px
          font-size: $font-size-16
          font-family: $font-family-medium
          color: $color-white
          button-style(normal, 22.5px)
          &:active
            button-style(click, 22.5px)
        .buy-btn.un-click
          button-style(un-click, 22.5px)
    .show.payment-content
      bottom: 0

</style>
