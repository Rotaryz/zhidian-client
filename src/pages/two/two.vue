<template>
  <article>
    <div class="hello">{{count}}</div>
    <ul>
      <li v-for="(item, index) in dataArray" :key="index">
        <h1>name:{{item.name}}</h1>
        <h2 v-if="item.title.hello"> title:{{item.title.hello}}</h2>
      </li>
    </ul>
    <a href="/pages/example">跳页面ex</a>
    <div @click="toA">href="/pages/page-a">反跳A页面</div>
    <page-a></page-a>
  </article>
</template>

<script type="text/ecmascript-6">
  import PageA from 'components/test/test'
  export default {
    components: {
      PageA
    },
    data() {
      return {
        count: 0,
        dataArray: [
          {name: 0, title: 2},
          {name: 10, title: 20},
          {name: 100, title: 200},
          {name: 1000, title: {hello: 2}}
        ]
      }
    },
    onLoad() {
      this.dataArray.forEach(item => item.title.hello && item.title.hello++)
    },
    methods: {
      toA() {
        wx.navigateTo({url: '/pages/page-a?title=我是来自two页面'})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .hello
    color: red
    font-size: 28px
</style>
