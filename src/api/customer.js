import request from 'common/js/request'

export default {
  /**
   * 手机号授权
   * @return {*}
   */
  setCustomerPhone(data, loading) {
    let url = '/api/customer/profile/mobile'
    return request.post(url, data, loading)
  },
  /**
   * 我的砍价
   * @return {*}
   */
  getMyBargain(loading) {
    let url = '/api/customer/my-bargain'
    return request.get(url, {}, loading)
  }
}
