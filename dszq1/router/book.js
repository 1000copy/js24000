var express = require('express')
var bookRouter = express.Router()
var bodyparser = require('body-parser')
var Book = require('../lib/book')
// 1. 用户注册表单 `GET /registion`

// 7. 查看profile `GET /:id`
bookRouter.get('/list',async function(req,res){
	var search = req.query.search == ''?'':req.query.search||req.session.search || ''
	var current_page = req.query.page || req.session.currentPage ||  1
	var books = await Book.list(current_page,search)
	var pages = await Book.pages(search) 
	console.log(pages)
	req.session.currentPage = current_page
	req.session.search = search
	res.render('book/list.html',{books,current_page,base:'',pages})
})
bookRouter.get('/cover/:id',async function(req,res){
	try{
		// console.log(req.params.id)
		// 这两句代码，效果是不一样的
		// 1. var cover = await Book.getCover(req.params.id).cover
		// and 2. ---
		var cover = (await Book.getCover(req.params.id)).cover
		res.send(cover)
		// res.send(require('fs').readFileSync('./public/img/vuejs.jpg'))
	}catch(e){
		console.log(e)
	}
})

module.exports = bookRouter