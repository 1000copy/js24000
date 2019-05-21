(async()=>{
	var express = require('express')
	var busboy = require('connect-busboy')
	var app = express()
	app.get('/upload',function(req,res){
		res.send(`
<form action='/upload' enctype='multipart/form-data' method='post'>
	<input type='text' name='title'/>
	<input type='file' name='cover'/>
	<input type='submit'/>
</form>
			`)
	})
	
	// app.post("/upload",busboy({  }),function(req,res){
	// 	  var fields = {}
	// 	  var buffers = []
	// 	  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
	// 	  	file.on('data',function(chunk){
	// 	  		buffers.push(chunk)
	// 	  	})
	// 	  	file.on('end',async function(){
	// 	  		var ans = Buffer.concat(buffers)
	// 	  		var fs = require('fs');
	// 			var wstream = fs.createWriteStream('a.png');
	// 			wstream.write(ans);
	// 			wstream.end()
	// 	  	})
	// 	  });
	// 	  req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
	// 	    fields[key] = value
	// 	  });
	// 	  req.pipe(req.busboy);
	// 	})
	app.post("/upload",busboy({limits: {fileSize: (1) * 1024 * 1024}}),async function(req,res){
	// app.post("/upload",busboy({limits: {fileSize: (1/1024/1024) * 1024 * 1024}}),async function(req,res){
		try{
			var woo = await new Promise(function (r,rj){
				  var fields = {}
				  var buffers = []
				  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
				  	file.on('data',function(chunk){
				  		buffers.push(chunk)
				  	})
				  	file.on('limit', function(data) {                                               
					    rj('limits exceed')
					});
				  	file.on('end',async function(){
				  		var ans = Buffer.concat(buffers)
				  		fields[fieldname] = ans
				  	    r(fields)
				  	})
				  });
				  req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
				    fields[key] = value
				  });
				  req.pipe(req.busboy);	
				})
				console.log(woo)
		}catch(e){
			console.log(e)
		}
		
		// var fs = require('fs');
		// var wstream = fs.createWriteStream('a.png');
		// wstream.write(woo);
		// wstream.end()
	})
	app.listen(3000,function(){
		console.log('app listening on 3000')
	})
})()