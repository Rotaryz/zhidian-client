<template>
  <article class="guide">
    <guide-header></guide-header>
  </article>
</template>

<script type="text/ecmascript-6">
  import GuideHeader from 'components/guide-header/guide-header'

  export default {
    components: {
      GuideHeader
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
    min-height :100vh
</style>
