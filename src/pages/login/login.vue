<template>
  <div class="login">
    <div class="login-icon">
      <img :src="imgUrl + '/zd-image/login/pic-wxsq@2x.png'" v-if="imgUrl" mode="widthFix" class="login-icon-img">
    </div>
    <!--<img :src="imgUrl + '/zd-image/login/icon-wechat@2x.png'" v-if="imgUrl" class="login-icon">-->
    <div class="login-title" @click="test">点赞中国，传播国货</div>
    <form class="btn-box" report-submit @submit="$getFormId">
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo" class="login-btn" hover-class="none" formType="submit">
        <img :src="imgUrl + '/ws-image/icon-wechat@2x.png'" v-if="imgUrl" class="btn-icon">
        <span class="btn-txt">微信快捷登录</span>
      </button>
    </form>
    <div class="explain">登录后可购物，参加优惠活动</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Jwt } from 'api'
  import { mapGetters } from 'vuex'
  import { checkIsTabPage } from 'common/js/util'
  import ImMixin from 'common/mixins/im-mixin'

  const LOGINPAGE = '/pages/login'
  const INDEX = '/pages/guide'
  export default {
    mixins: [ImMixin],
    data() {
      return {
        imgUrl: this.$imageUrl,
        authorizationCount: 0
      }
    },
    onLoad() {
      wx.setStorageSync('errPage', '/pages/login/login')
    },
    onUnload() {
      wx.setStorageSync('errPage', '')
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
          this.$showToast('登录失败，请重新登录')
          return false
        }
        this.authorizationCount = 1
        const res = Json.data
        let token = res.access_token
        let userInfo = res.customer_info
        let appToken = res.app_token
        return {
          token,
          userInfo,
          appToken
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
          let userInfo, token, appToken
          if (res.data.unauthorized) {
            let resMsgJson = await this._authorization()
            userInfo = resMsgJson.userInfo
            token = resMsgJson.token
            appToken = resMsgJson.appToken
          } else {
            userInfo = res.data.customer_info
            token = res.data.access_token
            appToken = res.data.app_token
          }
          this.$wechat.hideLoading()
          this.$wx.setStorageSync('userInfo', userInfo)
          this.$wx.setStorageSync('token', token)
          this.$wx.setStorageSync('appToken', appToken)
          this._makeConnect()
        } catch (e) {
          e && this.$showToast(e.msg)
        }
      },
      _switchPage() {
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
      },
      async _makeConnect() {
        try {
          await this.loginIm()
          this._switchPage()
        } catch (e) {
          console.error(e)
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
      font-family: FZJUNH_CUJW--GB1-0
      font-size: 40 rpx
      color: #455A64
      letter-spacing: 11.11px
      margin-bottom: 99.5px
    .login-icon
      width: 204px
      min-height: 171px
      padding: 18.13vw 0 28.5px
      .login-icon-img
        width: 100%
    .btn-box
      width: 100%
      box-sizing: border-box
      padding: 0 35px
      .login-btn
        width: 100%
        height: 45px
        border-radius: 100px
        background-image: linear-gradient(90deg, #EB5C5C 0%, #D32F2F 100%)
        box-shadow: 0 4px 16px 0 rgba(211, 47, 47, 0.20)
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
    .explain
      margin-top: 20px
      font-family: PingFangSC-Regular
      font-size: 14px
      color: #99A0AA
      letter-spacing: 0.6px
</style>
