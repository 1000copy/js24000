var urlprefix = 'https://www.npmjs.com/package/'
var fileprefix = 'stars/npm/'
var stars = [
  // {url : "passport-github",
  // filename : 'passport-github.md',
  // selector : 'div#readme'},
  // {url : "passport",
  // filename : 'passport.md',
  // selector : 'div#readme'},
  // {url : "passport-local",
  // filename : 'passport-local.md',
  // selector : 'div#readme'},
  {url : "ejs",
  filename : 'ejs.md',
  selector : 'div#readme'},
  {url : "ejs-mate",
  filename : 'ejs-mate.md',
  selector : 'div#readme'},
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

