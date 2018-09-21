import {Jwt} from 'api'
import {mapActions} from 'vuex'
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
    ...mapActions(['setIsLoadDy']),
    $showToast(title, duration = 1500, mask = true, icon = 'none') {
      if (!title) return
      this.$wx.showToast({title, icon, duration, mask})
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
      this.setIsLoadDy(true) // 设置动态刷新
    },
    $isBoss() {
      return +this.$wx.getStorageSync('userInfoExtend').role_id === this.$role.ROLE_BOSS
    },
    $isMyShop() {
      return +this.$wx.getStorageSync('userInfoExtend').shop_id === +this.$wx.getStorageSync('shopId')
    },
    $hasShop() {
      return this.$wx.getStorageSync('userInfoExtend').shop_id
    },
    $checkIsMyShop(callback) {
      Jwt.checkIsMyShop().then(res => {
        if (res.error !== this.$ERR_OK) return
        res.data && this.$wx.setStorageSync('userInfoExtend', res.data)
        callback && callback()
      }).catch(e => console.error(e))
    }
  }
}
