var mongoose = require('mongoose')
var BookModel = require('./model').BookModel
exports.get = async function(id){
    return await BookModel.findById(id)
}
exports.borrow = async function(bookid){
    var book = await 
    BookModel.findOneAndUpdate({_id:bookid},{$set:{borrowed:true}},{new:true})
    return book
}
exports.return = async function(bookid){
    var book = await 
    BookModel.findOneAndUpdate({_id:bookid},{$set:{borrowed:false}},{new:true})
    return book
}
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
exports.list = async function(currentPage,title){
	  // console.log('into the wild')
    title = title || ''
    var pageSize = 10
    if (!currentPage)
        currentPage = 1
    try{
	    // return await BookModel.find({},[],{ skip: (currentPage - 1 )*pageSize, limit: pageSize })
	    // return await BookModel.find({},['title','cover'],{ skip: (currentPage - 1 )*pageSize, limit: pageSize })
      var re = { $regex: '.*' + title + '.*' } 
	    return await BookModel.find({title:re},[],
        { 
          skip: (currentPage - 1 )*pageSize, 
          limit: pageSize,
          sort:{title:+1}
        })
	}catch(e){
	  console.log(e)
  	}
  	return null
}
exports.pages = async function(title){
    try{
      var re = { $regex: '.*' + title + '.*' } 
      var c = await BookModel.countDocuments({title:re})
      return  Math.floor(c/10) + 1
  }catch(e){
    console.log(e)
    }
    return null
}
exports.getCover = async function(id){
    try{
      return await BookModel.findOne({_id:id},['cover'])
  }catch(e){
    console.log(e)
    }
    return null
}
