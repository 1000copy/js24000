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
var urlprefix = 'https://juejin.im'
var fileprefix = 'stars/juejin/'
var stars = [
  {url : "/post/59c0ef425188257e934966ad",
  filename : '/index.md',
  selector : 'article.article'},
  {url : "/post/5c39e3ff6fb9a04a027a9421",
  filename : '/letconstvar.md',
  selector : 'article.article'},
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
