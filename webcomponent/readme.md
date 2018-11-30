# reading 

https://developers.google.com/web/fundamentals/web-components/shadowdom
https://alligator.io/web-components/composing-slots-named-slots/
https://www.hongkiat.com/blog/html-template-slow-tag-shadow-dom/
https://www.codementor.io/ayushgupta/vanilla-js-web-components-chguq8goz
https://medium.com/@dalaidunc/doing-something-with-web-components-40b1a1700c32

# reading

## read: https://webkit.org/blog/4096/introducing-shadow-dom-api/

slot.1 https://codepen.io/1000copy/pen/LXMNyq?editors=1010
slot.2 https://codepen.io/1000copy/pen/VVqaXo?editors=1011
slot.3 https://codepen.io/1000copy/pen/YRddjv

# Style Isolation

One major benefit of using shadow DOM is style isolation. To see how, let’s say we want to create a custom progress bar. We can use two nested div’s to show the bar and another div with the text to show the percentage as follows:

	<style>
	.progress { position: relative; border: solid 1px #000; padding: 1px; width: 100px; height: 1rem; }
	.progress > .bar { background: #9cf; height: 100%; }
	.progress > .label { position: absolute; top: 0; left: 0; width: 100%;
	    text-align: center; font-size: 0.8rem; line-height: 1.1rem; }
	</style>
	<template id="progress-bar-template">
	    <div class="progress" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
	        <div class="bar"></div>
	        <div class="label">0%</div>
	    </div>
	</template>
	<script>
	function createProgressBar() {
	    var fragment = document.getElementById('progress-bar-template').content.cloneNode(true);
	    var progressBar = fragment.querySelector('div');
	    progressBar.updateProgress = function (newPercentage) {
	        this.setAttribute('aria-valuenow', newPercentage);
	        this.querySelector('.label').textContent = newPercentage + '%';
	        this.querySelector('.bar').style.width = newPercentage + '%';
	    }
	    return progressBar;
	}
	var p =  createProgressBar()
	document.body.appendChild(p)
	p.updateProgress(22)
	</script>

Note the use of the template element, which allows authors to include a snippet of HTML that can be instantiated later by cloning the content.A template element can appear anywhere in a document (e.g. between table and tr elements), and content inside template elements is inert and does not run scripts or load images and other types of subresources.

The problem with this progress bar implementation is that its two internal divs are freely accessible to its users and its style rules are not scoped to the progress bar. For example, the style rules defined for the progress bar will apply to content outside the progress bar with the class name progress:

	<section class="project">
	    <p class="progress">Pending an approval</p>
	</section>

Similarly, style rules defined for other elements could override rules in the progress bar:

	<style>
	.label { font-weight: bold; }
	</style>

While we could work around these problems by using a custom element name such as custom-progressbar to scope rules and then initialize all other properties by 

	all: initial

But Shadow DOM provides a much more elegant solution. The idea here is to introduce an encapsulation layer at the outer div so that users of the progress bar don’t see its internals (such as divs created for the label and the bar) and styles defined for the progress bar don’t interfere with the rest of the page and vice versa. To do that, we first create a ShadowRoot on the progress bar by calling 

	attachShadow({mode: 'closed'})

and then append various nodes needed for its implementation under it. Let’s say we’re still using a div to “host” this shadow root, then we can create a new div and attach a shadow root as follows:

	<template id="progress-bar-template">
	    <style>
	        .progress { position: relative; border: solid 1px #000; padding: 1px; width: 100px; height: 1rem; }
	        .progress > .bar { background: #9cf; height: 100%; }
	        .progress > .label { position: absolute; top: 0; left: 0; width: 100%;
	            text-align: center; font-size: 0.8rem; line-height: 1.1rem; }
	    </style>
	    <div class="progress" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
	        <div class="bar"></div>
	        <div class="label">0%</div>
	    </div>
	</template>
	<script>
	function createProgressBar() {
	    var progressBar = document.createElement('div');
	    var shadowRoot = progressBar.attachShadow({mode: 'closed'});
	    shadowRoot.appendChild(document.getElementById('progress-bar-template').content.cloneNode(true));
	    progressBar.updateProgress = function (newPercentage) {
	        shadowRoot.querySelector('.progress').setAttribute('aria-valuenow', newPercentage);
	        shadowRoot.querySelector('.label').textContent = newPercentage + '%';
	        shadowRoot.querySelector('.bar').style.width = newPercentage + '%';
	    }
	    return progressBar;
	}
	</script>

Notice that the style element is inside the template element and cloned into the shadow root along with the divs. This allows the style rules defined inside the shadow root to be scoped. Style rules defined outside a shadow root do not apply to elements inside the shadow root either. Tip: while debugging your code, you may find it helpful to use shadow DOM’s open mode so that you can access the newly created shadow root via the shadowRoot property of the host element. e.g. {mode: DEBUG ? 'open' : 'closed'}

# Composition with Slots

这一节走不下去了，因为报错
	
	"This element does not support attachShadow" ....

可能是一位文档过时了😯。

然后，我改了案例，变成了 https://stackoverflow.com/questions/50873933/web-component-template-filling-multiple-named-slots 的案例。

At this point, you might be wondering why this had to be done in DOM instead of CSS. Styling is a presentational concept, so why should we add new elements to the DOM? In fact, the first public working draft of the CSS Scoping Module Level 1 defines the @scope rule, which enables exactly that. So why did we need to add another mechanism to isolate styles? 

One motivation was to allow elements used in the implementation of components to be hidden from node traversal APIs such as querySelectorAll and getElementsByTagName. Because nodes inside a shadow root are not found by these APIs by default, users of components that utilize shadow DOM do not need to worry about how each component is implemented. Each component is presented as an opaque element whose implementation details are encapsulated in its shadow DOM. 

Another reason we need a DOM-based solution is for composition. Let’s say we have a list of contacts:

	<script type="module">
	let tmpl = document.createElement("template");
	tmpl.innerHTML = `
	    <style>
		        :host { border: solid 1px red;}
		    </style>
	  <span>
	    Hello 
	<slot name="fullname">
	  <slot name="firstname">
	  </slot>
	<slot name="lastname">
	</slot>
	</slot>
	  </span>
	`;
	class MyElement extends HTMLElement {
	  constructor() {
	    super();
	    let shadowRoot = this.attachShadow({ mode: "open" });
	    shadowRoot.appendChild(tmpl.content.cloneNode(true));
	  }
	}
	customElements.define("x-myelement", MyElement);
	</script>
	<x-myelement>
	  <span slot="fullname"><b>Jim Bob</b></span>
	    <span slot="firstname"><b>Jim1</b></span>
	    <span slot="lastname"><b>Bob1</b></span>
	</x-myelement>

Conceptually, slots are holes in a shadow DOM that will be filled by children of its host element. Each element can be assigned into a slot of a specific name by the slot attribute as follows:

In this template, we have slots named fullName, which contains two other slots named firstName and lastName, and two additional slots named email and address. The fullName slot is taking the advantage of fallback content, and showing firstName and lastName only if there were no nodes assigned to the fullName slot. Even though there is exactly one node assigned to each slot in this example, multiple elements with the same slot attribute value can be assigned to a single slot, and they will appear in the order they appeared as the children of the host element. You can also use an unnamed default slot that will be filled by all of the host’s children that don’t have a slot attribute specified. When a Web browser renders this content, the content of the li element is replaced by the shadow DOM, and slots inside of it are replaced by their assigned node as if rendering the following DOM instead:

As you can see, slot-based composition is a powerful tool that allows widgets to pull in the page content without cloning or modifying the DOM. With it, widgets can respond to changes made to its child nodes without MutationObservers or an explicit notification via script. In essence, composition turns the DOM into a communication medium between components.

# Styling the Host Element

There is one more thing to note in the previous example, which had a mysterious pseudo-class :host:

	<template id="contact-template">
	    <style>
	        :host { border: solid 1px #ccc;}
	    </style>
	...
	</template>

This pseudo class, as its name suggests, matches the host element of the shadow DOM in which this rule appears. By default, author style rules defined outside the shadow DOM have a higher precedence over rules defined in the shadow DOM. This allows a component to define its “default style”, and let users of the component override as needed. In addition, a component can use !important to force a certain style, such as width and display type, without which it cannot function properly with. Any !important rules defined inside a shadow DOM have a higher precedence over regular and !important rules defined outside the shadow DOM.


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

