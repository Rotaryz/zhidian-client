<template>
  <article class="guide" :style="{paddingTop: pageHeadH + 'px'}">
    <head-item :title="title" :showArrow="false"></head-item>
    <!--<back-shop v-if="showBackBtn" @goBack="goBack" :shopName="shopName"></back-shop>-->
    <guide-header :shopInfo="shopInfo" :employee="employee" :isMyShop="isMyShop" :showBackBtn="showBackBtn" @goBack="goBack"></guide-header>
    <guide-navigator></guide-navigator>
    <guide-active :groupList="groupData.list" :cutList="cutData.list" :selectTab="selectTab" @changeTab="changeTab" :nothing="nothing"></guide-active>
    <im-fixed ref="fixed" v-if="!isMyShop"></im-fixed>
    <frozen ref="frozen"></frozen>
    <modal-coupon ref="coupon" @cancel="cancelHandleModal" @submit="submitHandleModal"></modal-coupon>
    <modal-wxcode ref="wxcode" @cancel="cancelHandleModal" @submit="copyWxHandle"></modal-wxcode>
  </article>
</template>

<script type="text/ecmascript-6">
  import GuideHeader from './guide-header/guide-header'
  import GuideActive from './guide-active/guide-active'
  import GuideNavigator from './guide-navigator/guide-navigator'
  import HeadItem from 'components/head-item/head-item'
  import BackShop from 'components/back-shop/back-shop'
  import ImFixed from 'components/im-fixed/im-fixed'
  import { Guide } from 'api'
  import clearWatch from 'common/mixins/clear-watch'
  import imMixin from 'common/mixins/im-mixin'
  import Frozen from 'components/frozen/frozen'
  import ModalWxcode from 'components/modal-wxcode/modal-wxcode'
  import ModalCoupon from 'components/modal-coupon/modal-coupon'
  import MixinModalList from '../guide/mixin-modal-list'

  export default {
    mixins: [imMixin, clearWatch, MixinModalList],
    components: {
      GuideHeader,
      GuideActive,
      GuideNavigator,
      BackShop,
      ImFixed,
      HeadItem,
      Frozen,
      ModalCoupon,
      ModalWxcode
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
        selectTab: 2,
        showBackBtn: false,
        isMyShop: false,
        oldShopId: '',
        shopName: '',
        nothing: false,
        timer: '',
        title: '首页',
        headStyle: 'background: rgba(255, 255, 255, 0)',
        titleColor: 'white',
        forzenTimer: '',
        shopChange: true // 优化， 切店才显示loading
      }
    },
    computed: {
      storeInfo() {
        let storeInfo = this.shopInfo.store || {}
        return storeInfo
      }
    },
    onTabItemTap() {
      this.sendCustomMsg(10003)
    },
    onHide() {
      this.$refs.frozen.close()
    },
    // onPageScroll(e) {
    //   if (e.scrollTop >= 100) {
    //     this.headStyle = 'background: rgba(255, 255, 255, 1)'
    //     this.titleColor = '#000000'
    //     this.title = '首页'
    //   } else {
    //     this.headStyle = 'background: rgba(255, 255, 255, 0)'
    //     this.titleColor = 'white'
    //     this.title = ''
    //   }
    // },
    onLoad(options) {
      if (!this.$wx.getStorageSync('token')) return
      this.oldShopId = this.$wx.getStorageSync('shopId')
      this._sendRecordToServer()
    },
    async onShow() {
      await this.$showForzen()
      this._action()
      if (!this.$wx.getStorageSync('token')) {
        this.showBackBtn = true
        return
      }
      this._changeShopResetData()
      this._verdictRole()
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
    onShareAppMessage() {
      this.setShowType(true)
      this.sendCustomMsg(10004) // 转发给好友
      let id = wx.getStorageSync('userInfo').id
      let shopId = wx.getStorageSync('shopId')
      let title = this.storeInfo.name
      return {
        title,
        path: `/pages/guide?fromType=3&fromId=${id}&shopId=${shopId}`,
        success: (res) => {
          // 转发成功
        },
        fail: (res) => {
          // 转发失败
        }
      }
    },
    // onShareAppMessage() {
    //   let id = this.$wx.getStorageSync('userInfo').id
    //   let shopId = this.$wx.getStorageSync('shopId')
    //   return {
    //     title: this.shopInfo.name || this.shopInfo.employee.name,
    //     path: `pages/guide?fromType=3&fromId=${id}&shopId=${shopId}`,
    //     imageUrl: this.shopInfo.image_url,
    //     success: (res) => {
    //       // 转发成功
    //     },
    //     fail: (res) => {
    //       // 转发失败
    //     }
    //   }
    // },
    async onPullDownRefresh() {
      await Promise.all([
        this._getShopInfo({}, false),
        this._getGroupList({rule_id: this.groupData.rule_id, page: 1}, false),
        this._getCutList({rule_id: this.cutData.rule_id, page: 1}, false)
      ])
      this._timeRun()
      this.$wx.stopPullDownRefresh()
    },
    methods: {
      _verdictRole() {
        this.$checkIsMyShop(() => {
          this.showBackBtn = this.$hasShop() && !this.$isMyShop()
          this.isMyShop = this.$isMyShop()
        })
      },
      changeTab(index) {
        this.selectTab = index
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
      _changeShopResetData() {
        if (+this.oldShopId !== +this.$wx.getStorageSync('shopId') || getApp().globalData.pageType === 'error') {
          this.shopChange = true
          this.$showForzen()
          clearInterval(this.timer)
          getApp().globalData.pageType = ''
          this.showBackBtn = false
          Object.assign(this.$data, this.$options.data())
          this.$wechat.pageScrollTo()
          this.oldShopId = this.$wx.getStorageSync('shopId')
          this._verdictRole()
          getApp().globalData.$isAlert = [true, true] // 弹窗初始化
        } else {
          this.shopChange = false
        }
      },
      async goBack() { // 返回自己的店铺
        let userInfoExtend = wx.getStorageSync('userInfoExtend')
        await this.$turnShop({ id: userInfoExtend.shop_id, url: '/pages/guide' })
        this.showBackBtn = this.$hasShop() && !this.$isMyShop()
        this.isMyShop = !!this.$isMyShop()
        this._changeShopResetData()
        await this.getBaseInfo()
      },
      _sendRecordToServer() {
        // 0为普通，1为转发，2为扫码
        let code = this.scene === 1 ? 10002 : this.scene === 2 ? 10001 : 10003
        this.sendCustomMsg(code)
      },
      async getBaseInfo() {
        this.shopChange && this.$wechat.showLoading()
        await Promise.all([
          this._getShopInfo({}, false),
          this._getGroupList({rule_id: this.groupData.rule_id, page: this.groupData.page}, false),
          this._getCutList({rule_id: this.cutData.rule_id, page: this.cutData.page}, false)
        ])
        this.$wechat.hideLoading()
        this._timeRun()
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
          this.shopName = this.shopInfo.name
        } catch (e) {
          console.error(e)
        }
      },
      async _getGroupList(data, loading) {
        try {
          let res = await Guide.getActiveList(data, loading)
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          if (!res.meta || res.meta.current_page === 1) {
            this.groupData.list = res.data
          } else {
            let arr = this.groupData.list.concat(res.data)
            this.groupData.list = arr
          }
          if (!this.groupData.list.length && !this.cutData.list.length) {
            this.nothing = true
          } else {
            this.nothing = false
          }
          this.groupData.more = this.groupData.list.length < res.meta.total
        } catch (e) {
          console.error(e)
        }
      },
      async _getCutList(data, loading) {
        try {
          let res = await Guide.getActiveList(data, loading)
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          if (!res.meta || res.meta.current_page === 1) {
            this.cutData.list = res.data
          } else {
            let arr = this.cutData.list.concat(res.data)
            this.cutData.list = arr
          }
          if (!this.groupData.list.length && !this.cutData.list.length) {
            this.nothing = true
          } else {
            this.nothing = false
          }
          this.cutData.more = this.cutData.list.length < res.meta.total
        } catch (e) {
          console.error(e)
        }
      },
      _timeRun() {
        clearInterval(this.timer)
        let res1 = this.groupData.list.map((item) => {
          item.current_timestamp++
          item.endTime = this._checkTime(item.current_timestamp, item.start_at_timestamp)
          return Object.assign({}, item)
        })
        this.$set(this.groupData, 'list', res1)
        let res2 = this.cutData.list.map((item) => {
          item.current_timestamp++
          item.endTime = this._checkTime(item.current_timestamp, item.start_at_timestamp)
          return Object.assign({}, item)
        })
        this.$set(this.cutData, 'list', res2)
        this.timer = setInterval(() => {
          let res1 = this.groupData.list.map((item) => {
            item.current_timestamp++
            item.endTime = this._checkTime(item.current_timestamp, item.start_at_timestamp)
            return Object.assign({}, item)
          })
          this.$set(this.groupData, 'list', res1)
          let res2 = this.cutData.list.map((item) => {
            item.current_timestamp++
            item.endTime = this._checkTime(item.current_timestamp, item.start_at_timestamp)
            return Object.assign({}, item)
          })
          this.$set(this.cutData, 'list', res2)
        }, 1000)
      },
      _checkTime(start, end) {
        let differ = end * 1 - start * 1
        let day = Math.floor(differ / (60 * 60 * 24))
        day = day >= 10 ? day : '0' + day
        let hour = Math.floor(differ / (60 * 60)) - (day * 24)
        hour = hour >= 10 ? hour : '0' + hour
        let minute = Math.floor(differ / 60) - (day * 24 * 60) - (hour * 60)
        minute = minute >= 10 ? minute : '0' + minute
        let second = Math.floor(differ) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
        second = second >= 10 ? second : '0' + second
        let times
        if (differ > 0) {
          times = {
            day,
            hour,
            minute,
            second
          }
        } else {
          times = {
            day: '00',
            hour: '00',
            minute: '00',
            second: '00'
          }
        }
        return times
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .guide
    min-height: 100vh
</style>
