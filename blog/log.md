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


##  error 

Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.
includeHTML @ include.js:26

open /Applications/Google\ Chrome.app/ --args --allow-file-access-from-files

## html import ,custom element 

ref - customelement/*

## what is shadow node?

## w3-include-html 在一个文件内多次包含的话，后一个加入不了


	<div r-include="head.html" onload="doload">efg</div>
	<div r-include="blog.html" onload="doload">efg</div>

那么blog.html无法加载

原来return的位置不对，以至于循环没有完成就退出了，只能import一个html，多个就不行了。源代码在此：https://www.w3schools.com/howto/howto_html_include.asp

