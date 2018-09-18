<template>
  <div class="login">
    <img :src="imgUrl + '/ws-image/pic-logo@2x.png'" v-if="imgUrl" class="login-logo">
    <div class="login-title" @click="test">当销冠 用智推</div>
    <img :src="imgUrl + '/ws-image/pic-WeChat authorization_radar@2x.png'" v-if="imgUrl" class="login-icon">
    <form class="btn-box" report-submit @submit="getFormId">
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo" class="login-btn" hover-class="none" formType="submit">
        <img :src="imgUrl + '/ws-image/icon-wechat@2x.png'" v-if="imgUrl" class="btn-icon">
        <span class="btn-txt">微信授权</span>
      </button>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Jwt } from 'api'

  export default {
    data() {
      return {
        imgUrl: this.$imageUrl
      }
    },
    methods: {
      test() {
        this.$showToast('masd')
      },
      async onGotUserInfo(e) {
        let res = e.mp.detail
        if (res.errMsg !== 'getUserInfo:ok') {
          this.$openSetting()
          return
        }
        let iv = res.iv
        let encryptedData = res.encryptedData
        let resCode = await this.$wechat.login()
        let code = resCode.code
        let data = {
          iv,
          encrypted_data: encryptedData,
          code
        }
        try {
          res = await Jwt.getToken(data)
          this.$wechat.hideLoading()
          if (res.error !== this.$ERR_Ok) {
            this.$showToast(res.message)
            return
          }
          const {userInfo, token} = [res.customer_info, res.access_token]
          this.$wx.setStorageSync('userInfo', userInfo)
          this.$wx.setStorageSync('token', token)
        } catch (e) {
          e && this.$showToast(e.msg)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/base"
  @import "~common/stylus/mixin"

  .login
    width: 100vw
    height: 100vh
    display: flex
    flex-direction: column
    align-items: center
    .login-logo
      width: 59px
      height: 63px
      padding: 15vw 0 15px
    .login-title
      font-size: $font-size-20
      font-family: $font-family-medium
      letter-spacing: 5px
      margin-bottom: 14vw
      color: #374B63
    .login-icon
      width: 170px
      height: 167.5px
      margin-bottom: 16vw
    .btn-box
      width: 100%
      box-sizing: border-box
      padding: 0 35px
      .login-btn
        width: 100%
        height: 45px
        border-radius: 2px
        background: #F94C5F
        box-shadow: 0 4px 16px 0 #F9CBD0
        display: flex
        align-items: center
        justify-content: center
        .btn-icon
          width: 27px
          height: 22px
          margin-right: 10px
        .btn-txt
          font-size: $font-size-16
          color: $color-white
          font-family: $font-family-regular
          letter-spacing: 0.6px
        &:before, &:after
          border: 0 none
</style>
