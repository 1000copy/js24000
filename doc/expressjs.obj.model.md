# 关于express对象模型的图

路由功能是expressjs中的一个核心的功能，也是最为复杂的代码块。分析此代码块的难点是其中三个类的关系，已经它们如何协作完成路由的存储和解析。本文试图通过几个典型的路由设置场景的代码，以及代码运行后产生的对象模型，以案例来来分析其路由功能。

## 一些class的概念

路由代码中涉及到主要文件共有3个。

layer.js：定义中间件的基本数据结构
route.js：定义express的路由中间件Route;
index.js：定义一个中间件容器，也就是Router对象，用来存放路由中间件(Route)以及其他功能中间件

## app.METHOD对象模型分析

作为expressjs的用户，可以这样构建路由：
	
	const express = require('express')
	const app = express()
	app.get('/foo', function (req, res, next) {
	  res.end('Welcome to GET1 /foo')
	}，function (req, res, next) {
	  res.end('Welcome to GET2 /foo')
	})
	app.get('/bar', function (req, res, next) {
	  res.end('Welcome to GET /bar')
	})
	app.post('/foo', function (req, res, next) {
	  res.end('Welcome to POST /foo')
	})
	console.log(require('util').inspect(app._router.stack, {showHidden: false, depth: null}))
	app.listen(3000)

app.get类型的方法，我们统称为app.METHOD类的方法，除了get外，还可以使用post，delete，put等等。此类函数，都可以跟着参数：

1. path，路径参数，比如例子中的foo，bar等。指定需要匹配的路径。
2. function()类函数，指定匹配路径后需要执行的处理器（handle）。

在代码中，它们执行后，会如何以对象模型形式去表达它们呢。答案是使用了如下的对象：

1. App。应用对象，其实就是./lib/express.js文件。此对象内有一个Router对象，实例为this._router
2. Router。expressjs以lazy加载的方式加载它，直到第一个app.methed调用才创建此实例。其中的一个重要属性是stack，内部是由Layer的集合构成的。
2. Layer。代表路径和处理器。分别有两个关键属性代表，它们是handle和regexp，regexp为路径的正则表达式，目的是为了不仅仅可以匹配，还可以支持路径参数。
3. Route。代表路由中间件，关键属性为stack和path。stack是一个堆栈，内部是由Layer的集合构成的。path执行的就是带匹配的路径。

其中的Router和Route，都有一个stack属性，内部元素也都是Layer类型。而Layer内的handle属性可以是route.dispatch函数，也可说是Router对象。如果是Router对象的话，就可以在此层级重复app内的对象模型。这句话暂时看不懂也没有关系，后面的代码和对象模型会帮着你懂的。

以当前代码为了，执行完毕后，会形成如下的对象模型图：

	[ Layer {
	    handle: [Function: bound ],
	    name: 'bound ',
	    keys: [],
	    regexp: { /^\/foo(?:\/)?$/i fast_star: false, fast_slash: false },
	    route: 
	     Route {
	       path: '/foo',
	       stack: 
	        [ Layer {
	            handle: [Function],
	            name: '<anonymous>',
	            keys: [],
	            regexp: { /^\/(?:\/)?$/i fast_star: false, fast_slash: true },
	            method: 'get' },
	          Layer {
	            handle: [Function],
	            name: '<anonymous>',
	            keys: [],
	            regexp: { /^\/(?:\/)?$/i fast_star: false, fast_slash: true },
	            method: 'get' } ],
	       methods: { get: true } } },
	  Layer {
	    handle: [Function: bound ],
	    name: 'bound ',
	    keys: [],
	    regexp: { /^\/bar(?:\/)?$/i fast_star: false, fast_slash: false },
	    route: 
	     Route {
	       path: '/bar',
	       stack: 
	        [ Layer {
	            handle: [Function],
	            name: '<anonymous>',
	            keys: [],
	            regexp: { /^\/(?:\/)?$/i fast_star: false, fast_slash: true },
	            method: 'get' } ],
	       methods: { get: true } } },
	  Layer {
	    handle: [Function: bound ],
	    name: 'bound ',
	    keys: [],
	    regexp: { /^\/foo(?:\/)?$/i fast_star: false, fast_slash: false },
	    route: 
	     Route {
	       path: '/foo',
	       stack: 
	        [ Layer {
	            handle: [Function],
	            name: '<anonymous>',
	            keys: [],
	            regexp: { /^\/(?:\/)?$/i fast_star: false, fast_slash: true },
	            method: 'post' } ],
	       methods: { post: true } } } ]

案例代码中：

1. 共3个app.METHOD调用，对应到对象模型内，就是一个数组，内部有3个元素，每个元素对应代码中的app.METHOD调用。
2. 其中的第一个调用，针对一个path有两个处理器，这两个处理器是放置到Router.stack[].Layer.route.stack[].Layer.handle内的。
3. 既然按照前一条，处理器都已经稳妥的存到了Router.stack[].Layer.route.stack[].Layer.handle内，那么Router.stack[].Layer.handle内存放的什么呢。看代码是route.dispatch函数，有它负责执行一个或者多个处理器。
4. Layer.regexp存储的是path的正则表达式变形。使用regexp而不是直接使用path，是因为regexp不但可以做匹配，还可以支持参数。

Layer.regexp使用库代码path-to-regexp获得，比如：

	const pathRegexp = require('path-to-regexp')
	console.log(pathRegexp("/foo"))
	console.log(pathRegexp("/"))

输出：

	/^\/foo(?:\/)?$/i
	/^\/(?:\/)?$/i
	
	
就是说，在第一个Layer内的regexp: { /^\/foo(?:\/)?$/i ，其实就是/foo的正则表达式形式。而每个router[].layer.route.layer.regexp则是”/“的正则表达式形式。Layer被用到两个场景下，一个是装载路径正则表达式和一个统一的分发函数，另外一个则是装载了固定的”/“的正则表达式，和一个特定的用户的处理器。两个概念，却使用了一个类。两个重要属性(regexp,handle)，各自使用了其中一个,另外一个是系统构建生成的。依我看，第一个Layer改成Matcher更好：）。

对象模型出来了，匹配过程也就比较容易理解了。当请求来到时：

1. 使用请求的路径，和router.stack内的Layer匹配
2. 匹配到的Layer，执行Layer.hander，也就是Route.dispatch函数
3. Route.dispatch函数在自己的stack内匹配执行其中的layer.handle ，也就是用户定义的处理器函数

## app.use对象模型分析

除了app.METHOD外，还可以使用app.use添加中间件，像是这样：

	var express = require('express');
	var app = express();
	app.use(function (req, res, next) {
	  console.log('Time:', Date.now());
	  next();
	});
	app.get("/foo",function (req, res, next) {
	  console.log('Time:', Date.now());
	  next();
	});
	console.log(require('util').inspect(app._router.stack, {showHidden: false, depth: null}))
	console.log(app._router.stack[2].toString())
	app.listen(3000)

默认`app._router.stack`就有两个内置的中间件分别为query和expressInit。这两个我们并不关心，我们关心的是第三个，也就是我们在use中添加的用户自定义中间件。
输出是这样的：

	Layer {
	  handle: [Function],
	  name: '<anonymous>',
	  params: undefined,
	  path: undefined,
	  keys: [],
	  regexp: { /^\/?(?=\/|$)/i fast_star: false, fast_slash: true },
	  route: undefined }

就是说，在use的情况下，只要Layer就足够表达它的对象模型了，根据use内handle的数量，有几个handle，那么就有几个Layer。

## Router，一个微应用

可以创建Router，并且把这个Router挂接到一个app内，在Router内可以像是app一样的调用use和get方法。


	var express = require('express')
	var router = express.Router()
	// middleware that is specific to this router
	router.use(function timeLog (req, res, next) {
	  console.log('Time: ', Date.now())
	  next()
	})
	// define the home page route
	router.get('/', function (req, res) {
	  res.send('Birds home page')
	})
	// define the about route
	router.get('/about', function (req, res) {
	  res.send('About birds')
	})
	app.use('/birds', birds)
	console.log(require('util').inspect(app._router.stack[3], {showHidden: false, depth: null}))
	app.listen(3000)

输出结果为：

	Layer {
	  handle: 
	   { [Function: router]
	     params: {},
	     _params: [],
	     caseSensitive: undefined,
	     mergeParams: undefined,
	     strict: undefined,
	     stack: 
	      [ Layer {
	          handle: [Function: timeLog],
	          name: 'timeLog',
	          params: undefined,
	          path: undefined,
	          keys: [],
	          regexp: { /^\/?(?=\/|$)/i fast_star: false, fast_slash: true },
	          route: undefined },
	        Layer {
	          handle: [Function: bound dispatch],
	          name: 'bound dispatch',
	          params: undefined,
	          path: undefined,
	          keys: [],
	          regexp: { /^\/?$/i fast_star: false, fast_slash: false },
	          route: 
	           Route {
	             path: '/',
	             stack: 
	              [ Layer {
	                  handle: [Function],
	                  name: '<anonymous>',
	                  params: undefined,
	                  path: undefined,
	                  keys: [],
	                  regexp: { /^\/?$/i fast_star: false, fast_slash: false },
	                  method: 'get' } ],
	             methods: { get: true } } },
	        Layer {
	          handle: [Function: bound dispatch],
	          name: 'bound dispatch',
	          params: undefined,
	          path: undefined,
	          keys: [],
	          regexp: { /^\/about\/?$/i fast_star: false, fast_slash: false },
	          route: 
	           Route {
	             path: '/about',
	             stack: 
	              [ Layer {
	                  handle: [Function],
	                  name: '<anonymous>',
	                  params: undefined,
	                  path: undefined,
	                  keys: [],
	                  regexp: { /^\/?$/i fast_star: false, fast_slash: false },
	                  method: 'get' } ],
	             methods: { get: true } } } ] },
	  name: 'router',
	  params: undefined,
	  path: undefined,
	  keys: [],
	  regexp: { /^\/birds\/?(?=\/|$)/i fast_star: false, fast_slash: false },
	  route: undefined }

在代码`app.use('/birds', birds)`中，把birds作为一个Layer装入到app.stack内，在此Layer元素中，handle指向的是一个Router对象，此Router对象内的结构是Layer-route-Layer的3个层次结构，因此和app是完全的一样的路由结构。也就是这个原因，Router常常被称为以mini app。

了解了数据结构，再去看express的源代码，会起到事半功倍的效果。

## 改进设想

我认为Router、Layer、Route的结构，非常容易令代码分析者困惑。不如改成这样的一个类更好
	
	class Route:
		this.method:string
		this.handles:[Route|function(req,res,next)]
		this.path:string

此类为递归类，在handles元素内，可以是一个类型为function(req,res,next)的函数，也可以是一个Route。这样和代码的对应关系更加直接了当，并且没有那么多的概念混淆。
