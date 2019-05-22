//mongodb
var mongoose = require('mongoose')
var dbf = mongoose.connect('mongodb://localhost/dszq',{ useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// express
var express = require('express')
var app = express()
// session
var session = require('express-session')
app.use(session({
	secret:"reco&rita",
	resave:true,
	saveUninitialized:false,
	cookie:{
		maxAge:1000*60*3
	}}))
// ejs 
app.set('views', __dirname+"/view");
app.set('view engine', 'html');
app.engine('html', require('ejs').__express); 
// static 
app.use(express.static('public'))
var userRouter = require('./router/user')
var sysRouter = require('./router/sys')
var bookRouter = require('./router/book')
var borrowRouter = require('./router/borrow')
app.use('/user',userRouter)
app.use('/sys',sysRouter)
app.use('/book',bookRouter)
app.use('/borrow',borrowRouter)
app.get('/',function(req,res){
	res.render('index.html',{username:req.session.username,isLogin:req.session.username!= ''})
})
app.listen(3000,function(){console.log('listening on 3000')})