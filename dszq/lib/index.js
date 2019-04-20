var mongoose = require('mongoose');
(async()=>{
    var dbf = await mongoose.connect('mongodb://localhost/dszq',{ useNewUrlParser: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    console.log('MongoDB Opened!');
    var UserModel = mongoose.model('UserSchema',mongoose.Schema({
        name: {type: String},
        age: {type: Number},
        date: {type: Date}
    }));
    var BookModel = mongoose.model('BookSchema',mongoose.Schema({
        name: {type: String},
        author: {type: Number},
        date: {type: Date}
    }));
    await populate(UserModel,BookModel)    
    db.close()// program will not exit if you don't close the connection
})()
async function populate(UserModel,BookModel){
    var deleted = await UserModel.find().deleteMany()
    var deleted = await BookModel.find().deleteMany()
    var userModel = new UserModel({name:'reco',age:16});
    var user = await userModel.save();
    var books = [
        'vue.js little book',
        "swift little book",
        "http little book",
        "git little book"]
    var repeats = [1,2,3,4,5,6,7,8,9]
    for (var j = repeats.length - 1; j >= 0; j--) {
        for (var i = books.length - 1; i >= 0; i--) {
            var book = books[i]
            var bookModel = new BookModel({name:book + i*j,author:UserModel._id});
            var bookModel = await bookModel.save();
        }    
    }
    var docs = await UserModel.find({})
    require('assert').equal(1,docs.length)
    var b = await BookModel.find({})
    require('assert').equal(36,b.length)
}
async function populate(UserModel,BookModel){
    var deleted = await UserModel.find().deleteMany()
    var deleted = await BookModel.find().deleteMany()
    var userModel = new UserModel({name:'reco',age:16});
    var user = await userModel.save();
    for (var i = 50; i >= 0; i--) {
        var bookModel = new BookModel({name:i,author:UserModel._id});
        var bookModel = await bookModel.save();
    }    
    var docs = await UserModel.find({})
    require('assert').equal(1,docs.length)
    var b = await BookModel.find({})
    require('assert').equal(51,b.length)
}