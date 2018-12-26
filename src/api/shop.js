import request from 'common/js/request'

export default {
  // 获取商品列表
  getGoodsList(data, loading) {
    const url = `/api/customer/goods`
    return request.get(url, data, loading)
  },
  // 获取商家相册
  getMerchantsImg(data, loading) {
    const url = `/api/customer/merchants/images`
    return request.get(url, data, loading)
  },
  // 获取浏览过的店
  getBrowseShop(data, loading) {
    const url = `/api/customer/browsings`
    return request.get(url, data, loading)
  },
  // 我的奖品券
  getCouponList(data, loading) {
    const url = `/api/customer/customer-promotion`
    return request.get(url, data, loading)
  },
  // 获取品牌故事
  getStory(data, loading) {
    const url = `/api/customer/merchants/contents`
    return request.get(url, data, loading)
  },
  // 获取商品和服务列表
  getAllList(loading) {
    const url = `/api/customer/goods-lists`
    return request.get(url, {}, loading)
  }
}
