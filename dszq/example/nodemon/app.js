var express =require('express')
var appdir = "app"
var app =express()
app.use((req,res,next)=>{
	require(`./${appdir}/index.js`)(req,res,next)
})
function unload(filename){
	var r1 = new RegExp(`/${appdir}/`)
	var r2 = new RegExp(`\\\\${appdir}\\\\`)
	Object.keys(require.cache).forEach((id)=>{
		if (r1.test(id) || r2.test(id)){
			if (id.endsWith(filename)){
				console.log('unloaded - ' ,filename)
				delete require.cache[id]
			}
		}
	})
}
var fs = require('fs')
fs.watch('./'+appdir,{recursive:true},(event,filename)=>{
	unload(filename)	
})
app.listen(3000,()=>{console.log('listening...')})

// https://codeburst.io/dont-use-nodemon-there-are-better-ways-fc016b50b45e
