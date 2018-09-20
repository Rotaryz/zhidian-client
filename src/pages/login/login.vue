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
  import {mapGetters} from 'vuex'
  import { checkIsTabPage } from 'common/js/util'
  const LOGINPAGE = '/pages/login'
  const INDEX = '/pages/guide'
  export default {
    data() {
      return {
        imgUrl: this.$imageUrl,
        authorizationCount: 0
      }
    },
    methods: {
      async _authorization() {
        const wxUser = await this.$wechat.getUserInfo()
        let resCode = await this.$wechat.login()
        let code = resCode.code
        const data = {
          code,
          iv: wxUser.iv,
          encryptedData: wxUser.encryptedData
        }
        let Json = await Jwt.getToken(data)
        if (Json.error !== this.$ERR_OK && this.authorizationCount <= 5) {
          this.authorizationCount++
          await this._authorization()
          return
        } else if (Json.error !== this.$ERR_OK && this.authorizationCount > 5) {
          this.$wx.showToast({title: '登录失败，请重新登录', icon: 'none', duration: 1000})
          return false
        }
        this.authorizationCount = 1
        const res = Json.data
        let token = res.access_token
        let userInfo = res.customer_info
        return {
          token,
          userInfo
        }
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
          let userInfo, token
          if (res.unauthorized) {
            let resMsgJson = await this._authorization()
            userInfo = resMsgJson.userInfo
            token = resMsgJson.token
          } else {
            userInfo = res.customer_info
            token = res.access_token
          }
          this.$wx.setStorageSync('userInfo', userInfo)
          this.$wx.setStorageSync('token', token)
          let isLoginPage = this.targetPage.indexOf(LOGINPAGE)
          if (isLoginPage !== -1) {
            wx.switchTab({url: INDEX})
          } else {
            if (checkIsTabPage(this.targetPage)) {
              wx.switchTab({url: this.targetPage})
            } else {
              wx.redirectTo({url: this.targetPage})
            }
          }
        } catch (e) {
          e && this.$showToast(e.msg)
        }
      }
    },
    computed: {
      ...mapGetters(['targetPage'])
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
