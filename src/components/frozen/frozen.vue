<template>
  <div class="frozen" v-if="isShow" :animation="maskAnimation">
    <div class="frozen-content" :animation="modalAnimation">
      <img v-if="imageUrl" :src="imageUrl + '/ws-image/pic-frozen@2x.png'" class="frozen-img">
      <div class="frozen-text">{{openText}}</div>
      <div class="frozen-btn" @click="_submit">{{openType}}</div>
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
        openType: '立即开通',
        openText: '您的店铺已冻结',
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
        this.openType = status ? '立即开通' : '赞播小店'
        this.openText = status ? '您的店铺已冻结' : '您浏览的店铺已冻结'
        this.status = status
      },
      async _submit() {
        if (this.status) {
          this.$router.push('/pages/dredge-serve/dredge-serve')
          //  在我的店铺时
          return
        }
        this.$wx.setStorageSync('employeeId', 100001)
        this.setIsLoadDy(true)
        this.setGoodsRefresh(true)
        await this.getEmployeeConect()
        this.$wechat.hideLoading()
        // 当客户进入时跳转赞播小店
        wx.setStorageSync('frozen', false)
        this.cancel()
        this.$router.push({ path: '/pages/poster/poster', isTab: true })
        this.$emit('backAgent')
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
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
      height: 360px
      background $color-FFFFFF
      box-sizing: border-box
      font-family: $font-family-regular
      padding-top: 52.5px
    .frozen-img
      width: 152px
      height: 139.5px
    .frozen-text
      font-size: $font-size-20
      color: $color-374B63
      margin-top: 18px
    .frozen-btn
      background: $color-F94C5F
      box-shadow: 0 4px 16px 0 rgba(249, 76, 95, 0.30)
      color: $color-FFFFFF
      font-size: $font-size-14
      height: 40px
      line-height: 40px
      width: 190px
      margin: 50px auto
      border-radius: 50px
</style>
