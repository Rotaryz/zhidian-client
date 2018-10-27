<template>
  <div class="album">
    <div class="album-box" :class="{'album-list-active' : isNull && shopList.length * 1 === 0}">
      <div class="album-list" v-if="shopList">
        <div class="item-list" v-for="(item, index) in shopList" v-bind:key="index">
          <div class="item-box" @click="previewImg(item)">
            <img v-if="item.image_url_thumb" :src="item.image_url_thumb" class="item-img" mode="aspectFill">
          </div>
        </div>
      </div>
      <blank v-if="isNull && shopList.length * 1 === 0"></blank>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Blank from 'components/blank/blank'
  import { mapActions } from 'vuex'

  import { Shop, Guide } from 'api'

  export default {
    name: 'album',
    data() {
      return {
        shopList: [],
        upMore: false,
        isNull: false,
        page: 1
      }
    },
    onLoad() {
      this.getMerchantsTitle()
      this.getImgList()
    },
    onReachBottom() {
      this.getMoreImgList()
    },
    methods: {
      ...mapActions(['setShowType']),
      previewImg(item) {
        this.setShowType(true)
        let urls = this.shopList.map(item => item.url)
        let current = item.url
        this.$wx.previewImage({ urls, current })
      },
      getImgList() {
        this.page = 1
        this.upMore = false
        Shop.getMerchantsImg({ page: this.page, limit: 10 }).then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            this.shopList = res.data
            this.isNull = true
            this._isUpList(res)
          } else {
            this.$showToast(res.message)
          }
        })
      },
      _isUpList(res) {
        this.page++
        if (this.shopList.length >= res.meta.total * 1) {
          this.upMore = true
        }
      },
      getMoreImgList() {
        if (this.upMore) return
        Shop.getMerchantsImg({ page: this.page, limit: 10 }).then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            this.shopList.push(...res.data)
            this._isUpList(res)
          } else {
            this.$showToast(res.message)
          }
        })
      },
      getMerchantsTitle() {
        Guide.getShopInfo().then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            this.$wx.setNavigationBarTitle({ title: res.data.name })
          } else {
            this.$showToast(res.message)
          }
        })
      }
    },
    components: {
      Blank
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .album
    min-height: 100vh
    background: $color-background
    box-sizing: border-box

  .album-list
    padding: 10px 15px
    layout(row)
    box-sizing: border-box
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

  .album-list-active
    min-height: 100vh
    background: $color-FFFFFF
    box-sizing: border-box
</style>
