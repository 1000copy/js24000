var express = require('express')
var router = express.Router()
router.get('/populatenums',async (req,res,next)=>{
  var user = require('./lib/user')
  await user.populatenums()
  res.end('populated nums'+ await user.getPages())
})
router.get('/add',async (req,res,next)=>{
  res.render('useradd.ejs',{user:{_id:"",name:"",age:0}})
})
router.put('/',async (req,res,next)=>{
  var user = require('./lib/user')
  var user = await user.add(req,res,req.body)
  res.redirect('/')
})

router.delete('/:id',async (req,res,next)=>{
  var book = require('./lib/user')
  var id =  req.params.id
  await book.delete(req,res,id)
  // res.redirect('/book?page='+req.query.page +"&search="+req.query.search)
  res.redirect('/user')
})
router.get('/:id',async (req,res,next)=>{
  var user = require('./lib/user')
  var user = await user.getUser(req,res,req.params.id)
  res.render('useredit.ejs',{user:user})
})
router.post('/:id', async(req,res,next)=>{
  // console.log('trap here...',req.body._id,req.body)
  var user = require('./lib/user')
  // var id = req.body.id
  // delete req.body.id
  await user.update(req,res,req.body._id,Object.assign({},req.body))
  res.redirect('/user')
  // res.send('ok')
})
router.all('/',async (req,res,next)=>{
  var user = require('./lib/user')
  var current_page = req.query.page || req.session.page || 1
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
    // console.log(current_page)
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
module.exports = router
