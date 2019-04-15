var expross = require('../lib');
var app = expross();
// router
var router = new expross.Router();
router.use(function(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.use('/', function(req, res, next) {
    res.send('second');
});
app.use('/user', router);
var http = require("http")
var req =new http.IncomingMessage()
var res =new http.ServerResponse(req)
var str0 = 'Got a POST request'
req = Object.assign({},req,{url:'/user',method:'get'})
res.send = (str)=>{
    console.log(str)
}	
app.handle(req,res)