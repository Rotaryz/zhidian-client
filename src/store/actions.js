import * as types from './mutation-types'

export const saveRole = ({ commit, state }, role) => {
  commit(types.ROLE_TYPE, role)
}

export const setIsLoadDy = ({ commit, state }, msg) => {
  commit(types.SET_DYNAMIC, msg)
}

export const setShowType = ({ commit, state }, boolean) => {
  console.log('showtype')
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
