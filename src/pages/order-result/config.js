import Vue from 'vue'
import Page from './order-result.vue'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: '支付详情'
  }
}
