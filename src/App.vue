<script>
  import { resolvePageDetail, checkIsTabPage, resolveQrCode } from 'common/js/util'
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        fromType: '',
        fromId: '',
        shopId: ''
      }
    },
    created() {
      console.log('created')
      // console.log(this.$store)
    },
    onLaunch() {
      console.log('onlaunch')
    },
    onShow(options) {
      this._saveTargetPage(options)
      this._resolveQrCode(options)
      this._decideEntryType(options)
      this._checkIsConnect(options)
    },
    onReady() {
      console.log('onready')
    },
    mounted() {
      console.log('mounted')
    },
    onHide() {
      console.log('onHide')
    },
    update() {
      console.log('update')
    },
    methods: {
      ...mapActions(['setTargetPage']),
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
      },
      _decideEntryType(options) {
        const source = this.$entryType(options)
        console.log(source)
      },
      _checkIsConnect() {
        if (this.shopId) {
          wx.setStorageSync('shopId', this.shopId)
        } else {
          let shopId = wx.getStorageSync('shopId')
          !shopId && wx.setStorageSync('shopId', 12)
        }
        let token = wx.getStorageSync('token')
        let userInfo = wx.getStorageSync('userInfo')
        if (!token || !userInfo) {
          wx.reLaunch({ url: `/pages/login` })
        } else {
          // this.loginIm().then((res) => {
          // })
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/index.styl"
</style>
