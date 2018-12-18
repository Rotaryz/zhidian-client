import Vue from 'vue'
import Page from './exchange-coupon'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: '奖品券'
  }
}
