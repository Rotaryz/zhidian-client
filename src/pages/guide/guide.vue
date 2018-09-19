<template>
  <article class="guide">
    <guide-header :shopInfo="shopInfo" :employee="employee"></guide-header>
    <guide-active></guide-active>
  </article>
</template>

<script type="text/ecmascript-6">
  import GuideHeader from 'components/guide-header/guide-header'
  import GuideActive from 'components/guide-active/guide-active'
  import { Jwt } from 'api'

  export default {
    components: {
      GuideHeader,
      GuideActive
    },
    data() {
      return {
        shopInfo: {},
        employee: {}
      }
    },
    onLoad() {
    },
    async onShow() {
      await this.getBaseInfo()
    },
    methods: {
      async getBaseInfo() {
        this.$wechat.showLoading()
        await Promise.all([
          this._getShopInfo(false)
        ])
        this.$wechat.hideLoading()
      },
      async _getShopInfo(loading) {
        try {
          let res = await Jwt.getShopInfo({}, loading)
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          this.shopInfo = res.data
          this.employee = res.data.employee
        } catch (e) {
          console.error(e)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .guide
    min-height: 100vh
</style>
