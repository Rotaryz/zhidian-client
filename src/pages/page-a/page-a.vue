<template>
  <div class="page-a">
    <div v-show="index === pageList.length - 1" v-for="(item, index) in pageList" :key="index">
      <page-a ref="page"></page-a>
    </div>
    <hr>
    <br>
    <h1 @click="test">testaasdsad</h1>
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import PageA from 'components/test/test'
  import Toast from 'components/toast/toast'

  export default {
    components: {
      PageA,
      Toast
    },
    data() {
      return {
        pageList: [],
        title: ''
      }
    },
    onLoad(options) {
      // this.$refs.pageA.action(~~(Math.random() * 20))
      this.pageList.push(1)
      // options && (this.title = options.title)
    },
    mounted() {
      // this.$refs.page.action(~~(Math.random() * 20))
    },
    onUnload() {
      this.pageList.pop()
    },
    beforeDestroy() {
    },
    methods: {
      test() {
        this.$refs.page[this.pageList.length - 1].action('ashdkajdda')
        // this.$refs.toast.show('ahsdkadsh')
        // this.$refs.page0.action('asdhakdhasa')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
