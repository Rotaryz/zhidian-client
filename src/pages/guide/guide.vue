<template>
  <article class="guide">
    <guide-header :shopInfo="shopInfo" :employee="employee"></guide-header>
    <guide-active :groupList="groupData.list" :cutList="cutData.list" :selectTab="selectTab" @changeTab="changeTab"></guide-active>
  </article>
</template>

<script type="text/ecmascript-6">
  import GuideHeader from 'components/guide-header/guide-header'
  import GuideActive from 'components/guide-active/guide-active'
  import { Guide } from 'api'
  import clearWatch from 'common/mixins/clear-watch'

  export default {
    mixins: [clearWatch],
    components: {
      GuideHeader,
      GuideActive
    },
    data() {
      return {
        shopInfo: {},
        employee: {},
        groupData: {
          list: [],
          rule_id: 1, // 团购
          page: 1,
          more: true
        },
        cutData: {
          list: [],
          rule_id: 3, // 砍价
          page: 1,
          more: true
        },
        selectTab: 1
      }
    },
    onLoad() {
    },
    async onShow() {
      await this.getBaseInfo()
    },
    async onReachBottom() {
      switch (this.selectTab) {
        case 0:
          if (!this.cutData.more) return
          this.cutData.page++
          await this._getCutList({rule_id: this.cutData.rule_id, page: this.cutData.page})
          this.$wechat.hideLoading()
          break
        case 1:
          if (!this.groupData.more) return
          this.groupData.page++
          await this._getGroupList({rule_id: this.groupData.rule_id, page: this.groupData.page})
          this.$wechat.hideLoading()
          break
        default:
          break
      }
    },
    methods: {
      changeTab(index) {
        this.selectTab = index
        console.log(this.selectTab, 'asdsadadadd')
        switch (index) {
          case 0:
            this.cutData.page = 1
            this.cutData.more = true
            this._getCutList({rule_id: this.cutData.rule_id, page: this.cutData.page})
            this.$wechat.hideLoading()
            break
          case 1:
            this.groupData.page = 1
            this.groupData.more = true
            this._getGroupList({rule_id: this.groupData.rule_id, page: this.groupData.page})
            this.$wechat.hideLoading()
            break
          default:
            break
        }
      },
      async getBaseInfo() {
        this.$wechat.showLoading()
        await Promise.all([
          this._getShopInfo(false),
          this._getGroupList({rule_id: this.groupData.rule_id, page: this.groupData.page}, false),
          this._getCutList({rule_id: this.cutData.rule_id, page: this.cutData.page}, false)
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
      async _getGroupList(data, loading) {
        if (!this.groupData.more) return
        try {
          let res = await Guide.getActiveList(data, loading)
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          if (this.groupData.page === 1) {
            this.groupData.list = res.data
          } else {
            let arr = this.groupData.list.concat(res.data)
            this.groupData.list = arr
          }
          this.groupData.more = this.groupData.list.length < res.meta.total
        } catch (e) {
          console.error(e)
        }
      },
      async _getCutList(data, loading) {
        if (!this.cutData.more) return
        try {
          let res = await Guide.getActiveList(data, loading)
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          if (this.cutData.page === 1) {
            this.cutData.list = res.data
          } else {
            let arr = this.cutData.list.concat(res.data)
            this.cutData.list = arr
          }
          this.cutData.more = this.cutData.list.length < res.meta.total
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
