var express = require('express')
var router = express.Router()
var bodyparser = require('body-parser')
var borrow = require('../lib/borrow')
var Book = require('../lib/book')
var BorrowCart = require('../lib/borrowCart')
var User = require('../lib/user')
router.get('/:id',async function(req,res){
	try{
		var id = req.params.id
		var bill = await BorrowCart.get(id)
		bill.books = []
		// console.log(bill.bookids)
		for(var i = 0 ;i<bill.bookids.length;i++){
			var book = await Book.get(bill.bookids[i])
			bill.books.push(book)
		}
		// console.log(bill.books)
		res.render('borrow.html',{bill})
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
router.get('/',async function(req,res){
	// 想要临时加入一个username属性，但是无法加入，因为：
	// “Ah.. My object is a Mongoose document which doesn't allow adding properties. 
	// The solution is to either convert the returned document to a plain object or to call
	 // lean() in the query.”
	var borrowed = await BorrowCart.list()
	var ans = []
	for (var i = 0; i < borrowed.length; i++) {
		var item = borrowed[i]
		var user = await User.get(item.userid)
		// borrowed[i] = borrowed[i].toObject()
		borrowed[i] = Object.assign(item,{username:user.username})
	}
	// res.render('borrowed.html',{borrowed})
	var isLogin = req.session.user!= null
	res.render('borrowed.html',Object.assign({borrowed},{username:isLogin?req.session.user.username:"undefined",isLogin}))
})
module.exports = router