(async()=>{
	var mongoose = require('mongoose');
	await (()=>{
		mongoose.connect('mongodb://localhost:27017/dszq',{useNewUrlParser: true});
		return new Promise(function(resolve,reject){
			mongoose.connection.on('open', function(){
				resolve()
			})		
		})
	})()
	var Schema = mongoose.Schema;
	// var Bookschema = new Schema({
	var Bookschema = Schema({
	     cover: Buffer, title: String 
	});
	var Book = mongoose.model('bookschemas', Bookschema);
	// await Book.deleteMany({})
	var express = require('express')
	var busboy = require('connect-busboy')
	var app = express()
	app.get('/books',async function(req,res){
		var books =  await Book.find({})
		var ans = ''
		for (var i = 0; i < books.length; i++) {
			var book = books[i]
			var h = 
`<figure>
	<img src='/book/${book._id}'>
	<figcaption>${book.title}</figcaption>
 </figure>
 <style>
 img{transform: scale(0.9)}
 figure{display:inline-block;}
 figcaption{text-align:center;}
 </style>`
			ans += h
		}
		res.send(ans || "none")
	})
	app.get('/book/:id',async function(req,res){
		var id = req.params.id
		var book = await Book.findOne({_id:id}) // 妈蛋，总是忘掉await
		console.log(id,book.covaer)
		res.send(book.cover)
	})
	app.get('/upload',function(req,res){
		res.send(`
<form action='/upload' enctype='multipart/form-data' method='post'>
	<input type='text' name='title'/>
	<input type='file' name='cover'/>
	<input type='submit'/>
</form>
			`)
	})
	app.post("/upload",busboy({  }),function(req,res){
		  var fields = {}
		  var buffers = []
		  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
		  	file.on('data',function(chunk){
		  		buffers.push(chunk)
		  	})
		  	file.on('end',async function(){
		  		var a = new Book();
			    a.cover = Buffer.concat(buffers)
			    a.title = fields.title;
			    await a.save()
		  		res.redirect('/books')
		  	})
		  });
		  req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
		    fields[key] = value
		  });
		  req.pipe(req.busboy);
		})
	app.listen(3000,function(){
		console.log('app listening on 3000')
	})
})()