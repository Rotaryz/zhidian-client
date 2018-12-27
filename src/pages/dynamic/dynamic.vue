<template>
  <article class="dynamic-list" @click="_closeLong" :style="{paddingTop: pageHeadH + 'px'}">
    <head-item :title="title" :showArrow="false"></head-item>
    <div class="test-img-box" v-if="testShow">
      <image :src="testImg" mode="widthFix" class="test-img"></image>
    </div>
    <div class="dynamic-item" v-for="(item, index) in dynamicList" :key="index" v-if="!testShow && item.live_log_detail.length">
      <!-- 转发按钮-->
      <!--<img class="copy-item" @click="_goCopy(item.live_log_detail, item.content, item)" v-if="isMine && imageUrl" :src="imageUrl + '/ws-image/btn-share@2x.png'">-->
      <div class="copy-item"  @click="_goCopy(item.live_log_detail, item.content, item)" v-if="isMine && imageUrl">一键分享</div>
      <!-- 内容-->
      <div class="find-item img-one" v-if="item.live_log_detail[0].type === 1 && item.live_log_detail.length === 1">
        <div class="find-box">
          <div class="cainter">
            <div class="user">
              <!-- 头像-->
              <img class="header" mode="aspectFill" v-if="imageUrl" :src="!item.is_default ? item.shop_image_url : imageUrl + '/zd-image/dynamic/pic-zanbo_logo@2x.png'">
              <p class="nickname">{{!item.is_default ? item.shop_name : '赞播智店'}}</p>
            </div>
            <!--{{comment?'':'special'}}-->
            <text class="words">{{item.content}}</text>
            <div class="img-item-two">
              <img class="img-one-item" mode="widthFix" v-for="(items, idx) in item.live_log_detail" :key="idx" :src="items.image_url_thumb" @click="_seeImage(idx, item.live_log_detail)">
            </div>
          </div>
          <!--<div class="address">-->
          <!--<img class="add-icon">-->
          <!--地址-->
          <!--</div>-->
          <div class="information">
            <div class="time">
              {{item.created_at}}
              <p v-if="item.can_delete" class="del" @click="_delItem(index)">删除</p>
            </div>
            <div class="share" :class="{'share-active': item.show}">
              <div class="share-item comment" @click.stop="_comment(item.id)">
                <img class="find-icon" v-if="imageUrl" :src="imageUrl + '/zd-image/dynamic/icon-comments@2x.png'">
              </div>
              <div class="share-item" @click="_goodLike(index)">
                <img class="find-icon" v-if="imageUrl" :src="item.is_like ? imageUrl + '/zd-image/dynamic/icon-like_pressed@2x.png' : imageUrl + '/zd-image/dynamic/icon-zan@2x.png'">
              </div>
              <div class="share-item" @click.stop="_showCover(item)">
                <img class="find-icon" v-if="imageUrl" :src="imageUrl + '/zd-image/dynamic/icon-share@2x.png'">
              </div>
              <!--{{find.is_like ? 'thumbs-up' : ''}}-->
            </div>
          </div>
          <div class="likes-peo" v-if="item.live_log_like.length || item.live_log_comment.length">
            <!--<img :src="imageUrl + '/zd-image/dynamic/pic-trends_zan1@2x.png'" class="likes-peo-bg" mode="widthFix">-->
            <div class="peo-big-box">
              <img v-if="imageUrl && item.live_log_like.length" :src="imageUrl + '/zd-image/dynamic/icon-like@2x.png'" class="like-icon">
              <div class="like-name">
                <span v-for="(items,idx) in item.live_log_like" :key="idx">{{idx > 0 ? '，' : ''}}{{items.shop_name || items.customer_name}}</span>
              </div>
            </div>
            <div class="comment-peo" v-for="(com, comIdx) in item.live_log_comment" :key="comIdx"><span class="ro-peo-name">{{com.customer_name}}：</span><span class="comment-name">{{com.content}}</span></div>
            <!--<img v-if="imageUrl" :src="imageUrl + '/zd-image/dynamic/pic-trends_zan3@2x.png'" class="likes-peo-bg" mode="widthFix">-->
          </div>
        </div>
      </div>
      <div class="find-item img-two" v-if="item.live_log_detail[0].type === 1 && item.live_log_detail.length === 2">
        <div class="find-box">
          <div class="cainter">
            <div class="user">
              <img class="header" mode="aspectFill" v-if="imageUrl" :src="!item.is_default ? item.shop_image_url: imageUrl + '/zd-image/dynamic/pic-zanbo_logo@2x.png'">
              <p class="nickname">{{!item.is_default ? item.shop_name : '赞播智店'}}</p>
            </div>
            <text class="words">{{item.content}}</text>
            <div class="img-item-two">
              <img class="two-item" mode="aspectFill" v-for="(items, idx) in item.live_log_detail" :key="idx" :src="items.image_url_thumb" @click="_seeImage(idx, item.live_log_detail)">
            </div>
          </div>
          <!--<div class="address">-->
          <!--<img class="add-icon">-->
          <!--地址-->
          <!--</div>-->
          <div class="information">
            <div class="time">
              {{item.created_at}}
              <p v-if="item.can_delete" class="del" @click="_delItem(index)">删除</p>
            </div>
            <div class="share" :class="{'share-active': item.show}">
              <div class="share-item comment" @click.stop="_comment(item.id)">
                <img class="find-icon" v-if="imageUrl" :src="imageUrl + '/zd-image/dynamic/icon-comments@2x.png'">
              </div>
              <div class="share-item" @click="_goodLike(index)">
                <img class="find-icon" v-if="imageUrl" :src="item.is_like ? imageUrl + '/zd-image/dynamic/icon-like_pressed@2x.png' : imageUrl + '/zd-image/dynamic/icon-zan@2x.png'">
              </div>
              <div class="share-item" @click.stop="_showCover(item)">
                <img class="find-icon" v-if="imageUrl" :src="imageUrl + '/zd-image/dynamic/icon-share@2x.png'">
              </div>
              <!--{{find.is_like ? 'thumbs-up' : ''}}-->
            </div>
          </div>
          <div class="likes-peo" v-if="item.live_log_like.length || item.live_log_comment.length">
            <!--<img v-if="imageUrl" :src="imageUrl + '/zd-image/dynamic/pic-trends_zan1@2x.png'" class="likes-peo-bg" mode="widthFix">-->
            <div class="peo-big-box">
              <img v-if="imageUrl && item.live_log_like.length" :src="imageUrl + '/zd-image/dynamic/icon-like@2x.png'" class="like-icon">
              <div class="like-name">
                <span v-for="(items,idx) in item.live_log_like" :key="idx">{{idx > 0 ? '，' : ''}}{{items.shop_name || items.customer_name}}</span>
              </div>
            </div>
            <div class="comment-peo" v-for="(com, comIdx) in item.live_log_comment" :key="comIdx"><span class="ro-peo-name">{{com.customer_name}}：</span><span class="comment-name">{{com.content}}</span></div>
            <!--<img v-if="imageUrl" :src="imageUrl + '/zd-image/dynamic/pic-trends_zan3@2x.png'" class="likes-peo-bg" mode="widthFix">-->
          </div>
        </div>
      </div>
      <div class="find-item img-more" v-if="item.live_log_detail[0].type === 1 && item.live_log_detail.length > 2">
        <div class="find-box">
          <div class="cainter">
            <div class="user">
              <img class="header" v-if="imageUrl" mode="aspectFill" :src="!item.is_default ? item.shop_image_url: imageUrl + '/zd-image/dynamic/pic-zanbo_logo@2x.png'">
              <p class="nickname">{{!item.is_default ? item.shop_name : '赞播智店'}}</p>
            </div>
            <!--{{comment?'':'special'}}"-->
            <text class="words">{{item.content}}</text>
            <div class="img-item-two">
              <img class="two-item" mode="aspectFill" v-for="(items, idx) in item.live_log_detail" :key="idx" :src="items.image_url_thumb" @click="_seeImage(idx, item.live_log_detail)">
            </div>
          </div>
          <!--<div class="address" >-->
          <!--<img class="add-icon">-->
          <!--地址-->
          <!--</div>-->
          <div class="information">
            <div class="time">
              {{item.created_at}}
              <p v-if="item.can_delete" class="del" @click="_delItem(index)">删除</p>
            </div>
            <div class="share" :class="{'share-active': item.show}">
              <div class="share-item comment" @click.stop="_comment(item.id)">
                <img class="find-icon" v-if="imageUrl" :src="imageUrl + '/zd-image/dynamic/icon-comments@2x.png'">
              </div>
              <div class="share-item" @click="_goodLike(index)">
                <img class="find-icon" v-if="imageUrl" :src="item.is_like ? imageUrl + '/zd-image/dynamic/icon-like_pressed@2x.png' : imageUrl + '/zd-image/dynamic/icon-zan@2x.png'">
              </div>
              <div class="share-item" @click.stop="_showCover(item)">
                <img class="find-icon" v-if="imageUrl" :src="imageUrl + '/zd-image/dynamic/icon-share@2x.png'">
              </div>
              <!--{{find.is_like ? 'thumbs-up' : ''}}-->
            </div>
          </div>
          <div class="likes-peo" v-if="item.live_log_like.length || item.live_log_comment.length">
            <!--<img v-if="imageUrl" :src="imageUrl + '/zd-image/dynamic/pic-trends_zan1@2x.png'" class="likes-peo-bg" mode="widthFix">-->
            <div class="peo-big-box">
              <img v-if="imageUrl && item.live_log_like.length" :src="imageUrl + '/zd-image/dynamic/icon-like@2x.png'" class="like-icon">
              <div class="like-name">
                <span v-for="(items,idx) in item.live_log_like" :key="idx">{{idx > 0 ? '，' : ''}}{{items.shop_name || items.customer_name}}</span>
              </div>
            </div>
            <div class="comment-peo" v-for="(com, comIdx) in item.live_log_comment" :key="comIdx"><span class="ro-peo-name">{{com.customer_name}}：</span><span class="comment-name">{{com.content}}</span></div>
            <!--<img v-if="imageUrl" :src="imageUrl + '/zd-image/dynamic/pic-trends_zan3@2x.png'" class="likes-peo-bg" mode="widthFix">-->
          </div>
        </div>
      </div>
    </div>
    <div v-if="!loadMoreDy && dynamicList.length > 2" class="no-more"><div class="line"></div><div class="txt">再拉也没有了</div></div>
    <navigator hover-class="none" v-if="isMine" url="edit-dynamic" class="new-dynamic">
      <img mode="widthFix" v-if="imageUrl" :src="imageUrl + '/zd-image/dynamic/icon-write@2x.png'" class="new-dynamic-img">
    </navigator>
    <confirm-msg ref="confirm" @confirm="_sureDel" @cancel="cancel"></confirm-msg>
    <div class="chat-input border-top-1px" v-if="textArea" @click.stop>
      <div class="input-container" :class="system === 'android' ? 'android' : ''" ref="textBox">
        <textarea auto-height="true" :focus="true" fixed="true" @confirm="sendMsg" class="textarea" maxlength="-1" v-model="inputMsg" cursor-spacing="15"></textarea>
      </div>
      <div class="submit-btn" @click="sendMsg">发送</div>
    </div>
    <div class="down-image" v-if="showDown">
      <div class="down-image-box" v-if="showSmallDown">
        <p class="down-image-title">温馨提示</p>
        <p class="down-image-text">图片已保存至你的手机相册 并复制描述！</p>
        <div class="down-image-btn" @click="_hideDown">确定</div>
      </div>
    </div>
    <dynamic-share :item.sync="pictureObj" ref="dynamic" @drawDone="drawDone" :qrCodeUrlTmp.sync="qrCode"></dynamic-share>
    <!--<div class="bottom-box-big" :class="showCover ? 'bottom-box-big-show' : ''">-->
      <!--<div class="bottom-box" :class="showCover ? 'show' : ''">-->
        <!--<button open-type="share" hover-class="none" class="share-item">发给好友</button>-->
        <!--<div class="share-item border-top" @click.stop="makePoster()">生成图片 保存分享</div>-->
        <!--<div class="share-item last" @click="_closeCover">取消</div>-->
      <!--</div>-->
    <!--</div>-->
    <share ref="share" @getPicture="makePoster" @friendShare="friendShare"/>
    <frozen ref="frozen"></frozen>
  </article>
</template>

<script type="text/ecmascript-6">
  import {Dynamic, ActiveCode} from 'api'
  import {baseURL} from 'api/config'
  import ConfirmMsg from 'components/confirm-msg/confirm-msg'
  import { resolveQrCode } from 'common/js/util'
  import DynamicShare from 'components/dynamic-share/dynamic-share'
  import Share from 'components/share/share'
  import imMixin from 'common/mixins/im-mixin'
  import HeadItem from 'components/head-item/head-item'
  import {mapGetters, mapActions} from 'vuex'
  import Frozen from 'components/frozen/frozen'

  export default {
    mixins: [imMixin],
    name: 'dynamic',
    data() {
      return {
        imageUrl: baseURL.image,
        dynamicList: [],
        page: 1,
        loadMoreDy: true,
        myShopId: null,
        shopId: null,
        textArea: false,
        comIndex: 0,
        comId: '',
        inputMsg: '',
        dynamicCopy: [],
        downList: [],
        activeInd: 0,
        showDown: false,
        showSmallDown: false,
        showCover: false,
        pictureObj: null,
        testImg: '', // 重要，勿删
        testShow: 0, // 重要，勿删
        isShowBox: true,
        qrCode: '',
        isMine: false,
        title: '动态',
        runShow: true
      }
    },
    async onLoad(option) {
      await this._getQuery(option)
      this.loadMoreDy = true
      this.dynamicList = []
      this.page = 1
      setTimeout(() => {
        this._getList()
        this.shopId = this.$wx.getStorageSync('shopId') ? this.$wx.getStorageSync('shopId') * 1 : ''
        this.myShopId = this.$wx.getStorageSync('myShopId') ? this.$wx.getStorageSync('myShopId') * 1 : null
      }, 500)
    },
    onShow() {
      if (!this.runShow) {
        this.runShow = true
        return
      }
      this.$showForzen()
      this.isMine = this.$isMyShop()
      this._getDrawPosterInfo() // 获取画海报的信息
      this.shopId = this.$wx.getStorageSync('shopId') ? this.$wx.getStorageSync('shopId') * 1 : ''
      this.myShopId = this.$wx.getStorageSync('myShopId') ? this.$wx.getStorageSync('myShopId') * 1 : null
      this.sendCustomMsg(50001)
      if (this.isLoadDy) {
        this.loadMoreDy = true
        this.dynamicList = []
        this.page = 1
        this._getList()
        this.setIsLoadDy(false)
      }
      this.$wx.getSetting({
        success: (data) => {
          if (data.authSetting['scope.writePhotosAlbum'] && this.activeInd !== 0) {
            this.$wechat.showLoading('正在下载图片')
            this._downImage()
            this.activeInd = 0
          } else if (!data.authSetting['scope.writePhotosAlbum']) {
            this.showDown = false
          }
        }
      })
    },
    onHide() {
      this.$refs.frozen.close()
    },
    onReachBottom() {
      this.page++
      this._getList()
    },
    onShareAppMessage() {
      let id = this.$wx.getStorageSync('userInfo').id
      let shopId = this.$wx.getStorageSync('shopId')
      return {
        title: '',
        path: `/pages/dynamic?fromType=3&fromId=${id}&shopId=${shopId}`,
        success: (res) => {
          // 转发成功
        },
        fail: (res) => {
          // 转发失败
        }
      }
    },
    methods: {
      ...mapActions(['setIsLoadDy', 'setShowType']),
      cancel() {
        this.isShowBox = true
      },
      async _getQuery(option) {
        // 分享进来的
        let entryId = option.shopId
        if (entryId) {
          this.$wx.setStorageSync('shopId', entryId)
        }
        // 二维码扫描进入 - 永久
        let scene = option.scene
        if (scene) {
          let sceneMsg = decodeURIComponent(scene)
          const params = resolveQrCode(sceneMsg)
          if (params.s) {
            this.$wx.setStorageSync('shopId', params.s)
          }
        }
      },
      _getDrawPosterInfo() {
        const data = {
          'type': 'dynamic',
          'source': 'c',
          data: {
            'from_id': 'c' + this.$wx.getStorageSync('userInfo').id,
            'shopId': this.$wx.getStorageSync('shopId')
          }
        }
        ActiveCode.createMiniCode(data, false).then(res => {
          if (res.error !== this.$ERR_OK) {
            this.$wechat.hideLoading()
            this.$showToast(res.message)
            return
          }
          this.$wechat.hideLoading()
          this.qrCode = res.data.image_url
        })
      },
      drawDone() {
        this.setShowType(true)
        this.pictureObj = null
      },
      makePoster() {
        this.$refs.share.closeCover()
        this.$refs.dynamic.action()
      },
      _showCover(item) {
        this.pictureObj = item
        this.$refs.share.show()
        this.showCover = true
      },
      friendShare() {
        this.$refs.share.closeCover()
      },
      _hideDown() {
        this.showSmallDown = false
        this.showDown = false
        // this.pictureObj = null
      },
      _getList(loading = true) {
        if (!this.loadMoreDy) {
          return
        }
        Dynamic.liveLogsList({ page: this.page }, loading).then((res) => {
          // this.testShow = res.check_code ? 1 : 0
          // if (this.testShow) {
          //   Im.getCount(1, false)
          // }
          // this.testImg = res.check_image_url ? res.check_image_url : ''
          if (res.error === this.$ERR_OK) {
            this.$wechat.hideLoading()
            if (res.data.length) {
              res = res.data.map((item) => {
                item.show = false
                return item
              })
            } else {
              this.loadMoreDy = false
              return
            }
            if (this.page === 1) {
              this.dynamicList = res
              return
            }
            this.dynamicList = this.dynamicList.concat(res)
          }
          this.$wechat.hideLoading()
        })
      },
      _goCopy(imgArr, title) {
        this.dynamicCopy = imgArr
        this.$wx.setClipboardData({
          data: title,
          success: (res) => {
            this.showDown = true
            this.$wechat.showLoading(`正在下载0/${this.dynamicCopy.length}图片`)
            this._downImage()
            // this.setDynamicCopy(imgArr)
            // this.$router.push('/pages/copy-dynamic/copy-dynamic')
          }
        })
      },
      _downImage() {
        if (!this.dynamicCopy.length) {
          return
        }
        this._downItem(0)
      },
      // 下载图片
      _downItem(i) {
        this.$wx.downloadFile({
          url: this.dynamicCopy[i].file_url,
          success: (res) => {
            this.downList.push(res.tempFilePath)
            this.$wechat.showLoading(`正在下载${i + 1}/${this.dynamicCopy.length}图片`)
            if (i >= this.dynamicCopy.length - 1) {
              this._saveImgae(0)
              return
            }
            this._downItem(i + 1)
          }
        })
      },
      // 保存图片进相册
      _saveImgae(i) {
        this.$wx.saveImageToPhotosAlbum({
          filePath: this.downList[i],
          success: (res) => {
            if (i >= this.downList.length - 1) {
              this.$wechat.hideLoading()
              this.showSmallDown = true
              this.downList = []
              // this.$refs.confirm.show({ msg: '图片已保存至你的手机相册并复制描述！' })
              return
            }
            this._saveImgae(i + 1)
          },
          fail: () => {
            // 拒绝授权重新调起授权
            this.activeInd = 1
            setTimeout(() => {
              this.$wx.openSetting()
            }, 1000)
          }
        })
      },
      _seeImage(index, image) {
        this.setShowType(true)
        this.runShow = false
        let imageArr = image.map(item => item.file_url)
        this.$wx.previewImage({
          current: imageArr[index], // 当前显示图片的http链接
          urls: imageArr // 需要预览的图片http链接列表
        })
      },
      _delItem(index) {
        if (!this.isShowBox) {
          return
        }
        this.isShowBox = false
        this.delIndex = index
        this.$refs.confirm.show({ msg: '确定删除该动态？' })
      },
      _comment(id) {
        this.comId = id
        this.comIndex = this.dynamicList.findIndex(item => item.id === id)
        this.textArea = true
        this.inputMsg = ''
      },
      _goodLike(index) {
        let data = { live_log_id: this.dynamicList[index].id, like: this.dynamicList[index].is_like ? 0 : 1 }
        Dynamic.likeLog(data).then((res) => {
          if (res.error === this.$ERR_OK) {
            this.$wechat.hideLoading()
            this.dynamicList[index].is_like = !this.dynamicList[index].is_like
            this.dynamicList[index].show = false
            this.dynamicList[index].live_log_like = res.data
            if (this.dynamicList[index].is_like) {
              this.sendCustomMsg(50005)
            }
            // 点赞之后加入
            return
          }
          this.$wechat.hideLoading()
          this.$showToast(res.message)
        })
      },
      _closeLong() {
        this.dynamicList = this.dynamicList.map((item) => {
          item.show = false
          return item
        })
        this.textArea = false
        // this._closeCover()
      },
      sendMsg() {
        if (!this.inputMsg) {
          this.$showToast('评论不能为空')
          return
        }
        let msgTxt = this.inputMsg.toString().trim()
        if (!msgTxt) {
          this.$showToast('评论不能为空')
          return
        }
        let data = {
          live_log_id: this.comId,
          content: msgTxt,
          comment_shop_id: 0,
          comment_customer_id: 0,
          comment_id: 0
        }
        Dynamic.commentLog(data).then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            this.$wechat.hideLoading()
            this.dynamicList[this.comIndex].live_log_comment.push(res.data)
            this.textArea = false
            this.sendCustomMsg(50004)
            return
          }
          this.$showToast(res.message)
        })
      },
      // 是否确认删除
      _sureDel() {
        Dynamic.delLogs(this.dynamicList[this.delIndex].id).then((res) => {
          if (res.error === this.$ERR_OK) {
            this.dynamicList.splice(this.delIndex, 1)
            this.$showToast('删除动态成功')
            this.$wechat.hideLoading()
            return
          }
          this.$wechat.hideLoading()
          this.isShowBox = false
          this.$showToast(res.message)
        })
      },
      _showLong(index, status) {
        let showIdx = this.dynamicList.findIndex(item => item.show)
        if (showIdx !== -1) {
          this.dynamicList[showIdx].show = false
        }
        this.dynamicList[index].show = !status
      }
    },
    computed: {
      ...mapGetters(['isLoadDy', 'appShowType'])
      // isMine() {
      //   let status = this.myShopId && this.shopId && this.myShopId === this.shopId
      //   return status
      // }
    },
    components: {
      ConfirmMsg,
      DynamicShare,
      Share,
      HeadItem,
      Frozen
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .dynamic-item
    position: relative

  .copy-item
    z-index: 60
    right: 14px
    top: 13px
    position: absolute
    share-button-style()

  .find-item
    word-break: break-word
    line-height: 1
    padding-top: 14px
    background: $color-FFFFFF

    .find-box
      padding-bottom: 15px
      border-bottom-1px($color-col-line)
      margin-left: 16vw
      padding-right: 21px
      margin-bottom: 10px
      .user
        display: flex
        transform: translateX(-45px)
        .header
          height: 36px
          width: 36px
        .nickname
          font-family: $font-family-medium
          color: $color-text
          font-size: $font-size-16
          margin-left: 10px
          margin-top: 3.5px
          max-width: 51vw
          no-wrap()
      .words
        word-break: break-word
        margin-top: -10px
        display: block
        width: 78.67vw
        font-family: $font-family-regular
        font-size: $font-size-16
        color: #333
        line-height: 24px
        margin-bottom: 3.5px
        .p-more
          color: $color-del
          margin-left: 12px
      .words.special
        height: 21px
      .address
        font-size: $font-size-12
        color: $color-del
        margin-top: 8px
        .add-icon
          height: 13px
          width: @height
          margin-left: 3px
          transform: translateY(1.5px)
      .information
        height: 20px
        display: flex
        margin: 19px 0 0
        font-size: $font-size-12
        justify-content: space-between
        align-items: center
        .del
          color: $color-466889
          margin-left: 3.2vw
        .find-num, .time
          white-space: nowrap
          font-size: $font-size-12
          font-family: $font-family-regular
          color: $color-828AA2
          color: $color-99A0AA
          display: flex
        .share
          display: flex
          height: 30px
          align-items: center
          border-radius: 2px
          line-height: 30px
          right: 20px
          .share-item
            flex: 1
            height: 15px
            justify-content: center
            display: flex
            align-items: center
            margin-right: 8vw
            &:last-child
              margin-right: 0
            .find-icon
              width: 18px
              height: 18px
            .find-num
              margin-left: 2.5px
              font-size: $font-size-12
              color: $color-FFFFFF

        .share-active
          opacity: 1
          width: 148px
          z-index: 10
          transition: all 0.3s
      .likes-peo
        margin-top: 10px
        position: relative
        width: 79.73vw
        box-sizing: border-box
        border-radius: 5px
        background: $color-F4F5F7
        padding-bottom: 3px
        &:before
          content: ''
          width: 0
          height: 0
          border: 8px solid $color-F4F5F7
          border-top-color: transparent
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          position: absolute
          left: 20px
          top: -15px
        .likes-peo-bg
          display: block
          width: 100%
        .peo-big-box
          width: 100%
          box-sizing: border-box
          padding: 3px 0
          display: flex
        .like-icon
          margin: 4px 0 0 10px
          z-index: 10
          width: 14px
          height: 14px
        .like-name
          font-size: $font-size-14
          color: $color-466889
          margin-left: 5px
          z-index: 10
          line-height: 21px
          flex: 1
        .comment-peo
          padding: 0 10px
          width: 100%
          box-sizing: border-box
          font-size: $font-size-14
          line-height: 22px
          color: $color-466889
          .ro-peo-name
            font-family: $font-family-medium
            white-space: nowrap
          .comment-name
            font-family: $font-family-regular
            color: $color-1F1F1F



  .img-one
    .img-one-item
      box-sizing: border-box
      width: 34.134vw
      height: 46.4vw
    .img-item-two
      display: inline-block

  .img-two
    .img-item-two
      display: flex
      justify-content: space-between
      .two-item
        box-sizing: border-box
        height: 31.2vw
        width: 49%

  .img-more
    .img-item-two
      display: flex
      flex-wrap: wrap
      transform: translateX(-5px)
      .two-item
        box-sizing: border-box
        height: 23.5vw
        width: @height
        margin-left: 2.3vw
        margin-top: 2.3vw
  .new-dynamic
    border-radius: 50%
    position: fixed
    bottom: 36px
    right: 15px
    z-index: 100
    width: 64px
    height: @width
    .new-dynamic-img
      height: 100%
      width: 100%
  .comment-box
    z-index: 100
    position: fixed
    width: 100vw
    background: $color-background
    display: flex
    align-items: center
    bottom: 0
    padding: 0 15px
    box-sizing: border-box
    .comment
      width: 77.33vw
      margin: 6px 0
      font-family: $font-family-regular
      color: $color-374B63
      font-size: $font-size-14
      box-sizing: border-box
      border-1px(rgba(0, 0, 0, 0.10), 0)
      flex: 1
      line-height: 16px
      background: $color-FFFFFF
      text-indent: 8px
    .send
      color: $color-374B63
      border-radius: 2px
      box-sizing: border-box
      border-1px(rgba(0, 0, 0, 0.10))
      margin-left: 5px
      font-family: $font-family-medium
      font-size: $font-size-14
      width: 50px
      height: 36px
      line-height: 36px
      text-align: center
      background: $color-FFFFFF

  .chat-input
    position: fixed
    left: 0
    bottom: 0
    right: 0
    z-index: 100
    min-height: 38px
    background: $color-F8F8F8
    padding: 6px 15px
    display: flex
    align-items: flex-end
    .submit-btn
      width: 50px
      height: 36px
      border: 1px solid rgba(0, 0, 0, 0.10)
      border-radius: 2px
      background: $color-FFFFFF
      text-align: center
      line-height: 36px
      font-size: $font-size-14
      font-family: $font-family-meddle
      margin-left: 5px
    .input-container
      flex: 1
      min-height: 36px
      border: 1px solid rgba(0, 0, 0, 0.10)
      background: $color-FFFFFF
      overflow-y: auto
      padding: 0 10px
      display: flex
      align-items: center
      .textarea
        width: 100%
        max-height: 100px
        padding: 0
        margin: 0
        border: 0 none
        font-size: $font-size-14
    .android.input-container
      min-height: 28px
      padding-top: 8px

  .down-image
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: rgba(32, 32, 46, .8)
    display: flex
    align-items: center
    justify-content: center
    .down-image-box
      height: 170px
      width: 300px
      display: flex
      flex-direction: column
      align-items: center
      background: $color-FFFFFF
      border-radius: 3px
      border-1px(#fff, 3px)
      box-sizing: border-box
      padding-top: 20px
    .down-image-title
      font-family: $font-family-medium
      color: $color-374B63
      font-size: $font-size-16
    .down-image-text
      width: 196px
      text-align: center
      font-size: $font-size-16
      color: $color-374B63
      font-family: $font-family-regular
      margin: 15px 0 19px
      line-height: 24px
    .down-image-btn
      font-size: $font-size-14
      font-family: $font-family-regular
      color: $color-FFFFFF
      border-radius: 50px
      line-height: 32px
      width: 100px
      height: 32px
      button-style(normal, 50px)

  /*转发*/
  .bottom-box-big
    position: fixed
    top: 0
    left: 0
    z-index: 0
    height: 100vh
    width: 100vw
    background: rgba(32, 32, 46, 0.8)
    opacity: 0
    transition: opacity 0.3s

  .bottom-box-big-show
    opacity: 1
    z-index: 100
    transition: opacity 0.3s

  .bottom-box
    position: fixed
    z-index: 100
    left: 0
    bottom: -100%
    right: 0
    background: $color-F0F2F5
    transition: all .3s
    box-shadow: 0 -4px 12px 0 rgba(43, 43, 145, 0.07)
    .share-item
      width: 100%
      height: 50px
      text-align: center
      line-height: 44px
      font-size: $font-size-14
      font-family: $font-family-regular
      background-color: $color-FFFFFF
      border: 0 none
      padding: 0
      border-radius: 0
      &:before, &:after
        border: 0 none
        border-radius: 0
    .last
      margin-top: 10px
    .border-top
      border-top-1px($color-E0E2E5)

  .bottom-box.show
    bottom: 0
  .no-more
    font-size: 14px
    color: $color-99A0AA
    text-align: center
    line-height: 28px
    position: relative
    height: 28px
    margin: 10px auto
    background: $color-FFFFFF
    width: 94px
    .txt
      row-center()
      top: 0
      width: 94px
      background: $color-FFFFFF
    .line
      width: 114px
      height: 1px
      background: $color-99A0AA
      col-center()
      row-center()
</style>
