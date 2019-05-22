(async()=>{
	try{
	var mongoose = require('mongoose');
	await (()=>{
		mongoose.connect('mongodb://localhost:27017/dszq',{useNewUrlParser: true});
		return new Promise(function(resolve,reject){
			mongoose.connection.on('open', function(){
				resolve()
			})		
		})
	})()
	var Schema = mongoose.Schema;
	// var Bookschema = new Schema({
	var Bookschema = Schema({
	     cover: Buffer, title: String 
	});
	var Book = mongoose.model('bookschemas', Bookschema);
	// await Book.deleteMany({})
	// var books =  await Book.find({},['title'])
	var books =  await Book.find({},['title','cover'])
	// delete books[0].cover 
	console.log(books[0].cover)
	books[0].cover = ''
	console.log(books[0]._id)
	console.log(books[0].title)
	console.log(typeof books[0])
	console.dir(books)
	console.log( books[0]) 
	// 无法想象是console.log这么常用的函数报错
	// RangeError invalid count value
	mongoose.disconnect()
}catch(e){console.log(e)}
})()

// setTimeout(function(){},3000)