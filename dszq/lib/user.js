var mongoose = require('mongoose');
var UserModel = require('./model').UserModel
var pageSize = 10
exports.getList = async function(req,res,currentPage){
    var pageSize = 10
    if (!currentPage)
        currentPage = 1
    return await UserModel.find({},{},{ skip: (currentPage - 1 )*pageSize, limit: pageSize })
}
exports.getPages = async function(req,res){
    var docs =  await UserModel.find({})
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
    return await UserModel.find({name:s},{},{ skip: (currentPage - 1 )*pageSize, limit: pageSize })
}
exports.searchPages = async function(req,res,search){
	var s = {$regex: search, $options: 'i'}
    var docs =  await UserModel.find({name:s})
    return Math.ceil(docs.length / pageSize)
}
exports.delete = async function(req,res,id){
    return await UserModel.findOneAndDelete({_id:id})
}
exports.getUser = async function(req,res,id){
    return await UserModel.findById(id)
}
exports.update = async function(req,res,id,obj){
    return await UserModel.findOneAndReplace({_id:id},obj)
}