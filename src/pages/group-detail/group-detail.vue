<template>
  <div class="group-detail">
    <div class="group-goods">
      <div class="shop-msg">
        <div class="left" @click="toShop">
          <img :src="imageUrl + '/zd-image/mine/icon-shop_order@2x.png'" v-if="imageUrl" class="shop-icon">
          <div class="shop-name">{{groupDetail.shop_data ? groupDetail.shop_data.name : ''}}</div>
          <img :src="imageUrl + '/zd-image/mine/icon-pressed@2x.png'" v-if="imageUrl" class="arrow-icon">
        </div>
      </div>
      <div class="goods-msg" @click="toDetail">
        <img :src="groupDetail.image_url" class="left-img" mode="aspectFill">
        <div class="right">
          <div class="center-msg">
            <div class="msg-title">{{groupDetail.goods_title}}</div>
            <div class="msg-down">总计：<span class="money-txt">¥{{groupDetail.platform_price}}</span></div>
          </div>
          <img :src="imageUrl + '/zd-image/mine/icon-pressed@2x.png'" v-if="imageUrl" class="right-arrow">
        </div>
      </div>
    </div>
    <div class="f4-line"></div>
    <div class="group-status-box">
      <div class="group-status">
        <img :src="imageUrl + '/zd-image/mine/' + (statusList[statusNum] ? statusList[statusNum].icon : '')" v-if="imageUrl && statusList[statusNum]" class="status-icon">
        <div class="status-txt">{{statusList[statusNum] ? statusList[statusNum].txt : ''}}</div>
      </div>
      <div class="avatar-list">
        <div class="avatar-box" v-for="(item, index) in groupAvatarList" :key="index">
          <image class="avatar-img" :src="item.img_url" v-if="item.img_url"></image>
          <image class="avatar-icon" :src="imageUrl + '/zd-image/mine/pic-_@2x.png'" v-if="imageUrl && !item.img_url"></image>
        </div>
      </div>
      <button open-type="share" hover-class="none" class="group-btn" v-if="statusNum == 1">邀请好友参团</button>
      <div class="group-btn" v-if="statusNum == 2" @click="toOrderDetail">查看订单详情</div>
      <div class="group-btn" v-if="statusNum == 3 || statusNum == 5" @click="toIndex">查看更多精彩</div>
      <div class="group-btn" v-if="statusNum == 4" @click="joinGroup">我要参团</div>
    </div>
    <payment ref="payment" @paySuccess="paySuccess"></payment>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Goods } from 'api'
  import Payment from 'components/payment/payment'
  const STATUSOBJ = {
    1: {icon: 'icon-group_ing@2x.png', txt: '拼团中'},
    2: {icon: 'icon-group_success@2x.png', txt: '拼团成功'},
    3: {icon: 'icon-group_fail@2x.png', txt: '拼团失败'},
    4: {icon: 'icon-group_ing@2x.png', txt: '拼团中'},
    5: {icon: 'icon-group_over@2x.png', txt: '拼团结束'}
  }
  export default {
    data() {
      return {
        imageUrl: this.$imageUrl,
        statusList: STATUSOBJ,
        groupAvatarList: [],
        id: '',
        groupDetail: {},
        hasPhone: '',
        code: ''
      }
    },
    onShareAppMessage (res) {
      let title = this.groupDetail.goods_title ? this.groupDetail.goods_title : ''
      let id = wx.getStorageSync('userInfo').id
      let shopId = wx.getStorageSync('shopId')
      let path = `/pages/group-detail?fromType=3&fromId=${id}&shopId=${shopId}&groupId=${this.id}`
      if (res.from === 'button') {
        // 来自页面内转发按钮
      }
      return {
        title: `我参加了拼团活动${title},真的很实惠,快来和我一起成团吧！`,
        path,
        imageUrl: this.groupDetail.image_url
      }
    },
    onShow() {
      let options = this.$root.$mp.page.options
      if (options.shopId) {
        this.shopId = options.shopId
        wx.setStorageSync('shopId', options.shopId)
      }
      this.id = options.groupId
      this._getGroupDetail()
    },
    methods: {
      toOrderDetail() {
        let url = `/pages/order-detail?id=${this.groupDetail.order_id}&fromPage=groupDetail`
        wx.navigateTo({ url })
      },
      toIndex() {
        let url = '/pages/guide'
        wx.switchTab({url})
      },
      async joinGroup() {
        await this._checkHasPhone()
        let userInfo = wx.getStorageSync('userInfo')
        let paymentMsg = {
          price: this.groupDetail.platform_price,
          originPrice: this.groupDetail.original_price,
          image: this.groupDetail.image_url,
          title: this.groupDetail.goods_title,
          stock: this.groupDetail.stock,
          goods_id: this.groupDetail.goods_id,
          recommend_activity_id: this.groupDetail.recommend_activity_id,
          phoneNum: userInfo.mobile,
          code: this.code,
          hasPhone: this.hasPhone,
          shopName: this.groupDetail.shop_data.name,
          shopImg: this.groupDetail.shop_data.image_url,
          groupType: 'join',
          currentPage: 'groupDetail',
          groupJoinId: this.id
        }
        this.$refs.payment.showOrder(paymentMsg, 'group')
      },
      async _checkHasPhone() {
        let userInfo = wx.getStorageSync('userInfo')
        if (!userInfo.mobile) {
          this.hasPhone = false
          let login = await this.$wechat.login()
          if (login.errMsg === 'login:ok') {
            this.code = login.code
          }
        }
      },
      paySuccess() {
        this._getGroupDetail()
      },
      toShop() {
        this.$turnShop({ id: this.groupDetail.shop_data.id, url: `/pages/guide` })
      },
      toDetail() {
        let url = `/pages/activity-detail?activityType=group&fromPage=groupDetail&activityId=${this.groupDetail.recommend_activity_id}`
        wx.navigateTo({ url })
      },
      _getGroupDetail() {
        Goods.getGroupInDetail(this.id).then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            this.groupDetail = res.data
            this.groupAvatarList = []
            for (let i = 0; i < res.data.group_number; i++) {
              if (res.data.join_numbers[i]) {
                this.groupAvatarList.push(res.data.join_numbers[i])
              } else {
                this.groupAvatarList.push({})
              }
            }
          } else {
            this.$showToast(res.message)
          }
        })
      }
    },
    computed: {
      statusNum() {
        let status
        if (this.groupDetail.in_group) {
          switch (this.groupDetail.group_status * 1) {
            case 0:
              status = 3
              break
            case 1:
              status = 2
              break
            case 2:
              status = 1
              break
          }
        } else {
          switch (this.groupDetail.group_status * 1) {
            case 0:
            case 1:
              status = 5
              break
            case 2:
              status = 4
              break
          }
        }
        return status
      }
    },
    components: {
      Payment
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .group-detail
    width: 100vw
    .f4-line
      width: 100%
      height: 10px
      background: $color-F4F5F7
    .group-goods
      padding: 0 15px
      .shop-msg
        display: flex
        align-items: center
        padding-top: 15px
        height: 24px
        .left
          display: flex
          align-items: center
          height: 24px
        .shop-icon
          width: 18px
          height: 18px
        .shop-name
          font-family: $font-family-medium
          color: $color-1F1F1F
          font-size: $font-size-16
          letter-spacing: 0.6px
          line-height: 24px
          margin: 0 10px 0 6px
        .arrow-icon
          width: 7.5px
          height: 12.5px
      .goods-msg
        display: flex
        font-size: 0
        height: 110px
        align-items: center
        .left-img
          width: 75px
          height: 75px
          margin-right: 10px
        .right
          height: 75px
          flex: 1
          overflow: hidden
          display: flex
          align-items: center
          .center-msg
            flex: 1
            height: 70px
            display: flex
            flex-direction: column
            justify-content: space-between
            overflow: hidden
            .msg-title
              font-family: $font-family-regular
              font-size: $font-size-14
              color: $color-1F1F1F
              letter-spacing: 0.3px
              white-space: normal
              word-break: break-all
              overflow : hidden
              text-overflow: ellipsis
              display: -webkit-box
              -webkit-line-clamp: 2
              -webkit-box-orient: vertical
            .msg-down
              font-family: $font-family-regular
              font-size: $font-size-14
              color: $color-455A64
              .money-txt
                font-family: $font-family-medium
                color: $color-000028
          .right-arrow
            width: 7.5px
            height: 12.5px
            margin-left: 20px

    .group-status-box
      display: flex
      flex-direction: column
      align-items: center
      .group-status
        width: 100%
        display: flex
        flex-direction: column
        align-items: center
        font-size: 0
        .status-icon
          width: 60px
          height: 50px
          padding-top: 42px
        .status-txt
          font-size: $font-size-16
          font-family: $font-family-regular
          color: $color-455A64
          margin-top: 6px
      .avatar-list
          padding: 25px 0 40px
          display: flex
          justify-content: center
          .avatar-box
            width: 45px
            height: 45px
            box-sizing: border-box
            border: 0.5px solid $color-col-line
            border-radius: 50%
            overflow: hidden
            margin-right: 45px
            position: relative
            font-size: 0
            &:last-child
              margin-right: 0
            .avatar-img
              width: 100%
              height: 100%
            .avatar-icon
              width: 9px
              height: 13.5px
              all-center()
      .group-btn
        reset-button()
        width: 140px
        height: 42px
        font-size: $font-size-16
        font-family: $font-family-medium
        line-height: 42px
        color: $color-white
        button-style(normal, 21px)
        &:active
          button-style(click, 21px)

</style>
