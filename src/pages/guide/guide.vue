<template>
  <article class="guide">
    <scroll></scroll>
  </article>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'

  export default {
    components: {
      Scroll
    },
    data() {
      return {}
    },
    onLoad() {
    },
    methods: {
      test() {
        this.$showToast('askjdhakdhashd')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .guide
    height :100vh
</style>
