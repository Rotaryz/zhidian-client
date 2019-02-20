export default {
  methods: {
    _showAnimation(callback) {
      if (this.isShow) return
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
        callback && callback()
      }, 200)
    },
    _cancelAnimation(callback) {
      if (!this.isShow) return
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
        callback && callback()
      }, 300)
    }
  }
}
