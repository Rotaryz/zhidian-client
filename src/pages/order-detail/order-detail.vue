<template>
  <div class="order-detail">
    <div class="order-normal" v-if="false">
      <!-- 商品信息-->
      <div class="order-box">
        <div class="order-shop">
          <img v-if="imageUrl" :src="imageUrl + '/zd-image/mine/icon-shop_order@2x.png'" class="home">
          <p class="order-name">
            爱撒娇是客服哈手机看啥都看房间爱离开宿舍
            <img v-if="imageUrl" :src="imageUrl + '/zd-image/mine/icon-pressed@2x.png'" class="way">
          </p>
        </div>
        <div class="order-msg">
          <img src="" class="order-pic">
          <div class="shop-content">
            <p class="shop-name">sadfsagfdjkaglkdfg;lkaj;lkgjklsdahgklhdsglhsdlgahlasafasfasfassafafasasshfjk</p>
            <p class="money">总计：<span class="price">¥99</span></p>
          </div>
          <img v-if="imageUrl" :src="imageUrl + '/zd-image/mine/icon-pressed@2x.png'" class="way">
        </div>
      </div>
      <!-- 团购信息-->
      <div class="ground-status">
        <div class="ground-name">
          <div class="ground-text">拼团状态</div>
          <div class="ground-time-name">剩余时间:</div>
          <div class="ground-time">00:00:00</div>
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
      <div class="coupon">
        <div class="coupon-title">服务券码</div>
        <div class="coupon-item">
          <div class="coupon-left">
            <img src="" class="coupon-icon">
            <p class="coupon-text">券1:</p>
            <p class="coupon-sn">234 5679 91</p>
          </div>
          <div class="coupon-btn">使用</div>
        </div>
        <div class="coupon-item">
          <div class="coupon-left">
            <img src="" class="coupon-icon">
            <p class="coupon-text">券1:</p>
            <p class="coupon-sn">234 5679 91</p>
          </div>
          <div class="coupon-btn coupon-btn-disable">使用</div>
        </div>
      </div>
      <!--订单详情-->
      <div class="order-msg-content">
        <div class="order-title">订单信息</div>
        <div class="order-item">订单编号 : <span class="msg-detail">6+566523656</span></div>
        <div class="order-item">手机号码 : <span class="msg-detail">6+566523656</span></div>
        <div class="order-item order-last">下单时间 : <span class="msg-detail">6+566523656</span></div>
        <div class="order-item order-first">购买数量 : <span class="msg-detail">6+566523656</span></div>
        <div class="order-item">购买价格 : <span class="msg-detail">6+566523656</span></div>
      </div>
      <!--按钮-->
      <div class="order-btn">
        <div class="btn">拼团详情</div>
      </div>
    </div>
    <div class="order-refund">
      <div class="refund-msg">
        <div class="refund-text">
          <p class="refund-title">退款状态</p>
          <p class="refund-status">退款成功</p>
        </div>
        <div class="refund-item">
          <p class="refund-name">退款金额：<span class="refund-content">￥10</span></p>
        </div>
        <div class="refund-item">
          <p class="refund-name">退回账户：<span class="refund-content">￥10</span></p>
        </div>
      </div>
      <div class="refund-progress">
        <div class="refund-progress-red">
          <div class="line-box">
            <div class="line" :class="{'line-active': refundStatus >= 1}"></div>
            <div class="line" :class="{'line-active': refundStatus === 2}"></div>
          </div>
          <span class="refund-progress-circular" :class="{'refund-progress-circular-active': refundStatus >= 0}"></span>
          <span class="refund-progress-circular" :class="{'refund-progress-circular-active': refundStatus >= 1}"></span>
          <span class="refund-progress-circular" :class="{'refund-progress-circular-active': refundStatus >= 2}"></span>
        </div>
        <div class="refund-progress-text">
          <div class="refund-progress-item">
            <div class="refund-progress-title" @click="_show">退款申请已提交</div>
            <div class="refund-progress-reason">您的退款申请已经提交</div>
            <div class="refund-progress-reason">2017-12-10 11:00</div>
          </div>
          <div class="refund-progress-item">
            <div class="refund-progress-title">系统处理中</div>
            <div class="refund-progress-reason">您的退款申请已受理，审核时间预计需要1-2天</div>
          </div>
          <div class="refund-progress-item">
            <div class="refund-progress-title">退款成功</div>
            <div class="refund-progress-reason">微信支付处理完成后，退款会在3-5天内退回您的</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const GROUND_STATUS = ['拼团中', '拼团成功']
  export default {
    name: 'order-detail',
    data() {
      return {
        groundStatus: GROUND_STATUS,
        groundNow: 2,
        refundStatus: 2
      }
    },
    methods: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .order-detail
    min-height: 100vh
    padding-bottom: 60px
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
          font-family: $font-family-medium
          font-size: $font-size-16
          color: $color-1F1F1F
          margin-left: 5px
          position: relative
          padding-right: 15.5px
          width: 65%
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
        height: 0.5px
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
          background: $color-D32F2F
          height: 13.9px
          width: 17px
        .coupon-text
          font-size: $font-size-14
          font-family: $font-family-regular
        .coupon-sn
          margin-left: 8px
          font-family: DINAlternate-Bold
          font-size: $font-size-16
        .coupon-btn
          manager-button-style(nomal, 57px, 29px)
        .coupon-btn-disable
          manager-button-style(un-click, 57px, 29px)

  /*退款样式*/
  .order-refund
    .refund-msg
      height: 129px
      box-sizing: border-box
      background: $color-white
      padding: 0 15px
      .refund-text
        display: flex
        justify-content: space-between
        align-items: center
        font-size: $font-size-14
        height: 53.5px
        font-family: $font-family-regular
        margin-bottom: 5px
        border-bottom-1px(rgba(153, 160, 170, 0.3))
        .refund-title
          font-size: $font-size-16
          font-family: $font-family-medium
        .refund-status
          color: $color-D32F2F
      .refund-item
        font-size: $font-size-14
        font-family: $font-family-regular
        margin-top: 12px
        .refund-content
          font-family: $font-family-light
          margin-left: 6.5px
          color: $color-455A64
    .refund-progress
      padding: 23.5px 15px 24px
      height: 269.5px
      box-sizing: border-box
      margin-top: 10px
      background: $color-FFFFFF
      display: flex
      .refund-progress-red
        height: 173px
        flex-direction: column
        justify-content: space-between
        display: flex
        position: relative
        margin-top: 3.5px
        .refund-progress-circular
          position: relative
          z-index: 2
          background: $color-D2D2D2
          border-radius: 50%
          width: 7.5px
          height: 7.5px
        .refund-progress-circular-active
          background: $color-D32F2F
        .line-box
          row-center()
          height: 100%
          width: 0.5px
          display: flex
          flex-direction: column
          .line
            height: 83px
            width: 100%
            background: $color-D2D2D2
          .line-active
            background: $color-D32F2F

      .refund-progress-text
        margin-left: 17.5px
        transform: translateY(-3.5px)
        height: 222px
        font-size: $font-size-14
        font-family: $font-family-regular
        line-height: 1
        .refund-progress-item
          margin-bottom: 40px
          .refund-progress-title
            margin-bottom: 10px
          .refund-progress-reason
            margin-bottom: 3.5px
            font-size: $font-size-12
            color: $color-455A64
          &:nth-child(2)
            margin-bottom: 46px
            margin-top: -6px
</style>
