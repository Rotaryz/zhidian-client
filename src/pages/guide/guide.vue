<template>
  <article class="te">
    <h1>{{imageUrl}}</h1>
    <div @click="test">确定</div>
  </article>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        imageUrl: this.imageUrl
      }
    },
    onLoad() {
    },
    methods: {
      test() {
        this.showToast('askjdhakdhashd')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .te
    fill-box(fixed)
    background :$color-text
    font-size :$font-size-12
    .btn
      width :200px
      height :45px
      button-style(45px)
</style>
