<template>
  <article class="shop" :style="{paddingTop: pageHeadH + 'px'}">
    <head-item :title="title" :showArrow="false"></head-item>
    <shop-header :shopInfo="shopInfo" :employee="employee" :photoInfo="photoInfo" v-if="showHeader"></shop-header>
    <div style="height: 10px; background: #F4F5F7 "></div>
    <div style="height: 20px; background: #fff "></div>
    <shop-content :goodsList="goodsList" :selectTab="selectTab" :storyInfo="storyInfo" @changeTab="changeTab"></shop-content>
    <im-fixed ref="fixed" v-if="!isMyShop"></im-fixed>
  </article>
</template>

<script type="text/ecmascript-6">
  import ShopHeader from 'components/shop-header/shop-header'
  import ShopContent from 'components/shop-content/shop-content'
  import ImFixed from 'components/im-fixed/im-fixed'
  import { Guide, Shop } from 'api'
  import clearWatch from 'common/mixins/clear-watch'
  import imMixin from 'common/mixins/im-mixin'
  import HeadItem from 'components/head-item/head-item'

  export default {
    mixins: [clearWatch, imMixin],
    components: {
      ShopHeader,
      ShopContent,
      ImFixed,
      HeadItem
    },
    data() {
      return {
        shopInfo: {
          rate: new Array(5).fill(0)
        },
        employee: {},
        goodsList: [],
        photoInfo: {},
        storyInfo: {
          details: []
        },
        page: 1,
        more: true,
        selectTab: 0,
        oldShopId: '',
        isMyShop: false,
        showHeader: true,
        title: '门店'
      }
    },
    onLoad() {
    },
    async onShow() {
      this.page = 1
      this.more = true
      this._changeShopResetData()
      this._verdictRole()
      await this.getBaseInfo()
    },
    async onReachBottom() {
      if (!this.more || this.selectTab) return
      this.page++
      await this._getGoodsList()
      this.$wechat.hideLoading()
    },
    async onPullDownRefresh() {
      if (this.selectTab === 0) {
        this.page = 1
        this.more = true
        await this._getGoodsList(false)
        this.$wx.stopPullDownRefresh()
      }
    },
    methods: {
      _verdictRole() {
        if (!this.$wx.getStorageSync('userInfoExtend')) {
          this.$checkIsMyShop(() => {
            this.isMyShop = this.$isMyShop()
          })
        } else {
          this.isMyShop = !!this.$isMyShop()
        }
      },
      async changeTab(index) {
        this.selectTab = index
        if (index === 0) {
          this.page = 1
          this.more = true
          await this._getGoodsList()
          this.$wechat.hideLoading()
        }
      },
      _changeShopResetData() {
        if (+this.oldShopId !== +this.$wx.getStorageSync('shopId')) {
          Object.assign(this.$data, this.$options.data())
          this.$wechat.pageScrollTo()
          this.selectTab = 0
          this.showHeader = false
          this.showHeader = true
          this.oldShopId = this.$wx.getStorageSync('shopId')
          this._verdictRole()
        }
      },
      async getBaseInfo() {
        this.$wechat.showLoading()
        await Promise.all([
          this._getLocation(false),
          this._getGoodsList(false),
          this._getMerchantsImg(false),
          this._getStory(false)
        ])
        this.$wechat.hideLoading()
      },
      _sendRecord() {
        // 0为普通，1为转发，2为扫码
        let code = this.scene === 1 ? 10002 : this.scene === 2 ? 10001 : 10003
        this.sendCustomMsg(code)
      },
      async _getLocation(loading) {
        let location
        try {
          const res = await this.$wechat.getLocation('gcj02')
          location = res
        } catch (e) {
          console.error(e)
        } finally {
          await this._getShopInfo(location, loading)
        }
      },
      async _getStory(loading) {
        try {
          let res = await Shop.getStory({}, loading)
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          this.storyInfo = res.data || { details: [] }
        } catch (e) {
          console.error(e)
        }
      },
      async _getMerchantsImg(loading) {
        try {
          let res = await Shop.getMerchantsImg({ page: 1, limit: 6 }, loading)
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          this.photoInfo.list = res.data || []
          this.photoInfo.total = res.meta.total
        } catch (e) {
          console.error(e)
        }
      },
      async _getShopInfo(location, loading) {
        try {
          let res = await Guide.getShopInfo(location, loading)
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          this.shopInfo = res.data || {}
          this.employee = res.data.employee || {}
          this.shopInfo.rate = this._formatStars(this.shopInfo.rate)
        } catch (e) {
          console.error(e)
        }
      },
      async _getGoodsList(loading) {
        if (!this.more) return
        try {
          let res = await Shop.getGoodsList({ page: this.page }, loading)
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          if (!res.meta || res.meta.current_page === 1) {
            this.goodsList = res.data
          } else {
            let arr = this.goodsList.concat(res.data)
            this.goodsList = arr
          }
          this.more = this.goodsList.length < res.meta.total
        } catch (e) {
          console.error(e)
        }
      },
      _formatStars(rate) {
        let arr = []
        if (rate) {
          while (rate > 0) {
            let n = rate--
            n === 0 || n > 0.5 ? arr.push(1) : arr.push(0.5)
          }
          let num = 5 - arr.length
          let newArr = new Array(num).fill(0)
          arr = arr.concat(newArr)
        } else {
          arr = new Array(5).fill(0)
        }
        return arr
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .shop
    min-height: 100vh
    box-sizing: border-box
</style>
