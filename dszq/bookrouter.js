var express = require('express')
var router = express.Router()
var busboy = require('connect-busboy');
var path = require('path')
var fs = require('fs')
router.put('/',busboy(),async (req,res,next)=>{
// router.put('/',busboy(),       (req,res,next)=>{
  var result = {}
  var saveTo,saveFile
  var buffers  = []
  var buf
  // var result = ''
  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    result['mime'] = filename
    saveTo = path.join('./', path.basename(fieldname));
    console.log('file into the wild',saveTo)
    file.pipe(fs.createWriteStream(saveTo))
  });
  req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
    result[key] = value
  });
  req.busboy.on('finish', async function() {
    // console.log(require('fs').readFileSync('cover').length);
    setTimeout(async function(){
      result['cover'] = fs.readFileSync(saveTo);
      console.log('finished',result,result.cover,result.cover.length)
      console.log('saveTo,',saveTo)
      var book = require('./lib/book')
      await book.create(req,res,result)
    },1000)
      

    
  })
  req.pipe(req.busboy);
  // console.log("pipe",req.busboy)
  res.send('Put')
})
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
router.get('/add', async(req,res,next)=>{
  res.render("bookadd.ejs")
})
router.get('/image/:id', async(req,res,next)=>{
  var book = require('./lib/book')
  var book = await book.getBook(req,res,req.params.id)
  res.send(book.cover)
  var fs = require('fs');
  var wstream = fs.createWriteStream('./myBinaryFile');
  wstream.write(book.cover)
  wstream.end()
  console.log('cover size,',book.cover.length)

})

module.exports = router
// curl  -F "title=1" -F "filecomment=d" -F "image=@./reco.jpg" localhost:3000/book?_method=PUT




