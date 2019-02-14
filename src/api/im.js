import request from 'common/js/request'

export default {
  // im获取签名，应用信息
  getImInfo(imAccount, loading) {
    const url = `/api/customer/im/signature`
    const data = {
      im_account: imAccount
    }
    return request.get(url, data, loading)
  },
  // 员工和客户建立连接
  getConect(data, loading) {
    const url = `/api/customer/shops/relationship`
    return request.post(url, data, loading)
  },
  // 聊天记录
  getMsgList(data, loading) {
    const url = `/api/customer/im/messages`
    return request.get(url, data, loading)
  },
  // 欢迎语信息
  getWelcomeMsg(data, loading) {
    const url = `/api/customer/im/messages/welcome`
    return request.get(url, data, loading)
  },
  /**
   * 采集行为消息
   * @return {*}
   */
  sendRecord(data, loading = false) {
    let url = '/api/analysis/send-record'
    return request.get(url, data, loading, 'imRecord')
  },
  /**
   * 采集行为消息 - 新1.5
   * @return {*}
   */
  sendNewRecord(data, loading = false) {
    let url = '/api/customer/action-collect'
    return request.get(url, data, loading)
  }
}
