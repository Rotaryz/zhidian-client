import webim from '../lib/webim'

export default {
  // sdk登录
  sdkLogin(userInfo, listeners, options) {
    return new Promise((resolve, reject) => {
      webim.login(userInfo, listeners, options, identifierNick => {
        webim.Log.info('webim登录成功')
        resolve(identifierNick)
      }, error => {
        webim.Log.info(error.ErrorInfo)
        reject(error)
      })
    })
  },
  // 修改帐号名称和头像
  setProfilePortrait(options) {
    return new Promise((resolve, reject) => {
      webim.setProfilePortrait(options,
        res => {
          webim.Log.info('修改昵称成功')
          resolve()
        },
        err => {
          webim.Log.info('修改昵称失败')
          reject(err)
        }
      )
    })
  },
  // 监听连接状态回调变化事件
  onConnNotify(resp) {
    switch (resp.ErrorCode) {
      case webim.CONNECTION_STATUS.ON:
        webim.Log.warn('连接状态正常...')
        break
      case webim.CONNECTION_STATUS.OFF:
        webim.Log.warn('连接已断开，无法收到新消息，请检查下你的网络是否正常')
        break
      default:
        webim.Log.error('未知连接状态,status=' + resp.ErrorCode)
        break
    }
  },
  // 登出
  sdkLogout() {
    return new Promise((resolve, reject) => {
      webim.logout(res => resolve(res), err => reject(err))
    })
  }
}
