import Vue from 'vue'
import store from '../store'
import wx from 'wx'
import WeIM from './we-im/index'
import { ERR_OK, baseURL } from 'api/config'
import * as wechat from 'common/js/wechat'
import * as cos from './we-cos/upload'
import * as cosFileType from './we-cos/fileConfig'
import base from 'common/mixins/base'
import { role } from 'common/js/contants'

// // 不需要自动重置data数据的页面
const unResetPage = []
// 定义插件
const AppPlugin = {
  install: function () {
    Vue.mixin({
      methods: {},
      onUnload() {
        // 清除mpvue的wathcers
        this._watchers = []
        this._watcher && this._watcher.teardown()
        // 重置页面组件的data数据
        if (!this.$mp) return
        // 重置页面的data数据
        let flag = unResetPage.some(value => {
          let reg = new RegExp(value)
          return reg.test(this.$options.__file)
        })
        if (!flag && this.$options.data) {
          Object.assign(this.$data, this.$options.data())
        }
      }
    })
    Vue.mixin(base)
    if (!Vue.prototype.$webimHandler) {
      Vue.prototype.$webimHandler = new WeIM()
    }
    Vue.prototype.$ERR_OK = ERR_OK
    Vue.prototype.$imageUrl = baseURL.image
    Vue.prototype.$wechat = wechat
    Vue.prototype.$wx = wx
    Vue.prototype.$cos = cos
    Vue.prototype.$cosFileType = cosFileType
    Vue.prototype.$store = store
    Vue.prototype.$role = role
  }
}
// 使用插件
Vue.use(AppPlugin)
