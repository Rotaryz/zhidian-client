<template>
  <div class="base-modal" v-if="isShow" :animation="maskAnimation">
    <article class="modal-content" :animation="modalAnimation" @click.stop>
      <dl class="wrapper">
        <dt class="del" @click="cancel">
          <img class="icon-img" v-if="imageUrl" :src="imageUrl + '/zd-image/ai-2.1/icon-deltc@2x.png'" alt="">
        </dt>
        <dt class="coupon-wrapper">
          <p class="title">{{config.title}}</p>
          <section class="content">
            <div class="coupon">
              <coupon :dataInfo="dataInfo"></coupon>
            </div>
            <div class="explain-wrapper">
              <e v-if="config.isShowTakeExplain" class="line"></e>
              <p class="text">{{config.takeExplain}}</p>
            </div>
          </section>
          <section class="button-wrapper">
            <img class="icon-img pos-a" v-if="imageUrl" :src="imageUrl + '/zd-image/ai-2.1/pic-getcoupon@2x.png'" alt="">
            <div class="button" @click="submitHandle">{{config.buttonText}}</div>
          </section>
        </dt>
      </dl>
    </article>
  </div>
</template>

<script type="text/ecmascript-6">
  import Coupon from './modal-coupon-item/modal-coupon-item'
  import ModalAnimation from 'common/mixins/modal-animation'
  import CONFIG from './config-modal-coupon'

  const COMPONENT_NAME = 'MODAL_COUPON'
  export default {
    name: COMPONENT_NAME,
    mixins: [ModalAnimation],
    components: {
      Coupon
    },
    data() {
      return {
        isShow: false,
        maskAnimation: '',
        modalAnimation: '',
        dataInfo: {},
        configType: ''
      }
    },
    computed: {
      config() {
        return CONFIG.get(this.configType)
      }
    },
    methods: {
      update(configType) {
        this.configType = configType
      },
      show(dataInfo, configType) {
        if (!dataInfo || !configType) return
        this.configType = configType
        this.dataInfo = dataInfo
        this._showAnimation()
      },
      cancel(flag) {
        this._cancelAnimation()
        this.$emit('cancel', flag)
      },
      submitHandle() {
        this.$emit('submit', this.config.submitFn, this.dataInfo)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

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
    text-align: right
    position :relative
    .del
      display: inline-block
      width: 25px
      height: @width
      margin-bottom: 35px
    .button-wrapper
      position :absolute
      left:-11px;
      right:-11px;
      bottom:-6px;
      height:120px;
      .button
        position :relative
        width:223px
        height :40px
        margin : 60px auto 0
        background-image: linear-gradient(180deg, #FFF100 5%, #FFB600 100%);
        border-radius: 6px;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #DA5C00;
        line-height: @height
        text-align :center
    .coupon-wrapper
      width :275px
      height :246px
      background: #FF5A52;
      border: 1px solid rgba(32,32,46,0.10);
      border-radius: 6px;
      padding :0 12.5px
      .title
        padding :13px
        font-family: $font-family-medium
        font-size: 18px;
        color: #FFE1A1;
        letter-spacing: 2px;
        text-align: center;
      .content
        background :#fff
        border-radius :2px
        height :120px
        padding :12px
        .coupon
          height :67px
        .explain-wrapper
          opacity: 0.6;
          font-family: $font-family-regular
          font-size: 11px;
          color: #999999;
          text-align :center
          position :relative
          top: -3px
          .text
            display :inline-block
            background :#fff
            padding :14px 8px
            position: relative
            z-index :2
          .line
            width :53%
            height :1px
            border-bottom :1px solid #999
            opacity :0.6
            all-center()
</style>
