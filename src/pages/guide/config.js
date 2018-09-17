import Vue from 'vue'
import Page from './guide'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: '导购'
  }
}
