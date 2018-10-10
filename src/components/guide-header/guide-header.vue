<template>
  <div class="guide-header">
    <section class="logo-wrapper">
      <img class="img" mode="aspectFill" :src="shopInfo.image_url" alt="">
      <button class="share-btn" open-type="share">
        <img class="share-icon" v-if="imageUrl" :src="imageUrl + '/zd-image/1.1/icon-share_dg@2x.png'" alt="">
        <div class="share-txt">分享</div>
      </button>
      <img class="btn-editor" v-if="isMyShop && imageUrl" :src="imageUrl + '/zd-image/1.1/icon-exchange@2x.png'" alt="" @click="editorAvatar">
    </section>
    <section class="content">
      <article class="top">
        <div class="avatar-wrapper">
          <img class="avatar" mode="aspectFill" :src="employee.avatar" alt="">
        </div>
        <div class="name">{{employee.name}}</div>
        <div class="detail">
          <div class="position">{{employee.position}}</div>
          <div class="company">{{shopInfo.name}}</div>
        </div>
      </article>
      <div class="down" v-if="employee.signature">"{{employee.signature}}"</div>
      <div class="down" v-else></div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import imMixin from 'common/mixins/im-mixin'

  export default {
    mixins: [imMixin],
    props: {
      shopInfo: {
        type: Object,
        default: {}
      },
      employee: {
        type: Object,
        default: {}
      },
      isMyShop: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    onShareAppMessage() {
      this.sendCustomMsg(10004) // 转发给好友
      let id = wx.getStorageSync('userInfo').id
      let shopId = wx.getStorageSync('shopId')
      return {
        title: this.shopInfo.name,
        path: `/pages/guide?fromType=3&fromId=${id}&shopId=${shopId}`,
        success: (res) => {
          // 转发成功
        },
        fail: (res) => {
          // 转发失败
        }
      }
    },
    created() {
    },
    methods: {
      async editorAvatar() {
        try {
          let res = await this.$wechat.chooseImage()
          let file = res.tempFilePaths[0]
          getApp().globalData.imgUrl = file
          this.$wx.navigateTo({ url: '/pages/cut-picture?cutType=avatar' })
        } catch (e) {
          console.error(e)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  button
    reset-button()

  .guide-header
    position: relative
    .logo-wrapper
      position: relative
      height: 75vw
      .img
        height: 100%
        width: 100%
      .share-btn
        opacity: 0.8
        position: absolute
        right: 0
        top: 20px
        normal-button-style(click, 70px, 32px)
        border-radius: 100px 0 0 100px
        layout(row, block, nowrap)
        justify-content: center
        align-items: center
        .share-icon
          width: 16px
          height: 16px
        .share-txt
          margin-left: 5px
          font-size: $font-size-14
          color: $color-FFFFFF
      .btn-editor
        position: absolute
        bottom: 15px
        right: 15px
        width: 32px
        height: 32px
    .content
      padding: 0 15px
      .top
        layout(row, block, nowrap)
        position: relative
        padding-top: 15px
        .avatar-wrapper
          position: absolute
          top: -20px
          left: 0
          width: 75px
          height: 75px
          border-radius: 50%
          background: $color-FFFFFF
          layout()
          justify-content: center
          align-items: center
          .avatar
            width: 95%
            height: 95%
            border-radius: 50%
        .name
          margin: 0 6px 0 90px
          font-family: $font-family-medium
          font-size: 25px
          color: $color-1F1F1F
          letter-spacing: 0.75px
          line-height: 1.2
        .detail
          flex: 1
          font-size: $font-size-12
          color: $color-6E6E6E
          letter-spacing: 0.26px
          line-height: 1.2
          .position
            margin-bottom: 2px
            text-align: justify
            word-break: break-all
          .company
            text-align: justify
            word-break: break-all
      .down
        font-family: $font-family-regular
        padding: 26.5px 0 35px
        font-size: $font-size-16
        color: #1F1F1F
        letter-spacing: 0.34px
        line-height: 1.2
        word-break: break-all
        text-align: justify
</style>
