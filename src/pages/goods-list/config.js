import Vue from 'vue'
import Page from './goods-list'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: '全部商品',
    backgroundColor: '#f4f5f7',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark'
  }
}
