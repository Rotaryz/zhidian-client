import Vue from 'vue'
import Page from './shop'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: '门店',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark'
  }
}
