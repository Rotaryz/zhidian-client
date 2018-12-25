<template>
  <div class="head-item" :style="headStyle">
    <div class="status-bar" :style="{height: statusBarHeight + 'px'}"></div>
    <div class="head-content head-order" v-if="pageType === 'orderList'" @click="showMenu" :style="{color: titleColor}">{{Ltitle}} <span class="icon"></span></div>
    <div class="head-content" v-else :style="{color: titleColor}">{{Ltitle}}</div>
    <div class="head-arrow" v-if="showArrow" @click="goBackUrl">
      <img v-if="imageUrl" :src="imageUrl + '/zd-image/1.2/icon-title_back@2x.png'" class="head-arrow-img">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-undef */
  export default {
    props: {
      pageType: {
        type: 'String',
        default: ''
      },
      title: {
        type: 'String',
        default: ''
      }, // 标题
      headStyle: {
        type: 'String',
        default: 'background: rgba(255, 255, 255, 1)'
      }, // 头部背景颜色
      showArrow: {
        type: 'Boolean',
        default: true
      }, // 是否显示返回箭头
      titleColor: {
        type: 'String',
        default: '#000000'
      }, // 标题文字颜色
      custom: {
        type: 'Boolean',
        default: false
      }, // 是否在点击返回时自定义方法
      menuShow: {
        type: 'Boolean',
        default: false
      }
    },
    data () {
      return {
        imageUrl: this.$imageUrl,
        statusBarHeight: 20
      }
    },
    created() {
      let res = this.$wx.getSystemInfoSync()
      this.statusBarHeight = res.statusBarHeight || 20
    },
    methods: {
      goBackUrl() {
        // 如果有自定义方法，会向父级页面传递一个customFn的方法，如果没有直接返回
        if (this.custom) {
          this.$emit('customFn')
          return
        }
        let pages = getCurrentPages()
        if (+pages.length === 1) {
          wx.switchTab({url: '/pages/guide'})
        } else {
          wx.navigateBack({delta: 1})
        }
      },
      showMenu() {
        this.menuShow ? this.$emit('cancelMenu') : this.$emit('showMenu')
      }
    },
    computed: {
      Ltitle() {
        if (this.title.length > 10) {
          return this.title.slice(0, 10) + '···'
        } else {
          return this.title
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .head-item
    width: 100vw
    transition: all 0.3s
    position: fixed
    left: 0
    top: 0
    z-index: 100
    .head-arrow
      position: absolute
      width: 20px
      height: 20px
      left: 5px
      bottom: 11px
      display: flex
      justify-content: center
      align-items: center
      &:after
        content: ''
        position :absolute
        width :100%
        height :100%
        padding :12px 20px
      .head-arrow-img
        width: 18px
        height: @width
    .head-content
      text-align: center
      line-height: 44px
      height: 44px
      font-size: $font-size-18
      font-family: $font-family-medium
      color: $color-black
    .head-order
      display: flex
      justify-content: center
      align-items: center
      .icon
        width: 0
        height: 0
        border: 6px solid #333
        border-left: 4px solid transparent
        border-right: 4px solid transparent
        border-bottom: 6px solid transparent
        margin-left: 5px
        margin-top: 5px

</style>
