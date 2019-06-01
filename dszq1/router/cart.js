var express = require('express')
var Router = express.Router()
var Book = require('../lib/book')
var BorrowCart = require('../lib/borrowCart')
var bodyparser = require('body-parser')
Router.get('/remove/:id',async function(req,res){
	var cart = req.session.cart
	console.log(req.params.id)
	req.session.cart = removeFromCart(cart,req.params.id)
	res.redirect('/cart')
})
Router.get('/borrow',async function(req,res){
	var cart = req.session.cart || []
	// console.log(cart)
	var ans = []
	try{
		for (var i = 0; i < cart.length; i++) {
			var bookid = cart[i]
			var book = await Book.get(bookid)
			ans.push(book)
		}
	}
	catch(e){
		console.log(e)
	}
	res.render('cart/borrow.html',{cart:ans})
})
Router.post('/borrow',bodyparser.urlencoded({ extended: false }),async function(req,res){
	var cart = req.session.cart || []
	var borrowCart = {}
	borrowCart.bookids = cart
	borrowCart.comment = req.body.comment
	borrowCart.userid = req.session.user._id
	BorrowCart.save(borrowCart)
	req.session.cart = []
	res.send('borrowed cart ')
})
Router.get('/',async function(req,res){
	var cart = req.session.cart || []
	var ans = []
	try{
		for (var i = 0; i < cart.length; i++) {
			var bookid = cart[i]
			var book = await Book.get(bookid)
			ans.push(book)
		}
	}
	catch(e){
		console.log(e)
	}
	// console.log(ans)
	res.render('cart/index.html',{cart:ans})
})
function removeFromCart(cart,id){
	var ans = []
	for (var i = 0; i < cart.length; i++) {
		var bookid = cart[i]
		if (bookid != id){
			ans.push(bookid)
		}
	}
	return ans
}
Router.get('/:id',async function(req,res){
	var bookid = req.params.id
	req.session.cart = req.session.cart  || []
	req.session.cart.push(bookid)
	res.send('put into cart')
})

module.exports = Router