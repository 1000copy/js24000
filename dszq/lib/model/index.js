var mongoose = require('mongoose');
exports.UserModel = mongoose.model('UserSchema',mongoose.Schema({
        name: {type: String},
        pwd: {type: String},
        age: {type: Number},
        date: {type: Date}
    }));
exports.BookModel = mongoose.model('BookSchema',mongoose.Schema({
    title: {type: String},
    author: {type: String},
	height: {type: String},
	publisher:{type: String},
	genre:{type:String},
    date: {type: Date},
    mime:{type:String},
    cover:{type:Buffer}
}));