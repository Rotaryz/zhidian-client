const env = process.env.NODE_ENV
const version = ``

const DEV = {
  api: 'https://zhidian-api.jerryf.cn',
  image: 'https://img.jerryf.cn/defaults',
  upload: 'https://zhidian-api.jerryf.cn'
}

const TEST = {
  api: 'https://zhidian-api.jkweixin.net' + version,
  image: 'https://img.jkweixin.net/defaults',
  upload: 'https://zhidian-api.jkweixin.net' + version
}

const PROD = {
  api: 'https://zhidian-api.jkweixin.com' + version,
  image: 'https://img.jkweixin.com/defaults',
  upload: 'https://zhidian-api.jkweixin.com' + version
}

export const baseURL = env === 'production' ? PROD : env === 'test' ? TEST : DEV

export const ERR_OK = 0
export const TIME_OUT = 10000
export const ERR_NO = -404
export const TOKEN_OUT = 10000 // token 失效

console.warn('环境：' + env)
