[Express +Session实现登录验证](https://www.cnblogs.com/mingjiatang/p/7495321.html)
==============================================================================

### 1. 写在前面

当我们登录了一个网站，在没有退出登录的情况下，我们关闭了这个网站 ，过一段时间，再次打开这个网站，依然还会是登录状态。这是因为，当我们登录了一个网站，服务器会保存我们的登录状态，直到我们退出登录，或者保存的登录状态过期。那服务器是通过什么存储我们的登录状态的呢？ 答案就是Session，服务通过Session能够记录每个客户端连接的状态。关于Session的原理，在这就不多说了，本文主要介绍在 Express 框架中，如何使用 Session 来实现用户登录身份验证。

### 2. 环境配置

在Node 环境中， 并没有集成 Express 和 Session 的库，因此需要进行安装，首先进入建立一个项目目录，然后在项目根目录中，利用下面命令安装四个模块。  

1. Express。该模块能够让我们快速的搭建一个 Web 开发框架。  
2. body-parser。该模块是 Express 模块的中间件，方便我们解析浏览器发送来的 body 数据。  
3. express-session。该模块也是 Express 模块中间件，方便我们处理客户端的 session。  
4. ejs。该模块是一个渲染引擎。 方便我们将后台变量数据绑定到前台页面上。  

安装如下：

    npm install express --save
    npm install body-parser --save
    npm install express-session --save
    npm install ejs --save

### 3. 登录与验证

Session能够标记客户端在服务器上的状态。利用这一点，我们能够实现客户端的登录验证。Session登录验证的流程大致为:

1. 请求资源，发现会话内没有登录状态，则转向到登录页面
2. 登录成功。服务器需要记录保存该客户端的登录状态，并转向访问到请求的资源
3. 再次请求服务器资源时，可以根据会话存储，判断该客户端的登录状态
3.1 若登录状态有效，直接返回客户端需要的页面
3.2 若登录状态无效，则重定向到登录页面。

对于Session的过期时间，如果没有设置Session的过期时间，服务器会根据自己配置中默认有效期，将长期不与服务器交互的Session进行删除。

登录页面（login.html） 代码如下：

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <style type="text/css">    
        </style>
    </head>
    <body>
        <form action="/login" method="POST">
            UserName: <input type="text" name="username"/>  <br>
            Password: <input type="password" name="pwd"/>
            <input type="submit" value="Submit"/>
        </form>
    </body>
    </html>

主页（home.html）代码如下：

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
        <div>UserName：<span><%= username %> </span>  <a href="/logout">Log out</a></div>
    </body>
    </html>

服务器（app.js）代码如下：

    var express = require('express');
    var app = express();
    var session= require('express-session');
    var bodyparser = require('body-parser');    
    app.set('views', __dirname);
    app.set('view engine', 'html');
    app.engine('html', require('ejs').__express); 
    app.use(bodyparser.json()); 
    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(session({
        secret :  'secret', 
        resave : true,
        saveUninitialized: false, 
        cookie : {
            maxAge : 1000 * 60 * 3,
        },
    }));
    app.get('/login', function(req, res){
        res.sendFile(__dirname + '/login.html')
    });
    app.post('/login', function(req, res){
        if(req.body.username == 'admin' && req.body.pwd == 'admin123'){
            req.session.userName = req.body.username;
            res.redirect('/');
        }
        else{
            res.json({ret_code : 1, ret_msg : 'User name or password is wrong'});
        }
    });    
    app.get('/', function (req, res) {
        if(req.session.userName){
            res.render('home',{username : req.session.userName});
        }else{
            res.redirect('login');
        }
    })
    app.get('/logout', function (req, res) {
        req.session.userName = null; // 删除session
        res.redirect('login');
    });
    app.listen(3000,function () {
        console.log('http://127.0.0.1:8000')
    })

到此，session 实现登录验证就完成。上面的例子session是保存在服务内存中，当然还可以保存在文件或数据库中，只需要配置session中间件即可。

    app.use(session({
        secret: 'secretkey',
        store: new MongoStore({
            db: 'sessiondb'
        })
    }));

上面的代码则是将session保存到 MongoDB 数据库，当然Session的配置还有一些，具体参考：[https://www.npmjs.com/package/express-session](https://www.npmjs.com/package/express-session)