import request from 'common/js/request'

export default {
  // 优惠券列表
  getCouponList(data, loading = true) {
    const url = `/api/customer/my-coupon`
    return request.get(url, data, loading)
  }
}
