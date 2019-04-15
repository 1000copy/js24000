

var urlprefix = 'http://www.imooc.com/article/'
var fileprefix = 'stars/mooc/'
var stars = [
  {url : "283532?mc_marking=45b354f22818263a3703863dccab3829&mc_channel=weixin",
  filename : 'index.md',
  selector : 'div.part_essay'},
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
