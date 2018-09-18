import * as types from './mutation-types'

const mutations = {
  [types.ROLE_TYPE](state, role) {
    state.role = role
  },
  [types.SET_TARGET_PAGE](state, page) {
    state.targetPage = page
  }
}

export default mutations
