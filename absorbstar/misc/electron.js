
var urlprefix = ''
var fileprefix = 'stars/electron/'
var stars = [
  {url : "https://electronjs.org/docs/all",
  filename : 'index.md',
  selector : 'section.docs'},
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
