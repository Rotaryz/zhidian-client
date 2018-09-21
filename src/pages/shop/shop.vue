<template>
  <article class="shop">
    <shop-header :shopInfo="shopInfo" :employee="employee"></shop-header>
    <shop-content :goodsList="goodsList" :selectTab="selectTab" @changeTab="changeTab"></shop-content>
  </article>
</template>

<script type="text/ecmascript-6">
  import ShopHeader from 'components/shop-header/shop-header'
  import ShopContent from 'components/shop-content/shop-content'
  import { Guide, Shop } from 'api'

  export default {
    components: {
      ShopHeader,
      ShopContent
    },
    data() {
      return {
        shopInfo: {},
        employee: {},
        goodsList: [],
        page: 1,
        more: true,
        selectTab: 0
      }
    },
    async onShow() {
      await this.getBaseInfo()
    },
    async onReachBottom() {
      if (!this.more || this.selectTab) return
      this.page++
      await this._getGoodsList()
      this.$wechat.hideLoading()
    },
    methods: {
      async changeTab(index) {
        this.selectTab = index
        if (index === 0) {
          this.page = 1
          this.more = true
          await this._getGoodsList()
          this.$wechat.hideLoading()
        }
      },
      async getBaseInfo() {
        this.$wechat.showLoading()
        await Promise.all([
          this._getShopInfo(false),
          this._getGoodsList(false)
        ])
        this.$wechat.hideLoading()
      },
      async _getShopInfo(loading) {
        try {
          let res = await Guide.getShopInfo({}, loading)
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          this.shopInfo = res.data || {}
          this.employee = res.data.employee || {}
        } catch (e) {
          console.error(e)
        }
      },
      async _getGoodsList() {
        if (!this.more) return
        try {
          let res = await Shop.getGoodsList({page: this.page})
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          if (this.page === 1) {
            this.goodsList = res.data
          } else {
            let arr = this.goodsList.concat(res.data)
            this.goodsList = arr
          }
          this.more = this.goodsList.length < res.meta.total
        } catch (e) {
          console.error(e)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .shop
    min-height: 100vh
</style>
