var express = require('express')
var router = express.Router()
router.all('/',async (req,res,next)=>{
  var book = require('./lib/book')
  var current_page =  req.query.page
  var search =  req.query.search
  if (!current_page)
    current_page =  1
  if(req.method=='POST')
     search = req.body.search
  if(!search)
     search = ""
  var d = await book.pager(req,res,current_page,search)
  var docs = d.docs
  var pages = d.pages
  if(current_page>pages)
      current_page = 1
  if (req.method !="POST")
    res.render('book.ejs',
      {
        books:docs,
        current_page:current_page,
        pages:pages,
        base:'/book',
        search:search
      })
  else
    res.redirect('/book?page='+current_page +"&search="+search)
})

router.get('/delete/:id',async (req,res,next)=>{
  // res.send('books')
  var book = require('./lib/book')
  var id =  req.params.id
  await book.delete(req,res,id)
  res.redirect('/book?page='+req.query.page +"&search="+req.query.search)
})
router.get('/edit/:id',async (req,res,next)=>{
  var book = require('./lib/book')
  var book = await book.getBook(req,res,req.params.id)
  res.render('bookedit.ejs',{book:book,current_page:req.query.page,search:req.query.search})
})
router.post('/edit/:id', async(req,res,next)=>{
  var book = require('./lib/book')
  await book.update(req,res,req.body.id,Object.assign({},req.body))
  res.redirect('/book?page='+req.query.page +"&search="+req.query.search)
})
module.exports = router