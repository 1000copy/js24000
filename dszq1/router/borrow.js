var express = require('express')
var router = express.Router()
var bodyparser = require('body-parser')
var borrow = require('../lib/borrow')
var Book = require('../lib/book')
router.get('/:id',async function(req,res){
	try{
		var coverid = req.params.id
		res.render('borrow.html',{coverid})
	}catch(e){
		console.log(e)
	}
})
router.post('/:id',bodyparser.urlencoded({ extended: false }),async function(req,res){
	try{
		// do borrow
		var bookid = req.params.id
		var comment = req.body.comment
		var userid = req.session.user._id
		var ans = await borrow.save({bookid,comment,userid})
		var b = await borrow.find(ans._id)
		res.send('borrowid:'+b._id+b)
		// mark book.isBorrow
		var book = await Book.borrow(bookid)
		book = await Book.get(bookid)
		console.log(book)
	}catch(e){
		console.log(e)
	}
})

module.exports = router