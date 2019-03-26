var str = `<article class="article">
	<h1 >h1</h1>
	<pre>
		const	
	</pre>
</article>`
var p = require('node-html-parser');
const root = p.parse(str,{pre:true});
var article = root.querySelector('article.article').innerHTML
console.log(article)
//<h1>h1</h1>
// <pre></pre>

// fuck ,the package has a option  pre: false              
// retrieve content in <pre> (hurt performance slightly)
// fuck you default is false !
// 老子一步步地跟踪到这个问题，结果只是一个选项问题，脑袋有病！！