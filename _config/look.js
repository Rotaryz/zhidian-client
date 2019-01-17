<<<<<<< HEAD
const fs = require('fs')
const path = require('path')

let appConfigPath = path.resolve(__dirname,'../src/utils/_app-config.js')
const content = fs.readFileSync(appConfigPath, 'utf-8')
=======
const path = require('path')
const fs = require('fs')
const targetPath = path.resolve('src/utils/_app-config.js')
const content = fs.readFileSync(targetPath, 'utf-8')
>>>>>>> 5f3a98ec1f339d795777bc0134eeeac2a207ac23
console.log(content)
