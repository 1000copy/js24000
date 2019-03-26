//for juejin
// var url = "https://juejin.im/post/59c0ef425188257e934966ad"
// var filename = '1.md'
// var selector = 'article.article'
// var args = process.argv
// if(args.length < 4){
//   console.log('Usage:\n command url resultfilename')
//   return
// }
// url = args[2]
// filename =args[3]

// for expressjs.com
var urlprefix = 'http://expressjs.com'
var fileprefix = 'stars/expressjs/'
var stars = [
  {url : "/en/starter/installing.html",
  filename : '/1.1.installing.md',
  selector : 'div#page-doc'},
  {url : "/en/starter/hello-world.html",
  filename : '/1.2.hello-world.md',
  selector : 'div#page-doc'},
  {url : "/en/starter/basic-routing.html",
  filename : '/1.3.basic-routing.md',
  selector : 'div#page-doc'},
  {url : "/en/starter/static-files.html",
  filename : '/1.4.static-files.md',
  selector : 'div#page-doc'},
  {url : "/en/guide/routing.html",
  filename : '/2.1routing.md',
  selector : 'div#page-doc'},
  {url : "/en/guide/writing-middleware.html",
  filename : '/2.2writing-middleware.md',
  selector : 'div#page-doc'},
  {url : "/en/guide/using-middleware.html",
  filename : '/2.3using-middleware.md',
  selector : 'div#page-doc'},
  {url : "/en/guide/using-template-engines.html",
  filename : '/2.4using-template-engines.md',
  selector : 'div#page-doc'},
  {url : "/en/guide/error-handling.html",
  filename : '/2.5error-handling.md',
  selector : 'div#page-doc'},
  {url : "/en/guide/debugging.html",
  filename : '/2.6debugging.md',
  selector : 'div#page-doc'},
  {url : "/en/guide/database-integration.html",
  filename : '/2.7database-integration.md',
  selector : 'div#page-doc'}
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
