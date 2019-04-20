var express = require('express')
var app = express()
var mongoose = require('mongoose')
var dbf = mongoose.connect('mongodb://localhost/dszq',{ useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
app.get('/book',async (req,res,next)=>{
  // res.send('books')
  var book = require('./lib/book')
  var current_page =  req.query.page
  console.log(req.query.page)
  var docs = await book.getList(req,res,current_page)
  var pages = await book.getPages(req,res)
  res.render('book.ejs',{books:docs,current_page:current_page,pages:pages,base:'/book'})
})
app.listen(3000,()=>{
	console.log('dszq starting...')
})