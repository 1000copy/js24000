var mongoose = require('mongoose');
var BookModel = require('./model').BookModel
var pageSize = 10
exports.getList = async function(req,res,currentPage){
    console.log('MongoDB Opened!');    
    var pageSize = 10
    if (!currentPage)
        currentPage = 1
    return await BookModel.find({},{},{ skip: (currentPage - 1 )*pageSize, limit: pageSize })
}
exports.getPages = async function(req,res){
    var docs =  await BookModel.find({})
    return Math.round(docs.length / pageSize)
}