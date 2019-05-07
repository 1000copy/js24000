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
var http = require('http')
function a(){
	req.method = "GET"
	req.url = "/user/populatenums"
	res.end = function(str){
		var assert = require("assert")	
		assert.equal(str,'populated nums')
		db.close()
	}
	app.handle(req,res)
}
// (function(){
// 	req.method = "GET"
// 	req.url = "/user"
// 	res.send = function(str){
// 		var assert = require("assert")	
// 		var body = str
// 		const cheerio = require('cheerio')
// 	  	const $ = cheerio.load(body)
// 	  	var selector = 'html body table tbody tr td:nth-child(1)'//td和:nth-child(1)之间不能有空格
// 	  	// $(selector).each((index,item)=>{
// 	  	// 	console.log($(this).text())
// 	  	// })
// 	  	assert('0123456789',console.log($(selector).text()))
// 		db.close()
// 	}
// })()
(async ()=>{
	var r = await new Promise(function(resolve,reject){
		var req =new http.IncomingMessage()
		var res =new http.ServerResponse(req)
		req.method = "GET"
		req.url = "/user?page=1"
		res.send = function(str){
			var assert = require("assert")	
			var body = str
			const cheerio = require('cheerio')
		  	const $ = cheerio.load(body)
		  	var selector = 'html body table tbody tr td:nth-child(1)'//td和:nth-child(1)之间不能有空格
		  	// $(selector).each((index,item)=>{
		  	// 	console.log($(this).text())
		  	// })
		  	assert.equal('0123456789',$(selector).text())
			// db.close()
			resolve(9)
		}
		app.handle(req,res)	
	})
	var r2 = await new Promise(function(resolve,reject){
		var req =new http.IncomingMessage()
		var res =new http.ServerResponse(req)
		req.method = "GET"
		req.url = "/user?page=2"
		res.send = function(str){
			var assert = require("assert")	
			var body = str
			const cheerio = require('cheerio')
		  	const $ = cheerio.load(body)
		  	var selector = 'html body table tbody tr td:nth-child(1)'//td和:nth-child(1)之间不能有空格
		  	// $(selector).each((index,item)=>{
		  	// 	console.log($(this).text())
		  	// })
		  	assert.equal('10111213141516171819',$(selector).text())
			db.close()
			resolve(10)
		}
		app.handle(req,res)	
	})
	console.log(r,r2)
})()