import request from 'common/js/request'

export default {
  getWheelInfo (data, loading) {
    let url = '/api/customer/lucky-draw'
    return request.get(url, data, loading)
  },
  drawWheel (data, loading) {
    let url = '/api/customer/lucky-draw'
    return request.post(url, data, loading)
  }
}
