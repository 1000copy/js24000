## Custom Element

用来定义定制元素。它可以使用ES6类语法定义一个新的元素，像是这样：

	class MyElement extends HTMLElement{}

浏览器知道内置的元素，比如p，是和HTMLParagraphElement关联在一起的。那么，一个定制标签，浏览器如何知道呢？想要扩展内置类，需要一个登记定制元素的过程：

	customElements.define('my-element',MyElement)	

这样，新的定制元素就和一个ES6类联系在一起了，无论何时，知道浏览器剖析到了这个元素，就会调用对应类的构造方法。

注意到元素名称的横线（-）了吗？所有定制元素的名称都必须有一个横线，以便和内置元素区别。标准制定者扩展新的内置元素名称时不使用带有横线的名称，和开发者的定制元素不至于发生冲突。这个标准不是约定而是强制的，如果你去掉上面代码内元素名称的横线，那么会得到这样的错误：

	Uncaught DOMException: Failed to execute 'define' on 'CustomElementRegistry': "myelement" is not a valid custom element name

除了每次创建定制元素时会调用类构造器之外，还有若干个生命周期方法，它们不在不同的时刻被调用：

1. connectedCallback 。当元素被添加到文档内，以及移动到新的位置上，都会调用它
2. disconnectedCallback。当元素被从文档内移除会调用它
3. attributeChangeCallback。当属性修改的时候会调用它。

如下代码，我们通过ES6类来扩展HTMLElement，定义一个简单的定制元素，编写埋点代码，并登记此定制元素：

	<script type="module">
		class MyElement extends HTMLElement{
			constructor(){
				super()
				console.log('constructed')
			}
			connectedCallback(){
				console.log('connected')	
			}
			disconnectedCallback(){
				console.log('disconnected')		
			}
		}
		customElements.define('my-element',MyElement)
	</script>

然后加入测试代码，把定制元素加入到文档内，然后移除，以此方式来观察验证生命周期函数的调用情况：

	<script>
	function loaded(){
		function bind(){
			var t = document.createElement("my-element")
			document.body.appendChild(t)
		}
		function unbind(){
			var t = document.querySelectorAll("my-element")
			for (var i = 0; i < t.length; i++) {
				t[i].remove()
			}
		}
		bind()
		unbind()
	}
	</script>
	<body onload="loaded()">
	</body>

代码会输出：

	constructed
	connected
	disconnected


方法attributeChangedCallback会被调用，前提是此属性在监视白名单内，通过定制元素类的静态属性observedAttributes来设置：

	MyElement.observedAttributes = ['name']

此方法的原型是：

	attributeChangedCallback(attrName, oldValue, newValue)

它被调用时会通过attrName传入属性名称，通过oldValue传入原值，通过newValue传入新值。如下代码通过：

1. 创建一个定制元素
2. 设置观察属性白名单
3. 写入attributeChangedCallback埋点代码

然后通过loaded函数代码添加元素和设置属性，观察埋点代码输出。


	<my-element name="base"></my-element>
	<script>
	function loaded(){
		function prop(){
			var t = document.querySelectorAll("my-element")
			for (var i = 0; i < t.length; i++) {
				t[i].setAttribute("name",t[i].getAttribute("name") + 1)
			}
		}
		prop()
		//name null base
		//name base base1
	}
	</script>
	<script type="module">
		class MyElement extends HTMLElement{
			attributeChangedCallback(attrName, oldValue, newValue) {
				console.log(attrName,oldValue,newValue)
			}
		}
		MyElement.observedAttributes = ['name']
		customElements.define('my-element',MyElement)
	</script>
	<body onload="loaded()">
	</body>

函数attributeChangedCallback会被调用两次，一次是浏览器剖析到定制元素并且设置属性初值事，还有一次是修改属性时。

## 更多基类

定制元素的类型可以分为两种，分别是：

1. Autonomous custom element（自主定制元素）: 它们不会从任何内建的元素继承，而是从更加一般的基类也就是HTMLElement。
2. Customized built-in element（定制内建元素）: 它们继承于内建元素，这个选择就比较多了。后面文字会举例说明。

自主定制元素继承于HTMLElement，内建定制元素则是可以有很多种选择，这些选择都是浏览器的内建元素。可以选择更加符合自己需求的具体类，比如你需要的定制元素和段落类接近，那么可以从段落类开始自己的元素定制，如果你需求元素和按钮接近，那么可以从按钮类开始。比如扩展段落元素：

	class MyParagraph extends HTMLParagraphElement{}

然后注册定制元素。和自主定制元素不同，需要使用第三个参数，指定扩展的标签。这里对应HTMLParagraphElement的元素是p。

	customElements.define("my-paragraph", MyParagraph, { extends: "p" });

对于Customized built-in element的使用的方法特别留意，要使用属性is来引用：
	
	<p  is="my-paragraph"></p>

而不是：

	<my-paragraph></my-paragraph>


更多的内建元素扩展实例如下：

	<script type="module">
	class ConfirmLink extends HTMLAnchorElement {
	  connectedCallback() {
	    this.addEventListener("click", e => {
	      const result = confirm(`want to go to '${this.href}'?`);
	      if (!result) e.preventDefault();
	    });
	  }
	}
	class NothingTodoButton extends HTMLButtonElement{
		connectedCallback(){
			this.addEventListener("click",e=>{
				alert("Nothing Todo")
			})
		}
	}
	customElements.define("nothing-todo", NothingTodoButton, { extends: "button" });
	customElements.define("confirm-link", ConfirmLink, { extends: "a" });
	</script>
	<a is="confirm-link" href="http://google.com">confirm</a>
	<button is="nothing-todo">NothingTodo</button>

## ref

Web Components are pretty amazing. They offer powerful features straight from the platform, some of the headliners are; true encapsulation of both JavaScript and CSS, cross-framework interoperability and of course a standardised component model for easily reusable UI components.


2. Using templates and slots 
https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots
3. slot 
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot
4. Shadow DOM v1: Self-Contained Web Components 
https://developers.google.com/web/fundamentals/web-components/shadowdom
## 兼容性

firefox+ chrome OK ，edge not ，safari not ok ：https://caniuse.com/#feat=custom-elementsv1
