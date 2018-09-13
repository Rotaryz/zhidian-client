const env = process.env.NODE_ENV
const version = `/v1`

const DEV = {
  api: 'dev'
}

const TEST = {
  api: 'https://ws-api.jkweixin.net' + version,
  image: 'https://img.jkweixin.net/defaults'
}

const PROD = {
  api: 'prod'
}

export const baseURL = env === 'production' ? PROD : env === 'test' ? TEST : DEV

export const ERR_OK = 0
export const TIME_OUT = 10000
export const ERR_NO = -404
export const TOKEN_OUT = 10000 // token 失效
