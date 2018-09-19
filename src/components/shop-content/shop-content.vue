<template>
  <div class="shop-content">
    <section class="tab-container">
      <ul class="tab-wrapper">
        <li class="tab-item" v-for="(item, index) in tabList" :key="index" @click="changeTab(index)">{{item.title}}</li>
      </ul>
      <div class="tab-line-wrapper" :style="'transform: translate3d(' + selectTab*100 + '%,0,0)'">
        <div class="tab-line"></div>
      </div>
    </section>
    <ul class="server-wrapper" v-show="selectTab === 0">
      <li class="coupon-item" v-for="(item,index) in '12345'" :key="index">
        <div class="logo"><img class="logo-pic" mode="aspectFill" :src="url" alt=""></div>
        <article class="detail">
          <div class="title">养发项目优惠券套餐==养发项目优惠券套餐养发项目优惠券套餐养发项目优惠券套餐</div>
          <div class="money">
            <div class="price">¥99</div>
            <span class="old-price">599元</span>
          </div>
        </article>
        <div class="btn-wrapper">
          <div class="btn">购买</div>
          <div class="txt">已售28份</div>
        </div>
      </li>
    </ul>
    <section class="story-wrapper" v-show="selectTab === 1">
      <div class="video-wrapper">
        <video class="video" :src="storyData.video" objectFit="fill" :poster="storyData.video" :initial-time="1"></video>
      </div>
      <div class="title">{{storyData.title}}</div>
      <div class="line"></div>
      <ul class="content">
        <li class="item" v-for="(item, index) in storyData.content_details" :key="index">
          <img class="pic" mode="widthFix" v-if="item.type === 0 && item.detail" :src="item.detail"/>
          <div class="text" v-if="item.type === 1">{{item.detail}}</div>
          <div class="video-wrapper-item" v-if="item.type === 2 && item.detail">
            <video class="video-item" :src="item.detail" objectFit="fill" :poster="item.detail" :initial-time="1"></video>
          </div>
          <!--<div class="video" v-if="item.type === 2">{{item.detail}}</div>-->
        </li>
      </ul>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'

  const vue = new Vue()
  const video = 'http://14.29.86.17/vlive.qqvideo.tc.qq.com/AuOCHUj_W0--tQeJANCWNmtOqXc5ZjplRKBdW5LSw1Vk/m0200c2wagp.p201.1.mp4?level=0&vkey=9897261EB2D341D0AEF807E49A29F6FBA9B95815912FB21A55F674FB72A98A91BD1BB9C0943FC026576483868EF21587F2B80F5B90A0BDF1D1822E3226EF18EB9E0F52091D20F7215F0001FE81470D37574F42D2BF747672150194DF8DB2B914DBD40C2104BCEE4EA88B8F9EC423B8344581AC018693EC79&sdtfrom=&fmt=shd&platform=10901&locid=97f27211-cd66-44cd-ad0c-56244cbde333&size=2562617&ocid=350887852'
  const storyData = {
    title: '国颐堂养发护发第一品牌',
    video,
    content_details: [
      {
        type: 1,
        detail: '广州国颐堂化妆品有限公司是一家集美容化妆品研发OEM生产、实体加盟连锁经营和电子商务网络销售为一体的大型化妆品集团公司。总部位于广州休闲办公创意园区——国际单位，拥有宽敞舒适的办公环境和一流的软硬件配套设施。'
      },
      {
        type: 2,
        detail: video
      },
      {
        type: 1,
        detail: '自成立以来，公司一直秉承“普及美丽，守护健康，奉献爱心”的经营宗旨，成功打造了国人养发品牌，是实至名归的头部亚健康调理领导品牌、快捷美容养发业的领先者。'
      },
      {
        type: 0,
        detail: vue.$imageUrl + `/zd-image/test-img/6@1x.png`
      },
      {
        type: 1,
        detail: '国颐堂，“国”字号养发品牌！起源于清朝乾隆年间，得益于全新跨界整合的“六店合一”盈利模式，公司近几年来快速发展，连锁店遍布全国各地，市场前景诱人，被业内专家普遍看好，获得“中国美容化妆品行业连锁百强企业”、“中国企业十大匠心品牌”荣誉称号。“跨界整合，六店合一”的商业模式在营销实战中已经取得无数成功。'
      }
    ]
  }
  const tabList = [{title: '服务项目'}, {title: '品牌故事'}]
  export default {
    data() {
      return {
        url: this.$parent.$imageUrl + `/zd-image/test-img/4@1x.png`,
        tabList,
        selectTab: 1,
        header: [1, 1, 1],
        storyData
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

  .shop-content
    position: relative
    &:after
      content: ""
      position: absolute
      top: 33px
      right: 0
      width: 100%
      transform: scaleY(.5) translateZ(0)
      border-bottom: 1px solid $color-col-line
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
    .server-wrapper
      padding: 0 20px
      .coupon-item
        margin-top: 20px
        layout(row, block, nowrap)
        &:last-child
          margin-bottom: 37.5px
        .logo
          width: 76px
          height: 76px
          border-radius: 2px
          margin-right: 10px
          .logo-pic
            width: 100%
            height: 100%
        .detail
          flex: 1
          padding: 3px 10px 3px 0
          layout()
          justify-content: space-between
          .title
            font-size: $font-size-16
            color: $color-1F1F1F
            letter-spacing: 0.6px
            no-wrap-plus()
          .money
            layout(row, block, nowrap)
            align-items: flex-end
            .price
              font-family: $font-family-bold
              font-size: 26px
              color: #000028
              &:first-letter
                font-size: $font-size-12
                margin-right: 3px
            .old-price
              margin: 0 7.5px
              font-size: 15px
              color: $color-99A0AA
              text-decoration: line-through
              vertical-align: bottom
        .btn-wrapper
          layout()
          justify-content: center
          align-items: center
          .btn
            normal-button-style(normal, 68px, 27px, 27px)
          .txt
            margin-top: 6px
            font-size: $font-size-12
            color: $color-99A0AA
    .story-wrapper
      layout()
      align-items: center
      padding: 0 15px
      .video-wrapper
        width: 100%
        height: 46vw
        margin: 19px 0 28px
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
</style>
