<template>
  <div class="order-refund" :style="{paddingTop: pageHeadH + 'px'}">
    <head-item :title="title" :showArrow="true"></head-item>
    <div class="refund-msg">
      <div class="refund-text">
        <p class="refund-title">退款状态</p>
        <p class="refund-status">{{refundDetail.refund_str}}</p>
      </div>
      <div class="refund-item">
        <p class="refund-name">退款金额：<span class="refund-content">¥{{refundDetail.money}}</span></p>
      </div>
      <div class="refund-item">
        <p class="refund-name">退回账户：<span class="refund-content">{{refundDetail.pay_method_id}}</span></p>
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
          <div class="refund-progress-title" :class="{'refund-progress-title-active': refundStatus >= 0}">退款申请已提交</div>
          <div class="refund-progress-reason">您的退款申请已经提交</div>
          <div class="refund-progress-reason">{{refundDetail.created_at}}</div>
        </div>
        <div class="refund-progress-item">
          <div class="refund-progress-title" :class="{'refund-progress-title-active': refundStatus >= 1}">系统处理中</div>
          <div class="refund-progress-reason">您的退款申请已受理，审核时间预计需要1-2天</div>
        </div>
        <div class="refund-progress-item">
          <div class="refund-progress-title" :class="{'refund-progress-title-active': refundStatus >= 2}">退款成功</div>
          <div class="refund-progress-reason">微信支付处理完成后，退款会在3-5天内退回您的微信支付账户</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Order } from 'api'
  import HeadItem from 'components/head-item/head-item'

  export default {
    name: 'order-refund',
    components: {
      HeadItem
    },
    data() {
      return {
        refundStatus: 1,
        refundDetail: {},
        endString: '退款成功',
        title: '退款详情'
      }
    },
    async onLoad(option) {
      let id = option.id || 0
      await this._getRefundDetail(id)
    },
    methods: {
      async _getRefundDetail(id) {
        let res = await Order.orderRefund(id)
        this.$wechat.hideLoading()
        if (res.error !== this.$ERR_OK) {
          this.$showToast(res.message)
          return
        }
        this.refundDetail = res.data
        this.refundStatus = res.data.status === 0 ? 1 : 2
        this.endString = res.data.status === 2 ? '退款失败' : '退款成功'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

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
          color: $color-ED2C2B
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
          background: $color-ED2C2B
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
            background: $color-ED2C2B

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
          .refund-progress-title-active
            color: $color-ED2C2B
          .refund-progress-reason
            margin-bottom: 3.5px
            font-size: $font-size-12
            color: $color-455A64
          &:nth-child(2)
            margin-bottom: 46px
            margin-top: -6px
</style>
