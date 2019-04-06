// Default reporter swallows console.log ,you can add --verbose for 
// console.log() or t.log()
//npx ava --watch --verbose

var http = require("http")
var req =new http.IncomingMessage()
// req.url = '/'
// req.method = 'get'
var res =new http.ServerResponse(req)


import test from 'ava';

test('post', async t => {
	var str0 = 'Got a POST request'
	req = Object.assign({},req,{url:'/',method:'post'})
    res.send = (str)=>{
		t.is(str,str0)
	}	
	const expross = require('./lib/expross')
	const app = expross()
	app.post('/', function a(req, res,next) {res.send(str0)})
    app.handle(req,res)
});test('next', async t => {
	var str0 = 'Got a POST request'
	req = Object.assign({},req,{url:'/',method:'post'})
    res.send = (str)=>{
		t.is(str,str0)
	}	
	const expross = require('./lib/expross')
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
	const expross = require('./lib/expross')
	const app = expross()
	app.post('/', 
		function a(req, res,next) {next('route');},
		function b(req, res) {res.send(str0+1)})
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
	const expross = require('./lib/expross')
	const app = expross()
	var router = expross.Router()
	router.post('/', 
		function a(req, res,next) {next('router')},
		function b(req, res) {res.send(str0+1)})
	router.post('/', 
		function a(req, res,next) {next()},
		function b(req, res) {res.send(str0+1)})
    app.use(router)
    app.post('/', 
		function a(req, res,next) {next()},
		function b(req, res) {res.send(str0)})
    app.handle(req,res)
});
test('router use', t => {
	var str0 = 'Got a POST request'
	req = Object.assign({},req,{url:'/user/id',method:'get'})
    res.send = (str)=>{
		t.is(str,str0)
	}	
	const express = require('./lib/expross')
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
	const express = require('./lib/expross')
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
	const express = require('./lib/expross')
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
test('route params', t => {
	var str0 = 'Got a POST request'
	req = Object.assign({},req,{url:'/user/11',method:'get'})
    res.send = (str)=>{
		t.is(str,str0)
	}	
	const express = require('./lib/expross')
	const app = express()
	app.get('/user/:id', function (req, res, next) {
      next()
    }, function (req, res, next) {
      t.is(req.params,11)
      res.send(str0)
    })
    app.handle(req,res)
});
// test('foo', t => {
// 	app.get(/a/, function (req, res) {
//       res.send('/a/')
//     })
// 	t.pass();
// });

// test('foo', t => {
// 	app.use(function (err, req, res, next) {
//       console.error(err.stack)
//       res.status(500).send('Something broke!')
//     })
// 	app.handle()
// });
// test('foo', t => {
// 	app.get('/a_route_behind_paywall',
//       function checkIfPaidSubscriber (req, res, next) {
//         if (!req.user.hasPaid) {
//           // continue handling this request
//           next('route')
//         }
//         else{
//           next();
//         }
//       }, function getPaidContent (req, res, next) {
//         PaidContent.find(function (err, doc) {
//           if (err) return next(err)
//           res.json(doc)
//         })
//       })
// 	t.pass();
// });
// test('foo', t => {
// 	app.get(/.*fly$/, function (req, res) {
//       res.send('/.*fly$/')
//     })
// 	t.pass();
// });
// /*Route path: /users/:userId/books/:bookId
//     Request URL: http://localhost:3000/users/34/books/8989
//     req.params: { "userId": "34", "bookId": "8989" }
// */
// test('foo', t => {
// 	app.get('/users/:userId/books/:bookId', function (req, res) {
//       res.send(req.params)
//     })
// 	t.pass();
// });
// test('foo', t => {
// 	var express = require('express')
//     var router = express.Router()
//     var app = express()
//     // middleware that is specific to this router
//     router.use(function timeLog (req, res, next) {
//       console.log('Time: ', Date.now())
//       next()
//     })
//     // define the home page route
//     router.get('/', function (req, res) {
//       res.send('Birds home page')
//     })
//     // define the about route
//     router.get('/about', function (req, res) {
//       res.send('About birds')
//     })
//     app.use(router)
// 	t.pass();
// });
// test('foo', t => {
// 	t.pass();
// });
// test('foo', t => {
// 	t.pass();
// });
// test('foo', t => {
// 	t.pass();
// });
// test('foo', t => {
// 	t.pass();
// });
// test('foo', t => {
// 	t.pass();
// });
// test('foo', t => {
// 	t.pass();
// });
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