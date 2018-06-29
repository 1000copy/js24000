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
   res.render(WEBABSROOT + req.url, function(err, result) {
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