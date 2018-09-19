<template>
  <div class="share" v-if="showCover" @click.stop="closeCover">
    <div class="bottom-box" :animation="contentAnimation">
      <button open-type="share" hover-class="none" class="share-item" @click.stop="friendShare">发给好友</button>
      <div class="share-item border-top-1px" @click.stop="getPicture">保存图片</div>
      <div class="share-item last" @click.stop="closeCover">取消</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        showCover: false,
        contentAnimation: ''
      }
    },
    methods: {
      show() {
        if (this.showCover) {
          return
        }
        this.showCover = true
      },
      closeCover() {
        this.showCover = false
      },
      friendShare() {
        this.$emit('friendShare')
      },
      getPicture() {
        this.$emit('getPicture')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  @import '~common/stylus/base'

  .share
    width: 100vw
    height: 100vh
    position: fixed
    left: 0
    top: 0
    background: rgba(32, 32, 46, 0)
    .bottom-box
      position: fixed
      z-index: 100
      left: 0
      bottom: -142px
      right: 0
      background: $color-F0F2F5
      box-shadow: 0 -4px 12px 0 rgba(43, 43, 145, 0.07)
      .share-item
        width: 100%
        height: 44px
        text-align: center
        line-height: 44px
        font-size: $font-size-14
        font-family: $font-family-regular
        background-color: $color-white
        border: 0 none
        padding: 0
        border-radius: 0
        &:before, &:after
          border: 0 none
      .last
        margin-top: 10px
    .bottom-box.show
      bottom: 0
</style>
