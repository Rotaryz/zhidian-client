import webim from '../lib/webim'

export default {
  // 发送消息(聊天消息)
  onSendMsg(msg, msgToId, context) {
    let self = context
    let msgtosend = msg
    let msgLen = webim.Tool.getStrBytes(msg)
    return new Promise(async (resolve, reject) => {
      // 获取消息内容
      let maxLen, errInfo
      maxLen = webim.MSG_MAX_LENGTH.C2C
      errInfo = '消息长度超出限制(最多' + Math.round(maxLen / 3) + '汉字)'
      if (msgLen > maxLen) {
        reject(errInfo)
        return
      }
      if (!self.selSess || self.selSess.id !== msgToId) {
        self.selSess = new webim.Session(self.selType, msgToId)
      }
      let isSend = true // 是否为自己发送
      let seq = -1 // 消息序列，-1表示sdk自动生成，用于去重
      let random = Math.round(Math.random() * 4294967296) // 消息随机数，用于去重
      let msgTime = Math.round(Date.now() / 1000) // 消息时间戳
      let subType = webim.C2C_MSG_SUB_TYPE.COMMON
      let msg = new webim.Msg(self.selSess, isSend, seq, random, msgTime, self.loginInfo.identifier, subType, self.loginInfo.identifierNick)
      let textObj = new webim.Msg.Elem.Text(msgtosend)
      msg.addText(textObj)
      return msg
    })
  },
  // 发送消息
  sendMsg(msg, context) {
    const self = context
    return new Promise((resolve, reject) => {
      webim.sendMsg(msg, resp => {
        if (self.selType === webim.SESSION_TYPE.C2C) {
          resolve(resp)
        }
        webim.Log.info('发消息成功')
      }, err => {
        webim.Log.error('发消息失败:' + err.ErrorInfo)
        reject(err)
      })
    })
  }
}
