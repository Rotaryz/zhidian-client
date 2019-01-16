import Vue from 'vue'
import Page from './activity-detail.vue'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: '活动详情',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark',
    usingComponents: {}
  }
}
