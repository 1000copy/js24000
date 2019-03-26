
var urlprefix = ''
var fileprefix = 'stars/medium/'
var stars = [
  {url : "https://blog.usejournal.com/var-let-and-const-hoisting-and-scope-8860540031d1",
  filename : '/index.md',
  selector : 'div.postArticle-content'},
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
