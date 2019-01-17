<template>
  <div class="shop-content">
    <!--<section class="tab-container">-->
      <!--<form report-submit @submit="$getFormId">-->
        <!--<ul class="tab-wrapper">-->
          <!--<li class="tab-item" v-for="(item, index) in tabList" :key="index" @click="changeTab(index)">-->
            <!--<button formType="submit">{{item.title}}</button>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</form>-->
      <!--<div class="tab-line-wrapper" :style="'transform: translate3d(' + selectTab*100 + '%,0,0)'">-->
        <!--<div class="tab-line"></div>-->
      <!--</div>-->
    <!--</section>-->
    <ul class="server-wrapper">
      <div class="service-title">
        <img class="title-icon" v-if="imageUrl" :src="imageUrl + '/zd-image/1.4/icon-service@2x.png'" alt="">
        <span class="title-txt">服务项目({{serviceTotal}})</span>
      </div>
      <li class="coupon-item" :class="{'last' : (index == goodsListShow.length - 1)}"v-if="goodsListShow.length" v-for="(item,index) in goodsListShow" :key="index" @click="toGoodsDetail(item)">
        <div class="logo">
          <img class="logo-pic" mode="aspectFill" :src="item.image_url_thumb" alt="">
        </div>
        <section class="right">
          <article class="detail">
            <div class="title">{{item.goods_title}}</div>
            <div class="money">
              <div class="price">
                <div class="unit">¥</div>
                <div class="numbers">{{item.platform_price}}</div>
              </div>
              <span class="old-price">¥{{item.original_price}}</span>
            </div>
          </article>
          <div class="btn-wrapper">
            <!--<div class="btn">购买</div>-->
            <form report-submit @submit="$getFormId">
              <button hover-class="none" formType="submit" class="btn">
                <span>购买</span>
              </button>
            </form>
            <div class="txt">已售{{item.sale_count}}份</div>
          </div>
        </section>
      </li>
      <div class="service-more border-top-1px" :class="{'reversal' : showMore}" @click="showMoreList" v-if="serviceTotal > 5">
        <span v-if="!showMore">查看其它{{serviceTotal - 5}}个服务</span>
        <span v-if="showMore">收起</span>
        <img class="more-icon" v-if="imageUrl" :src="imageUrl + '/zd-image/mine/icon-pressed@2x.png'" alt="">
      </div>
    </ul>
    <blank v-if="goodsListShow.length===0" styles="padding:50px 0"></blank>
    <!--<section class="story-wrapper" v-if="selectTab === 1 && storyInfo.title && storyInfo.details.length!==0">-->
      <!--<article class="video-wrapper" v-if="storyInfo.video_url">-->
        <!--<div class="video-mask" v-if="!headerVideoPlay" @click="playVideo(-1)">-->
          <!--<img class="icon-btn" v-if="imageUrl" :src="imageUrl + '/zd-image/1.1/icon-video@2x.png'" alt="">-->
        <!--</div>-->
        <!--<img class="video" mode="aspectFill" v-if="storyInfo.cover_image && !headerVideoPlay" :src="storyInfo.cover_image"/>-->
        <!--<video class="video" v-else-if="headerVideoPlay" :src="storyInfo.video_url" objectFit="contain" autoplay></video>-->
      <!--</article>-->
      <!--<div class="title">{{storyInfo.title}}</div>-->
      <!--<div class="line"></div>-->
      <!--<ul class="content">-->
        <!--<li class="item" v-if="storyInfo.details.length" v-for="(item, index) in storyVideos" :key="index">-->
          <!--<img class="pic" mode="widthFix" v-if="item.type === 0 && item.image_url" :src="item.image_url"/>-->
          <!--<text class="text" v-if="item.type === 1">{{item.text}}</text>-->
          <!--<div class="video-wrapper-item" v-if="item.type === 2 && item.video_url" @click="playVideo(index, item)">-->
            <!--<div class="video-mask" v-if="!item.videoPlay">-->
              <!--<img class="icon-btn" v-if="imageUrl" :src="imageUrl + '/zd-image/1.1/icon-video@2x.png'" alt="">-->
            <!--</div>-->
            <!--<img class="video" mode="aspectFill" v-if="!item.videoPlay" :src="item.cover_image"/>-->
            <!--<video class="video-item" v-if="item.videoPlay" :src="item.video_url" objectFit="contain" autoplay></video>-->
          <!--</div>-->
        <!--</li>-->
      <!--</ul>-->
      <!--<div class="end">END</div>-->
    <!--</section>-->
    <!--<blank v-if="selectTab===1 && !storyInfo.title && storyInfo.details.length===0" styles="padding:50px 0"></blank>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import Blank from 'components/blank/blank'
  import imMixin from 'common/mixins/im-mixin'

  const tabList = [{ title: '服务项目' }, { title: '品牌故事' }]
  export default {
    mixins: [imMixin],
    components: {
      Blank
    },
    props: {
      serviceList: {
        type: Array,
        default: []
      },
      serviceTotal: {
        type: Number,
        default: 0
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
        tabList,
        selectTab: 0,
        headerVideoPlay: false,
        storyVideos: [],
        showMore: false
      }
    },
    created() {
    },
    methods: {
      init() {
        this.showMore = false
      },
      showMoreList() {
        this.$emit('refreshBox')
        this.showMore = !this.showMore
      },
      changeTab(index) {
        index === 1 && this.sendCustomMsg(40007)
        index === 1 && (this.headerVideoPlay = false)
        this.$emit('changeTab', index)
      },
      toGoodsDetail(item) {
        this.$wx.navigateTo({ url: `/pages/goods-detail?goodsId=${item.recommend_goods_id}` })
      },
      playVideo(index, item) {
        if (index === -1) {
          this.headerVideoPlay = true
        } else {
          item.videoPlay = true
          this.storyVideos.splice(index, 1, item)
        }
      }
    },
    computed: {
      updateStoryVideos() {
        this.storyVideos = this.storyInfo.details
      },
      goodsListShow() {
        if (this.showMore) {
          return this.serviceList
        } else {
          return this.serviceList.slice(0, 5)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  @import "~common/stylus/base"

  button
    reset-button()
    display: inline-block

  .shop-content
    position: relative
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
          background: $color-ED2C2B
          border-radius: 3px
    .server-wrapper
      padding: 0 15px
      .service-title
        padding-top: 15px
        height: 16px
        display: flex
        align-items: center
        .title-icon
          width: 15px
          height: 15px
          display: block
          margin-right: 4px
        .title-txt
          font-family: $font-family-regular
          color: $color-1F1F1F
          font-size: $font-size-16
          line-height: 16px
      .service-more
        height: 50px
        display: flex
        align-items: center
        justify-content: center
        font-size: $font-size-14
        font-family: $font-family-regular
        color: $color-6E6E6E
        .more-icon
          width: 7.5px
          height: 12.5px
          transform: rotate(90deg)
          margin-left: 10px
        &.reversal .more-icon
          transform: rotate(-90deg)
      .coupon-item
        margin-top: 20px
        layout(row, block, nowrap)
        position: relative
        &.last
          margin-bottom: 15px
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
                color: $color-ED2C2B
                .numbers
                  font-family: $font-family-bold
                  color: $color-ED2C2B
                  font-size: 24px
                .unit
                  font-family: $font-family-medium
                  color: $color-ED2C2B
                  font-size: $font-size-12
                  padding: 0 3px 3px 0
              .old-price
                no-wrap()
                max-width: 50%
                margin: 0 7.5px
                font-size: 12px
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
              reset-button()
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
        position: relative
        .video-mask
          fill-box()
          background: transparent
          z-index: 2
          layout()
          justify-content: center
          align-items: center
          .icon-btn
            transform: scale(0.5)
            width: 80px
            height: 80px
            border-radius: 50%
            border: 1px solid $color-FFFFFF
            box-sizing: border-box
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
            position: relative
            .video
              width: 100%
              height: 100%
            .video-mask
              fill-box()
              background: transparent
              z-index: 2
              layout()
              justify-content: center
              align-items: center
            .icon-btn
              transform: scale(0.5)
              width: 80px
              height: 80px
              border-radius: 50%
              border: 1px solid $color-FFFFFF
              box-sizing: border-box
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
