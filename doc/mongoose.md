使用Mongoose访问Mongodb，做法略不相同，需要首先创建Schema，建立Model，然后使用Model对数据库做出增删改查等类似操作。

Schema就是`模式`，它定义了数据的元数据，诸如数据的构成，每个构成项目的类型、数据的默认值等，比如我们看到这样的数据：

	{
	    name: 'Reco',
	    age: '16'
	}

则对应的Schema就是这样的：

	{
	    name: {type: String},
	    age: {type: Number},
	}

它说明了这个数据由两个字段构成，字段name的类型是string，字段age的类型是数字。基于Schema可以创建model,它被拿来做数据的管理。

	var mongoose = require('mongoose');
	(async()=>{
	    var dbf = await mongoose.connect('mongodb://localhost/example',{ useNewUrlParser: true});
	    var db = mongoose.connection;
	    db.on('error', console.error.bind(console, 'connection error:'));
	    console.log('MongoDB Opened!');
	    var UserModel = mongoose.model('UserSchema',mongoose.Schema({
		    name: {type: String},
		    age: {type: Number},
		    date: {type: Date}
		}));
	    var deleted = await UserModel.find().deleteMany()
	    console.log('deleted - ',deleted)
	    var userModel = new UserModel({name:'reco',age:16});
	    var user = await userModel.save();
	    var docs = await UserModel.find({});
	    console.log(docs)
	    var updated = await UserModel.findOne({name:"reco"}) //少写了一个await，调试半天！！！
	    console.log(updated.name)
	    updated.name = 'rita'
	    var u = await updated.save()
	    console.log(u)
	    var docs = await UserModel.find({});
	    console.log(docs)
	    db.close()// program will not exit if you don't close the connection
	})()

执行代码，可以得到如下的输出：

	MongoDB Opened!
	deleted -  { ok: 1, n: 1 }
	[ { _id: 5cb7b5a6fd40241a31c5067e, name: 'reco', age: 16, __v: 0 } ]
	reco
	{ _id: 5cb7b5a6fd40241a31c5067e, name: 'rita', age: 16, __v: 0 }
	[ { _id: 5cb7b5a6fd40241a31c5067e, name: 'rita', age: 16, __v: 0 } ]
