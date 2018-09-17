const env = process.env.NODE_ENV
const version = `/v1`

const DEV = {
  api: 'https://ws-api.jerryf.cn',
  image: 'https://img.jerryf.cn/defaults'
}

const TEST = {
  api: 'https://ws-api.jkweixin.net' + version,
  image: 'https://img.jkweixin.net/defaults'
}

const PROD = {
  api: 'https://ws-api.jkweixin.com' + version,
  image: 'https://img.jkweixin.com/defaults'
}

export const baseURL = env === 'production' ? PROD : env === 'test' ? TEST : DEV

export const ERR_OK = 0
export const TIME_OUT = 10000
export const ERR_NO = -404
export const TOKEN_OUT = 10000 // token 失效
