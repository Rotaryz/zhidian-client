<template>
  <div class="browse-shop">
    <div class="browse-shop-small">
      <div class="browse-shop-item" v-for="(item, index) in browseList" :key="index">
        <img :src="item.employee.avatar" class="browse-shop-logo">
        <span class="browse-shop-name">{{item.name}}</span>
        <img :src="image_url + '/zd-image/mine/icon-pressed@2x.png'" class="list-way">
      </div>
    </div>
    <panel-end></panel-end>
  </div>
</template>

<script type="text/ecmascript-6">
  import PanelEnd from 'components/panel-end/panel-end'
  import { mapGetters } from 'vuex'

  export default {
    name: 'browse-shop',
    data() {
      return {
        page: 1,
        upMore: false,
        image_url: this.$imageUrl
      }
    },
    mounted() {},
    methods: {},
    components: {
      PanelEnd
    },
    computed: {
      ...mapGetters(['browseList'])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .browse-shop
    min-height: 100vh
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
