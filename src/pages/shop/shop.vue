<template>
  <article class="shop">
    <shop-header :shopInfo="shopInfo" :employee="employee"></shop-header>
    <shop-content :goodsList="goodsList"></shop-content>
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
        goodsList: []
      }
    },
    async onShow() {
      await this.getBaseInfo()
    },
    methods: {
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
          this.shopInfo = res.data
          this.employee = res.data.employee
        } catch (e) {
          console.error(e)
        }
      },
      async _getGoodsList() {
        try {
          let res = await Shop.getGoodsList()
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          console.log(res)
          this.goodsList = res.data
          console.log(this.goodsList)
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
