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
exports.getUserWithName = async function(req,res,name){
    return await UserModel.findOne({name:name})
}
exports.update = async function(req,res,id,obj){
    // console.log('obj*id,',obj)
    // delete obj._id
    // console.log('obj-id,',obj)

    var r = await UserModel.findOneAndReplace({_id:obj._id},obj,{returnNewDocument:false})
    // console.log(r)
    return r
}

exports.populatenums = async function(req,res){
  await populate(UserModel)        
}
exports.add = async function(req,res,user){
    var userModel = new UserModel({
        name:user.name,
        pwd:md5(user.pwd),
        age:user.age
    });
    try{
        await userModel.save();
    }catch(e){
       console.log(e.message)
    }          
}
function md5(str){
    return require('crypto').createHash('md5').update(str).digest("hex")
}

async function populate(UserModel,cb){
    var deleted = await UserModel.find().deleteMany()
    for (var i = 0; i < 23; i++) {
        var userModel = new UserModel({
            name:i,
            pwd:md5(""+i),
            age:i
        });
        try{
            await userModel.save();
        }catch(e){
           console.log(e.message)
        }    
    }
    if (cb)cb()
}
