
// console.log(Array.proto)
// console.log(Array.slice([1,2,3],1))
// console.log([1,2,3].slice(1))
// console.log(Array.prototype.slice([1,2,3],1))
// (function(){
// 	// console.log(arguments.slice(1))
// 	console.log(Array.prototype.slice.call(arguments,1))
// })(1,2,3)

const request = require('supertest');
var express = require('../src')
var app = express()
app.use(function(req,res){
	res.setHeader('use1',true)
	console.log('use1')
},function(req,res){
	res.setHeader('use2',true)
	console.log('use2')
})
var hs = [
		function(req,res){
			res.setHeader('x',1)
		},
		function(req,res){
			res.end('multihandler')
		}
	]
app.get('/multihandler',hs)
app.get('/multihandler1',function(){},function(req,res){res.end('multihandler1')})
app.get('/',function(req,res){
	res.end('get')
})
app.post('/',function(req,res){
	res.end('post')
})
app.delete('/',function(req,res){
	res.end('delete')
})

app.put('/',function(req,res){
	res.end('put')
})
exports = module.exports = app
// console.log(app.paths)
// app.listen(3000,function(){
// 	console.log('listen on 3000')
// })
request(app.server)
  .get('/multihandler1')
  .expect(200)
  .expect('multihandler1')
  .end(function(err, res) {
    if (err) throw err;
    console.log('OK')
  });

request(app.server)
  .get('/multihandler')
  .expect(200)
  .expect('multihandler')
  .end(function(err, res) {
    if (err) throw err;
    console.log(res.header.x)
    console.log('OK')
  });
request(app.server)
  .get('/')
  .expect(200)
  .expect('get')
  .end(function(err, res) {
    if (err) throw err;
    console.log('OK')
  });
request(app.server)
  .post('/')
  .expect(200)
  .expect('post')
  .end(function(err, res) {
    if (err) throw err;
    console.log('OK')
  });
request(app.server)
  .put('/')
  .expect(200)
  .expect('put')
  .end(function(err, res) {
    if (err) throw err;
    console.log('OK')
  });
  request(app.server)
    .delete('/')
    .expect(200)
    .expect('delete')
    .end(function(err, res) {
      if (err) throw err;
      console.log('OK')
    });