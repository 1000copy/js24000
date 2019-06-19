var urlprefix = 'https://codemirror.net'
var fileprefix = 'stars/codemirror/'
var stars = [
  {url : "/6/",
  filename : 'index.md',
  selector : 'article'},
  {url : "/6/design.html",
  filename : 'design.md',
  selector : 'body'},

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

