<template>
  <div class="frozen" v-if="isShow" :animation="maskAnimation">
    <div class="frozen-content" :animation="modalAnimation">
      <img v-if="imageUrl" :src="imageUrl + '/zd-image/1.2/pic-shopsuspend@2x.png'" class="frozen-img">
      <div class="frozen-text">{{openText}}</div>
      <div class="frozen-btn border-top-1px" @click="_submit">{{openType}}</div>
    </div>
  </div>
</template>

<script>
  import { baseURL } from 'api/config'
  import base from 'common/mixins/base'
  import { mapActions } from 'vuex'

  export default {
    mixins: [base],
    name: 'frozen',
    data() {
      return {
        imageUrl: baseURL.image,
        msg: '',
        isShow: false,
        maskAnimation: '',
        modalAnimation: '',
        openType: '我知道了',
        openText: '店铺暂停使用',
        status: false
      }
    },
    methods: {
      ...mapActions(['setIsLoadDy', 'setGoodsRefresh']),
      show() {
        let frozen = wx.getStorageSync('frozen')
        if (!frozen) {
          return
        }
        let modalAnimation = wx.createAnimation({
          duration: 500,
          timingFunction: 'cubic-bezier(1, -0.07, 0.51, 1.48)',
          delay: 0
        })
        let maskAnimation = wx.createAnimation({
          duration: 500,
          timingFunction: 'linear',
          delay: 0
        })
        maskAnimation.opacity(0).step()
        modalAnimation.scale(0.3).step()
        this.maskAnimation = maskAnimation.export()
        this.modalAnimation = modalAnimation.export()
        this.isShow = true
        setTimeout(() => {
          maskAnimation.opacity(1).step()
          modalAnimation.scale(1).step()
          this.maskAnimation = maskAnimation.export()
          this.modalAnimation = modalAnimation.export()
        }, 200)
        this.$emit('show')
      },
      cancel() {
        // this.isShow = false
        // this.$emit('close')
        let modalAnimation = wx.createAnimation({
          duration: 300,
          timingFunction: 'linear',
          delay: 0
        })
        let maskAnimation = wx.createAnimation({
          duration: 300,
          timingFunction: 'linear',
          delay: 0
        })
        maskAnimation.opacity(0).step()
        modalAnimation.scale(0.3).step()
        this.maskAnimation = maskAnimation.export()
        this.modalAnimation = modalAnimation.export()
        setTimeout(() => {
          maskAnimation.opacity(1).step()
          modalAnimation.scale(1).step()
          this.maskAnimation = maskAnimation.export()
          this.modalAnimation = modalAnimation.export()
          this.isShow = false
        }, 300)
      },
      getType(status) {
        this.openType = status ? '我知道了' : '我知道了'
        this.openText = status ? '店铺暂停使用' : '店铺暂停使用'
        this.status = status
      },
      async _submit() {
        wx.navigateTo({url: '/pages/browse-shop'})
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  @import "~common/stylus/base"
  .frozen
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 9999
    display: flex
    align-items: center
    justify-content: center
    background-color: rgba(32, 32, 46, 0.8)
    .frozen-content
      text-align: center
      background-color: $color-FFFFFF
      border: 1px solid rgba(32, 32, 46, 0.10)
      border-radius: 6px
      width: 300px
      height: 300px
      background $color-FFFFFF
      box-sizing: border-box
      font-family: $font-family-regular
      padding-top: 37px
    .frozen-img
      width: 160px
      height: 142px
    .frozen-text
      font-size: $font-size-16
      color: $color-1F1F1F
      margin-top: 24px
    .frozen-btn
      width: 100%
      height: 50px
      position: absolute
      left: 0
      bottom: 0
      text-align: center
      line-height: 50px
      font-family: $font-family-regular
      color: $color-ED2C2B
      letter-spacing: 0.8px
      font-size: $font-size-16
</style>
