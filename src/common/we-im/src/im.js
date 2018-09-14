import webim from '../lib/webim'
import Base from './base'
import Send from './send'
import Reader from './reader'

class Im {
  constructor(props) {
    const {logInfo = '', selSess = '', selType = 'C2C'} = props
    this.loginInfo = logInfo
    this.selSess = selSess // 当前会话
    this.selType = selType // 会话类型，暂时默认C2C
  }

  // sdk登录
  async sdkLogin(userInfo, listeners, options, avatar) {
    try {
      this.loginInfo = userInfo
      const profileOptions = {
        'ProfileItem': [
          {
            'Tag': 'Tag_Profile_IM_Nick',
            'Value': userInfo.identifierNick ? userInfo.identifierNick : userInfo.identifier
          },
          {
            'Tag': 'Tag_Profile_IM_Image',
            'Value': avatar || ' '
          }
        ]
      }
      await Base.sdkLogin(userInfo, listeners, options)
      await Base.setProfilePortrait(profileOptions)
    } catch (e) {
      console.error(e)
    }
  }
  // 登出
  async sdkLogout() {
    try {
      return await Base.sdkLogout()
    } catch (e) {
      console.error(e)
    }
  }

  // 监听连接状态回调变化事件
  onConnNotify(resp) {
    try {
      Base.onConnNotify(resp)
    } catch (e) {
      console.error(e)
    }
  }

  // 监听新消息(私聊(包括普通消息、全员推送消息)，普通群(非直播聊天室)消息)事件
  // newMsgList 为新消息数组，结构为[Msg]
  async onMsgNotify(newMsgList) {
    try {
      let newMsg = newMsgList[0]
      let res = await this._handlderMsg(newMsg)
      return res
    } catch (e) {
      console.error(e)
    }
  }

  // 处理消息（私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息）
  async _handlderMsg(msg) {
    let fromAccount, fromAccountNick, sessType, subType, content, isSelfSend, seq, random
    try {
      fromAccount = msg.getFromAccount()
      if (!fromAccount) {
        fromAccount = ''
      }

      fromAccountNick = msg.getFromAccountNick()
      if (!fromAccountNick) {
        fromAccountNick = fromAccount
      }

      // 解析消息
      // 获取会话类型
      // webim.SESSION_TYPE.GROUP-群聊，
      // webim.SESSION_TYPE.C2C-私聊，
      sessType = msg.getSession().type()
      // 获取消息子类型
      // 会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
      // 会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
      subType = msg.getSubType()
      seq = msg.getSeq()
      random = msg.getRandom()
      isSelfSend = msg.getIsSend() // 消息是否是自己发送

      // 私聊消息
      if (sessType === webim.SESSION_TYPE.C2C) {
        switch (subType) {
          case webim.C2C_MSG_SUB_TYPE.COMMON:// c2c普通消息
            // 业务可以根据发送者帐号fromAccount是否为app管理员帐号，来判断c2c消息是否为全员推送消息，还是普通好友消息
            // 或者业务在发送全员推送消息时，发送自定义类型(webim.MSG_ELEMENT_TYPE.CUSTOM,即TIMCustomElem)的消息，在里面增加一个字段来标识消息是否为推送消息
            content = Reader.parseMsg(msg)
            // // c2c消息一定要调用已读上报接口
            let customer = await Reader.getCustomerMsg(fromAccount)
            let data = Object.assign({}, {fromAccount, fromAccountNick, avatar: customer.avatar, isSelfSend, time: msg.getTime()}, content, seq, random)
            webim.Log.warn('收到一条c2c消息(好友消息或者全员推送消息): 发送人=' + fromAccountNick + ', 内容=' + content)
            return data
          default:
            break
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  // 发送文本消息
  async onSendMsg(msg, msgToId) {
    try {
      msg = await Send.formatTextMsg(msg, msgToId, this)
      await Send.sendMsg(msg, this)
    } catch (e) {
      console.error(e)
    }
  }

  // 发送消息
  async sendMsg(msg) {
    try {
      await Send.sendMsg(msg, this)
    } catch (e) {
      console.log(e)
    }
  }

  // 发送自定义消息
  async onSendCustomMsg(ops, msgToId) {
    try {
      let msg = await Send.formatCustomMsg(ops, msgToId, this)
      await Send.sendMsg(msg, this)
    } catch (e) {
      console.error(e)
    }
  }

  // 初始化未读数
  async initUnread(data) {
    try {
      let sessMap = await Reader.getUnread()
      data.forEach((item) => {
        let name = 'C2C' + item.employee.im_account
        if (sessMap[name]) {
          item.unReadMsgCount = sessMap[name].unread()
        } else {
          item.unReadMsgCount = 0
        }
      })
      return data
    } catch (e) {
      console.error(e)
    }
  }

  // 获取当前用户的未读消息数
  async getAnyUnread(account) {
    try {
      let sessMap = await Reader.getUnread()
      let name = 'C2C' + account
      return sessMap[name] ? sessMap[name].unread() : 0
    } catch (e) {
      console.error(e)
    }
  }

  // 获取C2C历史消息并设成已读状态
  // id 要拉取的好友id
  async getC2CMsgList(id) {
    try {
      let res = await Reader.getC2CMsgList(id)
      return res
    } catch (e) {
      console.error(e)
    }
  }

  // 获取最近联系人列表
  async getRecentContact(num) {
    try {
      let dataList = null
      let resp = await Reader.getRecentContact(num)
      if (resp.SessionItem && resp.SessionItem.length > 0) {
        dataList = Promise.all(resp.SessionItem.map(async (item) => {
          let type = item.Type
          if (type === webim.RECENT_CONTACT_TYPE.C2C) {
            let typeZn = '私聊'
            let info = await Reader.getCustomerMsg(item.To_Account)
            item = {
              type,
              typeZn,
              sessionId: item.To_Account,
              avatar: info.avatar,
              nickName: info.name,
              lastMsg: item.MsgShow,
              msgTimeStamp: item.MsgTimeStamp,
              msgSeq: item.MsgSeq,
              msgRandom: item.MsgRandom, // 消息随机数
              unreadMsgCount: item.UnreadMsgCount
            }
            return item
          }
        }))
      }
      console.warn(dataList)
      return dataList
    } catch (e) {
      console.error(e)
    }
  }
}

export default Im
