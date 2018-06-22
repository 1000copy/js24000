## 2018年06月22日 稍微回顾下今日的工作

1. 想要使用Custom Element + shadow DOM的方式（like counterdemo.html)做一个dropmenu。因为这样就比一般的html更加模块化。

2. 在做的过程中，发现本来在html内正常的显示的icon bars，在此模式下就是无法显示，然后发现字体文件并没有如同html方式那样被加载。也没有任何报错。就像dropmenu目录内展示的那样。

3. 于是就想着，要搞明白为什么semantic.css加载时如何加载的font文件。参考font目录
4. font文件，可以通过css加载，

	<link rel="stylesheet" href="./css/font-awesome.min.css">
	<i class="fa fa-bars">fa-camera-retro</i> 

或者自己编写css去加载。像是这样。如下代码，暂时了font awesome.css内部的实现机制：

	<style>
		.fa.fa-bars {
			font-size: 28px	;
			color:red;
			background: blue;
		}
		@font-face {
		font-family: "FA";
		src: url("./fonts/fontawesome-webfont.eot");
		src: 
		url("./fonts/fontawesome-webfont.woff") format("woff"),
		url("./fonts/FontAwesome.otf") format("opentype"),
		url("./fonts/fontawesome-webfont.svg#filename") format("svg");
		}
		.mytextwithicon {
	    position:relative;
		}    
		.mytextwithicon:before {
			/* this is your text. You can also use UTF-8 character codes as I do here */
		    content: "\f0c9";  
		    font-family: FA;
		    font-size: 18px;
		    left:-5px;
		    position:absolute;
		    top:0;
		 }
	</style>
	<span class = "mytextwithicon"></span><br/>
	<i class = "mytextwithicon"></i>

5. 所以，干脆自己做一套css框架？

	https://www.quora.com/Whats-the-best-CSS-framework-for-2018

6. 感觉心累。！！！

## use font by raw css 

google : How to Add Custom Font to Website through @fontface?
error google: Octal literals are not allowed in strict mode
googel : Use Font Awesome Icons in CSS


## use font by font awesome css 



下载： http://fontawesome.dashgame.com/

github : https://github.com/FortAwesome/Font-Awesome

## 
## 暂时避开dropmenu的问题

	 <div class="ui  simple dropdown " tabindex="0">

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

