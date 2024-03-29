// 将所有的接口请求都通过这个统一输出

import im from './im'
import jwt from './jwt'
import dynamic from './dynamic'
import goods from './goods'
import order from './order'
import guide from './guide'
import customer from './customer'
import shop from './shop'
import activeCode from './active-code'
import activeExtend from './active-extend'
import mine from './mine'
import market from './market'

// 营销活动ai-2.1
export const Market = market
// 大转盘等活动
export const ActiveExtend = activeExtend
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
// 二维码
export const ActiveCode = activeCode

// 我的
export const Mine = mine
