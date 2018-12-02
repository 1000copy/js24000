# Web Components 全揽

Web Components技术可以把一组相关的HTML、JS代码和CSS风格打包成为一个自包含的组件，只要使用大家熟悉的标签即可引入此组件。Web Components技术包括：

1. Custom Element
2. Shadow DOM
3. Template
4. HTML Import

四个分离而又互相关的四个构造块。其中核心的即使是Custom Element、Shadow DOM，顺便会讲到而Template是一个支持技术。
HTML Import曾经被Chrome加入但是随后和V0一起被废弃。这里也不会讨论它。

## Custom Element 定制元素。

定制元素可以在原生元素外创建定制元素。定制元素是Web组件的一个基本构成块。可以在一个js文件内包含Custom Element需要的全部要素，包括HTML模板、CSS Style和ES6类。并使用一个HTML文件，引用此js文件从而可以使用定制元素。

假设我们创建Spin Button，定制元素标签为:
	
	<spin-button value=“100” step="10" min="50" max="150"></spin-button>

我们首先实现此定制元素，但是为了简单起见，晚一点才看它的属性。此定制元素内部有一个加号按钮，一个减号按钮，一个span显示当前值。那么只需要把这个HTML模板组织、风格和代码组合在一个文件内：

	var template = `
		<button inc>+</button><span>1</span><button dec>-</button>
		<style>
			span{color:red;}
			*{font-size:2rem;}
		</style>
	`
	class SpinButton extends HTMLElement{
		connectedCallback(){
			this.innerHTML = template
			var b1 = this.querySelector('[inc]')
			var b2 = this.querySelector('[dec]')
			var s = this.querySelector('span')
			var i = 1
			b1.onclick = function(){
				s.innerHTML = i++
			}
			b2.onclick = function(){
				s.innerHTML = i--
			}
		}
	}
	customElements.define('spin-button',SpinButton)

并且创建一个index.html文件加载此文件，即可使用新的定制元素spin-button了：

	<script src="./spin.js"></script>
	<spin-button></spin-button>

你可以看到执行在浏览器内的界面上的两个按钮和一个span。创建一个定制元素有几个要点：

1. 新的JS定制类需要继承于类HTMLElement
2. 回调connectedCallback提供一个生命周期事件，当定制元素成功挂接到DOM后，会调用此回调，可以在此回调代码内加入自己的定制内容
3. 代码中的this，指向了此定制元素本身，因此可以通过this.innerHTML设置本定制元素的内部DOM

这样，我们创建了一个独特的定制元素，这个元素不在原生的浏览器标签内。

定制元素就是这样创建了，并且对于使用者来说，只要通过熟悉的元素标签，即可引用一组带有定制风格、操作和界面的组件了。

但是此时的定制元素有一个问题，就是它内部定义的风格，不仅仅会影响内部的元素，也会泄露到外部导致文档也被影响，从而引发我们不希望的边际效应。比如在index.html内如果在文件尾部加入这样的文本：

	<span>black</span>

你会发现black文本不是默认的颜色，而是红色，这样红色来自于定制元素内部的风格定义代码。如果希望隔离组件内的风格定义，那么可以使用Shaddow DOM技术。此主题会在下一部分内介绍。

## Shadow DOM

Web建站使用组件技术有比较长的历史了，这个技术一直以来都有一个挑战，就是如何让一个页面可以使用第三方控件，但是不会被此组件使用的CSS风格所影响。解决方案是CSS可以局部化。想要组件内部的风格不会影响到外部，办法就是使用Shadow DOM。Shadow DOM创建了一个隔离区，在这个隔离区内的DOM是独立的，这意味着：

1. 内部DOM Tree不会被外部文档访问到
2. 也不会被外部的风格设置影响
3. 内部的风格也不会影响到外部文档

我们拿前一个案例代码做实验，看看如果使用这个技术特性。

使用Shadow DOM的关键，是首先创建一个Shadow Node，整个组件内部的HTML片段都插入到此节点内，而不是直接使用组件的innerHTML。我们可以在组件对象的构造器内执行此代码：

	class SpinButton extends HTMLElement{
		constructor(){
			super()
			var shadow = this.attachShadow({mode:'open'})
			var t = document.createElement('template')
			t.innerHTML = template
			shadow.appendChild(t.content.cloneNode(true))
		}
	}

执行后，你会发现span的风格不再影响组件之外的标签。看起来还是很简单的，只要把你本来需要构造的HTML内部DOM插入到shadow节点内即可。


## 状态

Web Components的关键构成技术包括Custom Element和Shadow DOM，最早在Chrome实现，第一个版本被称为V0但是其他浏览器没有跟进，因此逐步被废弃。本文讨论的是V1版本。Firefox也已经实现了V1版本。
可以在网站[Whatcaniuse](https://caniuse.com/#search=custom%20element)查询当前支持状态。

## ref 
1. Posts of wb 
https://alligator.io/web-components/
2. Custom Elements v1: Reusable Web Components 
https://developers.google.com/web/fundamentals/web-components/customelements?authuser=0
*3. web-components-examples
https://github.com/mdn/web-components-examples/blob/master/README.md
4. Firefox 63 – Tricks and Treats!
https://hacks.mozilla.org/2018/10/firefox-63-tricks-and-treats/
5.  HTML Web Component using Plain JavaScript
https://www.codementor.io/ayushgupta/vanilla-js-web-components-chguq8goz
*6*. Doing something with Web Components
https://medium.com/@dalaidunc/doing-something-with-web-components-40b1a1700c32

