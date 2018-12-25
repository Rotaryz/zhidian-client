const fs = require('fs')
const path = require('path')

let appConfigPath = path.resolve(__dirname,'../src/utils/_app-config.js')
const content = fs.readFileSync(appConfigPath, 'utf-8')
console.log(content)
