var url = "https://juejin.im/post/59c0ef425188257e934966ad"
var filename = '1.md'
var args = process.argv
if(args.length < 4){
  console.log('Usage:\n command url resultfilename')
  return
}
url = args[2]
filename =args[3]
var request = require("request");
console.log(`retriving url ${url}`);
request({
  uri: url,
}, function(error, response, body) {
  // console.log(body);
  const cheerio = require('cheerio')
  const $ = cheerio.load(body)
  var article = $('article.article').html()    
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