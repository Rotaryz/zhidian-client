import Vue from 'vue'
import Page from './page-a'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: 'page-test'
  }
}
