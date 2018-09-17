import Vue from 'vue'
import Page from './z-exp-test'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: 'z-test'
  }
}
