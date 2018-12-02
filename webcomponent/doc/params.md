# Web Components插槽

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


