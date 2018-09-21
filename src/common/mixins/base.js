const shareArr = [1007, 1008, 1036, 1044, 1073, 1074]
const qrCordArr = [1047, 1048, 1049, 1011, 1012, 1013]

// 判定场景值 0普通 1分享 2扫码
function _entryType(options) {
  if (!options && options.scene) return 0
  let scene = +options.scene
  let isShare = shareArr.includes(scene)
  let isQrcord = qrCordArr.includes(scene)
  let source = isShare ? 1 : isQrcord ? 2 : 0
  return source
}

export default {
  data() {
    return {
      formId: '',
      imageUrl: this.$imageUrl
    }
  },
  methods: {
    $showToast(title, duration = 1500, mask = true, icon = 'none') {
      if (!title) return
      this.$wx.showToast({ title, icon, duration, mask })
    },
    $openSetting() {
      // todo
    },
    $getFormId(e) {
      this.formId = e.mp.detail.formId
    },
    $entryType(options) {
      return _entryType(options)
    },
    $turnShop(data) { // 切换店铺
      // todo
    }
  }
}
