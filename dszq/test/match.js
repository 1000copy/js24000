var express = require('express')
var app = express()
app.get("/user",(req,res)=>{
  res.send('/user')
})
app.get("/user/:id",(req,res,next)=>{
	res.send('/user/:id')		
	// next()
})
var assert = require('assert')
var http = require('http')
var req =new http.IncomingMessage()
var res =new http.ServerResponse(req)
req.socket = {}
req.socket.destroy = function(){}
req.method = "GET"
req.url = "/user?page=1"
res.send = function(str){
	assert.equal(str,'/user')
}
app.handle(req,res)
req.method = "GET"
req.url = "/user/1"
res.send = function(str){
	assert.equal(str,'/user/:id')
}
app.handle(req,res)
req.method = "GET"
req.url = "/user"
res.send = function(str){
	assert.equal(str,'/user')
}
app.handle(req,res)
