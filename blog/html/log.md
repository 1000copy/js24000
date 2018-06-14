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

