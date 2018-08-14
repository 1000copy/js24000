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
  // console.log(req.session.user,req.flash('success').toString())
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})
const PostModel = require('./models/posts')
const UserModel = require('./models/users')
var loginStatus = {
  checkLogin: function checkLogin (req, res, next) {
  	if (!req.session.user) {
        return res.send({success:false,needlogin:true})
        // return res.redirect('/login.html')
    }
    next()
  },

  checkNotLogin: function checkNotLogin (req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录')
      return res.redirect('back')// 返回之前的页面
    }
    next()
  }
}

app.get('/api/posts',loginStatus.checkLogin, (req, res,next) => {
	var uid = req.session.user._id
	PostModel.getPosts(uid)
    .then(function (posts) {
    	// console.log(posts)
     	res.writeHead(200, {'Content-Type': 'text/json'})
     	var data = {success:true,data:posts}
     	res.end(JSON.stringify(data))
	 })
    .catch(function(err){console.log(err)})
})
app.post('/api/login', (req, res,next) => {
	  // console.log(req.body.name,req.body.password)
      const name = req.body.name
	  const password = req.body.password
	  // console.log(name,password)
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
	      try{
		      if (!user) {
		        throw new Error('用户不存在')
		      }
		      // 检查密码是否匹配
		      const sha1 = require('sha1')
		      // if (sha1(password) !== user.password) {
		      // console.log(password,user.password,sha1(password))
		      // if (password !== user.password) {	
		      if (false) {	
		      	throw new Error('用户名或密码错误')
		      }
		  }catch(e){
		  	  return res.send({success:false,msg:e.message})
		  }
	      // 用户信息写入 session
	      delete user.password
	      req.session.user = user
	      // console.log("user：",user)
	      // 跳转到主页
	      // res.redirect('/posts')
	      res.send({success:true,msg:'登录成功'})
	    })
	    .catch(next)
})
app.post('/api/logon', (req, res,next) => {
  const name = req.body.name
  const gender = req.body.gender
  const bio = req.body.bio
  const avatar = req.files.avatar.path.split(path.sep).pop()
  let password = req.body.password
  const repassword = req.body.repassword

  // 校验参数
  try {
    if (!(name.length >= 1 && name.length <= 10)) {
      throw new Error('名字请限制在 1-10 个字符')
    }
    if (['m', 'f', 'x'].indexOf(gender) === -1) {
      throw new Error('性别只能是 m、f 或 x')
    }
    if (!(bio.length >= 1 && bio.length <= 30)) {
      throw new Error('个人简介请限制在 1-30 个字符')
    }
    if (!req.files.avatar.name) {
      throw new Error('缺少头像')
    }
    if (password.length < 6) {
      throw new Error('密码至少 6 个字符')
    }
    if (password !== repassword) {
      throw new Error('两次输入密码不一致')
    }
  } catch (e) {
    // 注册失败，异步删除上传的头像
    fs.unlink(req.files.avatar.path)
    return res.send({success:false,msg:e.message})
    // return res.redirect('/signup')
  }

  // 明文密码加密
  password = sha1(password)

  // 待写入数据库的用户信息
  let user = {
    name: name,
    password: password,
    gender: gender,
    bio: bio,
    avatar: avatar
  }
  // 用户信息写入数据库
  UserModel.create(user)
    .then(function (result) {
      // 此 user 是插入 mongodb 后的值，包含 _id
      user = result.ops[0]
      // 删除密码这种敏感信息，将用户信息存入 session
      delete user.password
      req.session.user = user
      return res.send({success:true,redirect:"/posts.html"})
      // req.flash('success', '注册成功')
      // res.redirect('/posts')
    })
    .catch(function (e) {
      // 注册失败，异步删除上传的头像
      fs.unlink(req.files.avatar.path)
      // 用户名被占用则跳回注册页，而不是错误页
      if (e.message.match('duplicate key')) {
        return res.send({success:false,msg:"用户名已经占用"})
      }
      next(e)
    })
})
app.post('/api/create', (req, res,next) => {
	  // console.log(req.body.name,req.body.password)
	  const author = req.session.user._id
      const title = req.body.title
	  const content = req.body.content
	  // 校验参数
	  try {
	    if (!title.length) {
	      throw new Error('请填写标题')
	    }
	    if (!content.length) {
	      throw new Error('请填写内容')
	    }
	  } catch (e) {
	    res.send({success:false,msg:e.message})
	    return
	  }
	  let post = {
	    author: author,
	    title: title,
	    content: content
	  }
	  PostModel.create(post)
	    .then(function (result) {
	      // 此 post 是插入 mongodb 后的值，包含 _id
	      post = result.ops[0]
	      // req.flash('success', '发表成功')
	      // 发表成功后跳转到该文章页
	      // res.redirect(`/posts/${post._id}`)
	      res.send({success:true,redirect:"/posts.html"})
	    })
	    .catch(next)
})
app.get('/api/post',(req, res) => {
	  res.send({success:true,data:[{title:"foo",content:"bar"}]})
})
app.ge
app.get('/api/signout', loginStatus.checkLogin,(req, res) => {
	  req.session.user = null
	  // 登出成功后跳转到主页
	  res.redirect('/login.html')
})
app.get('/old/posts.json', (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/json'})
    res.end(JSON.stringify(posts))
})
app.use(express.static('html'))
// 次序很重要啊，是不是，放在前面会出现Error: Can't set headers after they are sent.
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'), // 上传文件目录
  keepExtensions: true// 保留后缀
}))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
