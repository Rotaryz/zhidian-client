<template>
  <div class="login">
    <img :src="imgUrl + '/ws-image/pic-logo@2x.png'" v-if="imgUrl" class="login-logo">
    <div class="login-title">当销冠 用智推</div>
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
  export default {
    data() {
      return {
        imgUrl: this.imageUrl
      }
    },
    methods: {
      onGotUserInfo() {
      }
    }
  }
</script>
<!--<script type="text/ecmascript-6">-->
  <!--import * as wechat from 'common/js/wechat'-->
  <!--import {Im} from 'api'-->
  <!--// import { baseURL, ERR_OK } from 'api/config'-->
  <!--// import {mapGetters} from 'vuex'-->
  <!--import {chackTabPage} from 'common/js/util'-->
  <!--// import base from 'common/mixins/base'-->
  <!--// const LOGINPAGE = '/pages/login/login'-->
  <!--// const INDEX = '/pages/poster/poster'-->
  <!--export default {-->
    <!--// mixins: [base],-->
    <!--name: 'LogIn',-->
    <!--data() {-->
      <!--return {-->
        <!--imgUrl: this.imageUrl,-->
        <!--authorizationCount: 1,-->
        <!--formId: ''-->
      <!--}-->
    <!--},-->
    <!--onLoad() {-->
      <!--wx.setStorageSync('errPage', '/pages/login/login')-->
    <!--},-->
    <!--onUnload() {-->
      <!--this.authorizationCount = 1-->
      <!--this.formId = ''-->
      <!--wx.setStorageSync('errPage', '')-->
    <!--},-->
    <!--methods: {-->
      <!--async _authorization() {-->
        <!--const wxUser = await wechat.getUserInfo()-->
        <!--let resCode = await wechat.login()-->
        <!--let code = resCode.code-->
        <!--const data = {-->
          <!--code,-->
          <!--iv: wxUser.iv,-->
          <!--encryptedData: wxUser.encryptedData,-->
          <!--weixin: 'jike-weishang'-->
        <!--}-->
        <!--let Json = await Im.getToken(data)-->
        <!--if (Json.error !== ERR_OK && this.authorizationCount <= 5) {-->
          <!--this.authorizationCount++-->
          <!--await this._authorization()-->
          <!--return-->
        <!--} else if (Json.error !== ERR_OK && this.authorizationCount > 5) {-->
          <!--wx.showToast({title: '登录失败，请重新登录', icon: 'none', duration: 1000})-->
          <!--return false-->
        <!--}-->
        <!--this.authorizationCount = 1-->
        <!--const res = Json.data-->
        <!--let token = res.access_token-->
        <!--let userInfo = res.customer_info-->
        <!--return {-->
          <!--token,-->
          <!--userInfo-->
        <!--}-->
      <!--},-->
      <!--async onGotUserInfo(e) {-->
        <!--let res = e.mp.detail-->
        <!--if (res.errMsg !== 'getUserInfo:ok') return-->
        <!--let iv = res.iv-->
        <!--let encryptedData = res.encryptedData-->
        <!--let resCode = await wechat.login()-->
        <!--let code = resCode.code-->
        <!--let data = {-->
          <!--iv,-->
          <!--encryptedData,-->
          <!--code,-->
          <!--weixin: 'jike-weishang'-->
        <!--}-->
        <!--Im.getToken(data).then(async (resData) => {-->
          <!--if (resData.error === ERR_OK) {-->
            <!--let resMsg = resData.data-->
            <!--let userInfo, token-->
            <!--if (resMsg.unauthorized) {-->
              <!--let resMsgJson = await this._authorization()-->
              <!--userInfo = resMsgJson.userInfo-->
              <!--token = resMsgJson.token-->
            <!--} else {-->
              <!--userInfo = resMsg.customer_info-->
              <!--token = resMsg.access_token-->
            <!--}-->
            <!--wx.setStorageSync('userInfo', userInfo)-->
            <!--wx.setStorageSync('token', token)-->
            <!--if (this.formId) {-->
              <!--Im.getFormId({ form_ids: [this.formId] }, false)-->
            <!--}-->
            <!--this.loginIm().then((res) => {-->
              <!--let isLoginPage = this.targetPage.indexOf(LOGINPAGE)-->
              <!--if (isLoginPage !== -1) {-->
                <!--wx.switchTab({url: INDEX})-->
              <!--} else {-->
                <!--if (chackTabPage(this.targetPage)) {-->
                  <!--wx.switchTab({url: this.targetPage})-->
                <!--} else {-->
                  <!--wx.redirectTo({url: this.targetPage})-->
                <!--}-->
              <!--}-->
            <!--})-->
          <!--} else {-->
            <!--wx.showToast({title: '登录失败，请重新登录', icon: 'none', duration: 1000})-->
          <!--}-->
          <!--wechat.hideLoading()-->
        <!--})-->
      <!--},-->
      <!--getFormId(e) {-->
        <!--this.formId = e.mp.detail.formId-->
      <!--}-->
    <!--},-->
    <!--computed: {-->
      <!--...mapGetters([-->
        <!--'targetPage'-->
      <!--])-->
    <!--}-->
  <!--}-->
<!--</script>-->

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
