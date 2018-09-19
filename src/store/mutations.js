import * as types from './mutation-types'

const mutations = {
  // [types.TEST_TYPE](state, test) {
  //   state.test = test
  // },
  [types.ROLE_TYPE](state, role) {
    state.role = role
  },
  [types.SET_DYNAMIC] (state, msg) {
    state.isLoadDy = msg
  },
  [types.SET_SHOW_TYPE] (state, boolean) {
    state.showType = boolean
  },
  [types.SET_GOODS_REFRESH] (state, goodsRefresh) {
    state.goodsRefresh = goodsRefresh
  }
}

export default mutations
