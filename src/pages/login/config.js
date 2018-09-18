import Vue from 'vue'
import Page from './login'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: '登录'
  }
}
