<template>
    <div class="album">
      <div class="album-list">
        <div class="item-list" v-for="(item, index) in shopList" v-bind:key="index">
          <div class="item-box" @click="previewImg(item)">
            <img :src="item.url" class="item-img" mode="aspectFill">
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import wx from 'common/js/wx'
  import { Shop } from 'api'
  export default {
    name: 'album',
    data() {
      return {
        shopList: [],
        upMore: false,
        page: 1
      }
    },
    onShow() {
      wx.setNavigationBarTitle({ title: '国颐堂' })
      this.getImgList()
    },
    onReachBottom () {
      this.getMoreImgList()
    },
    methods: {
      previewImg(item) {
        wx.previewImage({urls: [item.url]})
      },
      getImgList() {
        this.page = 1
        this.upMore = false
        Shop.getMerchantsImg({page: this.page, limit: 10}).then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            this.shopList = res.data
            this._isUpList(res)
          } else {
            this.$showToast(res.message)
          }
        })
      },
      _isUpList (res) {
        this.page++
        if (this.shopList.length >= res.meta.total * 1) {
          this.upMore = true
        }
      },
      getMoreImgList() {
        if (this.upMore) return
        Shop.getMerchantsImg({page: this.page, limit: 10}).then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            this.shopList.push(res.data)
            this._isUpList(res)
          } else {
            this.$showToast(res.message)
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .album
    min-height: 100vh
    background: $color-background
    padding: 10px 15px
    box-sizing: border-box
  .album-list
    layout(row)
    align-items: center
    .item-list
      width: 50%
      box-sizing: border-box
      margin-bottom: 10px
      &:nth-of-type(odd)
        padding-right: 5px
      &:nth-of-type(even)
        padding-left: 5px
    .item-box
      width: 100%
      height: 0
      padding-bottom: 75%
      box-sizing: border-box
      position: relative
      .item-img
        width: 100%
        height: 100%
        position: absolute
        border-radius: 2px
        display: block

</style>
