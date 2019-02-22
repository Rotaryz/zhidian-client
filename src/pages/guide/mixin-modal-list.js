import { Market } from 'api'

export default {
  data() {
    return {
      // 常量
      modalTypeList: [1, 4],
      modalRefShow: ['coupon', 'wxcode'],
      modalShowKey: ['freshCTM', ''],
      modalSubmitKey: ['useFreshCTM', ''],
      // 变量
      modalIndex: -1,
      currentRes: {},
      resFailed: false
    }
  },
  onShow() {
    this.modalIndex = -1
  },
  onHide() {
    this.modalIndex = -1
    this._hideCurrentModal(false)
  },
  methods: {
    // 取消
    cancelHandleModal(flag = true) {
      if (!flag) return
      setTimeout(() => {
        this._action()
      }, 200)
    },
    // 确定
    async submitHandleModal(fn) {
      this[fn]()
    },
    _checkAction() {
      let frozen = wx.getStorageSync('frozen')
      let pages = getCurrentPages() // eslint-disable-line
      let flag = pages[pages.length - 1].route === 'pages/guide'
      return flag && !frozen
    },
    // 弹窗队列执行器
    _action() {
      this.modalIndex++
      let val = this.modalIndex
      if (!this._checkAction()) return
      let type = this.modalTypeList[val]
      let key = this.modalRefShow[val]
      if (!type) return
      this._getModalList(type, async (res) => {
        this.currentRes = res
        let content = res.data.content
        this.$refs[key] && this.$refs[key].show(content, this.modalShowKey[val])
        Market.sendModalEvent({ type: 0, activity_id: res.data.activity_id })
      })
    },
    // 获取弹框信息
    _getModalList(type, callback) {
      Market.getModalList({ type }).then((res) => {
        if (res.error !== this.$ERR_OK) {
          this.$wechat.showToast(res.message)
          // todo
          // let activityId = this.currentRes.data.activity_id
          // Market.sendModalEvent({ type: 1, activity_id: activityId })
          this._action()
          return
        }
        if (res.data.is_popup === 0) {
          this._action()
          return
        }
        callback && callback(res)
      }).catch(() => {
        this._action()
      })
    },
    // 领取优惠券
    async _takeCoupon() {
      let couponId = this.currentRes.data.content.id
      let activityId = this.currentRes.data.activity_id
      let res = await Market.takeCoupon({ coupon_id: couponId })
      this.$wechat.hideLoading()
      if (res.error !== this.$ERR_OK) {
        this.$wechat.showToast(res.message)
        return null
      }
      Market.sendModalEvent({ type: 1, activity_id: activityId })
      let key = this.modalRefShow[this.modalIndex]
      let submitKey = this.modalSubmitKey[this.modalIndex]
      this.$refs[key] && this.$refs[key].update(submitKey)
    },
    // 优惠券领取后跳转
    _navTo() {
      this._hideCurrentModal(false)
      this.$wx.switchTab({url: '/pages/shop'})
    },
    // 复制二维码页面
    copyWxHandle() {
      let activityId = this.currentRes.data.activity_id
      Market.sendModalEvent({ type: 3, activity_id: activityId })
      this._hideCurrentModal(false)
      this.sendCustomMsg(60006)
    },
    _hideCurrentModal(flag = true) {
      this.modalRefShow.forEach((key) => {
        this.$refs[key] && this.$refs[key].cancel(flag)
      })
    }
  }
}
