<template>
  <div class="edit-dynamic">
    <head-item :title="topTitle" :showArrow="true"></head-item>
    <scroll-view class="edit-wrapper" :style="{paddingTop: pageHeadH + 'px'}">
      <div class="compile">
        <textarea class="words-span" :style="{height: textHeight + 'px'}" maxlength="-1" placeholder="这一刻的想法…" v-model="title" @input="_setTop" @linechange="getLine"></textarea>
        <div class="com-box">
          <div class="com-image" v-for="(item, index) in showImage" :key="index">
            <img class="img-item" :src="item.image_url" mode="aspectFill">
            <div class="close-icon" @click.stop="_delImage(index)">
              <img class="close-icon" v-if="imageUrl" :src="imageUrl + '/zd-image/dynamic/icon-del@2x.png'" mode="widthFix">
            </div>
          </div>
          <div class="com-image" v-if="image.length < 9">
            <img class="img-item" :src="imageUrl + '/zd-image/dynamic/Group3@2x.png'" @click="_fileImage">
          </div>
        </div>
        <!--<div class="synchronization" v-if="isBoss">-->
          <!--<img v-if="imageUrl" :src="imageUrl + '/zd-image/dynamic/icon-member@2x.png'" class="synchronization-icon">-->
          <!--<span class="synchronization-text">将动态同步全部成员</span>-->
          <!--<switch :checked="isChecked" color="#56BA15" class="synchronization-switch" @change="_synchronization"></switch>-->
        <!--</div>-->
      </div>
      <div class="btn">
        <div class="btn-item" :class="{'btn-disable': !isSend}" @click="_liveLogs">发布</div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
  import { Dynamic } from 'api'
  import { mapActions } from 'vuex'
  import HeadItem from 'components/head-item/head-item'

  export default {
    name: 'edit-dynamic',
    data () {
      return {
        imageUrl: this.$imageUrl,
        title: '',
        image: [],
        send: true,
        bottom: 0,
        height: 0,
        comHeight: 0,
        auto: true,
        textHeight: 56,
        showImage: [],
        sortArr: [],
        isChecked: false,
        isBoss: false,
        topTitle: '发布'
      }
    },
    computed: {
      isSend () {
        return this.title && this.image.length
      }
    },
    onShow () {
      this._boss()
      this.send = true
    },
    methods: {
      ...mapActions(['setShowType', 'setIsLoadDy']),
      _synchronization (e) {
        this.isChecked = e.mp.detail.value
      },
      _boss() {
        if (!this.$wx.getStorageSync('userInfoExtend')) {
          this.$checkIsMyShop(() => {
            this.isBoss = this.$isBoss()
          })
        } else {
          this.isBoss = this.$isBoss()
        }
      },
      getLine (e) {
        if (e.mp.detail.lineCount > 1 && e.mp.detail.lineCount <= 5) {
          this.textHeight = e.mp.detail.height + 16
        }
      },
      _setTop (e) {
        this.$wx.createSelectorQuery().select('.words-span').boundingClientRect(function(rect) {
          if (rect.height >= 112.5) {
            this.auto = false
          }
        }).exec()
      },
      async _fileImage () {
        this.setShowType(true)
        this.$wx.chooseImage({
          count: 9 - this.showImage.length,
          success: async (res) => {
            this.$wx.showLoading()
            this._upLoad(res.tempFilePaths)
              .then(() => {
                this.$wx.hideLoading()
              })
          }
        })
      },
      async _upLoad (data) {
        await Promise.all(data.map(async (val) => {
          let image = await this.$cos.uploadFiles(this.$cosFileType.IMAGE_TYPE, [val])
          this.image.push(image[0].id)
        }))
        data.forEach((item) => {
          let obj = { image_url: item }
          this.showImage.push(obj)
        })
      },
      _sort (a, b) {
        return a.sort - b.sort
      },
      _delImage (index) {
        this.image.splice(index, 1)
        this.showImage.splice(index, 1)
      },
      _liveLogs () {
        if (!this.send) {
          return
        }
        if (!this.title) {
          this.$showToast('内容不能为空')
          return
        } else if (!this.image.length) {
          this.$showToast('图片不能为空')
          return
        }
        let imageArr = []
        this.image.map((item) => {
          imageArr.push({type: 1, detail_id: item})
        })
        let data = {
          content: this.title,
          live_log_details: imageArr,
          is_sync: this.isChecked
        }
        Dynamic.liveLogs(data).then((res) => {
          this.send = false
          this.$wechat.hideLoading()
          if (this.$ERR_OK !== res.error) {
            this.$showToast(res.message)
            return
          }
          this.$showToast('发布成功')
          setTimeout(() => {
            this.setIsLoadDy(true)
            this._back()
          }, 2010)
        })
      },
      _back () {
        this.$wx.navigateBack({
          delta: 1
        })
      }
    },
    components: {
      HeadItem
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .edit-dynamic
    .edit-wrapper
      height: 100vh
      box-sizing: border-box
      padding-bottom: 50px
    .words-span
      margin-top: 14px
      padding: 0 15px
      line-height: 18px
      outline: none
      resize: none
      width: 100vw
      border: none
      box-sizing: border-box
      font-size: $font-size-14
      color: $color-text
      &::-webkit-input-placeholder
        font-family: $font-family-regular
        font-size: $font-size-medium-x
        color: #CCCCCC
    .com-box
      margin-top: 20px
      overflow-y: auto
      padding: 0 4vw 0 2.4vw
    .com-words
      color: #CCCCCC
      font-size: $font-size-medium-x
    .words-text
      height: 19.467vw
      font-size: $font-size-medium-x
      color: $color-text
      width: 100%
      box-sizing: border-box
      padding: 10.5px 24px 0 15px

  .com-tab
    background: $color-white
    position: fixed
    width: 100%
    bottom: 0
    border-top: 0.5px solid $color-split-line
    border-bottom: 0.5px solid $color-split-line
    height: 8.6vh
    display: flex
    margin-top: 4.56vh
    .com-addrss
      z-index: 100
      position: absolute
      top: -36px
      left: 15px
      height: 29px
      max-width: 82%
      background: $color-background
      border-radius: 50px
      padding: 0 13px
      display: flex
      align-items: center
      justify-content: center
      font-size: $font-size-medium
      color: $color-text-tr
      .add-title
        no-wrap()
      .com-add-icons
        width: 16px
        height: @width
    .com-addrss-active
      color: $color-text
    .com-tab-item
      height: 100%
      flex: 2.5
      line-height: 49px
      border-right: 0.5px solid $color-split-line
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      .com-tab-icon
        height: 22px
        width: @height
      .com-tab-item-title
        font-size: $font-size-10
        color: $color-text-tr
        margin-top: 5px
      &:last-child
        flex: 5
        color: $color-assist-pink
        opacity: 0.5
        border-right: none
        text-align: center
    .com-tab-item-active
      opacity: 1 !important

  .com-image
    position: relative
    display: inline-block
    .img-item
      height: 28.4vw
      margin: 1.6vw 0 0 1.6vw
      width: @height
      position: relative
      .play
        all-center()
        width: 36.363%
        height: @width
    .close-icon
      height: 16.5px
      width: 16.5px
      line-height: 16.5px
      text-align: center
      background: rgba(0, 0, 0, 0.20)
      color: $color-white
      font-size: $font-size-10
      position: absolute
      right: 0px
      top: 3px
      background: $color-background
      .close-icon
        cll-center()
        height: 16.5px
        width: 16.5px
    .img-add
      display: inline-block
      height: 29.6vw
      width: @height
      margin: 1.6vw 0 0 1.6vw
      position: relative
      .add-image
        height: 98%
        width: @height

  .btn
    background: $color-FFFFFF
    position: fixed
    z-index: 10
    bottom: 0
    width: 100vw
    height: 62px
    .btn-item
      margin-top: 8.5px
      margin-left: 4vw
      font-family: $font-family-regular
      normal-button-style(normal, 92vw, 45px, 50px, $font-size-16)
    .btn-disable
      normal-button-style(un-click, 92vw, 45px, 50px, $font-size-16)

  .image-file
    opacity: 0
    height: 76%
    width: 76%
    all-center()

  .synchronization
    display: flex
    height: 49px
    width: 92vw
    margin: 0 auto
    align-items: center
    margin-top: 30px
    border-bottom-1px()
    border-top-1px()
    .synchronization-icon
      width: 19.5px
      height: @width
    .synchronization-text
      font-size: $font-size-14
      font-family: $font-family-regular
      color: $color-374B63
      white-space: nowrap
      margin-left: 10.5px
    .synchronization-switch
      display: block
      right: 1px
      col-center()
    .wx-switch-input
      width: 51px !important
      height: 30px !important
      &::before
        width: 49px !important
        height: 28px !important
      &::after
        width: 28px !important
        height: 28px !important


</style>
