import request from 'common/js/request'

export default {
  /**
   * 店铺/员工动态列表
   * @return {*}
   */
  liveLogs(data, loading) {
    let url = '/api/customer/live-logs'
    return request.get(url, data, loading)
  },
  /**
   * 点赞动态列表
   * @returns {*}
   */
  likeLog (data) {
    let url = '/api/customer/like-log'
    return request.post(url, data)
  },
  /**
   * 评论动态
   * @returns {*}
   */
  commentLog (data) {
    let url = '/api/customer/comment-log'
    return request.post(url, data)
  },
  createMiniCode (data) {
    let url = '/api/customer/create-mini-qrcode'
    return request.get(url, data)
  }
}
