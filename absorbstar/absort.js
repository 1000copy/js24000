var useragent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:65.0) Gecko/20100101 Firefox/65.0'
module.exports  = function absort(url,filename,selector){
  // console.log(url,filename,selector)
  var request = require("request");
  console.log(`retriving url ${url}`);
  request({
    uri: url,
    headers: {
      'User-Agent': useragent
    }
  }, function(error, response, body) {
    // console.log(body);
    if(error){
      console.log(error)
      return
    }else{
      const cheerio = require('cheerio')
      const $ = cheerio.load(body)
      var article = $(selector).html()    
      var TurndownService = require('turndown')
      var tds = new TurndownService()
      try{
        var markdown = tds.turndown(article)
      }catch(e){
        console.log(e.message)
      }
      // console.log(markdown)
      saveMarkdown(filename,markdown,()=>{
      	console.log("The file was saved!");
      })
    }
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
}