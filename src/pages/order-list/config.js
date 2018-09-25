import Vue from 'vue'
import Page from './order-list'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: '订单明细',
    backgroundColor: '#f4f5f7'
  }
}
