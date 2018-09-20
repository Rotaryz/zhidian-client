import request from 'common/js/request'

export default {
  // 订单列表
  customerOrder(data) {
    const url = `/api/customer/customer-order`
    return request.get(url, data)
  },
  // 订单详情
  orderDetail(id) {
    const url = `/api/customer/customer-order/${id}`
    return request.get(url)
  },
  // 订单详情
  payOrder(data) {
    const url = `/api/customer/customer-order`
    return request.post(url, data)
  }
}
