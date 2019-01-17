const path = require('path')
const fs = require('fs')
const {APP,ENV, VERSION, VERSION_IM} = require('./constant')
const argv = process.argv
let appPath = APP.platform
let envPath = ENV.production
let version = ''
let versionIm = ''
argv.forEach((item) => {
    let key = item.toLowerCase()
    APP[key] && (appPath = APP[key])
    ENV[key] && (envPath = ENV[key])
    VERSION[key] && (version = VERSION[key])
    VERSION_IM[key] && (versionIm = VERSION_IM[key])
  })
// 写文件
const targetPath = path.resolve('src/utils/_app-config.js')
const filePath = path.join(__dirname,'' + appPath, '' + envPath)
let content = fs.readFileSync(filePath, 'utf-8')
// 项目版本号
if (version) {
  content = content.replace(/const version = ``/i, `const version = '${version}'`)
}
// IM版本号
if (versionIm) {
  content = content.replace(/const versionIm = ``/i, `const versionIm = '${versionIm}'`)
}
try {
  fs.unlinkSync('' + targetPath)
} catch (e) {

}
fs.writeFileSync('' + targetPath, content, 'utf-8')
console.log(content)
console.log('项目版本号：' + version)
console.log('IM版本号：' + versionIm)
