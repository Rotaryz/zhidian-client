<template>
  <div class="panel-title" :style="cname">
    <div class="title">- {{title}} -</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: 'END'
      },
      cname: String
    },
    data () {
      return {
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .panel-title
    layout(row)
    justify-content: center
    align-items: center
    .icon
      width: 26px
      height: 12px
    .title
      font-family: $font-family-bold
      font-size: $font-size-14
      color: rgba(130,138,162,0.20)
      letter-spacing: 0.6px
      margin: 0 12px
</style>
