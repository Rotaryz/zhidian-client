import * as types from './mutation-types'

const mutations = {
  [types.ROLE_TYPE](state, role) {
    state.role = role
  },
  [types.SET_TARGET_PAGE] (state, page) {
    state.targetPage = page
  },
  [types.SET_SHOW_TYPE] (state, boolean) {
    state.showType = boolean
  },
  [types.SET_GOODS_REFRESH] (state, goodsRefresh) {
    state.goodsRefresh = goodsRefresh
  }
}

export default mutations
