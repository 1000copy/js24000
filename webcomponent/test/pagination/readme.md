# 开发日志

## 很好的分页器源代码

好就好在，和UI无关的算法部分，真是我喜爱和需要的。

[very good pagination ](http://jasonwatmore.com/post/2018/08/07/javascript-pure-pagination-logic-in-vanilla-js-typescript) 

## 事件分发的方法

在自定义的HTML元素内加入时间，比如onrollpage="onRollPage",可以使用eval求知的方法，或者使用：

	window[document.getAttribute("onrollpage")]

使用window查询函数存在的方式，更加安全和可靠。细节参考：

 [转换字符串到函数的方法](https://stackoverflow.com/questions/773184/get-javascript-function-object-from-its-name-as-a-string)


## 避免CORS错误

在使用Chrome打开一个index.html，其内使用了ES6Module的话：

	<script type="module">
	   import './index.js'
	</script>

Chrome活提示CORS错误，并要求必须使用一个本地开发服务器来serve这两个文件。这样也太麻烦了。所幸的是，Firefox没有这样的限制，以为概要Firefox做WebComponent开发，是一个不错的选择。

## TODO

分发事件可以使用fireEvent，CreateEvent等系列函数，看起来比较高大上，我以前没有用过，确实可以用，但是细节还不清晰，晚点或许去研究下。
