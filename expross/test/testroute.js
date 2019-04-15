var expross = require('../lib');
var app = expross();
// router
app.get('/user',function(req, res, next) {
    next();
});
app.get('/user', function(req, res, next) {
    res.send('second');
});
var http = require("http")
var req =new http.IncomingMessage()
var res =new http.ServerResponse(req)
var str0 = 'Got a POST request'
req = Object.assign({},req,{url:'/user',method:'get'})
res.send = (str)=>{
    console.log(str)
}	
app.handle(req,res)