##  error 

### Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.
includeHTML @ include.js:26

	--allow-file-access-from-files

### Disable Chrome strict MIME type checking

	--disable-web-security
	这个特性看来无法关闭，只有使用firefox开发一下试试了

### total chrome 

	open /Applications/Google\ Chrome.app/ --args --allow-file-access-from-files --disable-web-security

## read

	Styling Your Custom Elements 
		https://alligator.io/web-components/styling-custom-elements/
	Attributes and Properties in Custom Elements 
		https://alligator.io/web-components/attributes-properties/
	Your First Custom Element
		https://alligator.io/web-components/your-first-custom-element/
## 2018年06月21日 custom element 更加简单的测试用例

	<div><span class="red">hello {{who}}<span></div>
	<style>
		.red {color:red}
	</style

	<hello who="world"></helloworld>

## 2018年06月21日 custom element 的测试用例

在此上下文中：

  	<form class="ui form" method="post" action="/api/login" id="form">
		<div class="field required">
	        <label>用户名</label>
	        <input placeholder="用户名" type="text" name="name">
      	</div>
      	<div class="field required">
	        <label>密码</label>
	        <input placeholder="密码" type="text" name="password">
      	</div>
      	<input type="submit" class="ui button fluid" value="登录">
	</form>

这个块：

	<div class="field required">
        <label>用户名</label>
        <input placeholder="用户名" type="text" name="name" required>
  	</div>

变成这个块

	<labeledit label = "用户名" name="name"></labeledit>

上下文变成：

  	<form class="ui form" method="post" action="/api/login" id="form">
		<labeledit label = "用户名" name="name"></labeledit>
		<labeledit label = "密码" name="password"></labeledit>
      	<input type="submit" class="ui button fluid" value="登录">
	</form>

还有样式如何做？

## 2018年06月19日 如何使用js提交form，并且获取response结果？

## 2018年06月15日 装入nodejs远程mongodb内容

	app.get('/posts.json', (req, res,next) => {
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


## 2018年06月15日 装入nodejs远程json文件 

	var posts = [
		{"id":"5b1e1b63a6f55a10f4ba2121","views":22,"comments":5,"title":"title","content":"content","avatar":"avatar.png"},
	    {"id":"5b1e1b63a6f55a10f4ba2121","views":22,"comments":42,"title":"title","content":"content","avatar":"avatar.png"},
		{"id":"5b1e1b63a6f55a10f4ba2121","views":22,"comments":1,"title":"title","content":"content","avatar":"avatar.png"}
	]

	const express = require('express')
	const app = express()

	app.get('/posts.json', (req, res) => {
		res.writeHead(200, {'Content-Type': 'text/json'})
	    res.end(JSON.stringify(posts))
	})
	app.use(express.static('html'))
	app.listen(3000, () => console.log('Example app listening on port 3000!'))

## 2018年06月15日 装入本地json文件 

Initializing Vue data with AJAX

	mounted: function () {
	    var self = this;
	    $.ajax({
	        url: '/items',
	        method: 'GET',
	        success: function (data) {
	            self.items = data;
	        },
	        error: function (error) {
	            console.log(error);
	        }
	    });
	}


	https://stackoverflow.com/questions/32413905/initializing-vue-data-with-ajax

## How to use img src in vue.js? [duplicate]
	
	https://stackoverflow.com/questions/45880956/how-to-use-img-src-in-vue-js

	try : <img v-bind:src="joke.avatar" /> 
	not : <img 		  src="{{joke.avatar}}" /> 
	depends :
		joke: {
		  avatar: 'image.jpg'
		}

## 优化css

调整：

	<link rel="stylesheet" href="vendor/semantic.min.css">
	<link rel="stylesheet" href="../html/head.css">

为：

	<link rel="stylesheet" href="../html/head.css">

在head.css内倒入semantic即可：

	@import url("vendor/semantic.min.css");


## requirejs ref - ../requirejs/semantic.html

以便优化客户端js代码的样子：

	<script src  = "include.js"></script>
	<script src="http://cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
	<script src="http://cdn.bootcss.com/semantic-ui/2.1.8/semantic.min.js"></script>
	...
	<script type="text/javascript">
	   $(document).ready(function () {
		   	window.doload = function (){
				$('.ui.dropdown').dropdown();
			}
	   	  	includeHTML()
	    })
	</script>
目标是这样的：

	<script src  = "require.js" main="foo.js"></script>

foojs内则是


requirejs 在login.html内点击dropdown总是没有反应，先退回原版本再说


## html import ,custom element 

ref - customelement/*

## what is shadow node?

## w3-include-html 在一个文件内多次包含的话，后一个加入不了


	<div r-include="head.html" onload="doload">efg</div>
	<div r-include="blog.html" onload="doload">efg</div>

那么blog.html无法加载

原来return的位置不对，以至于循环没有完成就退出了，只能import一个html，多个就不行了。源代码在此：https://www.w3schools.com/howto/howto_html_include.asp

