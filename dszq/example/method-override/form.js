var express =require('express')
var methodOverride =require('method-override')
var app =express()
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
app.get('/',(req,res)=>{
	var html = `
	<style>a{display:block};</style>
	<a href="/demodelete">demo delete</a>
	<a href="/demoput">demo put</a>
	<a href="/demopost">demo post</a>
	`
	res.send(html)
})
app.get('/demodelete',(req,res)=>{
	var html = 
	`<form method="POST" action="/resource?_method=DELETE">
		<button type="submit">Delete resource</button>
	</form>`
	res.send(html)
})
app.get('/demoput',(req,res)=>{
	var html = 
	`<form method="POST" action="/resource?_method=PUT">
		<button type="submit">PUT resource</button>
	</form>`
	res.send(html)
})
app.get('/demopost',(req,res)=>{
	var html = 
	`<form method="POST" action="/resource">
		<button type="submit">POST resource</button>
	</form>`
	res.send(html)
})
app.all('/resource',(req,res)=>{
	res.send(req.method)
})
app.listen(3000,()=>{console.log('listening...')})
