var filename =  'parsed.html'
var fs = require('fs')
var filePath = 'bug.html'
var options = {encoding: 'utf-8', flag: 'r'};
fs.readFile(filePath, options, function (err, data) {
    if(err)
    {
        console.error(err);
    }else
    {
      var body = data
      // console.log(body)
      var p = require('node-html-parser');
      const root = p.parse(body);
      var article = root.querySelector('article.article').innerHTML
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


