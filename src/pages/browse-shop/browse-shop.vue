<template>
  <div class="browse-shop">
    <!--<scroll-view scroll-y class="browse-shop">-->
    <div class="browse-shop-small">
      <div class="browse-shop-item" v-for="(item, index) in browseShopList" :key="index" @click="_changeShop(item.id)">
        <img :src="item.image_url" class="browse-shop-logo">
        <span class="browse-shop-name">{{item.name}}</span>
        <img :src="image_url + '/zd-image/mine/icon-pressed@2x.png'" class="list-way">
      </div>
    </div>
    <panel-end v-if="!more || browseShopList.length < 10 && browseShopList.length > 0"></panel-end>
    <!--</scroll-view>-->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'browse-shop',
    data() {
      return {
        browseShopList: [
          {
            image_url: 'https://img.jerryf.cn/defaults/zd-image/mine/icon-success@2x.png',
            name: 'eleven丶小店'
          },
          {
            image_url: 'https://img.jerryf.cn/defaults/zd-image/mine/icon-success@2x.png',
            name: 'eleven丶小店'
          },
          {
            image_url: 'https://img.jerryf.cn/defaults/zd-image/mine/icon-success@2x.png',
            name: 'eleven丶小店'
          }
        ],
        page: 1,
        more: true,
        image_url: this.$imageUrl
      }
    },
    created() {
      console.log(this.$imageUrl)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .browse-shop
    min-height: 100vh
    background: $color-background

  .browse-shop-small
    margin-top: 10px
    padding: 0 15px
    box-sizing: border-box
    margin-bottom: 20px
    background: $color-FFFFFF

  .browse-shop-item
    display: flex
    height: 70px
    align-items: center
    position: relative
    font-size: $font-size-16
    color: $color-1F1F1F
    font-family: $font-family-regular
    border-bottom-1px(#99A0AA)
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
