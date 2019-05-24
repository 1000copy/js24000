module.exports = function(){
	var mongoose = require('mongoose')
	var dbf = mongoose.connect('mongodb://localhost/dszq',{ useNewUrlParser: true});
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	var session = require('express-session')
	var mongoose = require('mongoose')
	var MongoStore = require('connect-mongo')(session)
	var express = require('express')
	var app = express()
	app.use(express.static('public'))
	// session
	var sess = session({
		secret: '076ee61d63aa10a125ea872411e433b9',
		maxAge: new Date(Date.now() + 3600000),
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
		resave:true,
		saveUninitialized:false,
	})
	app.use(sess)
	app.set('views', __dirname+"/view");
	app.set('view engine', 'html');
	app.engine('html', require('ejs').__express); 
	return app
	// memory session
	// app.use(session({
	// 	secret:"reco&rita",
	// 	resave:true,
	// 	saveUninitialized:false,
	// 	cookie:{
	// 		maxAge:1000*60*3
	// 	}}))

}