var app = require('../exp/src')({staticRoot:"./public"})
// console.log(app.options)
app.get('/todo/:id',async (req,res)=>{
	res.writeHead(200, {"Content-Type": "application/json"});
	var obj = [{id:1,subject:"abc"}]
	res.end(JSON.stringify(obj))
})
app.get('/todopage/:id',async (req,res)=>{
	res.writeHead(200, {"Content-Type": "application/json"});
	var todo = require('./todoCRUD.js')  
	// var todo = new TodoCRUD(connectionString)
	var r = await todo.page(req.params.id)
	console.log(r);
	res.end(JSON.stringify(r))
})
app.get('/todos',async (req,res)=>{
	res.writeHead(200, {"Content-Type": "application/json"});
	var todo = require('./todoCRUD.js')  
	// var todo = new TodoCRUD(connectionString)
	var r = await todo.list()
	console.log(r);
	res.end(JSON.stringify(r))
})
app.post('/todo',async (req,res)=>{
	res.writeHead(200, {"Content-Type": "application/json"});
	res.end(JSON.stringify(req.json))
})
app.delete('/todo/:id',async (req,res)=>{
	res.writeHead(200, {"Content-Type": "application/json"});
	var todo = require('./todoCRUD.js')  
	var obj  = {}
	try{
		await todo.delete({_id:+req.params.id})
		obj = {success:true,deleted:req.params.id}
		console.log(`deleted ${req.params.id}`)
	}catch(err){
		obj = {success:false,msg:`delete todo item {req.params.id} failure cause ${err}`}
	}
	res.end(JSON.stringify(obj))
})
app.put('/todo/:id',async (req,res)=>{
	console.log('put ,id:',req.params.id,"data is,",req.json)
	res.writeHead(200, {"Content-Type": "application/json"})
	var todo = require('./todoCRUD.js')  
	try{
		todo.update({_id:+req.params.id},req.json.name)
		res.end(JSON.stringify({success:true,id:req.params.id}))	
	}catch(err){
		res.end(JSON.stringify({success:false,msg:err}))	
	}
})
app.listen(3000,function(){
	console.log('listen on 3000')
})
/*
 curl -X POST  -H "Content-Type: application/json" -d '{"subject":"s4"}' http://localhost:3000/todo
 curl -X GET  http://localhost:3000/todo/1
 curl -X GET  http://localhost:3000/todos
 curl -X GET  http://localhost:3000/todopage/1
 curl -X PUT  -H "Content-Type: application/json" -d '{"subject":"s4"}' http://localhost:3000/todo/1
 curl -X DELETE http://localhost:3000/todo/1
 */
