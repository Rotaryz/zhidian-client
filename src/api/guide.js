import request from 'common/js/request'

export default {
  // 获取店铺信息
  getShopInfo(data, loading) {
    const url = `/api/customer/shops/profile`
    return request.get(url, data, loading)
  },
  // 获取店铺信息
  getActiveList(data, loading) {
    const url = `/api/customer/activity`
    return request.get(url, data, loading)
  },
  // 获取店铺信息
  likeAction(data, loading) {
    const url = `/api/customer/like-goods`
    return request.post(url, data, loading)
  },
  // 获取店铺信息
  shareAction(data, loading) {
    const url = `/api/customer/share-goods`
    return request.post(url, data, loading)
  },
  // 设置店铺图片
  setShopImage(data, loading) {
    const url = `/api/customer/shops/image`
    return request.post(url, data, loading)
  }
}
