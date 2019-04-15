var str = `<article class="article">
	<h1 >h1</h1>
	<pre>
		const	
	</pre>
</article>`
const cheerio = require('cheerio')
const $ = cheerio.load(str)
var article = $('article.article').html()
console.log(article)