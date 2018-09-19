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
        <div class="goods-title">国颐堂皇室养发套餐</div>
        <div class="goods-money-box">
          <span class="big-money-box"><span class="red-money-icon">¥</span><span class="red-big-money">100</span></span>
          <span class="del-money">699元</span>
        </div>
      </div>
      <div class="goods-msg-right">
        <div class="right-box-container" @click="showShareModel">
          <span class="msg-right-txt">0人分享</span>
          <img :src="imageUrl + '/zd-image/mine/icon-share@2x.png'" v-if="imageUrl" class="msg-right-icon">
        </div>
      </div>
    </div>
    <div class="f4-line"></div>
    <div class="group-list-box">
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
    <div class="bargain-box">
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
    <detail-content ref="detailContent"></detail-content>
    <div class="pay-order-bottom border-top-1px">
      <div class="left-box">
        <div class="left-item">
          <img :src="imageUrl + '/zd-image/mine/icon-shop_xq@2x.png'" v-if="imageUrl" class="item-icon">
          <div class="item-txt">进店铺</div>
        </div>
        <div class="left-item">
          <img :src="imageUrl + '/zd-image/mine/icon-service@2x.png'" v-if="imageUrl" class="item-icon">
          <div class="item-txt">客服</div>
        </div>
      </div>
      <div class="right-box" @click="payOrderMsg" v-if="false">¥ 90开团</div>
      <div class="right-box" @click="payOrderMsg" v-if="false">去砍价</div>
      <div class="right-box" @click="payOrderMsg">底价 ¥ 90立即购买</div>
      <div class="right-box un-click" v-if="false">已抢光</div>
      <div class="two-right-box" v-if="false">
        <div class="right-btn black">
          <span class="btn-top">¥ 90</span>
          <span class="btn-down">立即购买</span>
        </div>
        <div class="right-btn red">拉朋友砍</div>
      </div>
    </div>
    <payment ref="payment"></payment>
    <share ref="share"></share>
    <activity-role ref="role"></activity-role>
  </div>
</template>

<script type="text/ecmascript-6">
  import DetailContent from 'components/detail-content/detail-content'
  import Payment from 'components/payment/payment'
  import Share from 'components/share/share'
  import ActivityRole from 'components/activity-role/activity-role'
  export default {
    data() {
      return {
        imageUrl: this.$imageUrl,
        bannerImgs: [{image: {url: 'https://img.jerryf.cn/defaults/zd-image/test-img/5@1x.png'}},
          {image: {url: 'https://img.jerryf.cn/defaults/zd-image/test-img/5@1x.png'}},
          {image: {url: 'https://img.jerryf.cn/defaults/zd-image/test-img/5@1x.png'}}],
        currentNum: 1,
        activityTime: {
          day: '00',
          hour: '00',
          minute: '00',
          second: '00'
        },
        groupOrList: [],
        kanList: []
      }
    },
    onLoad() {
    },
    methods: {
      test() {
        this.$showToast('askjdhakdhashd')
      },
      bannerChange(e) {
        this.currentNum = e.mp.detail.current * 1 + 1
      },
      showShareModel() {
        this.$refs.share.show()
      },
      payOrderMsg() {
        this.$refs.payment.showOrder()
      },
      showRule(type) {
        this.$refs.role.showModel(type)
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
            background: #ccc
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
        justify-content: flex-end
        align-items: center
        .right
          color: $color-white
          font-family: $font-family-regular
          font-size: $font-size-14
          margin-right: 15px
          .time-txt
            font-family: DINAlternate-Bold
            color: $color-white
    .goods-msg
      padding: 10px 15px
      background: $color-white
      display: flex
      justify-content: space-between
      .goods-msg-left
        flex: 1
        overflow: hidden
        .goods-title
          font-family: $font-family-medium
          color: $color-1F1F1F
          font-size: $font-size-16
          line-height: 21px
          letter-spacing: 0.6px
          overflow: hidden
          width: 100%
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
        width: 85px
        display: flex
        align-items: center
        justify-content: flex-end
        .right-box-container
          height: 36px
          display: flex
          align-items: center
          justify-content: flex-end
          font-size: 0
          .msg-right-txt
            font-family: $font-family-regular
            color: $color-99A0AA
            font-size: $font-size-14
            margin-right: 5px
          .msg-right-icon
            width: 16px
            height: 16px

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
        width: 110px
        display: flex
        align-items: center
        .left-item
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
            margin-bottom: 4px
          .item-txt
            font-size: $font-size-10
            font-family: $font-family-regular
            color: $color-455A64
      .right-box
        flex: 1
        overflow: hidden
        margin-right: 10px
        height: 45px
        line-height: 44px
        font-size: $font-size-16
        font-family: $font-family-medium
        color: $color-white
        button-style(normal, 22.5px)
        &:active
          button-style(click, 22.5px)
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
