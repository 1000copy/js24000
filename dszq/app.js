var express = require('express')
var app = express()
app.use(express.static('public'))
var methodoverride = require('method-override')
app.use(methodoverride('_method'))
const bodyParser = require('body-parser');
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname+"/views");
app.set('view engine', 'html');
app.engine('html', require('ejs').__express); 
var session = require('express-session')
app.use(session({
	secret:"reco&rita",
	resave:true,
	saveUninitialized:false,
	cookie:{
		maxAge:1000*60*3
	}}))
var mongoose = require('mongoose')
var dbf = mongoose.connect('mongodb://localhost/dszq',{ useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
app.all("*",function(req,res,next){
	// console.log(req.method)
	next()
})
var router = require('./bookrouter.js')
var router1 = require('./userrouter.js')
app.use("/book",auth_required,router)
app.use("/user",router1)
app.get('/login', function(req, res){
    res.render('login.ejs')
});
function auth_required(req,res,next){
	if(req.session.userName){
        next()
    }else{
        res.redirect('/login');
    }
}
function md5(str){
    return require('crypto').createHash('md5').update(str).digest("hex")
}
async function dologin(username,pwd){
    var user = require('./lib/user.js')
    var u = await user.getUserWithName(null,null,username)
    console.log(pwd,u.pwd,md5(pwd))
    return md5(pwd) == u.pwd
}
app.post('/login', async function(req, res){
    if(await dologin(req.body.username,req.body.pwd)){
        req.session.userName = req.body.username;
        res.redirect('/');
    }
    else{
        res.json({ret_code : 1, ret_msg : 'User name or password is wrong'});
    }
});    

app.get('/logout', function (req, res) {
    req.session.userName = null; // 删除session
    res.redirect('login');
});
app.get('/',  auth_required,function (req, res) {
    res.redirect('/book');
});
app.listen(3000,()=>{
	console.log('dszq starting...')
})

