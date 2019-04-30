var express =require('express')
var methodOverride =require('method-override')
var app =express()
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
app.all('/resource',(req,res)=>{
	res.send(req.method)
})
var http = require('http')
var req =new http.IncomingMessage()
var res =new http.ServerResponse(req)
var assert = require("assert")
req.method = "POST"
req.url = "/resource?_method=DELETE"
res.send = function(str){
	assert.equal(str,"DELETE")
}
app.handle(req,res)
req.method = "POST"
req.url = "/resource?_method=PUT"
res.send = function(str){
  assert.equal(str,"PUT")
}
app.handle(req,res)
