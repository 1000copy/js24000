var urlprefix = 'https://www.cnblogs.com/'
var fileprefix = 'stars/cnblogs/'
var stars = [
  {url : "mingjiatang/p/7495321.html",
  filename : 'index.md',
  selector : 'div#topics'},
  {url : "chenchenluo/p/4197181.html",
  filename : 'session.md',
  selector : 'div#main'},
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

