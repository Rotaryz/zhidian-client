<template>
  <article>
    <div class="hello">{{count}}</div>
    <ul>
      <li v-for="(item, index) in dataArray" :key="index">
        <h1>name:{{item.name}}</h1>
        <h2 v-if="item.title.hello"> title:{{item.title.hello}}</h2>
      </li>
    </ul>
  </article>
</template>

<script type="text/ecmascript-6">
  export default {
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
      console.log(this.count++)
      this.dataArray.forEach(item => item.title.hello && item.title.hello++)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .hello
    color: red
    font-size: 28px
</style>
