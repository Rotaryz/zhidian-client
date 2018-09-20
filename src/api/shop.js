import request from 'common/js/request'

export default {
  // 获取商品列表
  getGoodsList(data, loading) {
    const url = `/api/customer/goods`
    return request.get(url, data, loading)
  }
}
