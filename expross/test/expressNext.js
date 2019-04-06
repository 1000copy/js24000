const expross = require('express')
const app = expross()
const port = 3000
app.get('/', (req, res,next) => {
	next('router')
},(req, res) => {
	res.send('2')
})
app.get('/route', (req, res,next) => {
	next('route')
},(req, res,next) => {
	// next()
})
app.get('/route', (req, res,next) => {
	next()
},(req, res,next) => {
	res.send('2')
})
var router = expross.Router()
router.get('/1',function(req,res,next){next('router')/*不再做之后的任何路由，直接404*/})
app.use('/router',router)

var router1 = expross.Router()
router1.get('/1',function(req,res,next){res.send('router1')})
app.use('/router',router)

// console.log(app._router.stack.length)
// console.log(app._router.stack[2].route)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))