var express = require('express')
var router = express.Router()
var bodyparser = require('body-parser')
var Book = require('../lib/book')
router.get('/:id',async function(req,res){
	try{
		var bookid = req.params.id
		res.render('book/return.html',{coverid:bookid})
	}catch(e){
		console.log(e)
	}
})
router.post('/:id',bodyparser.urlencoded({ extended: false }),async function(req,res){
	try{
		// do borrow
		var bookid = req.params.id
		var book = Book.return(bookid)
		console.log(book)
		res.send('returned'+bookid)
	}catch(e){
		console.log(e)
	}
})

module.exports = router