<template>
  <div class="wheel" :style="pageStyle">
    <head-item :title="title" :showArrow="true"></head-item>
    <div class="page-wrapper" :style="{top: pageHeadH + 'px'}">
      <img class="wheel-bg" style="width: 100%" mode="widthFix" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-turntable_bg@2x.png'" alt="">
      <article class="container">
        <wheel-header :ruleInfo="ruleInfo" @showRule="showRule"></wheel-header>
        <section class="content-wrapper">
          <article class="wheel-wrapper">
            <img class="icon-img pos-a" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-wheel-bg@2x.png'" alt="">
            <figure class="wheel-outer" :style="outerWheelAction">
              <img class="icon-img" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-rose@2x.png'" alt="">
              <ul class="light-dot" v-for="(item, index) in '1234567'" :key="index" :class="'light-'+index">
                <li class="dot" v-if="imageUrl" v-for="(it, idx) in '12'" :key="idx">
                </li>
              </ul>
            </figure>
            <figure class="wheel-inner" :style="innerWheelAction">
              <img class="icon-img" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-thrntable@2x.png'" alt="">
              <div class="prize-item" v-for="(item, index) in wheelList" :key="index" :class="'prize-'+index">
                <p class="name">{{item.title}}</p>
                <div class="img-wrapper">
                  <img class="pic" mode="aspectFit" v-if="item.image_url" :src="item.image_url" alt="">
                </div>
              </div>
            </figure>
            <figure class="wheel-pointer">
              <div class="pointer" @click.stop="_drawWheel">
                <img class="icon-img" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-turntable_go@2x.png'" alt="">
              </div>
            </figure>
          </article>
          <section class="footer">
            <div class="title">你还有 <span class="number">{{usable_times}}</span> 次机会</div>
            <div
              class="cards-wrapper"
              :style="cardsWrapperStyle"
              :scroll-y="true"
            >
              <!--<div class="master-style" style="top:0"></div>-->
              <ul class="cards-box" :style="cardsStyle">
                <li class="card-item-wrapper" v-for="item in receive_customer" :key="item.name + item.image_url">
                  <wheel-card :item="item"></wheel-card>
                </li>
              </ul>
              <!--<div class="master-style" style="bottom: 0"></div>-->
            </div>
          </section>
        </section>
        <wheel-modal ref="modal" :prizeInfo="prizeInfo" :ruleList="ruleList" :employeeInfo="employeeInfo"></wheel-modal>
      </article>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import HeadItem from 'components/head-item/head-item'
  import WheelHeader from 'components/wheel-header/wheel-header'
  import WheelCard from 'components/wheel-card/wheel-card'
  import WheelModal from 'components/wheel-modal/wheel-modal'
  import { ActiveExtend, Guide } from 'api'

  const system = wx.getSystemInfoSync()

  export default {
    components: {
      WheelHeader,
      WheelCard,
      WheelModal,
      HeadItem
    },
    data() {
      return {
        title: '幸运大转盘',
        running: false,
        randomDeg: 0,
        activeStep: 0,
        lastStep: 0,
        wheelSeconds: 6000,
        wheelCvs: `cubic-bezier(.71,0,.58,1)`,
        wheelList: [
          {
            title: '谢谢参与',
            image_url: `${this.$imageUrl}/zd-image/wheel/pic-face@2x.png`
          }
        ],
        usable_times: 0,
        receive_customer: [],
        timer: null,
        prizeInfo: {},
        ruleInfo: {},
        ruleList: [],
        shopInfo: {},
        runCardStep: 0,
        runCardSeconds: 3000,
        timerCards: null
      }
    },
    computed: {
      pageStyle() {
        return system.screenWidth < 375 ? 'height: 105vh' : ''
      },
      wheelActionStyle() {
        return this.active ? 'active' : ''
      },
      innerWheelAction() {
        return `transform :rotate(${360 * this.activeStep}deg); transition : transform ${this.wheelSeconds}ms ${this.wheelCvs}`
      },
      outerWheelAction() {
        return `transform :rotate(${-360 * this.activeStep}deg); transition : transform ${this.wheelSeconds}ms ${this.wheelCvs}`
      },
      employeeInfo() {
        let name = ''
        let avatar = ''
        if (this.shopInfo.employee) {
          name = this.shopInfo.employee.name || this.shopInfo.employee.nickname
          avatar = this.shopInfo.employee.avatar
        }
        return { name, avatar }
      },
      cardsWrapperStyle() {
        let height = system.screenHeight
        let arr = [2, 5]
        return `height:${9.866666666666667 * arr[height > 736 ? 1 : 0]}vw;`
      },
      cardsStyle() {
        return `transition :transform ${this.runCardSeconds}ms ease-in-out;transform :translate3d(0, ${-this.runCardStep * 9.866666666666667}vw, 0)`
      }
    },
    onLoad() {
      this._getWheelInfo()
      this._getShopInfo({}, false)
      this.runCardStep = 0
    },
    onUnload() {
      clearTimeout(this.timer)
      clearTimeout(this.timerCards)
    },
    onHide() {
      clearTimeout(this.timerCards)
    },
    onShow() {
      this.receive_customer.length && this._runCardList()
    },
    onShareAppMessage() {
      this.setShowType(true)
      let id = wx.getStorageSync('userInfo').id
      let shopId = this.shopInfo.id
      return {
        title: `${this.employeeInfo.name}邀请你大转盘抽奖`,
        path: `/pages/wheel?fromType=3&fromId=${id}&shopId=${shopId}`,
        imageUrl: `${this.imageUrl}/zd-image/wheel/pic-share_qun@2x.png`,
        success: (res) => {
          // 转发成功
        },
        fail: (res) => {
          // 转发失败
        }
      }
    },
    methods: {
      _runCardList() {
        let len = this.receive_customer.length
        let height = system.screenHeight
        let arr = [2, 5]
        this.runCardStep++
        this.timerCards = setTimeout(() => {
          if (this.runCardStep > len - 1 - arr[height > 736 ? 1 : 0]) {
            clearTimeout(this.timerCards)
            return
          }
          this._runCardList()
        }, this.runCardSeconds)
      },
      showRule() {
        this.$refs.modal.show('rule')
      },
      async _getShopInfo(location, loading) {
        try {
          let res = await Guide.getShopInfo(location, loading)
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          this.shopInfo = res.data || {}
        } catch (e) {
          console.error(e)
        }
      },
      _getWheelInfo() {
        ActiveExtend.getWheelInfo().then(res => {
          this.$wechat.hideLoading()
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          this.wheelList = this.wheelList.concat(res.data.activity_prizes)
          this.usable_times = res.data.usable_times
          this.receive_customer = res.data.receive_customer
          this._formatRuleInfo(res)
          setTimeout(() => {
            this._runCardList()
          }, this.runCardSeconds + 200)
        })
      },
      _formatRuleInfo(res) {
        let ruleList = [
          {
            title: '活动说明',
            contentList: [res.data.note]
          },
          {
            title: '活动奖品',
            contentList: res.data.activity_prizes.map(item => item.title)
          }
        ]
        this.ruleList = ruleList
      },
      _drawWheel() {
        // 判断是否有中奖的次数
        if (this.usable_times < 1) {
          this.$showToast('您的抽奖次数已用完！')
          this.running = false
          return
        }
        // 判断是否正在转
        if (this.running) return
        this.running = true
        ActiveExtend.drawWheel({}, false).then(res => {
          this.$wechat.hideLoading()
          if (res.error !== this.$ERR_OK) {
            this.running = false
            this.$showToast(res.message)
            return
          }
          // 双开二次判断是否有中奖的次数
          if (this.usable_times < 1) {
            this.$showToast('您的抽奖次数已用完！')
            this.running = false
            return
          }
          this.prizeInfo = { ...res.data }
          this.usable_times = res.data.usable_times
          res.data.customer_receive && this.receive_customer.push(res.data.customer_receive)
          let index = this.wheelList.findIndex(item => item.activity_prize_id === res.data.activity_prize_id)
          this._action(index === -1 ? 0 : index, () => {
            this._showTips(index)
            this.running = false
            index && !this.timerCards && this.runCardStep++ // 卡片滚动
          })
        })
      },
      _action(index, callback) {
        this.timer = setTimeout(() => {
          callback && callback()
        }, this.wheelSeconds + 50)
        // 随机数
        let range = 20
        this.randomDeg = Math.random() * range * 2 - range
        // 转的位置
        this.activeStep += (this.lastStep + ~~Math.random() * 3 + 6 - (index * 60 - this.randomDeg) / 360)
        this.lastStep = (index * 60 - this.randomDeg) / 360
      },
      _showTips(index) {
        this.$refs.modal.show('prize', index)
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

  .master-style
    position: absolute;
    left: 6.666666666666667vw
    right: 6.666666666666667vw
    height: 3.5vw;
    background: hsla(0, 0%, 100%, .9);

  .wheel
    position: relative
    height: 100vh
    transform: translate3d(0, 0, 0)
    .page-wrapper
      position: fixed
      left: 0
      right: 0
      bottom: 0
      .container
        fill-box(absolute)
        .content-wrapper
          position: absolute
          right: 0
          left: 0
          top: 34.8vw
          .footer
            position: relative
            .title
              font-family: PingFangSC-Regular;
              font-size: 3.733333333333334vw
              color: #FFE6C2;
              text-align: center;
              padding-bottom: 5vw
              .number
                font-family: PingFang-SC-Bold;
                font-size: 6.4vw
                color: #F8E71C
            .cards-wrapper
              position: relative
              overflow: hidden
              .cards-box
                .card-item-wrapper
                  margin 0 6.666666666666667vw 1.3333333333333335vw
          .wheel-wrapper
            z-index: 3
            margin: 0 auto
            width: 89.86666666666666vw
            height: 91.2vw
            position: relative
            .wheel-outer
              position: absolute
              top: -1.6%
              left: 0%
              height: 89.86666666666666vw
              width: @height
              padding: 7.418397626112759%
              box-sizing: border-box
              .light-dot
                position: absolute
                top: 0
                left: 48.5%
                width: 3%
                height: 100%
                box-sizing: border-box
                layout()
                justify-content: space-between
                align-items: center
                padding: 6% 0
                for $i in 0 1 2 3 4 5 6
                  &.light-{$i}
                    z-index: (-($i) + 8)
                    transform: rotateZ($i * 25.714285714285715deg)
                .dot
                  width: 3.2vw
                  height: @width
                  background-repeat: no-repeat
                  background-size: 100% 100%
                  border-radius 50%
                  background-image url("./pic-light-dot@3x.png")
            .wheel-inner
              position: absolute
              top: -1.6%
              left: 0%
              height: 89.86666666666666vw
              width: @height
              padding: 10.385756676557865%
              box-sizing: border-box
              .prize-item
                position: absolute
                top: 0
                left: 27.7%
                width: 45%
                height: 100%
                box-sizing: border-box
                text-align: center
                for $i in 0 1 2 3 4 5
                  &.prize-{$i}
                    z-index: (-($i) + 6)
                    transform: rotate($i * 60deg)
                .name
                  font-family: $font-family-bold
                  line-height: 1.2
                  margin: 28% auto 3%
                  max-width: 37%
                  font-size: 2.67vw
                  color: #6d54ca
                  no-wrap()
                .img-wrapper
                  width: 37.04%
                  height: 13.11%
                  margin: 0 auto
                  box-sizing: border-box
                  .pic
                    width: 100%
                    height: 100%
            .wheel-pointer
              position: absolute
              top: -1.6%
              left: 0%
              height: 89.86666666666666vw
              width: @height
              layout()
              justify-content: center
              align-items: center
              .pointer
                margin-top: -5%
                width: 22.7vw
                height: 27.3vw
</style>

