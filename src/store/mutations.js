import * as types from './mutation-types'

const mutations = {
  [types.ROLE_TYPE](state, role) {
    state.role = role
  },
  [types.SET_TARGET_PAGE](state, page) {
    state.targetPage = page
  },
  [types.SET_SHOW_TYPE](state, boolean) {
    state.appShowType = boolean
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
  },
  [types.SET_DYNAMIC] (state, boolean) {
    state.isLoadDy = boolean
  },
  [types.GOODS_DRAW_INFO] (state, obj) {
    state.goodsDrawInfo = obj
  },
  [types.SET_BEHAVIOR_LIST] (state, opt) {
    state.behaviorList.push(opt)
  },
  [types.SET_CURRENT_MSG] (state, info) {
    state.currentMsg = info
  },
  [types.SET_IMING] (state, boolean) {
    state.imIng = boolean
  }
}

export default mutations
