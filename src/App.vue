<script>
  import { resolvePageDetail, checkIsTabPage, resolveQrCode } from 'common/js/util'
  import {mapActions, mapGetters} from 'vuex'
  import {Jwt, Market} from 'api'
  import imMixin from 'common/mixins/im-mixin'

  export default {
    mixins: [imMixin],
    data() {
      return {
        fromType: '',
        fromId: '',
        shopId: '',
        lastMarketId: -1 // 上一次marketId
      }
    },
    created() {
      this._setDefaultShop()
    },
    onLaunch() {
    },
    async onShow(options) {
      if (this.appShowType) {
        this.setShowType(false)
        return
      }
      this._initMarketEvent(options)
      this._getSystemInfo()
      this._saveTargetPage(options)
      this._resolveQrCode(options)
      this._decideEntryType(options)
      this._setFromData()
      await this._checkIsConnect(options)
    },
    onHide() {
      getApp().globalData.$isAlert = [true, true]
    },
    computed: {
      ...mapGetters([
        'appShowType'
      ])
    },
    methods: {
      ...mapActions([
        'setTargetPage',
        'setShowType',
        'setScene',
        'setFromMsg',
        'setPageHeadH',
        'setPageJump'
        // 'setAction'
      ]),
      // 发送事件
      _initMarketEvent(options) {
        let marketId = options.query.marketId
        if (!marketId || this.lastMarketId === marketId) return
        this.lastMarketId = marketId
        Market.sendModalEvent({ type: 0, activity_id: marketId })
        Market.sendModalEvent({ type: 2, activity_id: marketId })
      },
      _getSystemInfo() {
        try {
          let res = this.$wx.getSystemInfoSync()
          let statusBarHeight = res.statusBarHeight || 20
          let height = +statusBarHeight + 44
          this.setPageHeadH(height)
        } catch (e) {
          console.error(e)
        }
      },
      async _setDefaultShop() {
        try {
          let res = await Jwt.getDefaultShop()
          if (res.error !== this.$ERR_OK) return
          this.$wx.setStorageSync('defaultShop', res.data.default_shop)
          if (!res.data.exist) {
            this.$wx.setStorageSync('shopId', res.data.default_shop)
          }
          return res.data.default_shop
        } catch (e) {
          console.error(e)
        }
      },
      _saveTargetPage(options) {
        let targetPage
        if (checkIsTabPage(options.path)) {
          targetPage = '/' + options.path
        } else {
          targetPage = resolvePageDetail(options.path, options.query)
        }
        this.setTargetPage(targetPage)
      },
      _resolveQrCode(options) {
        const qrCodeParams = options.query.scene
        if (!qrCodeParams) {
          this._resolveOptions(options)
          return
        }
        let sceneMsg = decodeURIComponent(qrCodeParams)
        let params = resolveQrCode(sceneMsg)
        const fromMsgStr = params.f
        this.shopId = params.s
        if (fromMsgStr) {
          let fromTypeStr = fromMsgStr.slice(0, 1)
          switch (fromTypeStr) {
            case 'e':
              this.fromType = 1
              break
            case 'm':
              this.fromType = 2
              break
            case 'c':
              this.fromType = 3
              break
            default:
              this.fromType = 0
              break
          }
          this.fromId = fromMsgStr.slice(1)
        } else {
          this.fromType = 0
          this.fromId = ''
        }
      },
      _resolveOptions(options) {
        this.fromType = options.query.fromType ? options.query.fromType : ''
        this.fromId = options.query.fromId ? options.query.fromId : ''
        this.shopId = options.query.shopId ? options.query.shopId : ''
        if (options.query.is_jump) {
          this.setPageJump(options.query.is_jump)
        }
      },
      _decideEntryType(options) {
        this.source = this.$entryType(options)
      },
      _setFromData() {
        this.setScene(this.source)
        this.setFromMsg({fromType: this.fromType, fromId: this.fromId, source: this.source})
      },
      async _checkIsConnect() {
        if (this.shopId) {
          this.$wx.setStorageSync('shopId', this.shopId)
        } else {
          let shopId = this.$wx.getStorageSync('shopId')
          if (!shopId) {
            let defaultShop = this.$wx.getStorageSync('defaultShop')
            !defaultShop && (defaultShop = await this._setDefaultShop())
            this.$wx.setStorageSync('shopId', defaultShop)
          }
        }
        let token = this.$wx.getStorageSync('token')
        let userInfo = this.$wx.getStorageSync('userInfo')
        if (!token || !userInfo) {
          wx.reLaunch({ url: `/pages/login` })
        } else {
          await this.loginIm()
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/index.styl"
</style>
