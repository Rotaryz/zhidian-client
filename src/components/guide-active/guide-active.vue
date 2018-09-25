<template>
  <div class="guide-active">
    <div class="tab-container">
      <form report-submit @submit="$getFormId">
        <ul class="tab-wrapper">
          <li class="tab-item" v-for="(item, index) in tabList" :key="index" @click="changeTab(index)">
            <button formType="submit">{{item.title}}</button>
          </li>
        </ul>
      </form>
      <div class="tab-line-wrapper" :style="'transform: translate3d(' + selectTab*100 + '%,0,0)'">
        <div class="tab-line"></div>
      </div>
    </div>
    <!--砍价-->
    <ul class="active-wrapper" v-if="selectTab === 0">
      <li class="item-wrapper" v-if="cutList.length" v-for="(item,index) in cutList" :key="index">
        <div class="item-container">
          <article class="top" @click="goToDetail(item)">
            <section class="top-wrapper">
              <div class="img-wrapper">
                <div class="img-container">
                  <img class="img" mode="aspectFill" :src="item.image_url" alt="">
                </div>
                <div class="tag cut">仅剩{{item.stock}}份</div>
              </div>
              <div class="title-wrapper">
                <div class="title-container">
                  <div class="explain-wrapper">
                    <div class="title">{{item.goods_title}}</div>
                    <div class="explain">{{item.goods_subtitle}}</div>
                  </div>
                  <div class="money-wrapper">
                    <div class="money">¥{{item.platform_price}}</div>
                    <div class="button">开始砍价</div>
                  </div>
                </div>
              </div>
            </section>
          </article>
          <div class="down">
            <article class="mine-serve-avatar-box">
              <div class="mine-serve-avatarBox-item" v-if="item.join_count && idx < 3" v-for="(it, idx) in item.join_list" :key="idx">
                <img class="mine-serve-avatarBox-img" :src="it">
              </div>
              <div class="more" v-if="item.join_count > 3">
                <span class="more-item"></span>
                <span class="more-item"></span>
                <span class="more-item"></span>
              </div>
              <span class="shop-num" :style="item.join_count >0 && item.join_count <= 3 ? 'margin-left:15px' : ''">{{item.join_count}}人已成功砍价</span>
            </article>
            <article class="right-box">
              <div class="jh-wrapper" @click="toLike(item)">
                <img class="icon" v-if="imageUrl && item.is_like" :src="imageUrl + '/zd-image/1.1/icon-like_dg@2x.png'" alt="">
                <img class="icon" v-else-if="imageUrl" :src="imageUrl + '/zd-image/1.1/icon-zan@2x.png'" alt="">
                <div class="number-wrapper">
                  <div class="number">{{item.like_count > 99 ? 99 : item.like_count}}</div>
                </div>
              </div>
              <div class="jh-wrapper" @click="toShare(item)">
                <img class="icon" v-if="imageUrl" :src="imageUrl + '/zd-image/1.1/icon-share@2x.png'" alt="">
                <div class="number-wrapper">
                  <div class="number">{{item.share_count > 99 ? 99 : item.share_count}}</div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </li>
    </ul>
    <blank v-if="selectTab===0 && cutList.length===0" styles="padding:50px 0"></blank>
    <!--拼团-->
    <ul class="active-wrapper" v-if="selectTab === 1">
      <li class="item-wrapper" v-if="groupList.length" v-for="(item,index) in groupList" :key="index">
        <div class="item-container">
          <article class="top" @click="goToDetail(item)">
            <section class="top-wrapper">
              <div class="img-wrapper">
                <div class="img-container">
                  <img class="img" mode="aspectFill" :src="url" alt="">
                </div>
                <div class="tag group">仅剩{{item.stock}}份</div>
              </div>
              <div class="title-wrapper">
                <div class="title-container">
                  <div class="explain-wrapper">
                    <div class="title">{{item.goods_title}}</div>
                    <div class="explain">{{item.goods_subtitle}}</div>
                  </div>
                  <div class="money-wrapper">
                    <div class="money">¥{{item.platform_price}}</div>
                    <div class="button">开始拼团</div>
                  </div>
                </div>
              </div>
            </section>
          </article>
          <div class="down">
            <article class="mine-serve-avatar-box">
              <div class="mine-serve-avatarBox-item" v-if="item.join_count && idx < 3" v-for="(it, idx) in item.join_list" :key="idx">
                <img class="mine-serve-avatarBox-img" :src="it">
              </div>
              <div class="more" v-if="item.join_count > 3">
                <span class="more-item"></span>
                <span class="more-item"></span>
                <span class="more-item"></span>
              </div>
              <span class="shop-num" :style="item.join_count >0 && item.join_count <= 3 ? 'margin-left:15px' : ''">{{item.join_count}}人已成功拼团</span>
            </article>
            <article class="right-box">
              <div class="jh-wrapper" @click="toLike(item)">
                <img class="icon" v-if="imageUrl && item.is_like" :src="imageUrl + '/zd-image/1.1/icon-like_dg@2x.png'" alt="">
                <img class="icon" v-else-if="imageUrl" :src="imageUrl + '/zd-image/1.1/icon-zan@2x.png'" alt="">
                <div class="number-wrapper">
                  <div class="number">{{item.like_count > 99 ? 99 : item.like_count}}</div>
                </div>
              </div>
              <div class="jh-wrapper" @click="toShare(item)">
                <img class="icon" v-if="imageUrl" :src="imageUrl + '/zd-image/1.1/icon-share@2x.png'" alt="">
                <div class="number-wrapper">
                  <div class="number">{{item.share_count > 99 ? 99 : item.share_count}}</div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </li>
    </ul>
    <blank v-if="selectTab===1 && groupList.length===0" styles="padding:50px 0"></blank>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Guide } from 'api'
  import Blank from 'components/blank/blank'
  import { mapActions } from 'vuex'
  import imMixin from 'common/mixins/im-mixin'

  const tabList = [{title: '砍价抢购'}, {title: '火爆拼团'}]
  export default {
    mixins: [imMixin],
    components: {
      Blank
    },
    props: {
      cutList: {
        type: Array,
        default: []
      },
      groupList: {
        type: Array,
        default: []
      },
      selectTab: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        url: this.$parent.$imageUrl + '/zd-image/test-img/4@1x.png',
        tabList,
        header: [1, 1, 1],
        isLike: false
      }
    },
    created() {
    },
    methods: {
      ...mapActions(['setGoodsDrawInfo']),
      changeTab(index) {
        this.$emit('changeTab', index)
      },
      goToDetail(item) {
        let activityType
        switch (item.rule_id) {
          case 1:
            activityType = 'group'
            break
          case 3:
            activityType = 'bargain'
            break
          default:
            break
        }
        this.$wx.navigateTo({url: `/pages/activity-detail?activityId=${item.recommend_activity_id}&activityType=${activityType}`})
      },
      toLike(item) {
        Guide.likeAction({recommend_activity_id: item.recommend_activity_id, recommend_goods_id: item.recommend_goods_id, like: !item.is_like ? '1' : '0'}).then(res => {
          this.$wechat.hideLoading()
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          item.is_like = !item.is_like
          item.is_like ? item.like_count++ : item.like_count--
          let code = item.rule_id === 1 ? 30001 : 30018
          item.is_like && this.sendCustomMsg(code, {activity_id: item.activity_id, title: item.name})
        })
      },
      toShare(item) {
        Guide.shareAction({recommend_activity_id: item.recommend_activity_id, recommend_goods_id: item.recommend_goods_id}, false).then(res => {
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          item.share_count++
          // let code = item.rule_id === 1 ? 30002 : 30016
          // item.is_like && this.sendCustomMsg(code, {activity_id: item.activity_id, title: item.name})
        })
        let type = +item.rule_id // 0普通 1团购 3砍价
        const obj = {
          type: type,
          title: item.goods_title,
          explain: item.goods_subtitle,
          mark: type === 1 ? item.group_number + '人团' : type === 3 ? '仅剩' + item.stock + '份' : '',
          price: item.platform_price,
          goodsImg: item.image_url,
          id: item.recommend_activity_id
        }
        this.setGoodsDrawInfo(obj)
        this.$wx.navigateTo({url: `/pages/goods-make-poster`})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  button
    reset-button()
    display: inline-block

  .guide-active
    position: relative
    padding-bottom: 26px
    .tab-container
      height: 26px
      margin: 0 15px
      position: relative
      padding-bottom: 8px
      .tab-wrapper
        position: relative
        height: 100%
        width: 100%
        layout(row, block, nowrap)
        font-family: $font-family-medium
        font-size: $font-size-16
        color: $color-1F1F1F
        letter-spacing: 0.6px
        line-height: 1
        .tab-item
          flex: 1
          text-align: center
      .tab-line-wrapper
        position: absolute
        width: 50%
        height: 3px
        transform: translate3d(0, 0, 0)
        transition: all 0.3s
        .tab-line
          margin: 0 auto
          height: 3px
          width: 65px
          background: $color-D32F2F
          border-radius: 3px
    .active-wrapper
      padding: 0 15px
      .item-wrapper
        padding-top: 49.2753623%
        height: 0
        margin-top: 15px
        card-shadow()
        border-radius: 6px
        position: relative
        .item-container
          fill-box()
          layout()
          .top
            height: 0
            padding-top: 34.78261%
            position: relative
            .top-wrapper
              fill-box()
              layout(row, block, nowrap)
              align-items: center
              &:after
                content: ""
                position: absolute
                bottom: 0
                right: 10px
                left: 10px
                transform: scaleY(.5) translateZ(0)
                border-bottom: 1px #E0E0E0 dashed
              .img-wrapper
                height: 0
                width: 26.08696%
                padding-top: 26.08696%
                border-radius: 6px
                position: relative
                margin: 0 15px 0 10px
                .img-container
                  fill-box()
                  .img
                    width: 100%
                    height: 100%
                    display: block
                .tag
                  position: absolute
                  top: 5px
                  left: 0
                  padding: 0 4px
                  height: 16px
                  border-radius: 0 100px 100px 0
                  font-family: $font-family-medium
                  font-size: $font-size-10
                  color: $color-FFFFFF
                  line-height: @height
                  text-align: center
                  &.group
                    background-image: linear-gradient(116deg, #FFD411 0%, #FFA807 95%)
                  &.cut
                    background-image: linear-gradient(116deg, #FF86BF 0%, #FF6C86 95%)
              .title-wrapper
                width: 63.7681159%
                height: 0
                padding-top: 34.78261%
                position: relative
                .title-container
                  fill-box()
                  layout(column, block, nowrap)
                  justify-content: space-between
                  margin: 15px 0
                  .explain-wrapper
                    .title
                      font-size: $font-size-16
                      color: $color-1F1F1F
                      letter-spacing: 0.6px
                      width: 90%
                      no-wrap()
                      line-height: 1.2
                      margin-bottom: 6px
                    .explain
                      font-size: $font-size-12
                      color: $color-99A0AA
                      no-wrap()
                      line-height: 1.2
                  .money-wrapper
                    layout(row, block, nowrap)
                    justify-content: space-between
                    align-items: center
                    .money
                      font-family: $font-family-medium
                      font-size: $font-size-24
                      color: $color-455A64
                      padding-right: 5px
                      max-width: 37.9vw
                      no-wrap()
                      &:first-letter
                        font-family: $font-family-medium
                        font-size: $font-size-12
                        color: $color-455A64
                        margin: 0 3px 6px 0
                    .button
                      normal-button-style(normal, 85px, 32px)
                      font-family: $font-family-bold
                      border-radius: 32.5px
                      font-size: $font-size-14
          .down
            padding: 0 10px
            flex: 1
            layout(row, block, nowrap)
            justify-content: space-between
            align-items: center
            .mine-serve-avatar-box
              display: flex
              margin-right: 10.5px
              align-items: center
              .mine-serve-avatarBox-item
                width: 23px
                height: 23px
                box-sizing: border-box
                border-radius: 50%
                margin-right: -4px
                .mine-serve-avatarBox-img
                  width: 23px
                  height: 23px
                  border: 1.5px solid $color-FFFFFF
                  border-radius: 50%
                  position: relative
                  background: #f8f8f8
                  .bargain-circle-box
                    position: absolute
                    all-center()
                    display: flex
                    align-items: center
                    justify-content: center
                    width: 100%
                    .bargain-circle
                      display: inline-block
                      background: #B6B6B6
                      border-radius: 100%
                      height: 2px
                      width: 2px
                      margin: 0 0.7px
              .more
                margin-top: 2px
                margin-left: 12px
                display: flex
                width: 12px
                justify-content: space-between
                .more-item
                  height: 3px
                  width: 3px
                  background: #e0e0e0
                  border-radius: 50%
              .shop-num
                font-size: $font-size-14
                margin-left: 5px
                color: $color-99A0AA
                line-height: 1
                no-wrap()
            .right-box
              layout(row, block, nowrap)
              align-items: center
              .jh-wrapper
                layout(row)
                extend-click()
                position: relative
                margin-right: 35.5px
                &:last-child
                  margin-right: 15.5px
                .icon
                  height: 16px
                  width: 16px
                  padding-right: 3.5px
                .number-wrapper
                  position: absolute
                  top: -5px
                  right: 0.5px
                  .number
                    position: absolute
                    left: 0
                    font-family: $font-family-medium
                    font-size: $font-size-10
                    color: $color-99A0AA
</style>
