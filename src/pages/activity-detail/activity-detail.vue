<template>
  <div class="activity-detail">
    <div class="banner-box">
      <swiper class="banner" @change="bannerChange">
        <block v-for="(item, index) in bannerImgs" :key="index">
          <swiper-item class="banner-item">
            <img :src="item.image.url" class="item-img" mode="aspectFill">
          </swiper-item>
        </block>
      </swiper>
      <span class="page-box"><text class="currentNum">{{currentNum}}</text>/{{bannerImgs.length}}</span>
      <div class="time-box">
        <div class="left">
          <div class="group-box" v-if="activityType === 'group'">{{goodsDetail.group_number}}人团</div>
        </div>
        <div class="right">
          <span>距离活动结束还剩: </span>
          <text class="time-txt">{{activityTime.day}}</text>
          <span>天</span>
          <text class="time-txt">{{activityTime.hour}}</text>
          <span>时</span>
          <text class="time-txt">{{activityTime.minute}}</text>
          <span>分</span>
          <text class="time-txt">{{activityTime.second}}</text>
          <span>秒</span>
        </div>
      </div>
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
    <div class="f4-line"></div>
    <div class="group-list-box" v-if="activityType === 'group'">
      <div class="list-head border-bottom-1px">小伙伴们在开团，可直接参与</div>
      <swiper class="list-content" autoplay circular :vertical="true" interval="4000" v-if="groupOrList.length">
        <block v-for="(item, index) in groupOrList" :key="index">
          <swiper-item class="group-list-swiper">
            <view class="group-swiper-item" v-for="(item1, index1) in item" :key="index1">
              <view class="group-swiper-item-left">
                <view class="group-swiper-item-avatar-box">
                  <image class="group-swiper-item-avatar" :src="item1.img_url"></image>
                </view>
                <view class="group-swiper-item-name">{{item1.name}}</view>
              </view>
              <view class="group-swiper-item-right">
                <view class="group-swiper-time">
                  <view class="group-swiper-txt">
                    <text>还差</text>
                    <text class="red-num">{{item1.remaining_number}}人</text>
                    <text>拼成</text>
                  </view>
                  <view class="group-swiper-time-txt">剩余{{item1.endTime}}</view>
                </view>
                <view class="group-swiper-item-btn" @click="joinGroup(item1)">去参团</view>
              </view>
            </view>
          </swiper-item>
        </block>
      </swiper>
      <div class="list-content" v-if="!groupOrList.length">
        <div class="nothing">暂无参团信息~</div>
      </div>
      <div class="list-foot border-top-1px" @click="showRule('group')">
        <div class="left">玩法详情</div>
        <img :src="imageUrl + '/zd-image/mine/icon-pressed@2x.png'" v-if="imageUrl" class="right">
      </div>
    </div>
    <div class="bargain-box" v-if="activityType === 'bargain'">
      <div class="list-head border-bottom-1px">参与砍价（{{'21'}}人）</div>
      <div class="avatar-list" v-if="kanList.length">
        <img :src="item" class="avatar-item" v-for="(item, index) in kanList" :key="index">
      </div>
      <div class="list-content" v-if="!kanList.length">
        <div class="nothing">暂无砍价信息~</div>
      </div>
      <div class="list-foot border-top-1px" @click="showRule('bargain')">
        <div class="left">玩法详情</div>
        <img :src="imageUrl + '/zd-image/mine/icon-pressed@2x.png'" v-if="imageUrl" class="right">
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
          <button hover-class="none" formType="submit" class="left-item">
            <img :src="imageUrl + '/zd-image/mine/icon-service@2x.png'" v-if="imageUrl" class="item-icon">
            <div class="item-txt">联系店家</div>
          </button>
        </form>
      </div>
      <form class="right-box outSide" report-submit @submit="$getFormId" v-if="activityType === 'group' && goodsDetail.stock">
       <button hover-class="none" formType="submit" class="right-box" @click="payOrderMsg" v-if="activityType === 'group' && goodsDetail.stock">¥ {{goodsDetail.platform_price}} {{groupType === 'join' ? '参团' : '开团'}}</button>
      </form>
      <div class="right-box un-click" v-if="activityType === 'group' && goodsDetail.stock == 0">已抢光</div>
      <form class="right-box outSide" report-submit @submit="$getFormId" v-if="activityType === 'bargain'">
        <button hover-class="none" formType="submit" class="right-box" @click="payOrderMsg" v-if="activityType === 'bargain'">去砍价</button>
      </form>
      <form class="right-box outSide" report-submit @submit="$getFormId" v-if="activityType === 'bargain'">
        <button hover-class="none" formType="submit" class="right-box" @click="payOrderMsg" v-if="activityType === 'bargain'">底价 ¥ 90立即购买</button>
      </form>
      <div class="right-box un-click" v-if="activityType === 'bargain' && !timeEnd && goodsDetail.status && !goodsDetail.stock">已抢光</div>
      <div class="two-right-box" v-if="activityType === 'bargain'">
        <div class="right-btn black">
          <span class="btn-top">¥ 90</span>
          <span class="btn-down">立即购买</span>
        </div>
        <div class="right-btn red">拉朋友砍</div>
      </div>
    </div>
    <payment ref="payment"></payment>
    <share ref="share" @friendShare="friendShare" @getPicture="getPicture"></share>
    <activity-role ref="role"></activity-role>
  </div>
</template>

<script type="text/ecmascript-6">
  import DetailContent from 'components/detail-content/detail-content'
  import Payment from 'components/payment/payment'
  import Share from 'components/share/share'
  import ActivityRole from 'components/activity-role/activity-role'
  import { Goods } from 'api'
  import { getParams } from 'common/js/util'
  import { mapActions } from 'vuex'
  import ImMixin from 'common/mixins/im-mixin'
  export default {
    mixins: [ImMixin],
    data() {
      return {
        imageUrl: this.$imageUrl,
        bannerImgs: [],
        currentNum: 1,
        activityTime: {
          day: '00',
          hour: '00',
          minute: '00',
          second: '00'
        },
        goodsDetail: {},
        groupOrList: [],
        kanList: [],
        activityId: '',
        activityType: 'group', // 活动类型
        timer: '',
        timeEnd: false,
        groupJoinId: '', // 参团id
        groupType: 'open', // 团购页面参与类型
        orderGroupType: 'open', // 团购订单类型
        code: '',
        hasPhone: '',
        refreshPage: true
      }
    },
    async onPullDownRefresh() {
      this.$refs.payment.hideOrder()
      this.$refs.share.closeCover()
      this.$refs.role.closeCover()
      await this._getGoodsDetail(this.activityId, this.activityType)
      wx.stopPullDownRefresh()
    },
    onShareAppMessage(res) {
      let title = this.goodsDetail.goods_title ? this.goodsDetail.goods_title : ''
      let id = wx.getStorageSync('userInfo').id
      let shopId = wx.getStorageSync('shopId')
      let type
      if (this.goodsType * 1 === 1) {
        type = 'group'
      } else {
        type = 'bargain'
      }
      let path = `/pages/activity-detail?type=${type}&fromType=3&fromId=${id}&shopId=${shopId}&activityId=${this.activityId}`
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
        this.activityId = params.a ? params.a : ''
        this.activityType = params.t * 1 === 1 ? 'group' : 'bargain'
        if (params.s) {
          this.shopId = params.s
          wx.setStorageSync('shopId', params.s)
        }
      } else {
        this.activityId = options.activityId ? options.activityId : ''
        this.activityType = options.activityType ? options.activityType : ''
      }
      await this._getGoodsDetail(this.activityId, this.activityType)
      let msgData = {title: this.goodsDetail.goods_title, goods_id: this.activityId}
      let msgCode
      switch (this.scene * 1) {
        case 0:
          msgCode = this.activityType === 'group' ? 30006 : 30015
          break
        case 1:
          msgCode = this.activityType === 'group' ? 30005 : 30014
          break
        case 2:
          msgCode = this.activityType === 'group' ? 30004 : 30013
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
        wx.switchTab({url})
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
          recommend_activity_id: this.activityId,
          phoneNum: userInfo.mobile,
          code: this.code,
          hasPhone: this.hasPhone,
          shopName: this.goodsDetail.shop_data.name,
          shopImg: this.goodsDetail.shop_data.image_url
        }
        let msgData = {title: this.goodsDetail.goods_title, goods_id: this.activityId}
        switch (this.activityType) {
          case 'group':
            this.orderGroupType = 'open'
            paymentMsg.groupType = this.orderGroupType
            paymentMsg.groupJoinId = this.groupJoinId
            await this._openGroup(paymentMsg)
            this.sendCustomMsg(30007, msgData)
            break
          case 'bargain':
            break
        }
      },
      showRule(type) {
        this.$refs.role.showModel(type)
      },
      friendShare() {
        let msgData = {title: this.goodsDetail.goods_title, goods_id: this.activityId}
        let msgCode = this.activityType === 'group' ? 30002 : 30016
        this.sendCustomMsg(msgCode, msgData)
        this._shareReq()
      },
      getPicture () {
        let msgData = {title: this.goodsDetail.goods_title, goods_id: this.activityId}
        let msgCode = this.activityType === 'group' ? 30003 : 30017
        this.sendCustomMsg(msgCode, msgData)
        this._shareReq()
        let type = this.activityType === 'group' ? 1 : 3
        let id = this.activityId
        let picMsg = {
          title: this.goodsDetail.goods_title,
          explain: '',
          mark: this.activityType === 'group' ? this.goodsDetail.group_number + '人团' : `仅剩${this.goodsDetail.stock}件`,
          price: this.goodsDetail.platform_price,
          goodsImg: this.goodsDetail.image_url,
          type,
          id
        }
        this.setGoodsDrawInfo(picMsg)
        this.$wx.navigateTo({url: `goods-make-poster`})
      },
      async joinGroup(item) {
        await this._checkHasPhone()
        let userInfo = wx.getStorageSync('userInfo')
        let paymentMsg = {
          price: this.goodsDetail.platform_price,
          originPrice: this.goodsDetail.original_price,
          image: this.goodsDetail.image_url,
          title: this.goodsDetail.goods_title,
          stock: this.goodsDetail.stock,
          goods_id: this.goodsDetail.goods_id,
          recommend_activity_id: this.activityId,
          phoneNum: userInfo.mobile,
          code: this.code,
          hasPhone: this.hasPhone,
          shopName: this.goodsDetail.shop_data.name,
          shopImg: this.goodsDetail.shop_data.image_url,
          groupType: 'join',
          groupJoinId: item.id
        }
        this.orderGroupType = 'join'
        let msgData = {title: this.goodsDetail.goods_title, goods_id: this.activityId}
        await this._joinGroup(paymentMsg, item.id)
        this.sendCustomMsg(30008, msgData)
      },
      _getGoodsDetail(id, type) {
        switch (type) {
          case 'group':
            this._getGroupDetail(id)
            break
          case 'bargain':
            break
        }
      },
      _getGroupDetail(id) {
        Goods.getGroupDetail(id).then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            this.bannerImgs = res.data.goods_banner_images
            this.goodsDetail = res.data
            this.activityStatus = res.activity_status
            let groupList = res.data.open_groupon_lists
            let first = groupList.slice(0, 2)
            let second = groupList.slice(2, 4)
            let third = groupList.slice(4, 6)
            let four = groupList.slice(6, 8)
            this.groupOrList = [first, second, third, four].filter((item) => {
              return item.length > 0
            })
            this.endTime = res.data.end_at_timestamp
            this._groupTimePlay()
          } else {
            this.$showToast(res.message)
          }
        })
      },
      _groupTimePlay() {
        clearInterval(this.timer)
        this.activityTime = this._groupTimeCheckout(this.endTime)
        this.groupOrList = this.groupOrList.map((item) => {
          item.map((item) => {
            let endTime = this._groupTimeCheckoutNoDay(item.remaining_time_timestamp)
            item.endTime = `${endTime.hour}:${endTime.minute}:${endTime.second}`
            return item
          })
          return item
        })
        this.timer = setInterval(() => {
          this.activityTime = this._groupTimeCheckout(this.endTime)
          this.groupOrList = this.groupOrList.map((item) => {
            item.map((item) => {
              let endTime = this._groupTimeCheckoutNoDay(item.remaining_time_timestamp)
              item.endTime = `${endTime.hour}:${endTime.minute}:${endTime.second}`
              return item
            })
            return item
          })
        }, 1000)
      },
      _kanTimePlay() {
        clearInterval(this.timer)
        this.activityTime = this._groupTimeCheckout(this.endTime)
        this.timer = setInterval(() => {
          this.activityTime = this._groupTimeCheckout(this.endTime)
          if (this.timeEnd) {
            clearInterval(this.timer)
          }
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
          this.timeEnd = true
        }
        return times
      },
      _groupTimeCheckoutNoDay(time) {
        let nowSecond = parseInt(Date.now() / 1000)
        let differ = time * 1 - nowSecond
        let hour = Math.floor(differ / (60 * 60))
        hour = hour >= 10 ? hour : '0' + hour
        let minute = Math.floor(differ / 60) - (hour * 60)
        minute = minute >= 10 ? minute : '0' + minute
        let second = Math.floor(differ) - (hour * 60 * 60) - (minute * 60)
        second = second >= 10 ? second : '0' + second
        let times
        if (differ > 0) {
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
        }
        return times
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
      async _openGroup(paymentMsg) {
        let data = {
          group_type: this.orderGroupType,
          recommend_activity_id: this.activityId,
          id: ''
        }
        Goods.checkGroup(data).then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            if (res.can_open) {
              this.$refs.payment.showOrder(paymentMsg, this.activityType)
            } else {
              this.$showToast(res.message)
            }
          } else {
            this.$showToast(res.message)
          }
        })
      },
      async _joinGroup(paymentMsg, joinId) {
        let data = {
          group_type: this.orderGroupType,
          recommend_activity_id: this.activityId,
          id: joinId
        }
        Goods.checkGroup(data).then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            if (res.can_join) {
              this.$refs.payment.showOrder(paymentMsg, this.activityType)
            } else {
              this.$showToast(res.message)
            }
          } else {
            this.$showToast(res.message)
          }
        })
      },
      _shareReq() {
        Goods.goodsShare(this.activityId, false)
      }
    },
    components: {
      DetailContent,
      Payment,
      Share,
      ActivityRole
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  @import "~common/stylus/base"
  .activity-detail
    background: $color-white
    padding-bottom: 70px
    .f4-line
      width: 100%
      height: 10px
      background: $color-F4F5F7
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
        bottom: 50px
        padding: 2px 7px
        border-radius: 10px
        background: rgba(69,90,100,0.4)
        font-family: DINAlternate-Bold
        font-size: $font-size-12
        color: $color-white
        vertical-align: text-bottom
        .currentNum
          font-family: DINAlternate-Bold
          font-size: $font-size-16
          color: $color-white
      .time-box
        width: 100vw
        height: 40px
        background: rgba(211,47,47,0.7)
        position: absolute
        left: 0
        bottom: 0
        display: flex
        justify-content: space-between
        align-items: center
        .left
          margin-left: 15px
          .group-box
            width: 46px
            height: 20px
            text-align: center
            line-height: 18px
            box-sizing: border-box
            border: 1px solid $color-white
            border-radius: 10px
            font-size: $font-size-12
            font-family: $font-family-regular
            color: $color-white
        .right
          color: $color-white
          font-family: $font-family-regular
          font-size: $font-size-14
          margin-right: 15px
          .time-txt
            font-family: DINAlternate-Bold
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
              color: $color-D32F2F
              margin-right: 2px
              margin-bottom: 2px
            .red-big-money
              font-family: DINAlternate-Bold
              font-size: 28px
              color: $color-D32F2F
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

    .group-list-box
      padding: 0 15px
      .list-head
        line-height: 52px
        font-family: PingFangSC-Medium
        font-size: $font-size-16
        color: $color-1F1F1F
        letter-spacing: 0.8px
      .list-content
        height: 132px
        .nothing
          text-align: center
          padding-top: 50px
          font-family: $font-family-regular
          font-size: $font-size-16
        .group-list-swiper
          width: 100%
          height: 100%
          .group-swiper-item
            height: 66px
            display: flex
            align-items: center
            justify-content: space-between
            .group-swiper-item-left
              flex: 1
              overflow: hidden
              display: flex
              height: 66px
              align-items: center
              .group-swiper-item-avatar-box
                width: 39px
                height: 39px
                box-sizing: border-box
                border: 1px solid $color-white
                border-radius: 50%
                overflow: hidden
                margin-right: 10px
                .group-swiper-item-avatar
                  width: 100%
                  height: 100%
              .group-swiper-item-name
                flex: 1
                overflow: hidden
                text-overflow: ellipsis
                white-space: nowrap
                font-size: $font-size-14
                font-family: PingFangSC-Medium
                letter-spacing: 0.3px
            .group-swiper-item-right
              display: flex
              height: 66px
              align-items: center
              .group-swiper-time
                width: 76px
                .group-swiper-txt
                  font-size: $font-size-12
                  margin-bottom: 4px
                  .red-num
                    margin: 0 2px
                    color: $color-D32F2F
                .group-swiper-time-txt
                  font-size: $font-size-12
              .group-swiper-item-btn
                margin-left: 10px
                width: 80px
                height: 32px
                border-radius: 16px
                line-height: 32px
                text-align: center
                font-family: $font-family-regular
                font-size: $font-size-14
                color: $color-white
                button-style(normal, 16px)

      .list-foot
        height: 45px
        display: flex
        align-items: center
        justify-content: flex-end
        .left
          font-family: PingFangSC-Regular
          font-size: $font-size-14
          color: $color-99A0AA
          margin-right: 8px
        .right
          width: 7.5px
          height: 12.5px
    .bargain-box
      padding: 0 15px
      .list-head
        line-height: 52px
        font-family: PingFangSC-Medium
        font-size: $font-size-16
        color: $color-1F1F1F
        letter-spacing: 0.8px
      .list-content
        .nothing
          text-align: center
          line-height: 60px
          font-family: $font-family-regular
          font-size: $font-size-16
      .avatar-list
        font-size: 0
        padding: 5px 0 15px
        .avatar-item
          width: 9.07vw
          height: 9.07vw
          border-radius: 50%
          margin-top: 10px
          box-sizing: border-box
          &:not(:nth-child(8n))
            margin-right: 2.67vw
      .list-foot
        height: 45px
        display: flex
        align-items: center
        justify-content: flex-end
        .left
          font-family: PingFangSC-Regular
          font-size: $font-size-14
          color: $color-99A0AA
          margin-right: 8px
        .right
          width: 7.5px
          height: 12.5px

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
        width: 130px
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
      .two-right-box
        flex: 1
        overflow: hidden
        display: flex
        align-items: center
        .right-btn
          display: flex
          flex-direction: column
          align-items: center
          justify-content: center
          border-radius: 22.5px
          height: 45px
          color: $color-white
        .black.right-btn
          flex: 6
          background: $color-455A64
          margin-right: 10px
          &:active
            background: #374850
          .btn-top
            font-family: $font-family-medium
            font-size: $font-size-16
            margin-bottom: 2px
          .btn-down
            font-family: $font-family-regular
            font-size: $font-size-12
        .red.right-btn
          flex: 4
          button-style(normal, 22.5px)
          margin-right: 10px
          font-size: $font-size-14
          font-family: $font-family-medium
          &:active
            button-style(click, 22.5px)
</style>
