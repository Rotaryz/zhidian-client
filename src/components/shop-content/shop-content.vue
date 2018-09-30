<template>
  <div class="shop-content">
    <section class="tab-container">
      <form report-submit @submit="$getFormId">
        <ul class="tab-wrapper">
          <li class="tab-item" v-for="(item, index) in tabList" :key="index" @click="changeTab(index)">
            <button formType="submit">{{item.title}}</button>
          </li>
        </ul>
      </form>
      <div class="tab-line-wrapper" :style="'transform: translate3d(' + selectTab*100 + '%,0,0)'">
        <div class="tab-line"></div>
      </div>
    </section>
    <ul class="server-wrapper" v-if="selectTab === 0">
      <li class="coupon-item" v-if="goodsList.length" v-for="(item,index) in goodsList" :key="index" @click="toGoodsDetail(item)">
        <div class="logo">
          <img class="logo-pic" mode="aspectFill" :src="item.image_url" alt="">
        </div>
        <section class="right">
          <article class="detail">
            <div class="title">{{item.goods_title}}</div>
            <div class="money">
              <div class="price">
                <div class="unit">¥</div>
                <div class="numbers">{{item.platform_price}}</div>
              </div>
              <span class="old-price">{{item.original_price}}元</span>
            </div>
          </article>
          <div class="btn-wrapper">
            <div class="btn">购买</div>
            <div class="txt">已售{{item.sale_count}}份</div>
          </div>
        </section>
      </li>
    </ul>
    <blank v-if="selectTab===0 && goodsList.length===0" styles="padding:50px 0"></blank>
    <section class="story-wrapper" v-if="selectTab === 1">
      <div class="video-wrapper" v-if="storyInfo.video_url">
        <video class="video" :src="storyInfo.video_url" objectFit="fill" :poster="storyInfo.video_url" :initial-time="1"></video>
      </div>
      <div class="title">{{storyInfo.title}}</div>
      <div class="line"></div>
      <ul class="content">
        <li class="item" v-if="storyInfo.details.length" v-for="(item, index) in storyInfo.details" :key="index">
          <img class="pic" mode="widthFix" v-if="item.type === 0 && item.image_url" :src="item.image_url"/>
          <div class="text" v-if="item.type === 1">{{item.text}}</div>
          <div class="video-wrapper-item" v-if="item.type === 2 && item.video_url">
            <video class="video-item" :src="item.video_url" objectFit="fill" :poster="item.video_url" :initial-time="1"></video>
          </div>
        </li>
      </ul>
      <div class="end">END</div>
    </section>
    <blank v-if="selectTab===1 && !storyInfo.title && storyInfo.details.length===0" styles="padding:50px 0"></blank>
  </div>
</template>

<script type="text/ecmascript-6">
  import Blank from 'components/blank/blank'
  import imMixin from 'common/mixins/im-mixin'

  const tabList = [{title: '服务项目'}, {title: '品牌故事'}]
  export default {
    mixins: [imMixin],
    components: {
      Blank
    },
    props: {
      goodsList: {
        type: Array,
        default: []
      },
      storyInfo: {
        type: Object,
        default: {
          details: []
        }
      },
      selectTab: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        url: this.$parent.$imageUrl + `/zd-image/test-img/4@1x.png`,
        tabList,
        selectTab: 0
      }
    },
    created() {
    },
    methods: {
      changeTab(index) {
        index === 1 && this.sendCustomMsg(40007)
        this.$emit('changeTab', index)
      },
      toGoodsDetail(item) {
        this.$wx.navigateTo({url: `/pages/goods-detail?goodsId=${item.recommend_goods_id}`})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  button
    reset-button()
    display: inline-block

  .shop-content
    position: relative
    &:after
      content: ""
      position: absolute
      top: 29px
      right: 0
      width: 100%
      transform: scaleY(.5) translateZ(0)
      border-bottom: 1px solid $color-col-line
    .tab-container
      height: 26px
      margin: 0 15px
      position: relative
      padding-bottom: 8px
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
    .server-wrapper
      padding: 0 15px 37.5px
      .coupon-item
        margin-top: 20px
        layout(row, block, nowrap)
        position: relative
        padding: 10px 0
        .logo
          width: 76px
          height: 76px
          border-radius: 2px
          margin-right: 10px
          .logo-pic
            width: 100%
            height: 100%
        .right
          flex: 1
          overflow: hidden
          layout(row)
          align-items: center
          .detail
            flex: 1
            overflow: hidden
            padding: 0 10px
            height: 70px
            layout()
            justify-content: space-between
            width: 53%
            .title
              font-size: $font-size-16
              color: $color-1F1F1F
              letter-spacing: 0.6px
              no-wrap()
            .money
              layout(row, block, nowrap)
              align-items: flex-end
              .price
                layout(row, block, nowrap)
                align-items: flex-end
                font-family: $font-family-bold
                color: #000028
                .numbers
                  font-size: 26px
                .unit
                  font-size: $font-size-12
                  padding: 0 3px 4.5px 0
              .old-price
                no-wrap()
                max-width: 50%
                margin: 0 7.5px
                font-size: 15px
                color: $color-99A0AA
                text-decoration: line-through
                vertical-align: bottom
                position: relative
                bottom: 3px
          .btn-wrapper
            width: 68px
            height: 100%
            layout()
            justify-content: center
            align-items: center
            .btn
              normal-button-style(normal, 68px, 27px, 27px)
              font-family: $font-family-bold
              font-size: $font-size-14
            .txt
              margin-top: 6px
              font-size: $font-size-12
              color: $color-99A0AA
    .story-wrapper
      layout()
      align-items: center
      padding: 28px 15px 0
      .video-wrapper
        width: 100%
        height: 46vw
        margin-bottom: 28px
        .video
          width: 100%
          height: 100%
      .title
        font-family: $font-family-medium
        font-size: $font-size-18
        color: $color-1F1F1F
        letter-spacing: 0.68px
        line-height: 1
      .line
        width: 70.5px
        height: 1px
        position: relative
        margin: 10px 0 18px
        &:after
          content: ""
          position: absolute
          bottom: 0
          right: 0
          width: 100%
          transform: scaleY(.5) translateZ(0)
          border-bottom: 1px solid rgba(69, 90, 100, 0.6)
        &:before
          row-center()
          content: ''
          top: -1px
          width: 21.5px
          height: 1.5px
          background: $color-455A64
      .content
        width: 100%
        .item
          padding-bottom: 20px
          width: 100%
          .pic
            width: 100%
            padding: 5px 0
          .video-wrapper-item
            width: 100%
            height: 46vw
            padding: 5px 0
            .video-item
              width: 100%
              height: 100%
          .text
            font-size: $font-size-16
            color: $color-1F1F1F
            letter-spacing: 0.6px
            line-height: 1.8
            word-break: break-all
            text-align: justify
      .end
        font-size: $font-size-14
        color: $color-99A0AA
        text-align: center
        height: 14px
        line-height: 1
        margin: 10px 0 20px
        position: relative
        &:before
          content: ''
          width: 9px
          height: 1px
          background: $color-99A0AA
          col-center()
          left: -14px
        &:after
          content: ''
          width: 9px
          height: 1px
          background: $color-99A0AA
          col-center()
          right: -14px
</style>
