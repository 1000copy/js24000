var express = require('express')
var router = express.Router()
router.all('/',async (req,res,next)=>{
  var user = require('./lib/user')
  var current_page =  req.query.page
  if (!current_page)
    current_page = req.session.page
  if (!current_page)
    current_page =  1
  // current_page = req.query.page || req.session.page || 1
  if (req.session.page != current_page)
    req.session.page = current_page
  var search = req.session.search || ""
  if(req.method=='POST'){
    search = req.body.search
    req.session.search = search
  }
  var d = await user.pager(req,res,current_page,search)
  var docs = d.docs
  var pages = d.pages
  if(current_page>pages)
      current_page = 1
  if (req.method !="POST"){
    console.log(current_page)
    res.render('user.ejs',
      {
        books:docs,
        current_page:current_page,
        pages:pages,
        base:'/user',
        search:search
      })
  }
  else
    res.redirect('/user?page='+current_page +"&search="+search)
})

router.get('/delete/:id',async (req,res,next)=>{
  // res.send('books')
  var book = require('./lib/user')
  var id =  req.params.id
  await book.delete(req,res,id)
  // res.redirect('/book?page='+req.query.page +"&search="+req.query.search)
  res.redirect('/user')
})
router.get('/edit/:id',async (req,res,next)=>{
  var user = require('./lib/user')
  var user = await user.getUser(req,res,req.params.id)
  res.render('useredit.ejs',{user:user})
})
router.post('/edit/:id', async(req,res,next)=>{
  var user = require('./lib/user')
  await user.update(req,res,req.body.id,Object.assign({},req.body))
  res.redirect('/user')
})
module.exports = router