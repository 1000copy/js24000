var mongoose = require('mongoose')
var BorrowCartModel = require('./model').BorrowCartModel

exports.save = async function(boo){
  var book = new BorrowCartModel({comment:boo.comment,userid:boo.userid,bookids:boo.bookids})
  try{
  	await book.save()
  }catch(e){
	console.log(e)
  }
}
// boo : comment,userid,bookids
exports.list = async function(boo){
  try{
  	return await BorrowCartModel.find({}).lean()
  }catch(e){
	console.log(e)
  }
}
exports.get = async function(id){
  try{
  	return await BorrowCartModel.findOne({_id:id})
  }catch(e){
	console.log(e)
  }
}
