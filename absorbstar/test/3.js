var url = "https://juejin.im/post/59c0ef425188257e934966ad"
var filename = '1.md'
var request = require("request");
console.log(`retriving url ${url}`);
request({
  uri: url,
}, function(error, response, body) {
  // console.log(body);
  var p = require('node-html-parser');
  const root = p.parse(body);
  var article = root.querySelector('article.article').innerHTML
  console.log(article);
  var TurndownService = require('turndown')
  var tds = new TurndownService()
  var markdown = tds.turndown(article)
  // console.log(markdown)
  saveMarkdown(filename,markdown,()=>{
  	console.log("The file was saved!");
  })
});
function saveMarkdown(fn,str,callback){
	const fs = require('fs');
	fs.writeFile(fn, str, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    callback()
	}); 
}