# template element？

一个元素标签，在这个元素内可以编写的HTML文档片段。有些我们不想要在文档加载时立即渲染的文档片段就可以放到这里，在随后需要的时候，使用Javascript加载并渲染到文档内。

## 模板元素

创建如下文档，并打开它：

	<h1>Template Element</h1>
	<template>
	  <script>console.log("this will not run")</script>
	  <p>this will not show</p>
	</template>

可以看到用户界面内只是显示了：
	
	<h1>Template Element</h1>

模板内的段落没有显示，模板内的代码也没有运行。

查看Develop Tools内的Elements，可以看到`<template>`，展开后看到#document-fragment字样，继续展开此节点，在此DOM节点下有我们的template模板内容。

那么什么是`#document-fragment`字样（文档片段）呢？

## 文档片段

文档片段就是一个DOM对象，可以使用`document.createDocumentFragment()`创建文档片段。和一般的DOM对象不同的是，当此文档片段被插入到文档内，此片段的内容会立刻消失：

	var frag = document.createDocumentFragment();
	var textNode = frag.appendChild(document.createTextNode("Some text"));
	var br = frag.appendChild(document.createElement("br"));
	var body = document.body;
	body.appendChild(frag);
	alert(body.lastChild.tagName); // "BR"
	alert(body.lastChild.previousSibling.data); // "Some text"
	alert(frag.hasChildNodes()); // false

文档片段是`<template>`的底层实现技术。

有人说文档片段的特点是：

1. 它没有父亲节点，它不会成为当前活跃文档的树状结构的一部分
2. 修改这个文档片段也不会影响到当前文档的渲染，不会导致文档的重新布局
3. 插入文档片段到文档内的过程是是一次性的，会比一个个的插入单独的节点引发更少的重新布局，因此会有效率上的好处。

但是并非如此。这些特性也可以通过一般的元素标签(document.createDocument)做到。只要创建元素是插入文档就没有父亲节点，也当然不会影响到当前文档的渲染。


## 模板内容溶解

如同一般的DOM操作，可以查找到template节点，通过属性.content获得模板内容，并把这些内容插入到文档内

	<h1>Template Element</h1>
	<template>
	  <script>console.log("this will not run")</script>
	  <p>this will not show</p>
	</template>
	<script>
	  var t = document.querySelector('template')
	  document.body.appendChild(t.content)
	</script>

此时在观察DOM树，可以看到`<template>`，展开后看到`#document-fragment`字样，但是无法继续展开。就是说模板内容插入文档内后本身的文档片段已经消失，此效果被称之为是“模板的溶解”。

之所以默认溶解掉使用过的模板，想来是基于性能和降低资源消耗的考虑。

## 克服溶解

不想模板内容溶解，可以在插入文档前首先做一个克隆。为了验证此概念，假设一个案例，使用模板承载li项目，循环克隆此项目并把它加入文档的ul元素下：

	<h1>Template Element</h1>
	<ul></ul>
	<template>
	  <li>item</li>
	</template>
	<script>
	  var ul = document.querySelector('ul')
	  var li = [1,2,3,4,5]
	  for (var i = 0; i < li.length; i++) {
	  	var t = document.querySelector('template').content.cloneNode(true)
	  	t.querySelector('li').innerHTML = li[i]
	  	ul.appendChild(t)
	  }
	</script>

执行代码后，可以看到如下图5个列表项渲染出来的的用户界面。如果不克隆的话，你会遇到一个错误：

	var t = document.querySelector('template').content
	// Uncaught TypeError: Cannot set property 'innerHTML' of null

因为第二次使用模板内容的时候，模板内容已经不存在，它在第一次使用后就被溶解了。

函数`cloneNode()`就如同它的字面意义一样，去克隆一个节点，它会带有一个参数，指定拷贝自己还是包括它的全部子节点。

## ref

1. [Should I use document.createDocumentFragment or document.createElement](https://stackoverflow.com/questions/3397161/should-i-use-document-createdocumentfragment-or-document-createelement)
