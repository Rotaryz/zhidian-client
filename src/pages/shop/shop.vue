<template>
  <article class="shop">
    <shop-header></shop-header>
    <shop-content></shop-content>
  </article>
</template>

<script type="text/ecmascript-6">
  import ShopHeader from 'components/shop-header/shop-header'
  import ShopContent from 'components/shop-content/shop-content'

  export default {
    components: {
      ShopHeader,
      ShopContent
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .shop
    min-height: 100vh
</style>
