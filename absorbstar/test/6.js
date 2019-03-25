var fs = require('fs')
var filePath = 'test/src.html'
var options = {encoding: 'utf-8', flag: 'r'};
fs.readFile(filePath, options, function (err, data) {
    if(err)
    {
        console.error(err);
    }else
    {
        var c= data 
        var TurndownService = require('turndown')
        var tds = new TurndownService()
        var markdowns = [
          c
        ]
        for (var i = markdowns.length - 1; i >= 0; i--) {
          var str = markdowns[i]
          saveMarkdown('1.md',tds.turndown(str),()=>{})
        }
        function saveMarkdown(fn,str,callback){
          fs.writeFile(fn, str, function(err) {
              if(err) {
                  return console.log(err);
              }
              callback()
          }); 
        }
    }
});

