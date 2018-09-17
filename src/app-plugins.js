import Vue from 'vue'
import WeIM from 'common/we-im'
import {ERR_OK} from 'api/config'
import * as wechat from 'common/js/wechat'
import wx from 'wx'
import * as cos from 'common/we-cos/upload'
import * as cosFileType from 'common/we-cos/fileConfig'

// // 不需要自动重置data数据的页面
const unResetPage = [
  'pages/page-a',
  'pages/example'
]
// 定义插件
const somePlugin = {
  install: function () {
    Vue.mixin({
      onUnload() {
        // 清除mpvue的wathcers
        this._watchers = []
        this._watcher.teardown()
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
    if (!Vue.prototype.webimHandler) {
      Vue.prototype.webimHandler = new WeIM()
    }
    Vue.prototype.ERR_OK = ERR_OK
    Vue.prototype.wechat = wechat
    Vue.prototype.wx = wx
    Vue.prototype.cos = cos
    Vue.prototype.cosFileType = cosFileType
  }
}
// 使用插件
Vue.use(somePlugin)
