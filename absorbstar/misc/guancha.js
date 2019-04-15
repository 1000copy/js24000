// # jysperm
var urlprefix = ''
var fileprefix = 'stars/guancha/'
var stars = [
  {url : "https://user.guancha.cn/main/content?id=99046",
  filename : 'index.md',
  selector : 'div.article-content'},
]
const fs = require('fs')
const path = require('path')
// ENOENT
if (!fs.existsSync(fileprefix)){
	fs.mkdirSync(path.join(__dirname, fileprefix))
}
var absort = require('./absort')
for (var i = stars.length - 1; i >= 0; i--) {
  if(!stars[i].ignore)
    absort(urlprefix + stars[i].url,fileprefix + stars[i].filename,stars[i].selector)
}


// https://1byte.io/robot-on-leanengine/