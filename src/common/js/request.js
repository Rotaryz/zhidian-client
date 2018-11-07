import Fly from 'flyio'
import { showLoading, hideLoading } from './wechat'
import { baseURL, TIME_OUT, ERR_OK, ERR_NO } from 'api/config'
import wx from './wx'

const fly = new Fly()

// 公共请求头
const COMMON_HEADER = {}

const LOGINPAGE = '/pages/login'
const ERRORPAGE = `/pages/error`
const NETPAGE = `/pages/error-network`
const SHOP_END = 12001
const DEFAULTURL = 'api'

// 请求拦截器
fly.interceptors.request.use((request) => {
  request.headers['Authorization'] = wx.getStorageSync('token') || ''
  request.headers['Current-Shop'] = wx.getStorageSync('shopId') || wx.getStorageSync('defaultShop')
  request.headers['AppToken'] = wx.getStorageSync('appToken')
  return request
})

// 响应拦截器
fly.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.resolve(error.response)
})

// 配置请求基地址
// fly.config.baseURL = baseURL.api
function configBaseURL(type) {
  fly.config.baseURL = baseURL[type]
}

// 检查http状态码
function checkStatus(response) {
  // login
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 422)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  } else if (response && response.status >= 500) {
    wx.reLaunch({ url: NETPAGE })
  }
  // 异常状态下，把错误信息返回去
  return {
    status: ERR_NO,
    msg: '网络异常'
  }
}

/**
 * 检查code
 * @param res
 * @returns {string|Object[]|CanvasPixelArray}
 */
function checkCode(res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === ERR_NO) {
    console.warn(res.msg)
  }
  // 如果网络请求成功，而提交的数据，或者是后端的一些未知错误所导致的，可以根据实际情况进行捕获异常
  if (res.data && (res.data.code !== ERR_OK)) {
    // 可以进行switch操作，根据返回的code进行相对应的操作，然后抛异常
    // const SHOP_UN_EXIST = 10005 // todo 店铺不存在
    switch (res.data.code) {
      case 10000:
        if (wx.getStorageSync('errPage') !== LOGINPAGE) {
          wx.setStorageSync('errPage', LOGINPAGE)
          wx.removeStorageSync('token')
          wx.reLaunch({ url: LOGINPAGE })
        }
        break
      case 10003:
      case 10004:
      case 10001:
        if (wx.getStorageSync('errPage') !== ERRORPAGE) {
          wx.setStorageSync('errPage', ERRORPAGE)
          wx.reLaunch({ url: ERRORPAGE })
        }
        break
      case SHOP_END:
        const url = `${ERRORPAGE}?error=${SHOP_END}`
        if (wx.getStorageSync('errPage') !== url) {
          wx.setStorageSync('errPage', url)
          wx.reLaunch({ url: url })
        }
        break
      case 12002:
        wx.setStorageSync('frozen', true)
        return res.data
    }
    throw requestException(res)
  }
  return res.data
}

/**
 * 抛异常
 * @param res
 * @returns {{}}
 */
function requestException(res) {
  hideLoading()
  const error = {}
  error.statusCode = res.status
  const serviceData = res.data
  if (serviceData) {
    error.code = serviceData.code
    error.error = serviceData.error
    error.message = serviceData.message
    error.serverData = serviceData
  }
  return error
}

export default {
  post(url, data, loading = true, type = DEFAULTURL) {
    if (loading) {
      showLoading()
    }
    configBaseURL(type)
    return fly.post(url, data, {
      timeout: TIME_OUT,
      headers: COMMON_HEADER
    }).then((response) => {
      return checkStatus(response)
    }).then((res) => {
      return checkCode(res)
    })
  },
  get(url, params, loading = true, type = DEFAULTURL) {
    if (loading) {
      showLoading()
    }
    configBaseURL(type)
    return fly.get(url, params, {
      timeout: TIME_OUT,
      headers: COMMON_HEADER
    }).then((response) => {
      return checkStatus(response)
    }).then((res) => {
      return checkCode(res)
    })
  },
  put(url, data, loading = true, type = DEFAULTURL) {
    if (loading) {
      showLoading()
    }
    configBaseURL(type)
    return fly.put(url, data, {
      timeout: TIME_OUT,
      headers: COMMON_HEADER
    }).then((response) => {
      return checkStatus(response)
    }).then((res) => {
      return checkCode(res)
    })
  },
  delete(url, data, loading = true, type = DEFAULTURL) {
    if (loading) {
      showLoading()
    }
    configBaseURL(type)
    return fly.delete(url, data, {
      timeout: TIME_OUT,
      headers: COMMON_HEADER
    }).then((response) => {
      return checkStatus(response)
    }).then((res) => {
      return checkCode(res)
    })
  }
}
