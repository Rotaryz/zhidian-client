import request from 'common/js/request'
export default {
  // 页面弹窗
  getModalList(data, loading = false) {
    const url = `/api/customer/ai-market/popup`
    return request.post(url, data, loading)
  },
  // 事件(触达,领取,进店,复制)
  sendModalEvent(data, loading = false) {
    const url = `/api/customer/ai-market/event`
    return request.post(url, data, loading)
  },
  // 优惠券详情
  getCouponDetail(data, loading = false) {
    const url = `/api/customer/coupon-show/${data.coupon_id}`
    data = ''
    return request.get(url, data, loading)
  },
  // 领取优惠券
  takeCoupon(data, loading) {
    const url = `/api/customer/coupon-receive`
    return request.get(url, data, loading)
  }
}
