import * as types from './mutation-types'

export const saveRole = ({commit, state}, role) => {
  commit(types.ROLE_TYPE, role)
}

export const setTargetPage = ({commit, state}, page) => {
  commit(types.SET_TARGET_PAGE, page)
}
