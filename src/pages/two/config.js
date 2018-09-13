import Vue from 'vue'
import Page from './two'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: 'two'
  }
}
