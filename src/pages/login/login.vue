<template>
  <div class="login" :style="{paddingTop: pageHeadH + 'px'}">
    <div class="login-icon">
      <img :src="imgUrl + '/zd-image/login/pic-wxsq@2x.png'" v-if="imgUrl" mode="widthFix" class="login-icon-img">
    </div>
    <!--<img :src="imgUrl + '/zd-image/login/icon-wechat@2x.png'" v-if="imgUrl" class="login-icon">-->
    <div class="login-title" @click="test">点赞中国，传播国货</div>
    <form class="btn-box" report-submit @submit="_getFormId">
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
        authorizationCount: 0,
        formId: '',
        code: ''
      }
    },
    async onLoad() {
      let resCode = await this.$wechat.login()
      this.code = resCode.code
      wx.setStorageSync('errPage', '/pages/login/login')
    },
    onUnload() {
      wx.setStorageSync('errPage', '')
      this.formId && Jwt.updateFormId({form_ids: [this.formId]})
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
        let data = {
          iv,
          encrypted_data: encryptedData,
          code: this.code
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
          Jwt.updateFormId({form_ids: [this.formId]})
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
      },
      _getFormId(e) {
        let id = e.mp.detail.formId
        this.formId = id
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
    box-sizing: border-box
    display: flex
    flex-direction: column
    align-items: center
    .login-logo
      width: 59px
      height: 63px
      padding: 15vw 0 3vw
    .login-title
      font-family: FZJUNH_CUJW--GB1-0
      font-size: 5.33vw
      color: #455A64
      letter-spacing: 1vw
      margin-bottom: 26.54vw
      margin-left :2vw
    .login-icon
      width: 54.4vw
      height: 45.6vw
      padding: 18.13vw 0 7.6vw
      .login-icon-img
        width: 100%
        height :100%
    .btn-box
      width: 100%
      box-sizing: border-box
      padding: 0 9.3vw
      .login-btn
        width: 100%
        height: 12vw
        border-radius: 26.6vw
        background-image: linear-gradient(90deg, #EB5C5C 0%, #D32F2F 100%)
        box-shadow: 0 4px 16px 0 rgba(211, 47, 47, 0.20)
        display: flex
        align-items: center
        justify-content: center
        .btn-icon
          width: 7.2vw
          height: 5.86vw
          margin-right: 2.66vw
        .btn-txt
          font-size: $font-size-16
          color: $color-white
          font-family: $font-family-regular
          letter-spacing: 0.6px
        &:before, &:after
          border: 0 none
    .explain
      margin-top: 5.3vw
      font-family: PingFangSC-Regular
      font-size: 3.73vw
      color: #99A0AA
      letter-spacing: 0.6px
</style>
