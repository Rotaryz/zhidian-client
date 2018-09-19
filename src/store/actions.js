import * as types from './mutation-types'

// export const saveTest = function ({commit, state}, test) {
//   commit(types.TEST_TYPE, test)
// }

export const saveRole = ({commit, state}, role) => {
  commit(types.ROLE_TYPE, role)
}

export const setIsLoadDy = ({ commit, state }, msg) => {
  commit(types.SET_DYNAMIC, msg)
}

export const setShowType = ({ commit, state }, boolean) => {
  commit(types.SET_SHOW_TYPE, boolean)
}

export const setGoodsRefresh = ({ commit, state }, goodsRefresh) => {
  commit(types.SET_GOODS_REFRESH, goodsRefresh)
}
