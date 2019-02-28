import request from 'common/js/request'

export default {
  // 授权
  getToken(data, loading) {
    const url = `/api/jwt/customer/login`
    return request.post(url, data, loading)
  },
  // 获取默认店铺
  getDefaultShop(data, loading = false) {
    const url = `/api/default_shop`
    return request.get(url, data, loading)
  },
  // 获取默认店铺
  checkIsMyShop(data, loading = false) {
    const url = `/api/customer/checkout-shop`
    return request.get(url, data, loading)
  },
  // 发送formId
  updateFormId(data, loading = false) {
    console.error('发送form_id了!!!!!!!!!!!!!!!!!!!!!!!')
    const url = `/api/customer/templates/forms`
    return request.post(url, data, loading)
  },
  /**
   * 手机号授权
   * @return {*}
   */
  setCustomerPhone(data, loading) {
    let url = '/api/customer/profile/mobile'
    return request.post(url, data, loading)
  }
}
