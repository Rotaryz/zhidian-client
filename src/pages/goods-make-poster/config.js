import Vue from 'vue'
import Page from './goods-make-poster'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: '活动海报'
  }
}
