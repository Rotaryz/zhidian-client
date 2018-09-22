import * as types from './mutation-types'

export const saveRole = ({ commit, state }, role) => {
  commit(types.ROLE_TYPE, role)
}

export const setIsLoadDy = ({ commit, state }, boolean) => {
  commit(types.SET_DYNAMIC, boolean)
}

export const setShowType = ({ commit, state }, boolean) => {
  commit(types.SET_SHOW_TYPE, boolean)
}

export const setGoodsRefresh = ({ commit, state }, goodsRefresh) => {
  commit(types.SET_GOODS_REFRESH, goodsRefresh)
}

export const setTargetPage = ({ commit, state }, page) => {
  commit(types.SET_TARGET_PAGE, page)
}
export const setBrowseList = ({ commit, state }, arr) => {
  commit(types.BROWSE_LIST, arr)
}

export const setOrderResultMsg = ({ commit, state }, obj) => {
  commit(types.SET_ORDER_RESULT, obj)
}

export const setFromMsg = ({ commit, state }, msg) => {
  commit(types.SET_FROM_MSG, msg)
}

export const setScene = ({ commit, state }, scene) => {
  commit(types.SET_SCENE, scene)
}

export const setGoodsDrawInfo = ({ commit, state }, obj) => {
  commit(types.GOODS_DRAW_INFO, obj)
}

export const setBehaviorList = ({ commit, state }, opt) => {
  commit(types.SET_BEHAVIOR_LIST, opt)
}

// 当前名片信息
export const setCurrentMsg = ({ commit, state }, info) => {
  commit(types.SET_CURRENT_MSG, info)
}

export const setImIng = ({ commit, state }, boolean) => {
  commit(types.SET_IMING, boolean)
}
