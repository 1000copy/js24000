const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const config = require('config-lite')(__dirname)
const flash = require('connect-flash')

// session 中间件
app.use(session({
  name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  })
}))


var posts = [
	{"id":"5b1e1b63a6f55a10f4ba2121","views":22,"comments":5,"title":"title","content":"content","avatar":"avatar.png"},
    {"id":"5b1e1b63a6f55a10f4ba2121","views":22,"comments":42,"title":"title","content":"content","avatar":"avatar.png"},
	{"id":"5b1e1b63a6f55a10f4ba2121","views":22,"comments":1,"title":"title","content":"content","avatar":"avatar.png"}
]

const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(flash())
app.use(function (req, res, next) {
	console.log(req.session.user,req.flash('success').toString())
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})
const PostModel = require('./models/posts')
const UserModel = require('./models/users')
app.get('/api/posts', (req, res,next) => {
	// ObjectId("5b1e1b34a6f55a10f4ba211f")
	// PostModel.getPosts()
	PostModel.getPosts("5b1e1b34a6f55a10f4ba211f")
    .then(function (posts) {
    	console.log(posts)
     	res.writeHead(200, {'Content-Type': 'text/json'})
	    res.end(JSON.stringify(posts))
	 })
    .catch(function(err){console.log(err)})
})
app.post('/api/login', (req, res,next) => {
	  console.log(req.body.name,req.body.password)
      const name = req.body.name
	  const password = req.body.password
	  console.log(name,password)
	  // 校验参数
	  try {
	    if (!name.length) {
	      throw new Error('请填写用户名')
	    }
	    if (!password.length) {
	      throw new Error('请填写密码')
	    }
	  } catch (e) {
	    // req.flash('error', e.message)
	    // return res.redirect('back')
	    res.send({success:false,msg:e.message})
	    return
	  }
	  UserModel.getUserByName(name)
	    .then(function (user) {
	      if (!user) {
	        req.flash('error', '用户不存在')
	        return res.redirect('back')
	      }
	      // 检查密码是否匹配
	      const sha1 = require('sha1')
	      if (sha1(password) !== user.password) {
	        req.flash('error', '用户名或密码错误')
	        return res.redirect('back')
	      }
	      req.flash('success', '登录成功')
	      // 用户信息写入 session
	      delete user.password
	      req.session.user = user
	      console.log("user：",user)
	      // 跳转到主页
	      res.redirect('/posts')
	    })
	    .catch(next)
})
app.get('/old/posts.json', (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/json'})
    res.end(JSON.stringify(posts))
})
app.use(express.static('html'))
app.listen(3000, () => console.log('Example app listening on port 3000!'))
