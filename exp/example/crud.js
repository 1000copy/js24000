var exp = require('../src')
var app = exp()
// body json
var BodyJsonParser = require('../src/bodyjsonparser')
var bjp = new BodyJsonParser({})
app.use(bjp.middleware())
app.get('/todo/:id',async (req,res)=>{
	console.log('get ,id:',req.params.id)
	res.end('HI from get,'+req.params.id)
})
app.post('/todo',async (req,res)=>{
	res.writeHead(200, {"Content-Type": "application/json"});
	res.end(JSON.stringify(req.json))
})
app.delete('/todo/:id',async (req,res)=>{
	console.log('delete ,id:',req.params.id)
	res.end('delete ,id:'+req.params.id)
})
app.put('/todo/:id',async (req,res)=>{
	console.log('put ,id:',req.params.id,"data is,",req.json)
	res.writeHead(200, {"Content-Type": "application/jSon"});
	res.end(JSON.stringify(req.json))
})
app.listen(3000,function(){
	console.log('listen on 3000')
})
/*
 curl -X POST  -H "Content-Type: application/json" -d '{"subject":"s4"}' http://localhost:3000/todo
 curl -X GET  http://localhost:3000/todo/1
 curl -X PUT  -H "Content-Type: application/json" -d '{"subject":"s4"}' http://localhost:3000/todo/1
 curl -X DELETE http://localhost:3000/todo/1
 */
