// Default reporter swallows console.log ,you can add --verbose for 
// console.log() or t.log()
//npx ava --watch --verbose

var http = require("http")
var req =new http.IncomingMessage()
// req.url = '/'
// req.method = 'get'
var res =new http.ServerResponse(req)


import test from 'ava';
test('jsinherited',t=>{
	function Person(name) {
	  this.name = name
	};
	function Teacher(name,subject) {
	  Person.call(this, name);
	  this.subject = subject;
	}
	Person.prototype.greeting = function() {
	  console.log('Hi! I\'m ' + this.name + '.');
	};
	Teacher.prototype = Object.create(Person.prototype);
	Teacher.prototype.greeting = function() {
	  console.log('Hi! I\'m ' + this.name + ' teacher.');
	};
	var teacher = new Teacher('reco','computer programing')
	t.is(teacher.name,'reco')
	t.is(teacher.subject,'computer programing')
	// teacher.greeting()
})
test('post', async t => {
	var str0 = 'Got a POST request'
	req = Object.assign({},req,{url:'/',method:'post'})
    res.send = (str)=>{
		t.is(str,str0)
	}	
	const expross = require('./lib')
	const app = expross()
	app.post('/', function a(req, res,next) {res.send(str0)})
    app.handle(req,res)
});test('next', async t => {
	var str0 = 'Got a POST request'
	req = Object.assign({},req,{url:'/',method:'post'})
    res.send = (str)=>{
		t.is(str,str0)
	}	
	const expross = require('./lib')
	const app = expross()
	app.post('/', 
		function a(req, res,next) {next()},
		function b(req, res) {res.send(str0)})
    app.handle(req,res)
});
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
	var router = expross.Router()
	router.post('/', 
		function a(req, res,next) {next('router')/*goto app.done()*/},
		function b(req, res) {res.send(str0+1)})
	router.post('/', 
		function a(req, res,next) {next()},
		function b(req, res) {res.send(str0)})
    app.use(router)
    var router1 = expross.Router()
	router1.post('/', 
		function a(req, res,next) {next()},
		function b(req, res) {res.send(str0)})
    app.use(router1)
    app.post('/', 
		function a(req, res,next) {next()},
		function b(req, res) {res.send(str0)})
    function done(){
    	// t.is(1,2)
    	t.pass()
    }
    app._router.handle(req, res, done);
});
test('router use', t => {
	var str0 = 'Got a POST request'
	req = Object.assign({},req,{url:'/user/id',method:'get'})
    res.send = (str)=>{
		t.is(str,str0)
	}	
	const express = require('./lib')
	const app = express()
	
    var router = express.Router()
    // a middleware function with no mount path. This code is executed for every request to the router
    router.use(function (req, res, next) {
      // t.log('Time:', Date.now())
      next()
    }) 
    // a middleware sub-stack shows request info for any type of HTTP request to the /user/id path
    router.use('/user/id', function (req, res, next) {
      // t.log('Request URL:', req.originalUrl)
      next()
    }, function (req, res, next) {
      // t.log('Request Type:', req.method)
      res.send(str0)
    })
    // mount the router on the app
    app.use('/', router)
    app.handle(req,res)
	// t.pass();
});
test('router get ', t => {
	var str0 = 'Got a POST request'
	req = Object.assign({},req,{url:'/user/id',method:'get'})
    res.send = (str)=>{
		t.is(str,str0)
	}	
	const express = require('./lib')
	const app = express()
    var router = express.Router()
    // a middleware sub-stack that handles GET requests to the /user/id path
    router.get('/user/id', function (req, res, next) {
       next()
    }, function (req, res, next) {
      // render a regular page
      res.send(str0)
    })
    // mount the router on the app
    app.use('/', router)
    // t.log(app._router.stack[0].handle.stack[0])
    app.handle(req,res)
	// t.pass();
});
test('error handle ', t => {
	var str0 = 'Got a POST request'
	req = Object.assign({},req,{url:'/user',method:'get'})
    res.send = (str)=>{
		t.is(str,str0)
	}	
	const express = require('./lib')
	const app = express()
    app.get('/user', 
    	function (req, res, next) {
       		next(new Error('error1**'))
    	},
    	function (err,req, res, next) {
	      t.is(err.message,'error1**')
	    })
    // t.log(app._router.stack[0].handle.stack[0])
    app.handle(req,res)
	// t.pass();
});
var rparam = require('./lib/regpath')
test('path params', t => {
	var a =rparam.match('/user/:id','/user/reco')
	var b =rparam.getParam('/user/:id','/user/reco')
	t.is(a,true)
	t.is(b.id,'reco' )
});      
test('route params', t => {
	var str0 = 'Got a POST request'
	req = Object.assign({},req,{url:'/user/11',method:'get'})
    res.send = (str)=>{
		t.is(str,str0)
	}	
	const express = require('./lib')
	const app = express()
	app.get('/user/:id', function (req, res, next) {
      next()
    }, function (req, res, next) {
      t.is(req.params.id,'11')
      res.send(str0)
    })
    app.handle(req,res)
    app.get('/users/:userId/books/:bookId', function (req, res) {
      t.is(req.params.userId,'1')
      t.is(req.params.bookId,'2')
      res.send(str0)
    })
	req.url = '/users/1/books/2'
	app.handle(req,res)
});
test('regexp', t => {
	var r = /a?/
	t.is(typeof r,'object')
	t.is('ac'.match(r)[0],'a')
	t.is('bc'.match(r)[0],'')
});
test('regpath', t => {
	var str0 = 'Got a POST request'
	req = Object.assign({},req,{url:'/abc',method:'get'})
    res.send = (str)=>{
		t.is(str,str0)
	}	
	const express = require('./lib')
	const app = express()
	app.get(/a?c/, function (req, res) {
      res.send(str0)
    })
    app.get(/.*fly$/, function (req, res) {
      res.send(str0)
    })
	app.handle(req,res)
	req = Object.assign({},req,{url:'/.HORSEfly',method:'get'})
	app.handle(req,res)
});

test('bird home', t => {
	var str0 = 'Got a POST request'
	req = Object.assign({},req,{url:'/',method:'get'})
    res.send = (str)=>{
		t.is(str,str0)
	}	
	const express = require('./lib')
    var router = express.Router()
    var app = express()
    // middleware that is specific to this router
    router.use(function timeLog (req, res, next) {
      // console.log('Time: ', Date.now())
      next('route')
    })
    // define the home page route
    router.get('/', function (req, res) {
      res.send(str0)
    })
    // define the about route
    router.get('/about', function (req, res) {
      res.send(str0)
    })
    app.use('/birds',router)
    app.handle(req,res)
    req.url = '/birds/about'
    app.handle(req,res)
	t.pass();
});
test('foo',t => {
	function a(path,fn){
		var arr = Array.prototype.slice.call(arguments,1)
		console.log(flatten([],arr))
	}
	function flatten(answer,arr){
		// var answer = []
		arr.forEach(function(item){
			if (Array.isArray(item))
				flatten(answer,item)
			else
				answer.push(item)
		})
		return answer
	}
	t.deepEqual(flatten([],[1,1,1]),[1,1,1])
	t.deepEqual(flatten([],[1,[1,1]]),[1,1,1])
	t.deepEqual(flatten([],[1,[1,1],1]),[1,1,1,1])
});
test('f1',t => {
	function a(path,fn){

	}
	a('',()=>{},()=>{},()=>{})
	a('',()=>{},[()=>{},()=>{}])
	a('',()=>{},[()=>{},()=>{}],()=>{})
	t.pass()
});