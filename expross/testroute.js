var http = require("http")
var req =new http.IncomingMessage()
// req.url = '/'
// req.method = 'get'
var res =new http.ServerResponse(req)


import test from 'ava';
test('next route', async t => {
	var str0 = 'Got a POST request'
	req = Object.assign({},req,{url:'/',method:'post'})
    res.send = (str)=>{
		t.is(str,str0)
	}	
	const expross = require('./lib')
	const app = expross()
	app.post('/', 
		function a(req, res,next) {next('route');},
		function b(err,req, res,next) {res.send(str0+1)})
	app.post('/', 
		function a(req, res,next) {next()},
		function b(req, res) {res.send(str0)})
    // t.log(app._router.stack[0].route)
    app.handle(req,res)
});
test('next router', async t => {
	var str0 = 'Got a POST request'
	req = Object.assign({},req,{url:'/',method:'post'})
    res.send = (str)=>{
		t.is(str,str0)
	}	
	const expross = require('./lib')
	const app = expross()
	const router = expross.Router()
	router.post('/', 
		function a(req, res,next) {next('route');},
		function b(err,req, res,next) {res.send(str0+1)})
	router.post('/', 
		function a(req, res,next) {next()},
		function b(req, res) {res.send(str0)})
    // t.log(app._router.stack[0].route)
    app.use(router)
    app.handle(req,res)
});
