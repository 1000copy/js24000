var exp = require('../src')
var app = exp()
// body json
var BodyJsonParser = require('../src/bodyjsonparser')
var bjp = new BodyJsonParser({})
app.use(bjp.middleware())
app.post('/',
	async (req,res)=>{
		req.x = 1
		console.log("json here : ",req.json)
	},
	async(req,res)=>{
		console.log("now return ...",req.x)
		res.end('Hi from BodyJsonParser')
	})
app.listen(3000,function(){
	console.log('listen on 3000')
})
// curl -X POST  -H "Content-Type: application/json" -d '{"subject":"s4"}' http://localhost:3000/