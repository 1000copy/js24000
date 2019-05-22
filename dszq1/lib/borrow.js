var mongoose = require('mongoose')
var BookModel = require('./model').BookModel
exports.save = async function(boo){
  var book = new BookModel({title:boo.title,cover:boo.cover})
  try{
  	await book.save()
  }catch(e){
	console.log(e)
  }
}
exports.clearall = async function(){
  return await BookModel.deleteMany({})
}
