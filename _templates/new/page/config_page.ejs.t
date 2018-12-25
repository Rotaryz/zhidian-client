---
to: "src/pages/<%= h.inflection.dasherize(name) %>/config.js"
---
// <%= note %>
import Vue from 'vue'
import Page from './<%=  h.inflection.dasherize(name) %>'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: '<%=  h.inflection.dasherize(name).toUpperCase().replace(/-/g, '_')%>'
  }
}
