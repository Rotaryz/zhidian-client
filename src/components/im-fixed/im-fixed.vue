<template>
  <div class="im-fixed" @touchmove="move" @touchstart="start" :style="{transform: 'translate(' + imPosition.x + 'px, 0)'}">
    <form class="msg-fix-box" report-submit @submit.stop="toChat">
      <button class="msg-icon-box" hover-class="none" formType="submit" :open-type="chatBtnType" @getphonenumber="getPhoneNumber">
        <img src="/static/im-img/icon-im@2x.png" class="msg-icon">
      </button>
      <span class="msg-count" v-show="currentUnRead">{{currentUnRead}}</span>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapActions } from 'vuex'
  import { Jwt } from 'api'
  // import imMixin from 'common/mixins/im-mixin'

  export default {
    // mixins: [imMixin],
    props: {
      // 是否需要自定义事件
      custom: {
        default: 'no'
      }
    },
    data() {
      return {
        maxX: -200
      }
    },
    onLoad() {
      console.log(this.$wechat)
      this.$wechat.getSystemInfo().then((res) => {
        if (res.errMsg === 'getSystemInfo:ok') {
          this.maxX = 80 - res.windowWidth
        } else {
          this.maxX = -200
        }
      })
      this._isGetPhone()
    },
    methods: {
      ...mapActions(['setChatBtnType', 'setImPosition']),
      toChat(e) {
        // this.sendCustomMsg(60001)
        this.$getFormId(e)
        if (this.custom === 'yes') {
          this.$emit('imCustom')
          return
        }
        if (this.chatBtnType === 'getPhoneNumber') {
          return
        }
        let url = `/pages/chat-msg`
        this.$wx.navigateTo({url})
      },
      async _isGetPhone() {
        let mobile = this.$wx.getStorageSync('userInfo').mobile
        let buttonType = mobile ? '' : 'getPhoneNumber'
        this.setChatBtnType(buttonType)
      },
      async getPhoneNumber(event) {
        const e = event.mp
        if (e.detail.errMsg !== 'getPhoneNumber:ok') {
          let url = `/pages/chat-msg`
          wx.navigateTo({url})
          return
        }
        let login = await this.$wechat.login()
        if (login.errMsg !== 'login:ok') {
          return
        }
        const code = login.code
        const iv = e.detail.iv
        const encryptedData = e.detail.encryptedData
        const data = {iv, encrypted_data: encryptedData, code}
        Jwt.setCustomerPhone(data).then(res => {
          if (res.error === this.$ERR_OK) {
            let userInfo = this.$wx.getStorageSync('userInfo')
            userInfo.mobile = res.data.mobile
            this.$wx.setStorageSync('userInfo', userInfo)
            this.setChatBtnType('')
          }
          this.$wechat.hideLoading()
          let url = `/pages/chat-msg`
          this.$wx.navigateTo({url})
        })
      },
      move(e) {
        let diffX = e.clientX - this.imPosition.startX
        let res = this.imPosition.x + diffX
        if (res >= 55 || res <= this.maxX) return
        this.setImPosition({
          x: res,
          startX: e.clientX
        })
      },
      start(e) {
        this.setImPosition({
          x: this.imPosition.x,
          startX: e.clientX
        })
      }
    },
    computed: {
      ...mapGetters([
        'currentMsg',
        'descMsg',
        'currentUnRead',
        'chatBtnType',
        'imLogin',
        'imPosition'
      ])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .im-fixed
    position: fixed
    right: 30px
    top: 80vh
    width: 50px
    height: 50px
    z-index: 100

  .msg-fix-box
    position: absolute
    right: 0
    bottom: 0
    width: 50px
    height: 50px
    z-index: 100
    .msg-icon-box
      width: 100%
      height: 100%
      padding: 0
      margin: 0
      border-radius: 100%
      box-shadow: 0 8px 7px 0 rgba(211, 211, 215, 0.21)
      background-color: transparent
      &:before, &:after
        border: 0 none
    .msg-icon
      width: 100%
      height: 100%
    .msg-count
      position: absolute
      right: -3px
      top: -3px
      min-width: 15px
      height: 15px
      border-radius: 50%
      background: #F9543C
      border: 1px solid #FFF
      line-height: 15px
      font-size: 12px
      color: #FFF
      font-family: $font-family-medium
      text-align: center

</style>
