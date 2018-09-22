import Vue from 'vue'
import Page from './error-network'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: ''
  }
}
