<template>
  <div class="activity-item" @click="toDetail(item)">
    <div class="item-content">
      <div class="item-top">
        <div class="top-left">
          <img :src="item.image_url_thumb" class="item-img" mode="aspectFill">
        </div>
        <div class="top-right">
          <div class="top-title">
            <span class="title-flag" :class="{'group-flag' : type === 'group'}">{{type === 'cut' ? '砍' : '团'}}</span>
            <span class="title-txt">{{item.goods_title}}</span>
          </div>
          <div class="down-top">
            <div class="stock-box" v-if="item.stock">仅剩{{item.stock}}份</div>
            <div class="stock-box" v-if="type === 'group'">{{item.group_number}}人团</div>
            <div class="down-txt" v-if="type === 'cut' && item.status * 1 === 3">已经到底价了~</div>
            <div class="down-txt" v-if="type === 'cut' && item.status * 1 === 4">已经被抢光了~</div>
            <div class="down-txt" v-if="type === 'cut' && item.status * 1 === 2">邀请朋友一起来参与吧~</div>
          </div>
          <div class="down-box">
            <div class="down-left">
              <div class="price-box"><span class="red-money-icon">¥</span><span class="red-big-money">{{item.platform_price}}</span><span class="del-money">¥{{item.original_price}}</span></div>
            </div>
            <div class="down-right">
              <div class="right-btn" :class="item.status * 1 === 0 ? 'un-used' : item.status * 1 === 4 ? 'gray' : 'used'">{{item.status_str}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="item-down">
        <div class="msg-box" v-if="item.status">
          <div class="avatar-list">
            <div class="avatar-item" v-for="(item, index) in item.join_list" :key="index" v-if="index < 3">
              <img :src="item" class="avatar" mode="aspectFill">
            </div>
          </div>
          <div class="dot-box" v-if="item.join_count > 3">
            <div class="dot" v-for="item in [1, 2, 3]" :key="item"></div>
          </div>
          <div class="msg-txt">已有{{item.join_count}}人{{type === 'group' ? '拼团' : '砍价'}}</div>
        </div>
        <div class="time-box" v-if="!item.status">
          <text>距开始</text>
          <text class="day-time" v-if="item.endTime && item.endTime.day != '00'">{{item.endTime.day}}</text>
          <text class="flag-medium" v-if="item.endTime && item.endTime.day != '00'">:</text>
          <text class="time-block">{{item.endTime ? item.endTime.hour : '00'}}</text><text class="flag-medium">:</text>
          <text class="time-block">{{item.endTime ? item.endTime.minute : '00'}}</text><text class="flag-medium">:</text>
          <text class="time-block">{{item.endTime ? item.endTime.second : '00'}}</text></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'activityItem',
    props: ['item', 'type'],
    data() {
      return {
        name: ''
      }
    },
    methods: {
      toDetail(item) {
        if (+item.status === 0) return
        let activityType
        switch (item.rule_id) {
          case 1:
            activityType = 'group'
            break
          case 3:
            activityType = 'bargain'
            break
          default:
            break
        }
        this.$wx.navigateTo({url: `/pages/activity-detail?activityId=${item.recommend_activity_id}&activityType=${activityType}`})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  @import "~common/stylus/base"

  .activity-item
    height: 0
    border-radius: 6px
    padding-bottom: 48.98%
    background: $color-white
    border-1px(rgba(153,160,170,0.10), 6px)
    box-shadow: 0 5px 13px 0 rgba(0,0,0,0.10)
    .item-content
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      display: flex
      flex-direction: column
      padding: 0 10px
      box-sizing: border-box
      .item-top
        flex: 71
        overflow: hidden
        display: flex
        align-items: center
        .top-left
          width: 24vw
          height: 24vw
          margin-right: 10px
          .item-img
            width: 100%
            height: 100%
        .top-right
          flex: 1
          overflow: hidden
          height: 22.4vw
          display: flex
          flex-direction: column
          .top-title
            width: 100%
            display: flex
            aling-items: flex-end
            .title-flag
              width: 30rpx
              height: 30rpx
              background: $color-FF6D88
              border-radius: 4rpx
              display: flex
              justify-content: center
              align-items: center
              font-family: $font-family-regular
              color: $color-white
              font-size: 20rpx
              margin-right: 6rpx
              &.group-flag
                background: $color-FFA807
            .title-txt
              flex: 1
              overflow: hidden
              white-space: nowrap
              text-overflow: ellipsis
              font-family: $font-family-regular
              font-size: 30rpx
              color: $color-1F1F1F
              letter-spacing: 1.2rpx
              line-height: 30rpx
          .down-top
            display: flex
            align-items: center
            margin-top: 18rpx
            overflow: hidden
            .down-txt
              font-family: $font-family-regular
              font-size: 28rpx
              color: $color-99A0AA
              line-height: 28rpx
              white-space: nowrap
            .stock-box
              padding: 6rpx 10rpx
              margin-right: 10rpx
              border-1px($color-ED2C2B, 2px)
              font-family: $font-family-regular
              font-size: 24rpx
              color: $color-ED2C2B
              white-space: nowrap
              margin-bottom: 1px
          .down-box
            flex: 1
            display: flex
            aling-items: flex-end
            .down-left
              flex: 1
              overflow: hidden
              display: flex
              aling-items: flex-end
              .price-box
                display: flex
                align-items: flex-end
                .red-money-icon
                  font-family: $font-family-medium
                  font-size: 24rpx
                  color: $color-ED2C2B
                  line-height: 24rpx
                  margin-right: 6rpx
                  margin-bottom: 4rpx
                .red-big-money
                  font-family: $font-family-bold
                  font-size: 48rpx
                  color: $color-ED2C2B
                  line-height: 48rpx
                .del-money
                  font-family: $font-family-regular
                  font-size: 28rpx
                  color: $color-99A0AA
                  margin-left: 14rpx
                  text-decoration: line-through
                  line-height: 28rpx
                  margin-bottom: 4rpx
            .down-right
              display: flex
              align-items: flex-end
              padding-bottom: 6rpx
              .right-btn
                width: 170rpx
                height: 64rpx
                text-align: center
                line-height: 64rpx
                color: $color-white
                font-size: 32rpx
                font-family: $font-family-medium
                letter-spacing: 1.2rpx
                border-radius: 32rpx
                &.used
                  background-image: linear-gradient(90deg, #FE7754 0%, #ED2B2B 100%)
                &.un-used
                  opacity: 0.6
                  background-image: linear-gradient(90deg, #FE7754 0%, #ED2B2B 100%)
                &.gray
                  background: #C2C2C2
      .item-down
        position: relative
        flex: 29
        display: flex
        flex-direction: column
        &:after
          content: ""
          position: absolute
          top: 0
          left: 0
          right: 0
          transform: scaleY(.5) translateZ(0)
          border-top: 1px #E0E0E0 dashed
        .msg-box
          flex: 1
          display: flex
          align-items: center
          .avatar-list
            display: flex
            align-items: center
            .avatar-item
              width: 26px
              height: 26px
              border: 1px solid $color-white
              border-radius: 50%
              overflow: hidden
              &:not(:first-child)
                margin-left: -6px
              .avatar
                width: 100%
                height: 100%
          .dot-box
            display: flex
            align-items: center
            margin-left: 5px
            .dot
              width: 3px
              height: 3px
              background: #E0E0E0
              border-radius: 50%
              margin-right: 2px
          .msg-txt
            font-family: $font-family-regular
            color: $color-99A0AA
            font-size: $font-size-12
            margin-left: 10px
        .time-box
          flex: 1
          display: flex
          align-items: center
          font-family: $font-family-regular
          font-size: $font-size-14
          color: $color-1F1F1F
          text:first-child
            margin-right: 4px
          .day-time
            padding: 4px 2.5px
            background: $color-1F1F1F
            border-radius: 2px
            color: $color-white
            font-family: $font-family-medium
            font-size: $font-size-11
          .flag-medium
            width: 8px
            font-family: $font-family-medium
            font-size: $font-size-10
            text-align: center
          .time-block
            width: 18px
            padding: 4px 0
            background: $color-1F1F1F
            border-radius: 2px
            color: $color-white
            font-family: $font-family-medium
            font-size: $font-size-11
            text-align: center

</style>
