<template>
    <div class="album">
      <div class="album-list">
        <div class="item-list" v-for="(item, index) in shopList" v-bind:key="index">
          <div class="item-box" @click="previewImg(item)">
            <img :src="item.url" class="item-img" mode="aspectFill">
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import wx from 'common/js/wx'

  export default {
    name: 'album',
    data() {
      return {
        shopList: [
          {
            url: 'https://img.jerryf.cn/defaults/zd-image/test-img/9@1x.png'
          },
          {
            url: 'https://img.jerryf.cn/defaults/zd-image/test-img/8@1x.png'
          },
          {
            url: 'https://img.jerryf.cn/defaults/zd-image/test-img/10@1x.png'
          },
          {
            url: 'https://img.jerryf.cn/defaults/zd-image/test-img/3@1x.png'
          }
        ]
      }
    },
    created() {
    },
    mounted() {
      wx.setNavigationBarTitle({ title: '国颐堂' })
    },
    methods: {
      previewImg(item) {
        wx.previewImage({urls: [item.url]})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .album
    min-height: 100vh
    background: $color-background
    padding: 10px 15px
    box-sizing: border-box
  .album-list
    layout(row)
    align-items: center
    .item-list
      width: 50%
      box-sizing: border-box
      margin-bottom: 10px
      &:nth-of-type(odd)
        padding-right: 5px
      &:nth-of-type(even)
        padding-left: 5px
    .item-box
      width: 100%
      height: 0
      padding-bottom: 75%
      box-sizing: border-box
      position: relative
      .item-img
        width: 100%
        height: 100%
        position: absolute
        border-radius: 2px
        display: block

</style>
