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
  // 解析消息
  parseMsg(msg) {
    let data
    let elems = msg.getElems() // 获取消息包含的元素数组
    let elem = elems[0]
    let type = elem.getType() // 获取元素类型
    let content = elem.getContent() // 获取元素对象
    switch (type) {
      case webim.MSG_ELEMENT_TYPE.TEXT: // 聊天
        data = {
          type: 'chat', // 聊天
          text: content.getText() // 内容
        }
        break
      case webim.MSG_ELEMENT_TYPE.CUSTOM: // 自定义消息
        data = {
          type: 'custom', // 自定义
          data: content.getData(), // 内容
          desc: content.getDesc(), // 描述
          ext: content.getExt() // 扩展
        }
        break
      default:
        break
    }
    return data
  },
  // 读取用户资料 昵称 头像
  getCustomerMsg(fromAccount) {
    let ops = {
      'To_Account': [fromAccount],
      'TagList': ['Tag_Profile_IM_Nick', 'Tag_Profile_IM_Image']
    }
    return new Promise((resolve, reject) => {
      webim.getProfilePortrait(ops, (res) => {
        let arr = res.UserProfileItem[0].ProfileItem
        let nickName = arr.filter((item) => {
          return item.Tag === 'Tag_Profile_IM_Nick'
        })[0]
        let nickAvatar = arr.filter((item) => {
          return item.Tag === 'Tag_Profile_IM_Image'
        })[0]
        resolve({name: nickName.Value, avatar: nickAvatar.Value})
      }, (err) => {
        reject(err)
      })
    })
  }
}
