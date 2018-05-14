# 后端MVC框架

本文基于Koa，创建一个后端MVC框架，并附有代码在后，可以作为后端MVC的一个典型的实现，用于了解MVC的核心概念。

## 引言

典型的MVC的实践，在Web后端会更加简单。并没有什么观察者模式的需求，也不需要View和Model的双向更新，只要一次性的从Model和模板生成View即可。说到底，就是一个一锤子的买卖。

变成代码来说话，就是一个这样的渲染函数：

	render(view,model)

一般来说，view就是模板，model就是一个对象，返回的是一个HTML字符串。
比如模板文件：

	<h1>Hello {{ name }}</h1>

model对象：

   {name:"Reco"}

输出的字符串为：

	<h1>Hello Reco</h1>

## 预备知识

### 模板

渲染函数的模板化过程，有不少库可以选择，js领域可以使用nunjucks。
可以自行查阅官方网站，了解更多信息。

### 后端框架

后端框架可以使用Koa。koa2是expressjs原来的团队的新产品，基于es7的await、async特性，会让代码看起来没有那么的call back hell。
可以自行查阅官方网站，了解更多信息。并且会使用koa-router中间件以便处理url。

## 中间件

为了把模板（View）、控制器和Koa结合起来，我们需要编写两个Middleware,分别是:

	middleware/controller.js 把处理器函数和URL+Method对对应起来。
	middleware/templating.js 为上下文ctx提供一个新的render函数，可以调用它生产HTML并发送到浏览器。

### 中间件middleware/controller.js

设定所以的Controller代码都在Controller目录内，所有的Controller输出一个对象，格式为：

	{
		’get /url1‘:handler1,
		'post /url2‘:handler2,
	}

然后中间件middleware/controller.js把这些处理器函数组装到koa-router内。

### 中间件middleware/templating.js

此中间件借用nunjucks的能力，对它的渲染函数稍作包装，为ctx引入函数render。函数render会引用view目录内的模板文件，格式遵守nunjucks的模板标准。然后渲染HTML到浏览器。

## 代码

代码都在./middleware内。实例代码在controller、view内。


