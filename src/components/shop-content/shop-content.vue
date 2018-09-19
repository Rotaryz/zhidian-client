<template>
  <div class="shop-content">
    <section class="tab-container">
      <ul class="tab-wrapper">
        <li class="tab-item" v-for="(item, index) in tabList" :key="index" @click="changeTab(index)">{{item.title}}</li>
      </ul>
      <div class="tab-line-wrapper" :style="'transform: translate3d(' + selectTab*100 + '%,0,0)'">
        <div class="tab-line"></div>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  const url = `https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537869795&di=e0aba314b1c2a60f8f88128198428d90&imgtype=jpg&er=1&src=http%3A%2F%2Fmypics.zhaopin.com%2Fpic%2F2014%2F3%2F1%2F5711D4D2D34C407BA2796F44A2136490.jpg`

  const tabList = [{ title: '服务项目' }, { title: '品牌故事' }]
  export default {
    data() {
      return {
        url,
        tabList,
        selectTab: 0,
        header: [1, 1, 1]
      }
    },
    created() {
    },
    methods: {
      changeTab(index) {
        if (this.selectTab === index) return
        this.selectTab = index
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .shop-content
    position: relative
    &:after
      content: ""
      position: absolute
      top: 33px
      right: 0
      width: 100%
      transform: scaleY(.5) translateZ(0)
      border-bottom: 1px solid $color-col-line
    .tab-container
      height: 30px
      margin: 0 15px
      position: relative
      .tab-wrapper
        position: relative
        height: 100%
        width: 100%
        layout(row, block, nowrap)
        font-family: $font-family-medium
        font-size: $font-size-16
        color: $color-1F1F1F
        letter-spacing: 0.6px
        line-height: 1
        .tab-item
          flex: 1
          text-align: center
      .tab-line-wrapper
        position: absolute
        width: 50%
        height: 3px
        transform: translate3d(0, 0, 0)
        transition: all 0.3s
        .tab-line
          margin: 0 auto
          height: 3px
          width: 65px
          background: $color-D32F2F
          border-radius: 3px
</style>
