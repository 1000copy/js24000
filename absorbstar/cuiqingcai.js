// # jysperm
var urlprefix = 'https://cuiqingcai.com/'
var fileprefix = 'stars/cuiqingcai/'
var eggs = [927,942,947,954,961,968,977,990,993,1001,1076,1972,997,2852,
2556,1319,2621,2577,2599,2636,
2433,2443,912,2652,3325,3335,3443]
var stars  = []
var i = 0
eggs.forEach(function(egg){
	i++
	stars.push({url : egg+".html",
  filename : ""+ i+ "_"+egg +'.md',
  selector : 'article.article-content'})
})
const fs = require('fs')
const path = require('path')
// ENOENT
var d = path.join(__dirname, fileprefix)
if (!fs.existsSync(d)){
	fs.mkdirSync(d)
}
var absort = require('./absort')
for (var i = stars.length - 1; i >= 0; i--) {
  if(!stars[i].ignore)
    absort(urlprefix + stars[i].url,fileprefix + stars[i].filename,stars[i].selector)
}
