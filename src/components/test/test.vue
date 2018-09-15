<template>
  <div>
    <h1>A页面{{title}}</h1>
    <a href="/pages/two">跳TWO页面</a>
    <h2 @click="test">测试数据:{{num}}</h2>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Poster } from 'api'

  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      pageList: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        num: 0
      }
    },
    created() {
      this.title = ~~(Math.random() * 20)
    },
    onLoad() {
    },
    onUnload() {
    },
    methods: {
      test() {
        this.num++
      },
      show(id) {
        Poster.getHouseInfo(res => {
          console.log(res)
        })
      },
      action(id) {
        this.title = id
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
