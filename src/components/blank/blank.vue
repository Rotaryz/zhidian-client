<template>
  <div class="blank">
    <img v-if="imageUrl" :src="imageUrl + '/zd-image/mine/pic-empty@2x.png'" class="blank-img">
    <p class="blank-title">空空如也~</p>
  </div>
</template>

<script>
  export default {
    name: 'blank'
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .blank
    padding-top: 109px
    display: flex
    flex-direction: column
    align-items: center
    .blank-img
      display: block
      margin: 0 auto
      height: 129.5px
      width: 168px
    .blank-title
      margin-top: 4px
      font-size: $font-size-14
      font-family: $font-family-regular
      color: $color-99A0AA
</style>
