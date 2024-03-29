import * as types from './mutation-types'
import {checkCoupon} from '../common/js/util'

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

export const setBehaviorListToServers = ({ commit, state }, opt) => {
  commit(types.SET_BEHAVIOR_LIST_TO_SERVERS, opt)
}

export const clearBehaviorListToServers = ({ commit, state }) => {
  commit(types.CLEAR_BEHAVIOR_LIST_TO_SERVERS)
}

// 当前名片信息
export const setCurrentMsg = ({ commit, state }, info) => {
  commit(types.SET_CURRENT_MSG, info)
}

export const setImIng = ({ commit, state }, boolean) => {
  commit(types.SET_IMING, boolean)
}

export const setImLogin = ({ commit, state }, boolean) => {
  commit(types.SET_IM_LOGIN, boolean)
}

export const setDescMsg = ({ commit, state }, scene) => {
  commit(types.DESC_MSG, scene)
}

export const clearBehaviorList = ({ commit, state }) => {
  commit(types.CLEAR_BEHAVIOR_LIST)
}

export const setNowCountNum = ({ commit, state }, num) => {
  commit(types.SET_NOW_COUNT_NUM, num)
}

export const setNowCount = ({ commit, state }, type) => {
  commit(types.SET_NOW_COUNT, type)
}

export const addNowChat = ({ commit, state }, msg) => {
  commit(types.ADD_NOW_CHAT, msg)
}

export const setChatBtnType = ({ commit, state }, type) => {
  commit(types.SET_CHAT_BTNTYPE, type)
}

export const setNowChat = ({ commit, state }, nowChat) => {
  commit(types.SET_NOW_CHAT, nowChat)
}

export const setImPosition = ({ commit, state }, position) => {
  commit(types.SET_IM_POSITION, position)
}

export const setImTitle = ({ commit, state }, title) => {
  commit(types.SET_IM_TITLE, title)
}

export const setPageHeadH = ({ commit, state }, px) => {
  commit(types.SET_PAGE_HEAD, px)
}

export const setCouponList = ({ commit, state }, list) => {
  commit(types.SET_COUPON_LIST, list)
}

export const setSelectCoupon = ({ commit, state }, item) => {
  commit(types.SET_SELECT_COUPON, item)
}

export const checkoutCoupon = ({ commit, state }, msg) => {
  let res = checkCoupon(state.couponList, msg)
  commit(types.CHECK_COUPON, res)
}

export const setPageJump = ({ commit, state }, val) => {
  commit(types.SET_PAGE_JUMP, val)
}
