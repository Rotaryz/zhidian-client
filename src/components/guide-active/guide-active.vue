<template>
  <div class="guide-active">
    <section class="tab-container">
      <ul class="tab-wrapper">
        <li class="tab-item" v-for="(item, index) in tabList" :key="index" @click="changeTab(index)">{{item.title}}</li>
      </ul>
      <div class="tab-line-wrapper" :style="'transform: translate3d(' + selectTab*100 + '%,0,0)'">
        <div class="tab-line"></div>
      </div>
    </section>
    <ul class="active-wrapper">
      <li class="item-wrapper">
        <article class="top">
          <div class="img-wrapper">
            <img class="img" mode="aspectFill" :src="url" alt="">
            <div class="tag">仅剩6份</div>
          </div>
          <div class="title-wrapper">
            <div class="explain-wrapper">
              <div class="title">国颐堂皇家养发SPA</div>
              <div class="explain">砍价最低9.9元包邮</div>
            </div>
            <div class="money-wrapper">
              <div class="money">¥99</div>
              <div class="button">开始砍价</div>
            </div>
          </div>
        </article>
        <div class="down">
          <article class="mine-serve-avatar-box">
            <div class="mine-serve-avatarBox-item" v-for="(items, idx) in header" :key="idx">
              <img class="mine-serve-avatarBox-img">
            </div>
            <div class="more">
              <span class="more-item"></span>
              <span class="more-item"></span>
              <span class="more-item"></span>
            </div>
            <span class="shop-num">28人已成功砍价</span>
          </article>
          <article class="right-box">
            <div class="jh-wrapper">
              <img class="icon" v-if="imageUrl" :src="imageUrl + '/zd-image/1.1/icon-zan@2x.png'" alt="">
              <div class="number">99</div>
            </div>
            <div class="jh-wrapper">
              <img class="icon" v-if="imageUrl" :src="imageUrl + '/zd-image/1.1/icon-share@2x.png'" alt="">
              <div class="number">55</div>
            </div>
          </article>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  const url = `https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537869795&di=e0aba314b1c2a60f8f88128198428d90&imgtype=jpg&er=1&src=http%3A%2F%2Fmypics.zhaopin.com%2Fpic%2F2014%2F3%2F1%2F5711D4D2D34C407BA2796F44A2136490.jpg`

  const tabList = [{title: '砍价抢购'}, {title: '火爆拼团'}]
  export default {
    data() {
      return {
        url,
        tabList,
        selectTab: 0,
        header: [1, 1, 1]
      }
    },
    created() {
    },
    methods: {
      changeTab(index) {
        if (this.selectTab === index) return
        this.selectTab = index
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .guide-active
    position: relative
    .tab-container
      height: 30px
      margin: 0 15px
      position: relative
      .tab-wrapper
        position: relative
        height: 100%
        width: 100%
        layout(row, block, nowrap)
        font-family: $font-family-medium
        font-size: $font-size-16
        color: $color-1F1F1F
        letter-spacing: 0.6px
        line-height: 1
        .tab-item
          flex: 1
          text-align: center
      .tab-line-wrapper
        position: absolute
        width: 50%
        height: 3px
        transform: translate3d(0, 0, 0)
        transition: all 0.3s
        .tab-line
          margin: 0 auto
          height: 3px
          width: 65px
          background: $color-D32F2F
          border-radius: 3px
    .active-wrapper
      padding: 0 15px
      .item-wrapper
        margin-top: 15px
        height: 170px
        card-shadow()
        border-radius: 6px
        padding: 0 10px
        layout()
        &:last-child
          margin-bottom: 26px
        .top
          padding: 15px 0
          layout(row, block, nowrap)
          border-bottom-1px(#E0E0E0, dashed)
          .img-wrapper
            width: 90px
            height: 90px
            position: relative
            margin-right: 15px
            border-radius: 6px
            .img
              width: 100%
              height: 100%
            .tag
              position: absolute
              top: 5px
              left: 0
              width: 44px
              height: 16px
              background: $color-FFA807
              border-radius: 0 100px 100px 0
              font-family: $font-family-medium
              font-size: $font-size-10
              color: $color-FFFFFF
              line-height: @height
              text-align: center
          .title-wrapper
            line-height: 1.1
            position: relative
            flex: 1
            layout(column, block, nowrap)
            justify-content: space-between
            .explain-wrapper
              .title
                font-size: $font-size-16
                color: $color-1F1F1F
                letter-spacing: 0.6px
              .explain
                margin-top: 9px
                font-size: $font-size-14
                color: $color-99A0AA
            .money-wrapper
              layout(row, block, nowrap)
              justify-content: space-between
              align-items: center
              .money
                font-family: $font-family-medium
                font-size: $font-size-24
                color: $color-455A64
                &:first-letter
                  font-family: $font-family-medium
                  font-size: $font-size-12
                  color: $color-455A64
                  margin: 0 3px 6px 0
              .button
                position: absolute
                bottom: 0
                right: 0
                normal-button-style(normal, 85px, 32px)
                border-radius: 32.5px
        .down
          flex: 1
          layout(row, block, nowrap)
          justify-content: space-between
          align-items: center
          .mine-serve-avatar-box
            display: flex
            margin-right: 10.5px
            align-items: center
            .mine-serve-avatarBox-item
              width: 23px
              height: 23px
              box-sizing: border-box
              border-radius: 50%
              margin-right: -11px
              .mine-serve-avatarBox-img
                background: $color-BC4949
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
              margin-left: 20px
              display: flex
              width: 12px
              justify-content: space-between
              .more-item
                height: 3px
                width: 3px
                background: #e0e0e0
                border-radius: 50%
            .shop-num
              font-size: $font-size-14
              margin-left: 5px
              color: $color-99A0AA
              line-height: 1
          .right-box
            layout(row, block, nowrap)
            align-items: center
            .jh-wrapper
              layout(row)
              &:first-child
                margin-right :20px
              .icon
                height: 16px
                width: 16px
              .number
                font-family: $font-family-medium
                font-size: $font-size-10
                color: $color-99A0AA
                position :relative
                top: -5px
                margin-left :3.5px
</style>
