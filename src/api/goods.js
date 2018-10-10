import request from 'common/js/request'

export default {
  /**
   * 获取商品详情
   * @return {*}
   */
  getGoodsDetail(id, data, loading) {
    let url = `/api/customer/goods/${id}`
    return request.get(url, data, loading)
  },
  /**
   * 获取团购活动详情
   * @return {*}
   */
  getGroupDetail(id, data, loading) {
    let url = `/api/customer/groupon-show/${id}`
    return request.get(url, data, loading)
  },
  /**
   * 获取砍价活动详情
   * @return {*}
   */
  getBargainDetail(id, data, loading) {
    let url = `/api/customer/bargain-show/${id}`
    return request.get(url, data, loading)
  },
  /**
   * 获取某个团的详情
   * @return {*}
   */
  getGroupInDetail(id, loading) {
    let url = `/api/customer/groupon-detail/${id}`
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
  },
  /**
   * 商品分享
   * @return {*}
   */
  goodsShare(id, loading) {
    let url = `/api/customer/share-goods`
    let data = {
      recommend_goods_id: id
    }
    return request.post(url, data, loading)
  },
  /**
   * 活动分享
   * @return {*}
   */
  activityShare(id, loading) {
    let url = `/api/customer/share-goods`
    let data = {
      recommend_activity_id: id
    }
    return request.post(url, data, loading)
  },
  /**
   * 砍一刀
   * @return {*}
   */
  kanAction(id, loading) {
    let url = `/api/customer/bargain-cut/${id}`
    return request.post(url, {}, loading)
  },
  /**
   * 用户领取兑换券
   * @return {*}
   */
  getExchangeCoupon(data, loading) {
    let url = `api/customer/exchange-coupon`
    return request.post(url, data, loading)
  }
}
