import Vue from 'vue'
import Page from './mine-bargain'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: '我的砍价'
  }
}
