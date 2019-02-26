import { Market } from 'api'
getApp().globalData.$isAlert = [true, true]
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
      modalTypeVal: -1,
      currentRes: {},
      resFailed: false
      // isAlert: [true, true]
    }
  },
  onShow() {
    this.modalIndex = -1
  },
  onHide() {
    this.modalIndex = -1
    this.modalTypeVal = -1
    this._hideCurrentModal(false)
  },
  methods: {
    // 取消
    cancelHandleModal(flag = true) {
      getApp().globalData.$isAlert[this.modalIndex] = false // 不弹窗
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
    _actionPlus() {
      this.modalIndex++
      let idx = this.modalIndex
      let list = this.modalTypeList
      let val = this.modalTypeVal
      if (val === list[idx]) {
        return this._actionPlus()
      }
    },
    // 弹窗队列执行器
    _action() {
      this._actionPlus()
      let val = this.modalIndex
      // 同一小程序,同一店铺弹窗逻辑
      if (!getApp().globalData.$isAlert[val]) {
        let length = getApp().globalData.$isAlert.length
        if (val < length) {
          return this._action()
        } else {
          return
        }
      }
      if (!this._checkAction()) {
        this.modalIndex = -1
        this._hideCurrentModal(false)
        return
      }
      let type = this.modalTypeList[val]
      let key = this.modalRefShow[val]
      if (!type) return
      this._getModalList(type, async (res) => {
        this.modalTypeVal = type
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
      // try {
      //   res = await Market.takeCoupon({ coupon_id: couponId })
      // } catch (e) {
      //   this.$wechat.showToast(e.message)
      //   if (e.code !== 501) return
      //   let activityId = this.currentRes.data.activity_id
      //   Market.sendModalEvent({ type: 1, activity_id: activityId })
      // }
      this.$wechat.hideLoading()
      if (res.biz_error_code === 1001) {
        this.$wechat.showToast(res.message)
        let activityId = this.currentRes.data.activity_id
        Market.sendModalEvent({ type: 1, activity_id: activityId })
        return
      }
      if (!res || res.error !== this.$ERR_OK) {
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
      setTimeout(() => {
        this._hideCurrentModal(false)
      }, 200)
      this.sendCustomMsg(60006)
    },
    _hideCurrentModal(flag = true) {
      this.modalRefShow.forEach((key) => {
        this.$refs[key] && this.$refs[key].cancel(flag)
      })
    }
  }
}
