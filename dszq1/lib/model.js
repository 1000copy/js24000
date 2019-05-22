var mongoose = require('mongoose');
exports.UserModel = mongoose.model('UserSchema',mongoose.Schema({
    username: {type: String},
    password: {type: String},
    avator:{type:Buffer}
}));
exports.BookModel = mongoose.model('BookSchema',new mongoose.Schema({
    title: {type: String},
    cover:{type:Buffer}
}));