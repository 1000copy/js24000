var express = require('express')
var app = express()
const bodyParser = require('body-parser');
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require('mongoose')
var dbf = mongoose.connect('mongodb://localhost/dszq',{ useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
app.get('/book',async (req,res,next)=>{
  // res.send('books')
  var book = require('./lib/book')
  var current_page =  req.query.page
  var search =  req.query.search
  var docs = await book.search(req,res,current_page,search)
  var pages = await book.searchPages(req,res,search)
  res.render('book.ejs',{
    books:docs,current_page:current_page,pages:pages,base:'/book',
    search:search})
})
app.post('/book',async (req,res,next)=>{
  // res.send('books')
  var book = require('./lib/book')
  var current_page =  1
  var docs = await book.search(req,res,1,req.body.search)
  var pages = await book.searchPages(req,res,req.body.search)
  console.log(pages," pages")
  var search = req.body.search
  res.render('book.ejs',
    {books:docs,current_page:current_page,pages:pages,base:'/book',
     search:search
    })
})
app.get('/book/delete/:id',async (req,res,next)=>{
  // res.send('books')
  var book = require('./lib/book')
  var id =  req.params.id
  await book.delete(req,res,id)
  console.log(req.query.page)
  res.redirect('/book?page='+req.query.page)
})
app.get('/book/edit/:id',async (req,res,next)=>{
  var book = require('./lib/book')
  var book = await book.getBook(req,res,req.params.id)
  res.render('bookedit.ejs',{book:book,current_page:req.query.page})
})
app.post('/book/edit/:id', async(req,res,next)=>{
  var book = require('./lib/book')
  await book.update(req,res,req.body.id,Object.assign({},req.body))
  res.redirect('/book?page='+req.query.page)
})
app.listen(3000,()=>{
	console.log('dszq starting...')
})