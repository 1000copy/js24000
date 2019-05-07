var express =require('express')
var methodOverride =require('method-override')
var app =express()
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
app.all('/resource',(req,res)=>{
	res.send(req.method)
})
var request = require('supertest')
request(app)
      .post('/resource?_method=PUT')
      // .expect('Content-Type', /plain/)
      .expect(200,'PUT')
      .end(function(err, res){
	    if (err) throw err;
	  });
request(app)
      .post('/resource?_method=DELETE')
      // .expect('Content-Type', /plain/)
      .expect(200, 'DELETE')
      .end(function(err, res){
	    if (err) throw err;
	  });