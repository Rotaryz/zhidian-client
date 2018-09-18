import Vue from 'vue'
import store from '@/store'
import App from './App'
import './utils/app-plugins'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/guide'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '赞播智店',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#323232',
      selectedColor: '#D32F2F',
      backgroundColor: '#FFFFFF',
      borderStyle: 'black',
      list: [
        {
          pagePath: 'pages/guide',
          text: '导购',
          iconPath: '/static/img/icon-guide.png',
          selectedIconPath: '/static/img/icon-guide_select.png'
        },
        {
          pagePath: 'pages/shop',
          text: '门店',
          iconPath: '/static/img/icon-shoptab.png',
          selectedIconPath: '/static/img/icon-shoptab_select.png'
        },
        {
          pagePath: 'pages/dynamic',
          text: '动态',
          iconPath: '/static/img/icon-dynamic.png',
          selectedIconPath: '/static/img/icon-dynamic_select.png'
        },
        {
          pagePath: 'pages/mine',
          text: '我的',
          iconPath: '/static/img/icon-my.png',
          selectedIconPath: '/static/img/icon-my_select.png'
        }
      ]
    }
  }
}
