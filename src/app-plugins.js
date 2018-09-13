import Vue from 'vue'
// 定义插件
const somePlugin = {
  install: function () {
    Vue.mixin({
      onUnload() {
        if (this.$options.data) {
          Object.assign(this.$data, this.$options.data())
        }
      }
    })
  }
}
// 使用插件
Vue.use(somePlugin)
