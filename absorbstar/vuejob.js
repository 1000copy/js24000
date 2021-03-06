var urlprefix = 'https://vuejobs.com/jobs/'
var fileprefix = 'stars/vuejobs/'
var stars = [
  {url : "751-vue-js-developer-architecture-background",
  filename : '1.md',
  selector : 'div.content'},
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

