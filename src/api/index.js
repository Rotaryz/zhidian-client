// 将所有的接口请求都通过这个统一输出

import im from './im'
import jwt from './jwt'
import dynamic from './dynamic'
import shop from './shop'
import order from './order'

// 雷达消息im
export const Im = im

// 授权
export const Jwt = jwt

// 动态
export const Dynamic = dynamic

// 商家
export const Shop = shop

// 订单
export const Order = order
