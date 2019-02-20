<template>
  <div class="base-modal" v-if="isShow" :animation="maskAnimation">
    <article class="modal-content" :animation="modalAnimation" @click.stop>
      <div class="wrapper">
        <section class="top">
          <div class="avatar-wrapper">
            <img class="icon-img" mode="aspectFill" v-if="imageUrl" :src="imageUrl + '/zd-image/test-img/2@1x.png'" alt="">
          </div>
          <div class="msg-wrapper">
            <p class="msg">这是我的微信号，请复制添加</p>
            <e class="white-arrow"></e>
          </div>
        </section>
        <section class="bottom">
          <div class="code">Wechat123</div>
          <div class="button" @click="submitHandle">复制</div>
          <div class="cancel-wrapper">
            <section class="button-wrapper" @click="cancel">
              <p class="text">看看再说</p>
              <div class="arrow-right" :style="{backgroundImage: imageUrl && 'url(' + imageUrl + '/zd-image/1.5/icon-pressed@2x.png)'}"></div>
            </section>
          </div>
        </section>
      </div>
    </article>
  </div>
</template>

<script type="text/ecmascript-6">
  import ModalAnimation from 'common/mixins/modal-animation'
  const COMPONENT_NAME = 'MODAL_WXCODE'

  export default {
    name: COMPONENT_NAME,
    mixins: [ModalAnimation],
    data() {
      return {
        isShow: true,
        maskAnimation: '',
        modalAnimation: ''
      }
    },
    methods: {
      show() {
        this._showAnimation()
      },
      cancel() {
        this._cancelAnimation()
        this.$emit('cancel')
      },
      submitHandle() {
        this.$wechat.setClipboardData('ashdjk').then((e) => {
          this.$emit('submit')
        }).catch(() => {
          this.$emit('submitError')
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .white-arrow
    width:0;
    height:0;
    border-width:5px 0 5px 6px;
    border-style:solid;
    border-color:transparent transparent transparent #fff
    position :absolute
    left:-6px
    top:31px
    transform :rotate(180deg)

   .pos-a
    position: absolute
    top: 0
    left: 0

  .icon-img
    width: 100%
    height: 100%

  .base-modal
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 9999
    display: flex
    align-items: center
    justify-content: center
    background-color: rgba(32, 32, 46, 0.8)

  .wrapper
    position :relative
    background: #FFFFFF;
    border-radius: 6px;
    width :300px
    overflow :hidden
    font-family: $font-family-regular
    .top
      position :relative
      background: #F0F2F5;
      box-shadow: 0 1px 0 0 #E1E1E1;
      padding :0 21.5px 0 20px
      display :flex
      align-items :center
      .avatar-wrapper
        width :35px
        height :@width
        border-radius :100%
        overflow :hidden
      .msg-wrapper
        position :relative
        margin-left :14px
        flex :1
        padding : 15px 0
        .msg
          padding :13px 15px 13px 9px
          border-radius: 8px;
          background: #FFFFFF;
          font-size: 14px;
          color: #20202E;
    .bottom
      .code
        padding:27px 0 39px
        font-family: $font-family-medium
        font-size: 16px;
        color: #1F1F1F;
        letter-spacing: 0.8px;
        text-align :center
      .button
        margin 0 auto
        width :130px
        height :32px
        background-image: linear-gradient(90deg, #FE7754 0%, #ED2B2B 100%);
        border-radius: 34px;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 0.6px;
        text-align: center;
        line-height: @height
      .cancel-wrapper
        margin :15px 0 20px
        display :flex
        justify-content :center
        align-items :center
        .button-wrapper
          font-size: 14px;
          color: #999999;
          display :flex
          justify-content :center
          align-items :center
          .arrow-right
            padding :relative
            margin-left :6px
            width :5px
            height :10px
            background-size :100% 100%
            background-position :center center

</style>
