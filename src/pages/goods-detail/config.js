import Vue from 'vue'
import Page from './goods-detail.vue'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: '商品详情'
  }
}
