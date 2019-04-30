var express =require('express')
var methodOverride =require('method-override')
var app =express()
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'))
app.get('/resource',(req,res)=>{res.send('g')})
app.put('/resource',(req,res)=>{res.send('p')})
app.post('/resource',(req,res)=>{res.send('p')})
app.delete('/resource',(req,res)=>{res.send('d')})
app.get('/html',(req,res)=>{
	var str = `
	<script>
	var xhr =new XMLHttpRequest()
	xhr.onload= onload
	xhr.open('post','/resource',true)
	//xhr.setRequestHeader('X-HTTP-Method-Override','DELETE')
	xhr.setRequestHeader('X-HTTP-Method-Override','PUT')
	//xhr.setRequestHeader('X-HTTP-Method-Override','POST')
	xhr.send()
	function onload(){
		alert('got response: '+this.responseText)
	}
	</script>`
	res.send(str)
})
app.listen(3000,()=>{
	console.log('listening...')
})