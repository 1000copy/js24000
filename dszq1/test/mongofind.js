// 错误代码赏析，只要加入一个；在第二行最后即可解决
var mongoose = require('mongoose')
var BookModel = require('../lib/model').BookModel
(async function(currentPage){
	console.log('into the wild')
    var pageSize = 10
    if (!currentPage)
        currentPage = 1
    try{
	    // return await BookModel.find({},[],{ skip: (currentPage - 1 )*pageSize, limit: pageSize })
	    // return await BookModel.find({},['title','cover'],{ skip: (currentPage - 1 )*pageSize, limit: pageSize })
	    return await BookModel.find({},['title'])
	}catch(e){
	  console.log(e)
  	}
  	return null
})()
