const version = '/v2'
const versionIm = ``
export default {
  app: '赞播平台',
  env: 'release',
  api: 'https://zhidian-api.jkweixin.net' + version,
  upload: 'https://zhidian-api.jkweixin.net' + version,
  image: 'https://img.jkweixin.net/defaults',
  imRecord: 'https://data-analysis-api.jkweixin.net' + versionIm,
  /**
   * host: 商城H5域名
   * api: 请求api域名
   * token: 商城token
   * merchantUid: 商家id
   * openId: openId
   * _开头用于小程序页面
   * _errorPage: 错误页面
   * _mainPage: 主页面(详情页面)
   * _404Page: 404页面
   */
  MALL_CONFIG: {
    host: 'https://mall-client.jkweixin.net', // 商城的域名
    api: 'https://exchange-mall-api.jkweixin.net' + version, // 请求api域名
    token: '',
    merchantUid: '',
    openId: '',
    storeId: '',
    _errorPage: '/pages/error',
    _404Page: '/pages/error',
    _homePage: '/pages/mall-home',
    _mainPage: '/pages/mall-main',
    _payPage: '/pages/mall-pay',
    _orderPage: '/pages/mall-order',
    _authorizePage: '/pages/login'
  }
}
