import Vue from 'vue'
import Page from './chat-msg-list'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: ''
  }
}
