import request from 'common/js/request'

export default {
  // 获取海报列表
  getPosterList (data, loading) {
    const url = `/api/minimerchant/poster`
    return request.get(url, data, loading)
  },
  // 获取店铺信息
  getHouseInfo (data, loading) {
    const url = `/api/minimerchant/shop-detail`
    return request.get(url, data, loading)
  },
  // 修改店铺信息
  updateHouseInfo (data, loading) {
    const url = `/api/minimerchant/update-shop-detail`
    return request.post(url, data, loading)
  },
  // 店铺浏览记录
  getComesInfo (data, loading) {
    const url = `/api/minimerchant/store-browing-record`
    return request.get(url, data, loading)
  },
  // 海报修改
  updatePosterInfo (data, loading) {
    const url = `/api/minimerchant/poster/${data.id}`
    return request.put(url, data, loading)
  },
  // 海报修改
  deletePoster (data, loading) {
    const url = `/api/minimerchant/poster/${data.id}`
    return request.delete(url, data, loading)
  },
  // 获取海报详情
  getPosterDetail (data, loading) {
    const url = `/api/minimerchant/poster/${data.id}`
    return request.get(url, data, loading)
  },
  // 点赞/取消点赞 海报
  updatePosterLike (data, loading) {
    const url = `/api/minimerchant/like-poster`
    return request.post(url, data, loading)
  },
  // 点赞/取消点赞 海报
  updatePosterShare (data, loading) {
    const url = `/api/minimerchant/share-poster`
    return request.post(url, data, loading)
  },
  // 获取进去微信群的信息
  getWxGroupDetail (data, loading) {
    const url = `/api/minimerchant/wx-group-detail`
    return request.get(url, data, loading)
  }
}
