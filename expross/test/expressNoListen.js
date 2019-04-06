const expross = require('express')
const app = expross()
const port = 3000

var router = expross.Router()
router.use('/', (req, res,next) => {
	next('router')
},(req, res) => {
	res.send('6')
})
app.use(router)
app.get('/', (req, res,next) => {
	res.send('1')
},(req, res) => {
	res.send('2')
})
app.get('/', (req, res,next) => {
	res.send('3')
},(req, res) => {
	res.send('4')
})
var http = require("http")
var req =new http.IncomingMessage()
// req.url = '/'
// req.method = 'get'
req = Object.assign({},req,{url:'/',method:'get'})
var res =new http.ServerResponse(req)
res.send = (str)=>{console.log(str)}
app.handle(req,res)
// console.log(app._router.stack.length)
// console.log(app._router.stack[2].route)
