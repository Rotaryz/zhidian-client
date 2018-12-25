// 品牌故事
import Vue from 'vue'
import Page from './shop-story'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: 'SHOP_STORY'
  }
}
