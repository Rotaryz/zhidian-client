import Vue from 'vue'
import store from '@/store'
import App from './App'
import './app-plugins'

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
    pages: ['^pages/example'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '赞播智店',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#828AA2',
      selectedColor: '#F94C5F',
      backgroundColor: '#F8F8F8',
      borderStyle: 'black',
      list: [
        {
          pagePath: 'pages/guide',
          text: '导购',
          iconPath: '/static/img/icon-pinkan_tab@2x.png',
          selectedIconPath: '/static/img/icon-pinkan2_tab@2x.png'
        },
        {
          pagePath: 'pages/shop',
          text: '门店',
          iconPath: '/static/img/icon-goods_tab_un@2x.png',
          selectedIconPath: '/static/img/icon-goods_tab@2x.png'
        },
        {
          pagePath: 'pages/dynamic',
          text: '动态',
          iconPath: '/static/img/icon-dynamic_tab_un@2x.png',
          selectedIconPath: '/static/img/icon-dynamic_tab@2x.png'
        },
        {
          pagePath: 'pages/mine',
          text: '我的',
          iconPath: '/static/img/icon-my_tab_un@2x.png',
          selectedIconPath: '/static/img/icon-my_tab@2x.png'
        }
      ]
    }
  }
}
