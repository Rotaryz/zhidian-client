<template>
  <div class="base-modal" v-if="isShow" :animation="maskAnimation">
    <article class="modal-content" :animation="modalAnimation" @click.stop>
      <dl class="wrapper">
        <dt class="del" @click="cancel">
          <img class="icon-img" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/icon-close@2x.png'" alt="">
        </dt>
        <dd class="rule-wrapper" v-if="showType === 'rule'">
          <p class="title"><span>活动规则</span></p>
          <div class="list">
            <dl class="list-item-wrapper" v-if="ruleList.length" v-for="(item, index) in ruleList" :key="index">
              <dt class="item-title">{{item.title}}</dt>
              <dd class="item-content" v-for="(it, idx) in item.contentList" :key="idx">
                <text>{{it}}</text>
              </dd>
            </dl>
          </div>
        </dd>
        <dd class="prize-wrapper" v-if="showType === 'prize' && index < 1">
          <img class="icon-img pos-a" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-popup_other@2x.png'" alt="">
          <ul class="prize-container">
            <li class="p-type">{{constantText.title.noWin}}</li>
            <li class="p-content">{{constantText.tips.noWin}}</li>
            <li class="p-title">你还有 <span class="number">{{prizeInfo.usable_times}}</span> 次机会</li>
            <li class="p-btn-group">
              <div class="btn" @click="btnHandle(index, prizeInfo.usable_times)">{{constantText.btn.noWin[prizeInfo.usable_times?1:0]}}</div>
            </li>
          </ul>
        </dd>
        <dd class="prize-wrapper" v-else-if="showType === 'prize'">
          <img class="icon-img pos-a" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-popup_thing@2x.png'" alt="">
          <ul class="prize-container">
            <li class="p-type">{{constantText.title[winType]}}</li>
            <li class="p-prize-title">{{prizeInfo.customer_receive && prizeInfo.customer_receive.prize_title}}</li>
            <li class="p-prize-img">
              <img class="icon-img" model="aspectFill" v-if="prizeInfo.customer_receive && prizeInfo.customer_receive.prize_image_url" :src="prizeInfo.customer_receive.prize_image_url" alt="">
            </li>
            <li class="p-prize-tips">
              <text>{{constantText.tips[winType]}}</text>
            </li>
            <li class="p-btn-group">
              <div class="btn use" @click="useBtnHandle">{{constantText.btn[winType][0]}}</div>
              <div class="btn" @click="shareBtnHandle">{{constantText.btn[winType][1]}}</div>
            </li>
          </ul>
        </dd>
      </dl>
    </article>
  </div>
</template>

<script>
  import wx from 'wx'
  // prize_type 1 兑换券 2 随机红包 3 固定红包
  const pageRouter = [
    '',
    '/pages/exchange-coupon',
    '',
    ''
  ]
  export default {
    props: {
      prizeInfo: {
        type: Object,
        default: {}
      },
      ruleList: {
        type: Array,
        default: []
      },
      employeeInfo: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        isShow: false,
        maskAnimation: '',
        modalAnimation: '',
        showType: '',
        index: 0,
        constantText: {
          title: {
            noWin: '差点就中了',
            red: '恭喜中奖啦',
            coin: '恭喜中奖啦',
            goods: '恭喜中奖啦'
          },
          tips: {
            noWin: '谢谢参与',
            red: '奖品已经存放入您的账户\n' +
              '可进入个人中心-红包查看详情',
            coin: '奖品已经存放入您的账户\n' +
              '可进入个人中心-兑换劵查看详情',
            goods: '奖品已经存放入您的账户\n' +
              '可进入个人中心-兑换劵查看详情'
          },
          btn: {
            noWin: ['随便逛逛', '再试一次'],
            red: ['查看红包', '炫耀一下'],
            coin: ['查看使用', '炫耀一下'],
            goods: ['查看使用', '炫耀一下']
          }
        }
      }
    },
    onUnload() {
      this.cancel()
    },
    computed: {
      winType() {
        let prizeType = this.prizeInfo.prize_type
        let type = prizeType === 1 ? 'coin' : prizeType === 2 ? 'red' : 'goods'
        return type
      }
    },
    methods: {
      _routerType(type) {
        this.showType = type
      },
      useBtnHandle() {
        wx.navigateTo({url: pageRouter[this.prizeInfo.prize_type]})
      },
      shareBtnHandle() {
        wx.navigateTo({url: `/pages/wheel-poster?name=${this.employeeInfo.name}&avatar=${this.employeeInfo.avatar}`})
      },
      btnHandle(index, number) {
        if (number) {
          this.submit()
        } else {
          this.submit()
          wx.switchTab({url: '/pages/guide'})
        }
      },
      show(type, index) {
        this.index = index // 0 未中奖
        if (this.isShow) return
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
        this._routerType(type)
      },
      cancel() {
        if (!this.isShow) return
        let modalAnimation = wx.createAnimation({
          duration: 300,
          timingFunction: 'linear',
          delay: 0
        })
        let maskAnimation = wx.createAnimation({
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
      },
      submit() {
        this.cancel()
        this.$emit('submit')
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .icon-img
    width: 100%
    height: 100%

  .pos-a
    position: absolute
    top: 0
    left: 0

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
    .del
      display: inline-block
      width: 28px
      height: @width
      margin-bottom: 18.5px
    .prize-wrapper
      height: 84vw
      width: 78.26666666666667vw
      position: relative
      .prize-container
        height: 100%
        width: 100%
        box-sizing: border-box
        padding-top: 22.563492063492063%
        position: relative
        .p-type
          font-family: PingFangSC-Medium;
          font-size: 4.8vw
          color: #F1F3C1;
          text-align: center;
        .p-content
          font-family: PingFangSC-Medium;
          font-size: 6.4vw
          color: #CE5900;
          text-align: center
          margin-top: 19%
        .p-title
          margin-top: 15%
          font-family: PingFangSC-Regular;
          font-size: 3.733333333333334vw
          color: #FFE6C2;
          text-align: center;
          padding-bottom: 4%
          .number
            font-family: PingFang-SC-Bold;
            font-size: 6.4vw
            color: #F8E71C;
        .p-prize-title
          max-width: 70%
          margin 3% auto 2%
          font-family: PingFangSC-Medium;
          font-size: 3.733333333333334vw
          color: #FFFFFF;
          text-align: center;
          no-wrap()
        .p-prize-img
          width: 20vw
          height: @width
          margin: 0 auto
          border-radius: 2px
          overflow: hidden
        .p-prize-tips
          font-family: PingFangSC-Regular;
          font-size: 3.2vw
          color: #FFE6C2;
          text-align: center;
          line-height: 1.5
          margin 6% auto 3%
        .p-btn-group
          layout(row, block, nowrap)
          justify-content: center
          align-items: center
          .btn
            box-sizing: border-box
            width: 29.3vw
            height: 8.799999999999999vw
            background-image: linear-gradient(-180deg, #F9FAE2 0%, #F1F3C1 100%);
            border-radius: 8.799999999999999vw
            font-family: PingFangSC-Medium;
            font-size: 3.733333333333334vw
            color: #CE5900;
            margin: 0 2.5px
            layout()
            justify-content: center
            align-items: center
            &.use
              border: 1px solid #F1F2BF;
              background: transparent
              color: #FCE4BF;
    .rule-wrapper
      height: 90.13333333333333vw
      width: 80vw
      background: #FFFFFF;
      border-radius: 6px;
      layout()
      .title
        height: 16.3%
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #F1F3C1;
        text-align: center;
        background: #B14ADB;
        layout()
        justify-content: center
        align-items: center
      .list
        flex: 1
        position: relative
        box-sizing: border-box
        padding: 20px 20px 22px
        text-align: left
        overflow: scroll
        .list-item-wrapper
          margin-bottom: 15px
          .item-title
            font-family: PingFangSC-Medium;
            font-size: 18px;
            color: #4A4A4A;
            margin-bottom: 6px
          .item-content
            font-family: PingFangSC-Regular;
            font-size: 14px;
            line-height: 1.6
            color: #4A4A4A;
            text-align: justify
            word-break: break-all
</style>
