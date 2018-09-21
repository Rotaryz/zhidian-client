import * as types from './mutation-types'

const mutations = {
  [types.ROLE_TYPE](state, role) {
    state.role = role
  },
  [types.SET_TARGET_PAGE](state, page) {
    state.targetPage = page
  },
  [types.SET_SHOW_TYPE](state, boolean) {
    state.showType = boolean
  },
  [types.SET_SHOW_TYPE](state, boolean) {
    state.appShowType = boolean
  },
  [types.SET_GOODS_REFRESH](state, goodsRefresh) {
    state.goodsRefresh = goodsRefresh
  },
  [types.BROWSE_LIST](state, browseList) {
    state.browseList = browseList
  },
  [types.SET_ORDER_RESULT](state, obj) {
    state.orderResult = obj
  },
  [types.SET_FROM_MSG](state, msg) {
    state.fromMsg = msg
  },
  [types.SET_SCENE](state, scene) {
    state.scene = scene
  }
}

export default mutations
