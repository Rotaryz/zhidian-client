<template>
  <div class="guide-navigate">
    <div class="navigate-list">
      <div class="navigate-item" v-for="(item, idx) in list" :key="idx">
        <form report-submit @submit="$getFormId" class="form-box">
          <button hover-class="none" formType="submit" class="item-img-box" @click="navTo(item)">
            <img class="item-img" v-if="imageUrl" :src="imageUrl + '/zd-image/1.5/' + item.img" alt="">
          </button>
        </form>
        <!--<div class="item-img-box" @click="navTo(item)">-->
          <!--<img class="item-img" v-if="imageUrl" :src="imageUrl + '/zd-image/1.5/' + item.img" alt="">-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
    },
    data() {
      return {
        imageUrl: this.$imageUrl,
        list: [
          {img: 'pic-jxgoods@2x.png', url: '/pages/goods-list', isTab: false},
          {img: 'pic-jxservice@2x.png', url: '/pages/shop', isTab: true},
          {img: 'pic-ppstory@2x.png', url: '/pages/shop-story', isTab: false}
        ]
      }
    },
    methods: {
      navTo(item) {
        if (item.isTab) {
          this.$wx.switchTab({url: item.url})
        } else {
          this.$wx.navigateTo({url: item.url})
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .guide-navigate
    padding: 7px 0
    .navigate-list
      padding: 0 15px
      display: flex
      justify-content: space-between
      background: $color-white
      .navigate-item
        flex: 1
        margin-right: 5px
        &:last-child
          margin-right: 0
        .form-box
          display: block
          width: 100%
          height: 0
          padding-bottom: 53.57%
          position: relative
        .item-img-box
          reset-button()
          box-sizing: border-box
          border: 0.5px solid #e3e5e8
          position: absolute
          left: 0
          top: 0
          right: 0
          bottom: 0
          border-radius: 3px
          box-shadow: 0 5px 13px 0 rgba(0,0,0,0.06)
          overflow: hidden
          .item-img
            width: 100%
            height: 100%

</style>
