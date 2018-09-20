import Vue from 'vue'
import Page from './album'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: ''
  }
}
