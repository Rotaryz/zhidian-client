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
  scene: 0, // 0为普通，1为转发，2为扫码
  groupDetail: {}, // 团购详情跳转商品详情再打开团购详情时存储请求参数
  groupGoods: {}, // 商品详情跳转团购详情再打开商品时存储请求参数
  isLoadDy: false,
  goodsDrawInfo: {} // 商品海报对象
}

export default state
