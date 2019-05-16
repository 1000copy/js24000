var mongoose = require('mongoose');
var BookModel = require('./model').BookModel
var pageSize = 10
exports.getList = async function(req,res,currentPage){
    var pageSize = 10
    if (!currentPage)
        currentPage = 1
    return await BookModel.find({},{},{ skip: (currentPage - 1 )*pageSize, limit: pageSize })
}
exports.getPages = async function(req,res){
    var docs =  await BookModel.find({})
    return Math.ceil(docs.length / pageSize)
}
exports.pager = async function(req,res,currentPage,search){
     var docs = await exports.search(req,res,currentPage,search)
     var pages = await exports.searchPages(req,res,search)
     return {docs:docs,pages:pages}
}
exports.search = async function(req,res,currentPage,search){
	var pageSize = 10
    if (!currentPage)
        currentPage = 1
    var s = {$regex: search, $options: 'i'}
    return await BookModel.find({title:s},{},{ skip: (currentPage - 1 )*pageSize, limit: pageSize })
}
exports.searchPages = async function(req,res,search){
	var s = {$regex: search, $options: 'i'}
    var docs =  await BookModel.find({title:s})
    return Math.ceil(docs.length / pageSize)
}
exports.delete = async function(req,res,id){
    return await BookModel.findOneAndDelete({_id:id})
}
exports.getBook = async function(req,res,id){
    return await BookModel.findById(id)
}
exports.update = async function(req,res,id,obj){
    return await BookModel.findOneAndReplace({_id:id},obj)
}
exports.create = async function(req,res,obj){
    return await BookModel.create(obj)
}