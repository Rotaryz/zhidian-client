import webim from '../lib/webim'

export default {
  // 获取未读会话数据
  getUnread() {
    return new Promise((resolve, reject) => {
      try {
        webim.syncMsgs(() => {
          let sessMap = webim.MsgStore.sessMap()
          resolve(sessMap)
        })
      } catch (e) {
        throw e
      }
    })
  },
  // 获取C2C历史消息并设成已读状态
  // id 要拉取的好友id
  getC2CMsgList(id) {
    let options = {
      'Peer_Account': id, // 好友帐号
      'MaxCnt': 1, // 拉取消息条数
      LastMsgTime: 0, // 最近的消息时间，即从这个时间点向前拉取历史消息
      MsgKey: ''
    }
    return new Promise((resolve, reject) => {
      webim.getC2CHistoryMsgs(
        options,
        resp => {
          if (resp.MsgList.length === 0) {
            webim.Log.error('没有历史消息了:data=' + JSON.stringify(options))
          } else {
            let selSess = resp.MsgList[0].sess
            webim.setAutoRead(selSess, true, true)
          }
          resolve('success')
        },
        err => {
          reject(err)
        }
      )
    })
  },
  // 获取最近联系人列表
  getRecentContact(num = 10) {
    return new Promise((resolve, reject) => {
      webim.getRecentContactList({
        'Count': num // 最近的会话数 ,最大为 100
      }, resp => {
        resolve(resp)
        // 业务处理
      }, err => {
        // 错误回调
        reject(err)
      })
    })
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
