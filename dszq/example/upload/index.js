var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/book',{useNewUrlParser: true});
var schema = new Schema({
    book: { cover: Buffer, title: String }
});
var Book = mongoose.model('book', schema);
mongoose.connection.on('open', function () {
	var express = require('express')
	var busboy = require('connect-busboy')
	var app = express()
	app.get('/books',async function(req,res){
		var books =  await Book.findOne({})
		console.log(books.book.title)
		res.setHeader('Content-Type','image/jpeg')
		res.send(books.book.cover)
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
		    a.book.cover = Buffer.concat(buffers)
		    a.book.title = fields.title;
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
})