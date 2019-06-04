var init = require('./g').init// ejs 
var app = init()
var userRouter = require('./router/user')
var sysRouter = require('./router/sys')
var bookRouter = require('./router/book')
var borrowRouter = require('./router/borrow')
var cartRouter = require('./router/cart')
var returnRouter = require('./router/return')
app.use('/user',userRouter)
app.use('/sys',sysRouter)
app.use('/book',bookRouter)
app.use('/borrow',borrowRouter)
app.use('/cart',cartRouter)
app.use('/return',returnRouter)
app.get('/',function(req,res){
	var isLogin = req.session.user!= null
	res.render('index.html',Object.assign({},{username:isLogin?req.session.user.username:"undefined",isLogin}))
})
app.listen(3000,function(){console.log('listening on 3000')})