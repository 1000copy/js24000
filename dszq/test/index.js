var mongoose = require('mongoose');
(async()=>{
    var dbf = await mongoose.connect('mongodb://localhost/dszq',{ useNewUrlParser: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    console.log('MongoDB Opened!');
    var UserModel = require('../lib/model').UserModel
    var BookModel = require('../lib/model').BookModel
    await populate(UserModel,BookModel,function(){
        db.close()
    })    
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
async function populate(UserModel,BookModel,cb){
    var deleted = await BookModel.find().deleteMany()

    const csv = require('csv-parser');  
    const fs = require('fs');

    fs.createReadStream('./books.csv')  
      .pipe(csv())
      .on('data', async(row) => {
        console.log(row)
           var bookModel = new BookModel({
                title:row.Title,
                author:row.Author,
                publisher:row.Publisher,
                genre:row.Genre,
                height:row.Height
            });
           try{
            await bookModel.save();
           }catch(e){
            console.log(e.message)
           }
      })
      .on('end', async() => {
        console.log('CSV file successfully processed');
        var b = await BookModel.find({})
        require('assert').equal(211,b.length)
        cb()
      });
}
async function populate(UserModel,BookModel,cb){
    var deleted = await BookModel.find().deleteMany()
    for (var i = 0; i < 100; i++) {
        var bookModel = new BookModel({
            title:i,
            author:"",
            publisher:"",
            genre:"",
            height:0
        });
        try{
            await bookModel.save();
        }catch(e){
           console.log(e.message)
        }    
    }
    cb()
    
}