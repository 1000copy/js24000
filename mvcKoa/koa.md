koa2是expressjs原来的团队的新产品，基于es7的await、async特性，会让代码看起来没有那么的call back hell。

# demo
## 做个实验

先把代码跑起来。起步代码这样（文件名：app.js)：

	const Koa = require('koa');
	const app = new Koa();
	app.use(async (ctx, next) => {
	    await next();
	    ctx.response.type = 'text/html';
	    ctx.response.body = '<h1>Hello, koa2!</h1>';
	});
	app.listen(3000);
	console.log('app started at port 3000...');

首先安装koa2,并执行此代码：
	
	npm init -y 
	npm i  koa@2.0.0 --save
	node app.js

访问下看看效果：

	curl localhost:3000
	<h1>Hello, koa2!</h1>

## 代码解析

稍微特别的就是第三行中的async和第四行的await吧。以后的异步代码，会非常推荐这样写。非常简洁，并且易于使用。不妨自己看看await、async特性。


## 支持路由

稍微复杂一点点的web代码，都得支持路由。路由需要安装一个插件：

	npm i koa-router --save
代码：

	const Koa = require('koa');
	const router = require('koa-router')();
	const app = new Koa();
	app.use(async (ctx, next) => {
	    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
	    await next();
	});
	router.get('/hello/:name', async (ctx, next) => {
	    var name = ctx.params.name;
	    ctx.response.body = `Hello, ${name}!`;
	});
	router.get('/', async (ctx, next) => {
	    ctx.response.body = 'Index';
	});
	app.use(router.routes());
	app.listen(3000);
	console.log('app started at port 3000...');

试验一下：

	$ curl localhost:3000/hello/tj
	Hello, tj!
	$ curl localhost:3000/
	Index

# 处理URL

代码：

	const Koa = require('koa');
	const router = require('koa-router')();
	const app = new Koa();
	app.use(async (ctx, next) => {
	    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
	    await next();
	});
	router.get('/',async (ctx, next) => {
	    ctx.response.body = `<h1>Index</h1>`;
	});
	router.get('/url1', async (ctx, next) => {
	    ctx.response.body = `<h1>URL1</h1>`;
	};);
	router.post('/url2/:name', async (ctx, next) => {
	    var name = ctx.params.name;
	    ctx.response.body = `Hello, ${name}!`;
	};);
	app.use(router.routes());
	app.listen(3000);
	console.log('app started at port 3000...');

## 创建controller中间件，以便优化appjs内的代码
	
此中间件，可以把controller目录内遵照规则的js加载进来，变成一个个的URL的处理器。

	const fs = require('fs');
	class MiddleController{
	    constructor(dir){
	        let defaut = 'controllers'
	        let
	            controllers_dir = dir || defaut,
	            router = require('koa-router')();
	        this.router = router
	        this.controllers_dir = controllers_dir
	    }
	    mapFile(file) {
	        let mapping = require(file);
	        for (var url in mapping) {
	            var fn = mapping[url]
	            this.dispatch(url,fn)
	        }
	    }
	    doGet(url,fn){
	        var path = url.substring(4);
	        this.router.get(path, fn);
	        console.log(`register URL mapping: GET ${path}`);
	    }
	    doPost(url,fn){
	        var path = url.substring(5);
	        this.router.post(path, fn);
	        console.log(`register URL mapping: POST ${path}`);   
	    }
	    dispatch(url,fn){
	        if (url.startsWith('GET ')) {
	            this.doGet(url,fn)
	        } else if (url.startsWith('POST ')) {
	            this.doPost(url,fn)
	        } else {
	            console.log(`invalid URL: ${url}`);
	        }
	    }
	    run(){
	        return this.mapFiles()
	    }
	    mapFiles() {
	        for (var f of this.getFiles()) {
	            console.log(`process controller: ${f}...`);
	            
	            this.mapFile(this.getDir() +'/' + f);
	        }
	        return this.router.routes()
	    }
	    getDir(){
	        return __dirname + '/' + this.controllers_dir
	    }
	    getFiles(){
	        var dir = this.getDir()
	        var files = fs.readdirSync(dir);
	        var js_files = files.filter((f) => {
	            return f.endsWith('.js');
	        });
	        return js_files
	    }
	}
	module.exports = function (dir) {
	        var a = new MiddleController(dir)
		    return a.run();
	};

本来的appjs，需要使用controller，这样：

	const Koa = require('koa');
	const router = require('koa-router')();
	const bodyParser = require('koa-bodyparser');
	const app = new Koa();
	app.use(async (ctx, next) => {
	    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
	    await next();
	});
	app.use(bodyParser());
	app.use(controller());
	app.listen(3000);
	console.log('app started at port 3000...');

本来的处理URL的代码，放到controllers/login.js内，如下：

	var fn_index = async (ctx, next) => {
	    ctx.response.body = `<h1>Index</h1>`;
	};
	var fn_url1 = async (ctx, next) => {
	    ctx.response.body = `<h1>URL1</h1>`;
	};
	var fn_url2 = async (ctx, next) => {
	    var name = ctx.params.name;
	    ctx.response.body = `Hello, ${name}!`;
	};
	module.exports = {
	    'GET /': fn_index,
	    'GET /url1': fn_url1,
	    'GET /url2/:name':fn_url2
	};

再跑下子流程，应该可以跑就对了。

## 模板

模板引擎最常见就是输出HTML文本。使用一个模板引擎是非常简单的，只需要构造这样一个函数：

	function render(view, model) {
	    // TODO:...
	}

传递模板文件和模型，输出HTML文本。

首先，安装nunjunks
	
	npm i nunjucks --save

第一个模板程序：

	const nunjucks = require('nunjucks');
	nunjucks.configure('views', { autoescape: true });
	ctx.response.body = nunjucks.render('index.html', { name: 'Reco' });

模板文件放置于views目录下的index.html

	<h1>Hello {{ name }}</h1>

执行此js，可以输出`<h1>Hello Reco</h1>`

编写一个中间件，把render方法加入到ctx。这样用起来方便。

	const nunjucks = require('nunjucks');
	function templating(path, opts) {
		nunjucks.configure(path || 'views', opts || { autoescape: true });
	    return async (ctx, next) => {
	        ctx.render = function (view, model) {
	            ctx.response.body = nunjucks.render(view, model ||{});
	            ctx.response.type = 'text/html';
	        };
	        await next();
	    };
	}
	module.exports = templating;







