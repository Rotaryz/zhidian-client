import request from 'common/js/request'

export default {
  /**
   * 获取商品详情
   * @return {*}
   */
  getGoodsDetail(id, loading) {
    let url = `/api/customer/goods/${id}`
    return request.get(url, loading)
  }
}
