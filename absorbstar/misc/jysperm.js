// # jysperm
var urlprefix = 'https://jysperm.me/'
var fileprefix = 'stars/jysperm/'
var stars = [
  {url : "2016/10/nodejs-error-handling/",
  filename : 'index.md',
  selector : 'article'},
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
