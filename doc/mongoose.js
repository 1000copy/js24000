var mongoose = require('mongoose');
	var dbf = mongoose.connect('mongodb://localhost/example',{ useNewUrlParser: true});
	var db = mongoose.connection;
	db.on('error', (err)=>{
	    console.error(err)
	})
	db.once('open', function (callback) {
	    console.log('MongoDB Opened!');
	    var UserSchema = mongoose.Schema({
	        name: {type: String},
	        age: {type: Number},
	        date: {type: Date}
	    });
	    var UserModel = mongoose.model('UserSchema',UserSchema);
	    var userModel = new UserModel({name:'reco',age:16});
	    var user = await userModel.save();
	    // function add(UserModel,callback){
	    //     var userModel = new UserModel({name:'reco',age:16});
	    //     userModel.save(callback);
	    // }	    
	    // function deleteUser(UserModel,callback){
	    //     // delete
	    //     UserModel.find({name:"reco"}).deleteMany().exec(callback)
	    // }
	    // function ModifyUser(UserModel,callback){
	    //     // delete
	    //     UserModel.updateOne({name:"rita"},{name:"rita1"},function(err, numberAffected, rawResponse) {
	    //         console.log(numberAffected," modified")
	    //         queryUser(UserModel,(err,docs)=>{console.log(docs)})
	    //     })
	    // }
	    // // ModifyUser(UserModel)
	    // add(UserModel,function(err,user){
	    //     console.log('user: ',user)
	    //     queryUser(UserModel,(err,docs)=>{console.log(docs)})
	    // })
	    // deleteUser(UserModel,(err)=>{
	    //     if (!err){console.log('delete many')}
	    //      queryUser(UserModel,(err,docs)=>{console.log(docs)})
	    // })
	    // queryUser(UserModel,(err,docs)=>{console.log(docs)})
	    // query
	    function queryUser(UserModel,callback){
	        var q = UserModel.find({},callback);
	    }
	});
