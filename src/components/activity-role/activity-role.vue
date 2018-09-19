<template>
  <div class="activity-role" v-if="showCover" @click.stop="closeCover" :animation="coverAnimation">
    <div class="role-container" :animation="roleAnimation" @click.stop="">
      <div class="role-head border-bottom-1px">玩法详情</div>
      <div class="close-box" @click.stop="closeCover">
        <img :src="imageUrl + '/zd-image/mine/icon-del@2x.png'" v-if="imageUrl" class="close-icon">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        imageUrl: this.$imageUrl,
        showCover: false,
        roleAnimation: '',
        coverAnimation: ''
      }
    },
    methods: {
      closeCover() {
        let roleAnimation = wx.createAnimation({
          duration: 300,
          timingFunction: 'linear',
          delay: 0
        })
        let coverAnimation = wx.createAnimation({
          duration: 300,
          timingFunction: 'linear',
          delay: 0
        })
        coverAnimation.opacity(0).step()
        roleAnimation.scale(0.3).step()
        this.roleAnimation = roleAnimation.export()
        this.coverAnimation = coverAnimation.export()
        setTimeout(() => {
          coverAnimation.opacity(1).step()
          roleAnimation.scale(1).step()
          this.roleAnimation = roleAnimation.export()
          this.coverAnimation = coverAnimation.export()
          this.showCover = false
        }, 300)
      },
      showModel() {
        let roleAnimation = wx.createAnimation({
          duration: 500,
          timingFunction: 'cubic-bezier(1, -0.07, 0.51, 1.48)',
          delay: 0
        })
        let coverAnimation = wx.createAnimation({
          duration: 500,
          timingFunction: 'linear',
          delay: 0
        })
        coverAnimation.opacity(0).step()
        roleAnimation.scale(0.3).step()
        this.roleAnimation = roleAnimation.export()
        this.coverAnimation = coverAnimation.export()
        this.showCover = true
        setTimeout(() => {
          coverAnimation.opacity(1).step()
          roleAnimation.scale(1).step()
          this.roleAnimation = roleAnimation.export()
          this.coverAnimation = coverAnimation.export()
        }, 300)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  @import "~common/stylus/base"

  .activity-role
    position: fixed
    left: 0
    top: 0
    bottom: 0
    right: 0
    z-index: 100
    background: rgba(31,31,31,0.8)
    display: flex
    align-items: center
    justify-content: center
    .role-container
      width: 270px
      height: 300px
      padding: 0 15px
      background: $color-white
      border-radius: 6px
      border: 1px solid rgba(32,32,46,0.10)
      overflow: hidden
      .role-head
        height: 50px
        text-align: center
        line-height: 50px
        font-family: $font-family-medium
        font-size: $font-size-16
        color: $color-1F1F1F
        letter-spacing: 0.8px
      .close-box
        width: 30px
        height: 30px
        position: absolute
        right: 10px
        top: 10px
        .close-icon
          width: 12px
          height: 12px
          all-center()

</style>
