<template>
    <scroll-view class="scroll-components" scroll-y @scroll="scrollHandle">
      <div class="top"></div>
      <div class="down">
        <div class="nav-bar-top"></div>
      </div>
      <section class="nav-bar" :style="navStyle"></section>
    </scroll-view>
</template>

<script type="text/ecmascript-6">
  import Selector from './selector'
  export default {
    data() {
      return {
        selector: null,
        isGetTop: true,
        topHeight: 0,
        navStyle: ''
      }
    },
    mounted() {
      this.selector = Selector.createSelectorQuery()
    },
    methods: {
      scrollHandle(e) {
        if (this.isGetTop) {
          this._getTopHeight()
          this.isGetTop = false
        }
        console.log(e.target.scrollTop)
        let scrollTop = e.target.scrollTop
        if (scrollTop >= this.topHeight && this.topHeight) {
          this.navStyle = 'opacity: 1'
        } else {
          this.navStyle = ''
        }
      },
      _getTopHeight() {
        Selector.select(this.selector, '.top')
        Selector.exec(this.selector, res => {
          this.topHeight = res[0].height
          console.log(this.topHeight)
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .scroll-components
    fill-box()
    .top
      height :600px
      background : yellowgreen
    .down
      height : 800px
      background : fuchsia
      .nav-bar-top
        height : 50px
        background : black
    .nav-bar
      position :fixed
      height : 50px
      background : black
      top:0
      left:0
      right :0
      opacity : 0
</style>
