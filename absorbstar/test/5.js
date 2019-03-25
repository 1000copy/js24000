var c = `<h1 data-v-f9ae5008="" class="article-title">express 源码阅读</h1><div data-v-f9ae5008="" data-id="59c0ef746fb9a00a562e7d78" itemprop="articleBody" class="article-content"><h2 id="1-" data-id="heading-0">1. 简介</h2>
<p>这篇文章主要的目的是分析理解express的源码，网络上关于源码的分析已经数不胜数，这篇文章准备另辟蹊径，仿制一个express的轮子，通过测试驱动的开发方式不断迭代，正向理解express的代码。</p>
<p>这篇文章中的express源码是参考官网最新版本（v4.15.4），文章的整体思路是参考早期创作的<a href="https://link.juejin.im?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000005833119" target="_blank" rel="nofollow noopener noreferrer">另一篇文章</a>，这篇算是其升级版本。</p>
<p>如果你准备通过本文学习express的基本原理，前提条件最好有一定的express使用经验，写过一两个基于express的应用程序，否则对于其背后的原理理解起来难以产生共鸣，不易掌握。</p>
<p>代码链接：<a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2FWangZhechao%2Fexpross" target="_blank" rel="nofollow noopener noreferrer">github.com/WangZhechao…</a></p>
<h2 id="2-" data-id="heading-1">2. 框架初始化</h2>
<p>在仿制express框架前，首先完成两件事。</p>
<ul>
<li>确认需求。</li>
<li>确认结构。</li>
</ul>
<p>首先确认需求，从express的官方网站入手。网站有一个Hello world 的事例程序，想要仿制express，该程序肯定需要通过测试，将改代码复制保存到测试目录<code>test/index.js</code>。</p>
<pre><code class="hljs javascript copyable"><span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">const</span> app = express()

app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  res.send(<span class="hljs-string">'Hello World!'</span>)
})

app.listen(<span class="hljs-number">3000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Example app listening on port 3000!'</span>)
})<span class="copy-code-btn">复制代码</span></code></pre><p>接下来，确认框架的名称以及目录结构。框架的名称叫做<`

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