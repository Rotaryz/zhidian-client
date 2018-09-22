import request from 'common/js/request'

export default {
  // 订单列表
  customerOrder(data) {
    const url = `/api/customer/customer-order`
    return request.get(url, data)
  },
  // 订单详情
  orderDetail(id, loading) {
    const url = `/api/customer/customer-order/${id}`
    console.log(url)
    return request.get(url, {}, loading)
  },
  // 订单详情
  payOrder(data) {
    const url = `/api/customer/customer-order`
    return request.post(url, data)
  },
  // 获取退款信息
  orderRefund(id, loading = true) {
    const url = `/api/customer/customer-order-refund/${id}`
    return request.get(url, {}, loading)
  },
  // 客户浏览店铺记录-概况
  summary() {
    const url = `/api/customer/browsings/summary`
    return request.get(url)
  }
}
