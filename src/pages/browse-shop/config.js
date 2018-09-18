import Vue from 'vue'
import Page from './browse-shop'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: '浏览过的店'
  }
}
