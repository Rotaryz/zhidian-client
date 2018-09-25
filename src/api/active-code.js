import request from 'common/js/request'

export default {
  /**
   * 生成小程序二维码
   * @returns {*}
   */
  createMiniCode (data) {
    let url = '/api/customer/global-create-qrcode'
    return request.post(url, data)
  }
}
