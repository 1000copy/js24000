var express = require('express')
var app = express()
const bodyParser = require('body-parser');
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
var router = require('./bookrouter.js')
var router1 = require('./userrouter.js')
app.use("/book",router)
app.use("/user",router1)
app.listen(3000,()=>{
	console.log('dszq starting...')
})