var mongoose = require('mongoose')
var BorrowModel = require('./model').BorrowModel
exports.save = async function(boo){
  var book = new BorrowModel({title:boo.title,cover:boo.cover})
  try{
  	await book.save()
  }catch(e){
	console.log(e)
  }
}
exports.clearall = async function(){
  return await BorrowModel.deleteMany({})
}
exports.save = async function(borrow){
  var b = new BorrowModel(borrow)
  return await b.save()
}
exports.find = async function(id){
  return await BorrowModel.findOne({_id:id})
}
