import Vue from 'vue'
import Page from './group-detail.vue'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: '拼团详情',
    usingComponents: {}
  }
}
