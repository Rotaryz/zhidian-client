<template>
  <article class="confirm-msg" v-if="isShow" @tap.stop="cancel" :animation="maskAnimation">
    <!--<div class="mask"  ></div>-->
    <section class="content" v-if="useType==='single'" :animation="modalAnimation">
      <div class="msg">{{msg}}</div>
      <div class="btn-group">
        <div class="btn confirm" @tap="confirm">知道了</div>
      </div>
    </section>
    <section class="content" v-else :animation="modalAnimation">
      <div class="msg">{{msg}}</div>
      <div class="btn-group">
        <div class="btn cancel" @tap="cancel">取消</div>
        <div class="btn confirm" @tap="confirm">{{sureString}}</div>
      </div>
    </section>
  </article>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      useType: String,
      sureString: {
        type: String,
        default: '删除'
      }
    },
    data () {
      return {
        msg: '',
        isShow: false,
        maskAnimation: '',
        modalAnimation: ''
      }
    },
    methods: {
      show (data) {
        if (data) {
          this.msg = data.msg || ''
        }
        let modalAnimation = wx.createAnimation({
          duration: 500,
          timingFunction: 'cubic-bezier(1, -0.07, 0.51, 1.48)',
          delay: 0
        })
        let maskAnimation = wx.createAnimation({
          duration: 500,
          timingFunction: 'linear',
          delay: 0
        })
        maskAnimation.opacity(0).step()
        modalAnimation.scale(0.3).step()
        this.maskAnimation = maskAnimation.export()
        this.modalAnimation = modalAnimation.export()
        this.isShow = true
        setTimeout(() => {
          maskAnimation.opacity(1).step()
          modalAnimation.scale(1).step()
          this.maskAnimation = maskAnimation.export()
          this.modalAnimation = modalAnimation.export()
        }, 200)
        this.$emit('show')
      },
      close () {
        this.isShow = false
        this.$emit('cancel')
      },
      confirm () {
        this.cancel()
        this.$emit('confirm')
      },
      cancel () {
        // this.isShow = false
        // this.$emit('close')
        let modalAnimation = this.$wx.createAnimation({
          duration: 300,
          timingFunction: 'linear',
          delay: 0
        })
        let maskAnimation = this.$wx.createAnimation({
          duration: 300,
          timingFunction: 'linear',
          delay: 0
        })
        maskAnimation.opacity(0).step()
        modalAnimation.scale(0.3).step()
        this.maskAnimation = maskAnimation.export()
        this.modalAnimation = modalAnimation.export()
        setTimeout(() => {
          maskAnimation.opacity(1).step()
          modalAnimation.scale(1).step()
          this.maskAnimation = maskAnimation.export()
          this.modalAnimation = modalAnimation.export()
          this.isShow = false
        }, 300)
        this.$emit('cancel')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .confirm-msg
    background-color: rgba(32, 32, 46, 0.8)
    fill-box(fixed)
    z-index: 100
    layout()
    align-items: center
    .mask
      fill-box()
      background-color: $color-20202E
      opacity: 0.8
    .content
      position: relative
      margin-top: 152px
      width: 300px
      height: 170px
      background-color: $color-FFFFFF
      border: 1px solid rgba(32, 32, 46, 0.10)
      border-radius: 3px
      layout()
      .msg
        flex: 1
        layout()
        justify-content: center
        align-items: center
        font-family: $font-family-regular
        font-size: $font-size-16
        color: $color-374B63
        letter-spacing: 0.6px
        text-align: center
      .btn-group
        height: 57px
        padding: 0 10px
        layout(row)
        justify-content: space-around
        .btn
          box-sizing: border-box
          height: 32px
          width: 100px
          layout()
          justify-content: center
          align-items: center
          background: $color-FFFFFF
          border: 1px solid $color-374B63
          box-shadow: 0 4px 12px 4px rgba(55, 75, 99, 0.15)
          border-radius: 100px
          font-family: $font-family-regular
          font-size: $font-size-14
          color: $color-374B63
          letter-spacing: 0.6px
          &.confirm
            color: $color-FFFFFF
            background: $color-F94C5F
            box-shadow: 0 4px 16px 0 rgba(249, 76, 95, 0.30)
            border-radius: 100px
            border-color: transparent
</style>
