import Vue from 'vue'
import Page from './order-refund'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: '退款详情'
  }
}
