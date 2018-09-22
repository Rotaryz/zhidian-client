<template>
  <article class="shop">
    <shop-header :shopInfo="shopInfo" :employee="employee" :photoInfo="photoInfo"></shop-header>
    <shop-content :goodsList="goodsList" :selectTab="selectTab" :storyInfo="storyInfo" @changeTab="changeTab"></shop-content>
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
          this._getGoodsList(false),
          this._getMerchantsImg(false),
          this._getStory(false)
        ])
        this.$wechat.hideLoading()
      },
      async _getStory(loading) {
        try {
          let res = await Shop.getStory({}, loading)
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          console.log(res, '-----0-0-')
          this.storyInfo = res.data || {details: []}
        } catch (e) {
          console.error(e)
        }
      },
      async _getMerchantsImg(loading) {
        try {
          let res = await Shop.getMerchantsImg({limit: 1}, loading)
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          this.photoInfo.pic = res.data[0].url
          this.photoInfo.total = res.meta.total
          console.log(res)
        } catch (e) {
          console.error(e)
        }
      },
      async _getShopInfo(loading) {
        try {
          let res = await Guide.getShopInfo({}, loading)
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          console.log(res)
          this.shopInfo = res.data || {}
          this.employee = res.data.employee || {}
          this.shopInfo.rate = this._formatStars(this.shopInfo.rate)
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
</style>
