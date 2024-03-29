import * as types from './mutation-types'
import { radarTimeFormat, msgFaceToHtml, labelEscape, TIMELAG } from 'utils/im-plugins'

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
  [types.SET_DYNAMIC](state, boolean) {
    state.isLoadDy = boolean
  },
  [types.GOODS_DRAW_INFO](state, obj) {
    state.goodsDrawInfo = obj
  },
  [types.SET_BEHAVIOR_LIST](state, opt) {
    state.behaviorList.push(opt)
  },
  [types.SET_BEHAVIOR_LIST_TO_SERVERS](state, opt) {
    state.behaviorListToServer.push(opt)
  },
  [types.CLEAR_BEHAVIOR_LIST_TO_SERVERS](state) {
    state.behaviorListToServer = []
  },
  [types.SET_CURRENT_MSG](state, info) {
    state.currentMsg = info
  },
  [types.SET_IMING](state, boolean) {
    state.imIng = boolean
  },
  [types.SET_IM_LOGIN](state, boolean) {
    state.imLogin = boolean
  },
  [types.DESC_MSG](state, descMsg) {
    state.descMsg = descMsg
  },
  [types.CLEAR_BEHAVIOR_LIST](state) {
    state.behaviorList = []
  },
  [types.SET_NOW_COUNT_NUM](state, num) {
    state.currentUnRead = num * 1
  },
  [types.SET_NOW_COUNT](state, type) {
    if (type === 'add') {
      state.currentUnRead++
    } else if (type === 'clear') {
      state.currentUnRead = 0
    }
  },
  [types.ADD_NOW_CHAT](state, msg) {
    let newMsg
    if (msg.ext * 1 === 20005) {
      let data = JSON.parse(msg.data)
      let desc = JSON.parse(msg.desc)
      if (desc.log_type * 1 !== 20) {
        newMsg = {
          from_account_id: msg.fromAccount,
          avatar: state.currentMsg.avatar,
          content: '',
          goods_id: data.goods_id,
          url: data.url,
          title: data.title,
          goods_price: data.goods_price,
          original_price: data.original_price,
          shop_name: data.shop_name,
          created_at: msg.time,
          end_at: data.end_at,
          coupon_id: data.coupon_id,
          coupon_num: data.coupon_num,
          coupon_type: data.coupon_type,
          msgTimeStamp: msg.time,
          nickName: state.currentMsg.nickName,
          sessionId: msg.fromAccount,
          unreadMsgCount: 0,
          type: desc.log_type
        }
      } else {
        newMsg = {
          from_account_id: msg.fromAccount,
          avatar: state.currentMsg.avatar,
          content: '',
          url: data.url,
          created_at: msg.time,
          msgTimeStamp: msg.time,
          nickName: state.currentMsg.nickName,
          sessionId: msg.fromAccount,
          unreadMsgCount: 0,
          type: desc.log_type,
          width: data.width,
          height: data.height
        }
      }
    } else {
      newMsg = {
        from_account_id: msg.fromAccount,
        avatar: state.currentMsg.avatar,
        content: msg.text,
        created_at: msg.time,
        msgTimeStamp: msg.time,
        nickName: state.currentMsg.nickName,
        sessionId: msg.fromAccount,
        unreadMsgCount: 0,
        type: 1
      }
    }
    if (state.nowChat.length) {
      let lastItem = state.nowChat[state.nowChat.length - 1]
      let lastTime = lastItem.created_at ? lastItem.created_at : lastItem.msgTimeStamp
      newMsg.is_showtime = msg.time - lastTime > TIMELAG
    } else {
      newMsg.is_showtime = true
    }
    state.nowChat = [...state.nowChat, newMsg].map((item) => {
      let time = item.created_at ? item.created_at : item.msgTimeStamp
      item.time = radarTimeFormat(time).time
      item.content = labelEscape(item.content)
      item.html = msgFaceToHtml(item.content)
      return item
    })
    if (state.nowChat.length) {
      if (state.nowChat[0].is_first) {
        state.nowChat = [{type: 10000}, ...state.nowChat]
      }
    }
  },
  [types.SET_CHAT_BTNTYPE](state, type) {
    state.chatBtnType = type
  },
  [types.SET_NOW_CHAT](state, nowChat) {
    state.nowChat = nowChat.map((item, index) => {
      let time = item.created_at ? item.created_at : item.msgTimeStamp
      item.time = radarTimeFormat(time).time
      item.content = labelEscape(item.content)
      item.html = msgFaceToHtml(item.content)
      item.nickName = item.shop_name // 名称映射
      // console.log(index, item.shop_name)
      return item
    })
    if (state.nowChat.length) {
      if (state.nowChat[0].is_first) {
        state.nowChat = [{type: 10000}, ...state.nowChat]
      }
    }
  },
  [types.SET_IM_POSITION](state, position) {
    state.imPosition = Object.assign({}, position)
  },
  [types.SET_IM_TITLE](state, title) {
    state.chatMsgTitle = title
  },
  [types.SET_PAGE_HEAD](state, px) {
    state.pageHeadH = px
  },
  [types.SET_COUPON_LIST](state, list) {
    state.couponList = list
  },
  [types.SET_SELECT_COUPON](state, item) {
    state.selectCoupon = item
  },
  [types.CHECK_COUPON](state, resultList) {
    state.checkoutCouponList = resultList
    state.canUseNum = resultList.canUse.length
  },
  [types.SET_PAGE_JUMP](state, val) {
    state.pageIsJump = val
  }
}

export default mutations
