var filename =  'parsed.html'
var fs = require('fs')
var filePath = 'test/src1.html'
var options = {encoding: 'utf-8', flag: 'r'};
fs.readFile(filePath, options, function (err, data) {
	console.error(1);
    if(err)
    {
        console.error(err);
    }else
    {
      
      var body = data
      const cheerio = require('cheerio')
	    const $ = cheerio.load(body)
      var article = $('article.article').html()
      saveit(filename,article,()=>{
        console.log("The file was saved!");
      })
      function saveit(fn,str,callback){
        const fs = require('fs');
        fs.writeFile(fn, str, function(err) {
            if(err) {
                return console.log(err);
            }
            callback()
        }); 
      }      
    }
});
