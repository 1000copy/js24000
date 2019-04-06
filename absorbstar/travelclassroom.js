//
// # jysperm
var urlprefix = 'https://www.travelclassroom.net/'
var fileprefix = 'stars/travelclassroom/'
var stars = [
  {url : "zh-cn/2016/05/korea-driving.html",
  filename : 'index.md',
  selector : 'section#content'},
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
