<template>
  <div class="shop-story":style="{paddingTop: pageHeadH + 'px'}">
    <head-item :title="headTitle"></head-item>
    <section class="story-wrapper" v-if="title && details.length!==0">
      <article class="video-wrapper" v-if="video_url">
        <div class="video-mask" v-if="!headerVideoPlay" @click="playVideo(-1)">
          <img class="icon-btn" v-if="imageUrl" :src="imageUrl + '/zd-image/1.1/icon-video@2x.png'" alt="">
        </div>
        <img class="video" mode="aspectFill" v-if="cover_image && !headerVideoPlay" :src="cover_image"/>
        <video class="video" v-else-if="headerVideoPlay" :src="video_url" objectFit="contain" autoplay></video>
      </article>
      <div class="title">{{title}}</div>
      <div class="line"></div>
      <ul class="content">
        <li class="item" v-if="details.length" v-for="(item, index) in details" :key="index">
          <img class="pic" mode="widthFix" v-if="item.type === 0 && item.image_url" :src="item.image_url"/>
          <text class="text" v-if="item.type === 1">{{item.text}}</text>
          <div class="video-wrapper-item" v-if="item.type === 2 && item.video_url" @click="playVideo(index, item)">
            <div class="video-mask" v-if="!item.videoPlay">
              <img class="icon-btn" v-if="imageUrl" :src="imageUrl + '/zd-image/1.1/icon-video@2x.png'" alt="">
            </div>
            <img class="video" mode="aspectFill" v-if="!item.videoPlay" :src="item.cover_image"/>
            <video class="video-item" v-if="item.videoPlay" :src="item.video_url" objectFit="contain" autoplay></video>
          </div>
        </li>
      </ul>
      <div class="end">END</div>
    </section>
    <blank v-if="!title && details.length===0" styles="padding:50px 0"></blank>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Shop } from 'api'
  import clearWatch from 'common/mixins/clear-watch'
  import HeadItem from 'components/head-item/head-item'
  import Blank from 'components/blank/blank'
  import imMixin from 'common/mixins/im-mixin'

  const PAGE_NAME = 'SHOP_STORY'

  export default {
    name: PAGE_NAME,
    mixins: [clearWatch, imMixin],
    components: {
      HeadItem,
      Blank
    },
    data() {
      return {
        headTitle: '品牌故事',
        statusBarHeight: 20,
        details: [],
        video_url: '',
        cover_image: '',
        title: '',
        headerVideoPlay: false
      }
    },
    onLoad() {
      this._getStory(true)
      this.sendCustomMsg(40007)
    },
    methods: {
      async _getStory(loading) {
        try {
          let res = await Shop.getStory({}, loading)
          if (loading) {
            this.$wechat.hideLoading()
          }
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          Object.assign(this.$data, res.data || {})
        } catch (e) {
          console.error(e)
        }
      },
      playVideo(index, item) {
        if (index === -1) {
          this.headerVideoPlay = true
        } else {
          item.videoPlay = true
          this.details.splice(index, 1, item)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  button
    reset-button()
    display: inline-block

  .shop-story
    position: relative
    .story-wrapper
      layout()
      align-items: center
      .video-wrapper
        width: 100%
        height: 50vw
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
            height: 50vw
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
            display: block
            padding: 0 15px
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
