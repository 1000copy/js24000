// # jysperm
var urlprefix = 'https://1byte.io/'
var fileprefix = 'stars/1byte/'
var stars = [
  {url : "importance-of-english/",
  filename : 'index.md',
  selector : 'article'},
  {url : "robot-on-leanengine/",
  filename : 'robot.md',
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


// https://1byte.io/robot-on-leanengine/