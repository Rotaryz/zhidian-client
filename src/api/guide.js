import request from 'common/js/request'

export default {
  // 授权
  getToken(data, loading) {
    const url = `/api/jwt/customer/login`
    return request.post(url, data, loading)
  },
  // 获取默认店铺
  getDefaultShop(data, loading = false) {
    const url = `/default_shop`
    return request.post(url, data, loading)
  }
}
