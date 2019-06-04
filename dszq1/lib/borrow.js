var mongoose = require('mongoose')
var BorrowModel = require('./model').BorrowModel
exports.clearall = async function(){
  return await BorrowModel.deleteMany({})
}
exports.save = async function(borrow){
  var b = new BorrowModel(borrow)
  return await b.save()
}
exports.find = exports.get = async function(id){
  return await BorrowModel.findOne({_id:id})
}
