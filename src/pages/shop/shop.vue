<template>
  <article class="shop" :style="{paddingTop: pageHeadH + 'px'}">
    <head-item :title="title" :showArrow="false"></head-item>
    <shop-header :shopInfo="shopInfo" :employee="employee" :photoInfo="photoInfo" v-if="showHeader"></shop-header>
    <div style="height: 10px; background: #F4F5F7 "></div>
    <navigator url="/pages/shop-story" class="brand-tab" @click="sendBrand">
      <div class="brand-left">
        <div class="brand-title">品牌故事</div>
        <div class="brand-subtitle" v-if="shopInfo.brand_title">{{shopInfo.brand_title}}</div>
      </div>
      <img v-if="imageUrl" :src="imageUrl + '/zd-image/mine/icon-pressed@2x.png'" class="right-arrow">
    </navigator>
    <div style="height: 10px; background: #F4F5F7 "></div>
    <div class="tabs-box border-bottom-1px" :class="{'fixed-top' : scrollType >= 1}" :style="{top: (scrollType >= 1 ? pageHeadH : 0) + 'px'}" v-if="isIos">
      <div class="tabs" id="tabs">
        <div class="tabs-item" :class="{'active' : scrollType <= 2}" @click="toNav('service')">服务</div>
        <div class="tabs-item" :class="{'active' : scrollType == 3}" @click="toNav('goods')">商品</div>
      </div>
      <div class="tabs-underline">
        <div class="move" :style="'transform: translateX(' + (scrollType - 2 >= 0 ? scrollType - 2 : 0) * 100 + '%)'">
          <div class="move-box"></div>
        </div>
      </div>
    </div>
    <div class="tabs-box-holder" v-if="scrollType >= 1 && isIos"></div>
    <shop-content :serviceList="serviceList" :serviceTotal="serviceTotal" :selectTab="selectTab" :storyInfo="storyInfo" @changeTab="changeTab" @refreshBox="refreshBox" ref="shopContent"></shop-content>
    <div style="height: 10px; background: #F4F5F7 "></div>
    <div class="goods-list">
      <div class="goods-list-top">
        <div class="goods-list-title">
          <img class="title-icon" v-if="imageUrl" :src="imageUrl + '/zd-image/1.4/icon-hotgoods@2x.png'" alt="">
          <span class="title-txt">热销商品({{goodsTotal}})</span>
        </div>
        <navigator url="/pages/goods-list" hover-class="none">
          <div class="goods-top-right">
            <span>查看全部</span>
            <img v-if="imageUrl" :src="imageUrl + '/zd-image/mine/icon-pressed@2x.png'" class="right-arrow">
          </div>
        </navigator>
      </div>
      <div class="goods-list-content">
        <div class="goods-item-box" v-for="(item, idx) in goodsList" :key="idx">
          <goods-item :item="item" :border="true"></goods-item>
        </div>
      </div>
      <blank v-if="goodsList.length===0" styles="padding:50px 0"></blank>
    </div>
    <im-fixed ref="fixed" v-if="!isMyShop"></im-fixed>
    <frozen ref="frozen"></frozen>
  </article>
</template>

<script type="text/ecmascript-6">
  import ShopHeader from './shop-header/shop-header'
  import ShopContent from './shop-content/shop-content'
  import ImFixed from 'components/im-fixed/im-fixed'
  import { Guide, Shop } from 'api'
  import clearWatch from 'common/mixins/clear-watch'
  import imMixin from 'common/mixins/im-mixin'
  import HeadItem from 'components/head-item/head-item'
  import Frozen from 'components/frozen/frozen'
  import GoodsItem from 'components/goods-item/goods-item'
  import Blank from 'components/blank/blank'

  export default {
    mixins: [clearWatch, imMixin],
    components: {
      ShopHeader,
      ShopContent,
      ImFixed,
      HeadItem,
      Frozen,
      GoodsItem,
      Blank
    },
    data() {
      return {
        imageUrl: this.$imageUrl,
        shopInfo: {
          rate: new Array(5).fill(0)
        },
        employee: {},
        serviceList: [],
        serviceTotal: 0,
        goodsList: [],
        goodsTotal: 0,
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
        title: '门店',
        shopChange: true, // 优化， 切店才显示loading
        tabsIdx: 0,
        tabsTop: 0,
        serviceTop: 0,
        goodsTop: 0,
        scrollType: 0, // 0为初始， 大于1为tabs吸顶， 2为服务， 3为商品
        isIos: false,
        scrollTop: 0 // 当前滚动距离
      }
    },
    onLoad() {
    },
    onPageScroll(e) {
      if (!this.isIos) return
      if (!e.scrollTop) {
        this.scrollType = 0
        return
      }
      this.scrollTop = +e.scrollTop
      let top = +e.scrollTop + this.pageHeadH
      this._checkScroll(top)
    },
    onHide() {
      this.$refs.frozen.close()
    },
    async onShow() {
      this.$showForzen()
      this.page = 1
      this.more = true
      this._changeShopResetData()
      this._verdictRole()
      await this.getBaseInfo()
      this._initDom()
    },
    async onPullDownRefresh() {
      await this._getAllList(false)
      this.refreshBox()
      this.$wx.stopPullDownRefresh()
    },
    methods: {
      sendBrand() {
        this.sendCustomMsg(40007)
      },
      refreshBox() {
        setTimeout(() => {
          this.initDomPosition()
        }, 100)
      },
      _verdictRole() {
        if (!this.$wx.getStorageSync('userInfoExtend')) {
          this.$checkIsMyShop(() => {
            this.isMyShop = this.$isMyShop()
          })
        } else {
          this.isMyShop = !!this.$isMyShop()
        }
      },
      _initDom() {
        let res = wx.getSystemInfoSync()
        let system = res.system
        this.isIos = /Ios/i.test(system)
        if (!this.isIos) return
        setTimeout(() => {
          this.initDomPosition()
        }, 500)
      },
      initDomPosition() {
        if (!this.isIos) return
        let tabsClass = this.scrollType >= 1 ? '.tabs-box-holder' : '.tabs'
        wx.createSelectorQuery()
          .select(tabsClass)
          .boundingClientRect()
          .select('.shop-content')
          .boundingClientRect()
          .select('.goods-list')
          .boundingClientRect()
          .exec(([tabs, shopContent, goods]) => {
            this.tabsTop = tabs ? +tabs.top + this.scrollTop : 0
            this.serviceTop = shopContent ? +shopContent.top + this.scrollTop : 0
            this.goodsTop = goods ? +goods.top + this.scrollTop : 0
          })
      },
      _checkScroll(top) {
        if (top < this.tabsTop - 20) {
          if (this.scrollType === 0) return
          this.scrollType = 0
        } else if (this.tabsTop - 20 <= top && top < this.serviceTop - this.pageHeadH) {
          if (this.scrollType === 1) return
          this.scrollType = 1
        } else if (this.serviceTop - this.pageHeadH <= top && top < this.goodsTop - this.pageHeadH) {
          if (this.scrollType === 2) return
          this.scrollType = 2
        } else if (top >= this.goodsTop - this.pageHeadH) {
          if (this.scrollType === 3) return
          this.scrollType = 3
        }
      },
      toNav(type) {
        let top
        switch (type) {
          case 'service':
            top = this.serviceTop - this.pageHeadH - 45
            break
          case 'goods':
            top = this.goodsTop - this.pageHeadH - 45
            break
        }
        wx.pageScrollTo({
          scrollTop: top,
          duration: 300
        })
      },
      _changeShopResetData() {
        if (+this.oldShopId !== +this.$wx.getStorageSync('shopId')) {
          this.shopChange = true
          this.$showForzen()
          Object.assign(this.$data, this.$options.data())
          this.scrollType = 0
          this.$wechat.pageScrollTo()
          this.selectTab = 0
          this.showHeader = false
          this.showHeader = true
          this.oldShopId = this.$wx.getStorageSync('shopId')
          this.$refs.shopContent && this.$refs.shopContent.init()
          this._verdictRole()
        } else {
          this.shopChange = false
        }
      },
      async getBaseInfo() {
        this.shopChange && this.$wechat.showLoading()
        await Promise.all([
          this._getLocation(false),
          this._getAllList(false),
          this._getMerchantsImg(false)
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
      // 获取服务商品列表
      async _getAllList(loading) {
        try {
          let res = await Shop.getAllList(loading)
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          this.serviceList = res.data.goods
          this.serviceTotal = res.data.goods_count
          this.goodsList = res.data.products
          this.goodsTotal = res.data.product_count
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
  @import "~common/stylus/base"
  .shop
    min-height: 100vh
    box-sizing: border-box

  .brand-tab
    height: 65px
    padding: 0 15px
    display: flex
    align-items: center
    justify-content: center

    .brand-left
      height: 65px
      flex: 1
      overflow: hidden
      display: flex
      flex-direction: column
      justify-content: center
      .brand-title
        font-family: $font-family-regular
        font-size: $font-size-14
        line-height: 14px
        color: $color-1F1F1F
        letter-spacing: 0.6px
      .brand-subtitle
        margin-top: 6px
        line-height: 12px
        font-family: $font-family-regular
        font-size: $font-size-12
        color: $color-99A0AA
    .right-arrow
      display: block
      width: 7.5px
      height: 12.5px

  .tabs-box-holder
    height: 45px
  .tabs-box
    height: 45px
    display: flex
    background: $color-white
    position: relative
    &.fixed-top
      position: fixed
      left: 0
      top: 0
      right: 0
      z-index: 9999

    .tabs
      height: 45px
      display: flex
      .tabs-item
        width: 90px
        text-align: center
        line-height: 45px
        font-family: $font-family-regular
        color: $color-1F1F1F
        letter-spacing: 0.6px
        font-size: $font-size-16
        position: relative
        &.active
          font-family: $font-family-medium

    .tabs-underline
      position: absolute
      left: 0
      bottom: 0
      right: 0
      height: 3px
      .move
        width: 90px
        display: flex
        justify-content: center
        transition: all 0.3s
        .move-box
          width: 30px
          height: 3px
          border-radius: 1.5px
          background: $color-ED2C2B

  .goods-list
    padding: 0 15px
    .goods-list-top
      height: 50px
      display: flex
      align-items: center
      justify-content: space-between
      .goods-list-title
        height: 16px
        display: flex
        align-items: center
        .title-icon
          width: 15px
          height: 15px
          display: block
          margin-right: 4px
        .title-txt
          font-family: $font-family-regular
          color: $color-1F1F1F
          font-size: $font-size-16
          line-height: 16px
      .goods-top-right
        display: flex
        align-items: center
        font-family: $font-family-regular
        color: $color-B1B1B1
        font-size: $font-size-14
        .right-arrow
          width: 7.5px
          height: 12.5px
          margin-left: 5px

    .goods-list-content
      width: 100%
      display: flex
      flex-wrap: wrap
      .goods-item-box
        width: 49%
        padding-bottom: 2%
        &:nth-child(2n+1)
          margin-right: 2%
</style>
