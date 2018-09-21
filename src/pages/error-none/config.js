import Vue from 'vue'
import Page from './error-none'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: ''
  }
}
