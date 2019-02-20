// 领取优惠券
import Vue from 'vue'
import Page from './cashing-coupon'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: 'CASHING_COUPON'
  }
}
