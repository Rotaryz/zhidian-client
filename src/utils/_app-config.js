const version = '/v2'
const versionIm = ``
export default {
  app: '赞播平台',
  appKey: 'platform',
  env: 'production',
  api: 'https://zhidian-api.jkweixin.com' + version,
  upload: 'https://zhidian-api.jkweixin.com' + version,
  image: 'https://img.jkweixin.com/defaults',
  imRecord: 'https://data-analysis-api.jkweixin.com' + versionIm,
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
    host: 'https://mall-client.jkweixin.com', // 商城的域名
    api: 'https://exchange-mall-api.jkweixin.com' + version, // 请求api域名
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
