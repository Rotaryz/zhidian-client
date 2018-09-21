import request from 'common/js/request'

export default {
  /**
   * 获取商品详情
   * @return {*}
   */
  getGoodsDetail(id, loading) {
    let url = `/api/customer/goods/${id}`
    return request.get(url, loading)
  },
  /**
   * 获取商品详情
   * @return {*}
   */
  getGroupDetail(id, loading) {
    let url = `/api/customer/groupon-show/${id}`
    return request.get(url, loading)
  },
  /**
   * 创建订单
   * @return {*}
   */
  payOrder(data, loading) {
    let url = `/api/customer/customer-order`
    return request.post(url, data, loading)
  },
  /**
   * 参团、开团判断
   * @return {*}
   */
  checkGroup(data, loading) {
    let url = `/api/customer/groupon-check`
    return request.post(url, data, loading)
  }
}
