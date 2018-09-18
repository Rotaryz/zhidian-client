<template>
  <article class="guide">
    <guide-header></guide-header>
    <guide-active></guide-active>
  </article>
</template>

<script type="text/ecmascript-6">
  import GuideHeader from 'components/guide-header/guide-header'
  import GuideActive from 'components/guide-active/guide-active'

  export default {
    components: {
      GuideHeader,
      GuideActive
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
