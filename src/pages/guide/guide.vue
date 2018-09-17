<template>
  <article class="te">
    <h1>{{imageUrl}}</h1>
  </article>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        imageUrl: this.imageUrl
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"

  .te
    background :$color-test
</style>
