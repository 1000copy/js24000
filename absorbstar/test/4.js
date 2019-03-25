var c = `<span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">const</span> app = express()

app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  res.send(<span class="hljs-string">'Hello World!'</span>)
})

app.listen(<span class="hljs-number">3000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Example app listening on port 3000!'</span>)
})<span class="copy-code-btn">复制代码</span>`

var TurndownService = require('turndown')

var tds = new TurndownService()
var markdowns = [
	c
]
for (var i = markdowns.length - 1; i >= 0; i--) {
	var str = markdowns[i]
	saveMarkdown('1.md',tds.turndown(str),()=>{})
}

function saveMarkdown(fn,str,callback){
	const fs = require('fs');
	fs.writeFile(fn, str, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    callback()
	}); 
}