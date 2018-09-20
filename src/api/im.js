import request from 'common/js/request'

export default {
  // // 授权
  // getToken(data, loading = true) {
  //   const url = `/api/jwt/cusstomer-login`
  //   return request.post(url, data, loading)
  // },
  // im获取签名，应用信息
  getImInfo(imAccount, loading) {
    const url = `/api/minimerchant/customer-im-signature`
    const data = {
      im_account: imAccount
    }
    return request.post(url, data, loading)
  },
  // 员工和客户建立连接
  getConect(data, loading) {
    const url = `/api/shops/relationship`
    return request.post(url, data, loading)
  }
  // // 判断是否有店，有店则返id
  // checkHasShop(loading = true) {
  //   const url = `/api/minimerchant/check-isowner`
  //   return request.get(url, {}, loading)
  // },
  // // 名片详情
  // getCardDetail(data, loading = true) {
  //   const url = `/api/minimerchant/card-holder-detail`
  //   return request.get(url, data, loading)
  // },
  // // 更新名片信息
  // setCardDetail(data, loading = true) {
  //   const url = `/api/minimerchant/update--business-card`
  //   return request.get(url, data, loading)
  // },
  // // 名片详情商品列表
  // getGoodsList(loading = true) {
  //   const url = `/api/minimerchant/goods-online`
  //   return request.get(url, {}, loading)
  // },
  // // 点赞
  // lickZan(id, loading = true) {
  //   const url = `/api/minimerchant/card-holder-do-like`
  //   const data = {
  //     card_holder_id: id
  //   }
  //   return request.post(url, data, loading)
  // },
  // // 点赞
  // clearZan(id, loading = true) {
  //   const url = `/api/minimerchant/card-holder-cancel-like`
  //   const data = {
  //     card_holder_id: id
  //   }
  //   return request.post(url, data, loading)
  // },
  // // 获取二维码
  // getQrCodeImg(id, loading = true) {
  //   const url = `/api/minimerchant/card-holder-qrcode`
  //   const data = {
  //     card_holder_id: id
  //   }
  //   return request.get(url, data, loading)
  // },
  // // 聊天记录
  // getMsgList(data, loading = true) {
  //   const url = `/api/minimerchant/message-logs`
  //   return request.post(url, data, loading)
  // },
  // // 手机formId
  // getFormId(data, loading = true) {
  //   const url = `/api/minimerchant/collect-formid`
  //   return request.post(url, data, loading)
  // },
  // // 雷达列表
  // getRadarList(data, loading = true) {
  //   const url = `/api/minimerchant/ws-action-logs`
  //   return request.post(url, data, loading)
  // },
  // // 欢迎语信息
  // getWelcomeMsg(data, loading = true) {
  //   const url = `/api/minimerchant/welcome-info`
  //   return request.post(url, data, loading)
  // },
  // // 统计，重要，勿删
  // getCount(type, loading = true) {
  //   const url = `/api/minimerchant/check-times`
  //   let data = {
  //     type
  //   }
  //   return request.get(url, data, loading)
  // }
}
