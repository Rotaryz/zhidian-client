<template>
  <div class="browse-shop" :style="{paddingTop: pageHeadH + 'px'}">
    <head-item :title="title" :showArrow="true"></head-item>
    <div class="browse-shop-small" v-if="browseShopList">
      <div class="browse-shop-item" v-for="(item, index) in browseShopList" :key="index" @click="checkShop(item)">
        <img :src="item.employee.image_url" class="browse-shop-logo" mode="aspectFill">
        <span class="browse-shop-name">{{item.name}}</span>
        <img :src="image_url + '/zd-image/mine/icon-pressed@2x.png'" class="list-way">
      </div>
    </div>
    <panel-end v-if="upMore && browseShopList.length * 1 !== 0"></panel-end>
    <div class="browse-shop" :class="{'album-list-active' : isNull && browseShopList.length * 1 === 0}" v-if="isNull && browseShopList.length * 1 === 0">
      <blank v-if="isNull && browseShopList.length * 1 === 0"></blank>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import PanelEnd from 'components/panel-end/panel-end'
  import HeadItem from 'components/head-item/head-item'
  import Blank from 'components/blank/blank'
  import { Shop } from 'api'

  export default {
    name: 'browse-shop',
    data() {
      return {
        page: 1,
        upMore: false,
        image_url: this.$imageUrl,
        browseShopList: [],
        isNull: false,
        title: ''
      }
    },
    onShow() {
      this.getBrowserList()
    },
    onReachBottom () {
      this.page++
      this.getMoreBrowserList()
    },
    methods: {
      getBrowserList() {
        this.page = 1
        this.upMore = false
        Shop.getBrowseShop({page: this.page, limit: 10}).then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            this.browseShopList = res.data
            this.isNull = true
            this._isUpList(res)
          } else {
            this.$showToast(res.message)
          }
        })
      },
      _isUpList (res) {
        this.page++
        if (this.browseShopList.length >= res.meta.total * 1) {
          this.upMore = true
        }
      },
      getMoreBrowserList() {
        if (this.upMore) return
        Shop.getMerchantsImg({page: this.page, limit: 10}).then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            this.shopList.push(...res.data)
            this._isUpList(res)
          } else {
            this.$showToast(res.message)
          }
        })
      },
      async checkShop(item) {
        await this.$turnShop({ id: item.id, url: '/pages/guide' })
      }
    },
    components: {
      PanelEnd,
      Blank,
      HeadItem
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .browse-shop
    min-height: 100vh
    box-sizing: border-box
    background: $color-background

  .browse-shop-small
    padding: 0 15px
    box-sizing: border-box
    margin-bottom: 20px
    background: $color-FFFFFF
    border-top-1px(rgba(153,160,170,.3))

  .browse-shop-item
    display: flex
    height: 70px
    align-items: center
    position: relative
    font-size: $font-size-16
    color: $color-1F1F1F
    font-family: $font-family-regular
    border-bottom-1px(rgba(153,160,170,.3))
    &:last-child
      border-none()
    .browse-shop-logo
      height: 40px
      width: 40px
      margin: 0 15px 0 0
      border-radius: 50%
    .list-way
      width: 6px
      height: 12px
      col-center()
      right: 0
</style>
