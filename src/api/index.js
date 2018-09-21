// 将所有的接口请求都通过这个统一输出

import im from './im'
import jwt from './jwt'
import dynamic from './dynamic'
import goods from './goods'
import order from './order'
import guide from './guide'
import customer from './customer'
import shop from './shop'

// 雷达消息im
export const Im = im

// 授权
export const Jwt = jwt

// 动态
export const Dynamic = dynamic

// 商家
export const Shop = shop

// 商品
export const Goods = goods

// 订单
export const Order = order

// 导购
export const Guide = guide

// 顾客
export const Customer = customer
