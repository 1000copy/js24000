var express = require('express')
var userRouter = express.Router()
var bodyparser = require('body-parser')
var User = require('../lib/user')
// 1. 用户注册表单 `GET /registion`
userRouter.get('/registration',function(req,res){
	res.render('registration.html',{})
})
// 2. 用户注册 `POST /registion`

userRouter.post('/registration',bodyparser.urlencoded({ extended: true }),function(req,res){
	var user = req.body
	if(user.password == undefined || user.passwordAgain == undefined || user.username == undefined){

	}
	if(user.password != user.passwordAgain){

	}
	User.save(user)
	res.redirect('/user/login')
})
// 3. 用户登录表单 `GET /login`
userRouter.get('/login',function(req,res){
	res.render('login.html',{})
})
// 4. 用户登录 `POST /login`
userRouter.post('/login',bodyparser.urlencoded({ extended: true }),async function(req,res){
	var result = await User.login(req.body)
	if (result){
		// console.dir(await User.getByName(req.body.username))
		req.session.user = await User.getByName(req.body.username)
		res.redirect('/')
	}else
		res.send('login failure')
})
// 5. 上传头像表单`GET /avatar`
userRouter.get('/avatar',function(req,res){
	res.render('avatar.html',{})
})
// 6. 上传头像`POST /avatar`
var busboy = require('connect-busboy')
userRouter.post('/avatar',busboy(),async function(req,res){
	try{
		// console.log('into the wild')
		var answer = await new Promise(function (resolve,rj){
			  var fields = {}
			  var buffers = []
			  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
			  	console.log('into the file')
			  	file.on('data',function(chunk){
			  		buffers.push(chunk)
			  		// console.log('into the data')
			  	})
			  	file.on('limit', function(data) {                                               
				    rj('limits exceed')
				});
			  	file.on('end',async function(){
			  		// console.log('into the end')
			  		var ans = Buffer.concat(buffers)
			  		fields[fieldname] = ans
			  	    resolve(fields)
			  	})
			  });
			  req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
			    fields[key] = value
			  });
			  // console.log('into the pipe')
			  req.pipe(req.busboy);	
			})
		
		await User.changeAvatar(req.session.username,answer)
		res.send('change ok')
	}catch(e){
		console.log(e)
	}

})
userRouter.get('/logout',function(req,res){
	req.session.user = null
	res.redirect('/')
})
// 7. 查看profile `GET /:id`
userRouter.get('/profile',async function(req,res){
	res.render('profile.html',{username:req.session.username,hasAvatar:User.hasAvatar(req.session.username)})
})
// 必须是扩展名svg，否则会导致浏览器下载而不是显示此文件
userRouter.get('/avataricon.svg',async function(req,res){
	// var fs = require('fs');
	// res.send(fs.readFileSync('./public/img/avatar-default.svg'))
	var avatar = await User.getAvatar(req.session.username)
	// res.setHeader('Content-Type','image/svg+xml')//image/svg+xml
	// res.setHeader('FX-XContent-Type','image/svg+xml')//image/svg+xml
	res.writeHead(200, {'Content-Type': 'image/svg+xml'});
	// what is diference of setHeader and writeHead
	// 如果是setHeader，浏览器还是要下载的！
	res.end(avatar)
})

module.exports = userRouter