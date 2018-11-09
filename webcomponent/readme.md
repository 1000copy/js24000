# Web Components 教程

Web Components技术可以把一组相关的HTML、JS代码和CSS风格打包成为一个自包含的组件，只要使用大家熟悉的标签即可引入此组件。Web Components技术包括：

1. Custom Element
2. Shadow DOM
3. Template
4. HTML Import

四个分离而又互相关的四个构造块。其中核心的即使是Custom Element、Shadow DOM，这两个技术曾经有两个版本v0、v1，其中的v0只有chrome实现，但是其他浏览器没有跟进，因此逐步被废弃，本文讨论的是v1版本。
HTML Import曾经被Chrome加入但是随后和V0一起被废弃。这里也不会讨论它。而Template是一个支持技术，本文会使用它。

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

想要组件内部的风格不会影响到外部，办法就是使用Shadow DOM。Shadow DOM创建了一个隔离区，在这个隔离区内的DOM是独立的，这意味着：

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

## 定制元素的属性

元素的属性被称为Attribute，JS对象内的属性被称为Property。代码惯例上每一个Attribute都会有JS对象的一个Property对应。为了方便，我们希望添加的Attribute可以和JS内的Property同步。就是说，如果有人通过HTML DOM API修改了Attribute，那么我希望对于的JS属性会被同步修改；反之亦然，有人修改了Property，那么这个修改可以会同步修改到对应的Attribute。

我们以spin-button的value属性为例。定义一个普通的Property的方法是通过get/set关键字，比如定义value：

 	get value(){}
 	set value(newValue){}

随后就可以使用`object.value`访问此属性值，或者通过`object.value = newValue`为属性设置新值。可以在两个函数内通过代码设置和Attribute同步：

	get value(){
		return this.getAttribute('value') || 1
	}
	set value(v){
		this.setAttribute('value',v)
	}

这样代码内通过对属性value的访问，最后都会导致对Attribute的访问。如果有代码对Attribute访问，如何修改Attribute的同时同步更新Property呢。这就需要利用HTMLElement提供的生命周期方法了：

	static get observedAttributes() {
	  return ['value'];
	}
	attributeChangedCallback(name, oldValue, newValue) {
	  switch (name) {
	    case 'value':
	      
	      break;
	  }
	}

方法observedAttributes听过返回值声明需要观察的属性，这样就可以在指定属性清单发生更新时通过另一个生命周期方法`attributeChangedCallback`,通知代码变化的情况。做响应的同步处理。整合后的代码如下：

	var template = `
		<button inc>+</button><span>1</span><button dec>-</button>
		<style>
			span{color:red;}
			*{font-size:2rem;}
		</style>
	`
	class SpinButton extends HTMLElement{
		constructor(){
			super()
			var shadow = this.attachShadow({mode:'open'})
			var t = document.createElement('template')
			t.innerHTML = template
			shadow.appendChild(t.content.cloneNode(true))
			var b1 = shadow.querySelector('[inc]')
			var b2 = shadow.querySelector('[dec]')
			this.s = shadow.querySelector('span')
			var i = 1
			var that = this
			b1.onclick = function(){
				that.s.innerHTML = ++that.value 
			}
			b2.onclick = function(){
				that.s.innerHTML = -- that.value 
			}
		}
		static get observedAttributes() {
		  return ['value'];
		}
		attributeChangedCallback(name, oldValue, newValue) {
		  switch (name) {
		    case 'value':
		      this.s.innerHTML = newValue
		      break;
		  }
		}
		get value(){
			return this.getAttribute('value') || 1
		}
		set value(v){
			this.setAttribute('value',v)
		}
	}
	customElements.define('spin-button',SpinButton)

## 未来继续

2. Element-define content by slot 
3. style selector self by :host ,select context by :host-context

----------------------------------

# Web Components outlines

## What is Web Components
1. What is this?
2. Build Block
### Custom Element 
1. What is this?
2. Example
3. Style leaks
4. make attribute syncs to property
### Shadow DOM
1. What is this?
2. Example
3. Style not leaks
### Template
1. What is this?
2. Example
### HTML Import
1. What is this?
2. Example
## One Example through all web components
1. Inc-dec spin button <spin value=“100” step="10" min="50" max="150"></spin>
2. Element-define content by slot 
3. style selector self by :host ,select context by :host-context

## Current Status
1. version v0 v1
2. main stream browser status
## ployfills and transpiler

ref : 
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

extension for 4:

	The web has long had reusable widgets people can use when building a site. One of the most common challenges when using third-party widgets on a page is making sure that the styles of the page don’t mess up the appearance of the widget and vice-versa. This can be frustrating (to put it mildly), and leads to lots of long, overly specific CSS selectors, or the use of complex third-party tools to re-write all the styles on the page to not conflict.
	Cue frustrated developer:
	There has to be a better way…
	Now, there is!
	The Shadow DOM is not a secretive underground society of web developers, but instead a foundational web technology that lets developers create encapsulated HTML trees that aren’t affected by outside styles, can have their own styles that don’t leak out, and in fact can be made unreachable from normal DOM traversal methods (querySelector, .childNodes, etc.).

