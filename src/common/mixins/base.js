import { Jwt } from 'api'
import { mapActions, mapGetters } from 'vuex'
import { checkIsTabPage } from 'common/js/util'
import imMixin from 'common/mixins/im-mixin'

const shareArr = [1007, 1008, 1036, 1044, 1073, 1074]
const qrCordArr = [1047, 1048, 1049, 1011, 1012, 1013]
// // 不需要自动重置data数据的页面
const unResetPage = []
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
  mixins: [imMixin],
  data() {
    return {
      formId: [],
      imageUrl: this.$imageUrl,
      forzenTimer: ''
    }
  },
  onLoad() {
    this._saveCurrentPage()
  },
  onHide() {
  },
  onUnload() {
    // await this._sendFormId()
    this.timer && clearTimeout(this.timer)
    this.timer && clearInterval(this.timer)
    this._resetData()
  },
  computed: {
    ...mapGetters(['scene', 'pageHeadH'])
  },
  methods: {
    ...mapActions([
      'setIsLoadDy',
      'setShowType'
    ]),
    // async _sendFormId() {
    //   let arr = this.formId
    //   console.log(arr)
    //   let formIds = [...arr]
    //   formIds.length && console.log(arr)
    //   this.formId = []
    // },
    _saveCurrentPage() {
      // 记录页面栈
      if (!this.$mp || !this.$root.$mp.page) return // 只有页面才进行加载
      let url = this.$root.$mp.page.route
      let status = checkIsTabPage(url)
      let query = this.$root.$mp.query
      if (!status) {
        let string = ''
        for (let value in query) {
          string = `&${value}=${query[value]}`
        }
        url = string ? `${url}?${string.slice(1)}` : url
      }
      if (url.includes('pages/error') || url.includes('pages/error-network')) {
        return
      }
      wx.setStorageSync('errorUrl', url)
    },
    _resetData() {
      // 重置页面组件的data数据
      if (!this.$mp) return
      // 重置页面的data数据
      let flag = unResetPage.some(value => {
        let reg = new RegExp(value)
        return reg.test(this.$options.__file)
      })
      if (!flag && this.$options.data) {
        Object.assign(this.$data, this.$options.data())
      }
    },
    $showToast(title, duration = 1500, mask = true, icon = 'none') {
      if (!title) return
      this.$wx.showToast({title, icon, duration, mask})
    },
    $openSetting() {
      // todo
    },
    // 手机formId
    $getFormId(e) {
      let id = e.mp.detail.formId
      Jwt.updateFormId({form_ids: [id]})
    },
    $entryType(options) {
      return _entryType(options)
    },
    async $turnShop(data) { // 切换店铺
      const {id, url} = data
      this.setIsLoadDy(true) // 设置动态刷新
      this.$wechat.showLoading('跳转中')
      this.$wx.setStorageSync('shopId', id)
      await this.getEmployeeConect()
      // console.warn(this.$wx.getStorageSync('shopId'))
      this.$wechat.hideLoading()
      if (checkIsTabPage(url)) {
        this.$wx.switchTab({url})
      } else {
        this.$wx.navigateTo({url})
      }
    },
    $isBoss() {
      return +this.$wx.getStorageSync('userInfoExtend').role_id === this.$role.ROLE_BOSS
    },
    $isMyShop() {
      return +this.$wx.getStorageSync('userInfoExtend').shop_id === +this.$wx.getStorageSync('shopId')
    },
    $hasShop() {
      return +this.$wx.getStorageSync('userInfoExtend').shop_id
    },
    $checkIsMyShop(callback) {
      Jwt.checkIsMyShop().then(res => {
        if (res.error !== this.$ERR_OK) return
        res.data && this.$wx.setStorageSync('userInfoExtend', res.data)
        callback && callback()
      }).catch(e => console.error(e))
    },
    $showForzen() {
      return new Promise((resolve, reject) => {
        clearTimeout(this.forzenTimer)
        this.forzenTimer = setTimeout(() => {
          clearTimeout(this.forzenTimer)
          let isMyShop = this.$isMyShop()
          this.$refs.frozen && this.$refs.frozen.getType(isMyShop)
          let frozen = wx.getStorageSync('frozen')
          resolve(frozen)
          if (!frozen) {
            this.$refs.frozen && this.$refs.frozen.cancel()
            return
          }
          this.$refs.frozen && this.$refs.frozen.show()
        }, 500)
      })
    }
  }
}
