import Vue from 'vue'
import Page from './dynamic'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: '动态'
  }
}
