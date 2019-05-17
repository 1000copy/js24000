
(async()=>{
	var mongoose = require('mongoose');
	await (()=>{
		mongoose.connect('mongodb://localhost:27017/book',{useNewUrlParser: true});
		return new Promise(function(resolve,reject){
			mongoose.connection.on('open', function(){
				resolve()
			})		
		})
	})()
	var Schema = mongoose.Schema;
	var Bookschema = new Schema({
	     cover: Buffer, title: String 
	});
	var Book = mongoose.model('book', Bookschema);
	await Book.deleteMany({})
	var express = require('express')
	var busboy = require('connect-busboy')
	var app = express()
	app.get('/books',async function(req,res){
		console.log('into the wild')
		var books =  await Book.find({})
		var ans = ''
		for (var i = 0; i < books.length; i++) {
			var iidd = books[i]._id
			console.log(books[i])
			ans += `<span>${books[i].title}</span><img src='/book/${iidd}' style="width:100;height:100;"><br/>`
		}
		console.log(ans || "none")
		res.send(ans || "none")
	})
	app.get('/book/:id',async function(req,res){
		var book =  await Book.findOne({_id:req.params.id})
		res.send(book.cover)
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
	  		res.redirect('/upload')
	  		console.log('finished with fields:',a.book,'and redirect')
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