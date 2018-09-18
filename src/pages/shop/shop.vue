<template>
  <article class="shop">
    <shop-header></shop-header>
  </article>
</template>

<script type="text/ecmascript-6">
  import ShopHeader from 'components/shop-header/shop-header'

  export default {
    components: {
      ShopHeader
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
