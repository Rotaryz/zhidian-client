import Vue from 'vue'
import Page from './wheel-poster'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: '幸运大转盘'
  }
}
