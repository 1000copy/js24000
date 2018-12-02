# Web Components 小揽

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

## 插槽

组件给用户使用的时候，一般会运行用户传递特定的参数，以便让组件更加符合自己的需求。

传递参数有几种方法，一种是通过元素的属性传递参数，一般的简单值比如数字、日期和字符串就可以此方式传递。另外就是允许传递HTML片段，这样可以传递更加复杂的内容。这个方式使用的技术是有标准的，在Web Component标准内，被称为是slot插槽，也就是大家常常说到得内容分发技术。

我们将会以Hello World为案例，讲述传参的方法。假设一个标签`<greeting-hello>`，属性传参允许指定hello的对象，像是这样：

	<greeting-hello who="world">
	<greeting-hello who="Reco">

Slot插槽传参可以传递复杂的HTML片段，像是这样：

	<greeting-hello>
		<b slot="who">Reco</b>
	</greeting-hello>

通过对任何一个元素标记属性slot，即可指定需要插入的HTML片段和它的名字（这里的片段名字叫做who），然后可以在定制元素内通过```
属性传递参数已经谈过了，这里仅仅针对插槽传递`<slot>```引用此片段：

	<slot name="who"></slot>

有了插槽技术，就无需自己编写代码，方便的引入本来在使用组件的页面内的HTML片段。具体做法随后描述。

和创建一个普通的定制元素并没什么区别，还是一样的如此：

	<script type="module">
	var template = `<h3>Hello,<slot name='who'/></h3>`
	class GreetingHello extends HTMLElement{
		constructor(){
			super()
			var shadow = this.attachShadow({mode:'open'})
			var t = document.createElement('template')
			t.innerHTML = template
			shadow.appendChild(t.content.cloneNode(true))
		}
	}
	customElements.define('greeting-hello',GreetingHello)
	</script>
	<greeting-hello><i slot="who">Reco</i></greeting-hello>

分发之后的效果等于是这样的：

	，<h3>Hello,<i>Reco</i></h3>
你会发现，在我们自己的代码中，没有任何处理slot标签的任何代码。Web Components内部已经为我们实现了自动的内容分发。让传递HTML片段到组件内变成非常方便的事情。

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
[一篇看懂vue.js内容分发 - 挚爱JavaScript - SegmentFault 思否](https://segmentfault.com/a/1190000007591093?_ea=4931344)