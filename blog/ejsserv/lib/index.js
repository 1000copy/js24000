const WebRoot = "/../web"
const WEBABSROOT = __dirname + WebRoot
var express = require('express');
var app = express();
// app.use(app.router);
app.engine('.ejs', require('ejs').__express);
app.set('views', WEBABSROOT);
app.set('view engine', 'ejs');
app.get('*.ejs', function(req, res) {
   var type = "text/html"
   var charset = "utf8"
   console.log(WEBABSROOT + req.url)
   res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''));
   res.render(WEBABSROOT + req.url,{require,require}, function(err, result) {
   	  if (err){
   	  	console.log(err)
   	  	res.end(err.message);
   	  }
      res.end(result);
   });
});
app.use(express.static(WEBABSROOT)); 
app.listen(3000);
// npm init -y
// npm i express ejs --save

/*
我希望建立一个简单的Nodejs应用，它可以使用类似IIS/classic ASP那样，在目录内的任何内容(html, png, js, css, ejs)都可以提供服务。其中的ejs就像asp一样。
并且无需重启nodejs服务。做到这一点，只是需要写一点点的代码，支持ejs模板即可。
*/
//ref How can I use Express and EJS to serve static and dynamic content?
//https://stackoverflow.com/questions/22824171/how-can-i-use-express-and-ejs-to-serve-static-and-dynamic-content
/*

I want to build a simple app using node.js that 'functions' like IIS/classic ASP 
where all the content (html, png, js, css, ejs) can be in one directory and 
the ejs file uses javascript vs. VBScript.

*/