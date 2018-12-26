import Vue from 'vue'
import Page from './goods-list'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: '全部商品'
  }
}
