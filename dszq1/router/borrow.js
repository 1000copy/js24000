var express = require('express')
var router = express.Router()
var bodyparser = require('body-parser')
var borrow = require('../lib/borrow')
router.get('/:id',async function(req,res){
	try{
		var coverid = req.params.id
		res.render('borrow.html',{coverid})
	}catch(e){
		console.log(e)
	}
})

module.exports = router