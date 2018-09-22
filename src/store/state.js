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
  goodsDrawInfo: {}, // 商品海报对象
  descMsg: null, // im行为消息需要的参数，type根据情况定义使用object.assign，1为普通，2为产品消息，flow_id流id,card_holder_id名片id,merchant_id商家id,employee_id员工id,customer_id顾客id
  behaviorList: [], // 行为消息待发送数组，IM不在登录态时把动作加进去，IM登录完成会跑一次并清空数组
  imIng: false, // 是否在聊天页面
  currentUnRead: 0 // 当前对象未读信息
}

export default state
