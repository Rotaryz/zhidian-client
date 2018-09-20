import request from 'common/js/request'

export default {
  /**
   * 店铺/员工动态列表
   * @return {*}
   */
  liveLogsList(data, loading) {
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
  /**
   * 生成小程序二维码
   * @returns {*}
   */
  createMiniCode (data) {
    let url = '/api/customer/create-mini-qrcode'
    return request.get(url, data)
  },
  /**
   * 发布动态
   * @returns {*}
   */
  liveLogs (data) {
    let url = '/api/customer/live-logs'
    return request.post(url, data)
  },
  /**
   * 删除动态
   * @returns {*}
   */
  delLogs (id) {
    let url = `/api/customer/live-logs/${id}`
    return request.delete(url)
  },
  /**
   * 上传图片
   * @param data
   * @returns {*}
   */
  upLoadImage (data, loading, autoHide) {
    let url = 'https://ws-api.jerryf.cn/api/minimerchant/images'
    return request.upLoadImage(url, data, loading, autoHide)
  }
}
