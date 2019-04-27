var express = require('express')
var app = express()
var session = require('express-session')
app.use(session({
	secret:"reco&rita",
	resave:true,
	saveUninitialized:false,
	}))
app.get("/",(req,res)=>{
	req.session.pagecount = req.session.pagecount || 0
	req.session.pagecount++
	console.log(req.session.id)
	res.send("Visit count "+req.session.pagecount)
})
app.listen(3000,()=>{
	console.log('page count testing...')
})