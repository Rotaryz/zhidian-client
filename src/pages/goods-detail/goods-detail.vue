<template>
  <div class="goods-detail" :style="{paddingTop: pageHeadH + 'px'}">
    <head-item :title="title" :showArrow="true"></head-item>
    <div class="banner-box">
      <swiper class="banner" @change="bannerChange">
        <block v-for="(item, index) in bannerImgs" :key="index">
          <swiper-item class="banner-item">
            <img :src="item.image.url" class="item-img" mode="aspectFill">
          </swiper-item>
        </block>
      </swiper>
      <span class="page-box"><text class="currentNum">{{currentNum}}</text>/{{bannerImgs ? bannerImgs.length : ''}}</span>
    </div>
    <div class="goods-msg">
      <div class="goods-msg-left">
        <div class="goods-title">{{goodsDetail.goods_title}}</div>
        <div class="goods-money-box">
          <span class="big-money-box"><span class="red-money-icon">¥</span><span class="red-big-money">{{goodsDetail.platform_price}}</span></span>
          <span class="del-money">{{goodsDetail.original_price}}元</span>
        </div>
      </div>
      <div class="goods-msg-right">
        <div class="right-box-container" @click="showShareModel">
          <img :src="imageUrl + '/zd-image/mine/icon-share_xq@2x.png'" v-if="imageUrl" class="msg-right-icon">
          <span class="msg-right-txt">{{goodsDetail.share_count}}人分享</span>
        </div>
      </div>
    </div>
    <detail-content ref="detailContent" :goodsDetail="goodsDetail" @noRefresh="noRefresh"></detail-content>
    <div class="pay-order-bottom border-top-1px">
      <div class="left-box">
        <form report-submit class="left-item" @submit="$getFormId">
          <button hover-class="none" formType="submit" class="left-item" @click="toIndex">
            <img :src="imageUrl + '/zd-image/mine/icon-shop_xq@2x.png'" v-if="imageUrl" class="item-icon">
            <div class="item-txt">进入店铺</div>
          </button>
        </form>
        <form report-submit class="left-item" @submit="$getFormId">
          <button hover-class="none" formType="submit" class="left-item" :open-type="hasPhone ? '' : 'getPhoneNumber'" @getphonenumber="getPhone" @click="toChat">
            <img :src="imageUrl + '/zd-image/mine/icon-service@2x.png'" v-if="imageUrl" class="item-icon">
            <div class="item-txt">联系店家</div>
          </button>
        </form>
      </div>
      <form class="right-box outSide" report-submit @submit="$getFormId" v-if="goodsDetail.stock">
        <button hover-class="none" formType="submit" class="right-box" @click="payOrderMsg">立即购买</button>
      </form>
      <div class="right-box un-click outSide" v-if="!goodsDetail.stock">已售罄</div>
    </div>
    <payment ref="payment" @getPhone="phoneOk"></payment>
    <share ref="share" @friendShare="friendShare" @getPicture="getPicture"></share>
  </div>
</template>

<script type="text/ecmascript-6">
  import DetailContent from 'components/detail-content/detail-content'
  import Payment from 'components/payment/payment'
  import Share from 'components/share/share'
  import { Goods, Customer } from 'api'
  import { getParams } from 'common/js/util'
  import { mapGetters, mapActions } from 'vuex'
  import ImMixin from 'common/mixins/im-mixin'
  import HeadItem from 'components/head-item/head-item'

  export default {
    mixins: [ImMixin],
    data() {
      return {
        imageUrl: this.$imageUrl,
        bannerImgs: [],
        currentNum: 1,
        shopId: '',
        reqGoodsId: '',
        goodsDetail: {},
        code: '',
        hasPhone: false,
        userInfo: {},
        refreshPage: true,
        location: {
          longitude: '',
          latitude: ''
        },
        title: '商品详情'
      }
    },
    async onPullDownRefresh() {
      this.$refs.payment.hideOrder()
      this.$refs.share.closeCover()
      await this._getGoodsDetail(this.reqGoodsId)
      wx.stopPullDownRefresh()
    },
    onShareAppMessage(res) {
      let title = this.goodsDetail.goods_title ? this.goodsDetail.goods_title : ''
      let id = wx.getStorageSync('userInfo').id
      let shopId = wx.getStorageSync('shopId')
      let path = `/pages/goods-detail?fromType=3&fromId=${id}&shopId=${shopId}&goodsId=${this.reqGoodsId}`
      if (res.from === 'button') {
        // 来自页面内转发按钮
      }
      return {
        title: title,
        path,
        imageUrl: this.goodsDetail.image_url
      }
    },
    async onShow() {
      if (!this.refreshPage) {
        this.refreshPage = true
        return
      }
      let options = this.$root.$mp.page.options
      if (options.shopId) {
        this.shopId = options.shopId
        wx.setStorageSync('shopId', options.shopId)
      }
      if (options.scene) {
        let scene = decodeURIComponent(options.scene)
        let params = getParams(scene)
        this.reqGoodsId = params.g ? params.g : ''
        if (params.s) {
          this.shopId = params.s
          wx.setStorageSync('shopId', params.s)
        }
      } else {
        this.reqGoodsId = options.goodsId ? options.goodsId : ''
      }
      try {
        let res = await this.$wechat.getLocation()
        if (res.errMsg === 'getLocation:ok') {
          this.location = {
            longitude: res.longitude,
            latitude: res.latitude
          }
        }
      } catch (err) {
        console.log(err)
      }
      if (!this.reqGoodsId) return
      await this._getGoodsDetail(this.reqGoodsId)
      await this._checkHasPhone()
      let msgData = { title: this.goodsDetail.goods_title, goods_id: this.reqGoodsId }
      let msgCode
      switch (this.scene * 1) {
        case 0:
          msgCode = 40003
          break
        case 1:
          msgCode = 40002
          break
        case 2:
          msgCode = 40001
          break
      }
      this.sendCustomMsg(msgCode, msgData)
    },
    methods: {
      ...mapActions([
        'setGoodsDrawInfo'
      ]),
      test() {
        this.$showToast('askjdhakdhashd')
      },
      noRefresh() {
        this.refreshPage = false
      },
      bannerChange(e) {
        this.currentNum = e.mp.detail.current * 1 + 1
      },
      showShareModel() {
        this.$refs.share.show()
      },
      toIndex() {
        let url = `/pages/guide`
        wx.switchTab({ url })
      },
      toChat() {
        if (!this.hasPhone) return
        this._toChatAction()
      },
      _toChatAction() {
        let dataMsg = {
          url: this.goodsDetail.image_url,
          title: this.goodsDetail.goods_title,
          goods_price: this.goodsDetail.platform_price,
          original_price: this.goodsDetail.original_price,
          avatar: this.currentMsg.avatar,
          shop_name: this.goodsDetail.shop_data.name,
          goods_id: this.reqGoodsId
        }
        this.sendCustomMsg(20005, { product: dataMsg, type: 3 })
        let msgData = { title: this.goodsDetail.goods_title, goods_id: this.reqGoodsId }
        this.sendCustomMsg(60004, msgData)
        let url = `/pages/chat-msg`
        wx.navigateTo({ url })
      },
      async phoneOk() {
        await this._checkHasPhone()
      },
      getPhone(event) {
        const e = event.mp
        if (e.detail.errMsg !== 'getPhoneNumber:ok') {
          this._toChatAction()
          return
        }
        const iv = e.detail.iv
        const encryptedData = e.detail.encryptedData
        const data = { iv, encrypted_data: encryptedData, code: this.code }
        Customer.setCustomerPhone(data).then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            let userInfo = res.data
            this.hasPhone = true
            wx.setStorageSync('userInfo', userInfo)
            this._toChatAction()
          } else {
            this.$showToast(res.message)
            this._toChatAction()
          }
        })
      },
      friendShare() {
        let msgData = { title: this.goodsDetail.goods_title, goods_id: this.reqGoodsId }
        this.sendCustomMsg(40004, msgData)
        this._shareReq()
      },
      getPicture() {
        this._shareReq()
        let type = 0
        let id = this.reqGoodsId
        let picMsg = {
          title: this.goodsDetail.goods_title,
          explain: '',
          mark: '',
          price: this.goodsDetail.platform_price,
          goodsImg: this.goodsDetail.image_url,
          type,
          id
        }
        this.setGoodsDrawInfo(picMsg)
        this.$wx.navigateTo({ url: `goods-make-poster` })
      },
      async payOrderMsg() {
        await this._checkHasPhone()
        let userInfo = wx.getStorageSync('userInfo')
        let paymentMsg = {
          price: this.goodsDetail.platform_price,
          originPrice: this.goodsDetail.original_price,
          image: this.goodsDetail.image_url,
          title: this.goodsDetail.goods_title,
          stock: this.goodsDetail.stock,
          goods_id: this.goodsDetail.goods_id,
          recommend_goods_id: this.reqGoodsId,
          phoneNum: userInfo.mobile,
          code: this.code,
          hasPhone: this.hasPhone,
          shopName: this.goodsDetail.shop_data.name,
          shopImg: this.goodsDetail.shop_data.image_url,
          type: this.goodsDetail.type
        }
        this.$refs.payment.showOrder(paymentMsg)
      },
      async _getGoodsDetail(id, loading = false) {
        let res = await Goods.getGoodsDetail(id, this.location, loading)
        this.$wechat.hideLoading()
        if (res.error === this.$ERR_OK) {
          this.bannerImgs = res.data.goods_banner_images
          this.goodsDetail = res.data
        }
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
      },
      _shareReq() {
        Goods.goodsShare(this.reqGoodsId, false)
      }
    },
    components: {
      DetailContent,
      Payment,
      Share,
      HeadItem
    },
    computed: {
      ...mapGetters([
        'targetPage',
        'scene',
        'currentMsg'
      ])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  @import "~common/stylus/base"
  .goods-detail
    background: $color-white
    padding-bottom: 70px
    .banner-box
      width: 100vw
      height: 75vw
      position: relative
      .banner
        width: 100vw
        height: 75vw
        .banner-item
          width: 100%
          height: 100%
          .item-img
            width: 100%
            height: 100%
      .page-box
        position: absolute
        right: 15px
        bottom: 10px
        padding: 2px 7px
        border-radius: 10px
        background: rgba(69, 90, 100, 0.4)
        font-family: DINAlternate-Bold
        font-size: $font-size-12
        color: $color-white
        vertical-align: text-bottom
        .currentNum
          font-family: DINAlternate-Bold
          font-size: $font-size-16
          color: $color-white
    .goods-msg
      padding: 0 15px
      background: $color-white
      display: flex
      min-height: 84px
      justify-content: space-between
      align-items: center
      .goods-msg-left
        flex: 1
        padding: 10px 0
        overflow: hidden
        .goods-title
          font-family: $font-family-medium
          color: $color-1F1F1F
          font-size: $font-size-16
          line-height: 21px
          letter-spacing: 0.6px
          overflow: hidden
          width: 100%
          white-space: normal
          word-break: break-all
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-line-clamp: 2
          -webkit-box-orient: vertical
          margin-bottom: 10px
        .goods-money-box
          display: flex
          align-items: flex-end
          .big-money-box
            margin-right: 10px
            .red-money-icon
              font-family: $font-family-medium
              font-size: $font-size-14
              color: $color-ED2C2B
              margin-right: 2px
              margin-bottom: 2px
            .red-big-money
              font-family: DINAlternate-Bold
              font-size: 28px
              color: $color-ED2C2B
          .del-money
            text-decoration: line-through
            font-family: $font-family-regular
            color: $color-99A0AA
            font-size: $font-size-14
            margin-bottom: 2px
      .goods-msg-right
        height: 100%
        .right-box-container
          height: 100%
          display: flex
          flex-direction: column
          align-items: center
          justify-content: center
          font-size: 0
          .msg-right-txt
            font-family: $font-family-regular
            color: $color-99A0AA
            font-size: $font-size-12
          .msg-right-icon
            width: 60px
            height: 60px

    .pay-order-bottom
      width: 100vw
      height: 60px
      position: fixed
      left: 0
      bottom: 0
      z-index: 20
      background: $color-white
      display: flex
      align-items: center
      .left-box
        width: 110px
        padding: 0 10px
        display: flex
        align-items: center
        .left-item
          reset-button()
          flex: 1
          display: flex
          font-size: 0
          height: 100%
          flex-direction: column
          align-items: center
          justify-content: center
          .item-icon
            width: 22px
            height: 22px
            margin-bottom: 6px
          .item-txt
            font-size: $font-size-10
            font-family: $font-family-regular
            color: $color-455A64
      .right-box
        reset-button()
        flex: 1
        overflow: hidden
        height: 45px
        line-height: 44px
        font-size: $font-size-16
        font-family: $font-family-medium
        color: $color-white
        button-style(normal, 22.5px)
        &:active
          button-style(click, 22.5px)
      .outSide.right-box
        margin-right: 10px
      .un-click.right-box
        button-style(un-click, 22.5px)
</style>
