// Default reporter swallows console.log ,you can add --verbose for 
// console.log() or t.log()
//npx ava --watch --verbose

var req = {}
var res = {}    
req.url = '/'
import test from 'ava';
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
// test('foo', async t => {
// 	req.method = 'get'
// 	res.send = (str)=>{
// 		t.is(str,"Hello World!")
// 	}	
// 	const expross = require('./expross')
// 	const app = expross()
// 	const port = 3000
//     app.get('/', (req, res) => res.send('Hello World!'))
//     app.listen(port, () => console.log(`Example app listening on port ${port}!`))
//     app.handle(req,res)
// });
// test('post', async t => {
// 	var str0 = 'Got a POST request'
// 	req.method = 'post'
//     res.send = (str)=>{
// 		t.is(str,str0)
// 	}	
// 	const expross = require('./expross')
// 	const app = expross()
// 	app.post('/', function (req, res) {
//       res.send(str0)
//     })
//     app.handle(req,res)
// });
// test('put', t => {
// 	req.method = 'put'
// 	res.send = (str)=>{
// 		t.is(str,"Hello World!")
// 	}	
// 	const expross = require('./expross')
// 	const app = expross()
// 	const port = 3000
//     app.put('/', (req, res) => res.send('Hello World!'))
//     app.listen(port, () => console.log(`Example app listening on port ${port}!`))
//     app.handle(req,res)
// });
// test('delete', t => {
// 	req.method = 'delete'
// 	res.send = (str)=>{
// 		t.is(str,"Hello World!")
// 	}	
// 	const expross = require('./expross')
// 	const app = expross()
// 	const port = 3000
//     app.delete('/', (req, res) => res.send('Hello World!'))
//     app.listen(port, () => console.log(`Example app listening on port ${port}!`))
//     app.handle(req,res)
// });
// test('both', t => {
// 	const expross = require('./expross')
// 	const app = expross()
// 	app.delete('/user', function (req, res) {})
//     app.put('/user', function (req, res) {
//       // res.send('Got a DELETE request at /user')
//     })
//     // t.log(app.stack)
//     t.is(typeof app.stack['/user'],'object')
// 	t.is(typeof app.stack['/user']['delete'],'function')
// 	t.is(typeof app.stack['/user']['put'],'function')
// 	t.is(app.stack['/user']['delete'].toString(),'function (req, res) {}')
// });
// test('foo', t => {
// 	app.all('/secret', function (req, res, next) {
//       console.log('Accessing the secret section ...')
//       next() // pass control to the next handler
//     })
// 	t.pass();
// });
// test('foo', t => {
// 	var app = express()
//     var router = express.Router()
    
//     // a middleware function with no mount path. This code is executed for every request to the router
//     router.use(function (req, res, next) {
//       console.log('Time:', Date.now())
//       next()
//     })
    
//     // a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
//     router.use('/user/:id', function (req, res, next) {
//       console.log('Request URL:', req.originalUrl)
//       next()
//     }, function (req, res, next) {
//       console.log('Request Type:', req.method)
//       next()
//     })
    
//     // a middleware sub-stack that handles GET requests to the /user/:id path
//     router.get('/user/:id', function (req, res, next) {
//       // if the user ID is 0, skip to the next router
//       if (req.params.id === '0') next('route')
//       // otherwise pass control to the next middleware function in this stack
//       else next()
//     }, function (req, res, next) {
//       // render a regular page
//       res.render('regular')
//     })
    
//     // handler for the /user/:id path, which renders a special page
//     router.get('/user/:id', function (req, res, next) {
//       console.log(req.params.id)
//       res.render('special')
//     })
    
//     // mount the router on the app
//     app.use('/', router)
// 	t.pass();
// });
// test('foo', t => {
// 	app.use(function (err, req, res, next) {
//       console.error(err.stack)
//       res.status(500).send('Something broke!')
//     })
// 	t.pass();
// });
// test('foo', t => {
// 	app.get('/user/:id', function (req, res, next) {
//       console.log('ID:', req.params.id)
//       next()
//     }, function (req, res, next) {
//       res.send('User Info')
//     })
// 	t.pass();
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
// 	app.get(/a/, function (req, res) {
//       res.send('/a/')
//     })
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
