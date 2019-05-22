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
exports.BorrowModel = mongoose.model('BorrowSchema',new mongoose.Schema({
    comment: {type: String},
    userid : {type:mongoose.Schema.Types.ObjectId},
    bookid : {type:mongoose.Schema.Types.ObjectId},
    date:{ type: Date, default: Date.now }
}));