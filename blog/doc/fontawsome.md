# Font Awesome 使用指南

Font Awesome （简称FA）是一套图标库，有这些优良的特性：

1. 除了让用户可以在1000多个高质量图标内选择图标之外
2. 无极缩放。 如何字体一样使用图标，指定大小即可，不必担心变大后图标变形的问题
3. 可以指定颜色，背景色，就如同字体一样

实际上，技术上来说，这套图标不再是一个个的图片，而是一套字体，如同文字一样的使用它。

## 开始使用

最简单的案例，可以使用CSS来加入图标到HTML内：

	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
	<nav>
	  <i class="fa fa-heart"></i>
	</nav>

可以查看效果，就是按钮的左边有一个心形的图标出现。如果你想单独显示一个图标，典型的做法是通过标签`<i>`来完成：

	<i class="fa fa-heart"></i>

然而`<i>`不是为了设置文字的斜体吗？是的，如今的情况，外观都习惯用CSS来完成了，之前的`i`标签作为一个指定样式的标签，是非常落寞的了，实际上大部分情况下，尽管此标签依然可以默认设置其内的文字为斜体，但是大家都不会在这样用了，此标签都已经被弃用，不如在这里重新启用它就是了。实际上，很多标签都可用来显示已图标，比如b标签。自所以使用i，因为它也可以是Icon的缩写。

我们再来看看，如果指定颜色和背景色大小：

 	 <i class="fa fa-heart" style="color:red;background: blue;font-size: 3rem"></i>

是的，它确实可以如同字体一样，指定它的这三个属性即可。要多大都可以！

如下代码中，i和b标签的斜体和粗体依然可以使用，但是设置了class后，实际的外观有CSS控制了：

	<nav>
	  <i>I am Italic</i>
	  <b>I am Bold</b>
	  <i class="fa fa-heart"></i>
	  <b class="fa fa-heart"></b>
	</nav>

另外一种用法是使用SVG的选择，FA也只是字体图标以SVG的形式出现，因为SVG是矢量图形，因此依然具备无极缩放的特点。

	<script defer src="https://use.fontawesome.com/releases/v5.1.0/js/all.js" integrity="sha384-3LK/3kTpDE/Pkp8gTNp2gR/2gOiwQ6QaO7Td0zV76UFJVhqLl4Vl3KL1We6q6wR9" crossorigin="anonymous"></script>
	<nav>
	  <i class="fa fa-heart" style="color:red;background: blue;font-size: 3rem"></i>
	</nav>

你会发现，使用SVG引用的文件，从CSS变成了JS文件，并且打开此文件，依然可以显示心形图标，但是查看元素构成会看到，i标签被替换成为SVG标签，此标签内就是一个个的绘制矢量图的SVG指令。

## FA套件内有些什么

可以从此地址下载FA套件：

	https://use.fontawesome.com/releases/v5.1.0/fontawesome-free-5.1.0-web.zip

内容如下：

	LICENSE.txt	js		metadata	sprites		webfonts
	css		less		scss		svgs

我们来看看这些目录的用途：

1. 我们使用的all.css就在css目录内，此目录内还有其他的文件，但是我们暂时不去关心它们。
2. 我们使用的all.js文件在js目录下，其他文件暂时不关心。
3. webfonts目录内放置各种格式的字体，所有的字体图标都在这里，字体是有很多标准的，但是在使用层面，我们不必关心它，因为这些字体文件是由css使用的，我们只要引用css，并且保证此目录内的文件都在就可以了。
4. svgs文件，就是我们以SVG方式使用此字体图标库的源文件，但是它也是被all.js文件使用的，我们也暂时不去关心细节内容。如果你对svg感兴趣，可以进入此目录，使用浏览器打开这些文件，浏览器可以打开这些文件，显示对应的矢量图形出来。你也可以使用文件编辑工具打开SVG文件，它们就是一些XML文件，是文本的，因此可以直接打开和阅读它们。
5. sprites目录内是把全部需要使用的svg打包到一个文件，目的是为了优化在HTTP中传输的性能，因为在HTTP中一个大文件比起分隔起来的若干小文件来说传输效率更高。
6. less和scss都是css的源代码文件，可以用来生成css文件的

## 直接使用原始字体的方法

我们可以通过CSS或者SVG+JS方式使用FA，但是，也可以直接使用字体文件，只要知道字体在文件中的代码，即可直接使用。

如下案例，我们使用WOFF字体：

	<style>
		.fa.fa-bars {
			font-size: 28px	;
			color:red;
			background: blue;
		}
		@font-face {
		font-family: FA;
		src: 
		url("./fonts/fontawesome-webfont.woff") format("woff");
		}
		.mytextwithicon {
	    position:relative;
		}    
		.mytextwithicon:before {
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

首先使用@font-face声明一个字体名称，比如FA，然后通过url指定字体文件名。之后在你需要的任何地方使用FA字体，就如同任何其他的字体比如Sans，Rome等，我们在mytextwithicon指定它会在约束的元素之前加入一个图标，图标的代码是"\f0c9"，它代表的就是一个bars的图标。代码和图标的对照表，需要看对应的字体文件说明了。

## 嵌入到Custom Element的方法

要是FA可以嵌入到HTML Custom Element内的话，就意味着可以做定制图标的控件了，这是非常好的组件化的编程，只是略微特别的是，使用Custom Element就意味着需要使用Shadow DOM，那么在HTML内引入的CSS文件是无法影响到Shadow DOM内的。想要可以发生效果，比如在Shadow DOM内再次import一次。做法如下：

	<link rel="stylesheet" href="../font/css/font-awesome.min.css">
	<template id="r-demo">
		<style>
		   @import url("../font/css/font-awesome.min.css")
		</style>
		<nav>
		  Icon:<button class="fa fa-search">Click Me!</button>
		</nav>
	</template>
	<script type="text/javascript">
	var importDoc = document.currentScript.ownerDocument;
	var proto = Object.create(HTMLElement.prototype, {
		createdCallback: {
			value: function() {
				var t = importDoc.querySelector("#r-demo");
				var clone = document.importNode(t.content, true);
				this.createShadowRoot().appendChild(clone);
			}
		}
	});
	document.registerElement("r-demo", {prototype: proto});
	</script>
	<r-demo></r-demo>

这里的关键，就是：

	@import url("../font/css/font-awesome.min.css")

有些令人意外的引入了两次，两者是同一个文件。











