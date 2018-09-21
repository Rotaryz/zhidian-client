const state = {
  role: null,
  targetPage: null, // 目标页面，用于登录授权后跳转
  browseList: [], // 我浏览过的店列表
  orderResult: {}, // 订单支付结果页
  appShowType: false, // app onShow不执行方法
  nowChat: [], // 当前的聊天消息
  currentMsg: null, // 当前消息对象（名片对象）没有则为null， employeeId 员工id、flowId 流id、nickName 员工姓名、avatar 员工头像, account 员工的IM账号
  imLogin: false, // im的登录态
  fromMsg: {}, // 来源信息 fromType, fromId, source
  scene: 0 // 0为普通，1为转发，2为扫码
}

export default state
