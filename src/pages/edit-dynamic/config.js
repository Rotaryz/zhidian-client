import Vue from 'vue'
import Page from './edit-dynamic'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: '发布动态'
  }
}
