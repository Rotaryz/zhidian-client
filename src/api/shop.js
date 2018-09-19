import request from 'common/js/request'

export default {
  // 获取商家相册
  getMerchantsImg(data, loading) {
    const url = `/api/customer/merchants/images`
    return request.get(url, data, loading)
  },
  // 获取商家相册
  getBrowseShop(data, loading) {
    const url = `/api/customer/browsings`
    return request.get(url, data, loading)
  }
}
