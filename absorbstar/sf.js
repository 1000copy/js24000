var urlprefix = 'https://segmentfault.com/'
var fileprefix = 'stars/sf/'
var stars = [
  {url : "a/1190000018636617",
  filename : 'index.md',
  selector : 'div.main'},
]

// stars = [
//   {url : "/en/starter/static-files.html",
//   filename : 'stars/1.4.static-files.md',
//   selector : 'div#page-doc'},
  
  
//   ]
var absort = require('./absort')
for (var i = stars.length - 1; i >= 0; i--) {
  if(!stars[i].ignore)
    absort(urlprefix + stars[i].url,fileprefix + stars[i].filename,stars[i].selector)
}
