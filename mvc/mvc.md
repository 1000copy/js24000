# MVC介绍

MVC是一种曾经非常流行的结构模式，它们是Model-View-Controller的缩写。使用此架构，意味着程序员需要把Model代表的商业逻辑，View代表的用户界面和Controller代表的控制逻辑分来编码。

比如说：

如果有一个用户类，加载此类对象，保持此对象，在内存中保持状态，就是Model的职责。
让用户可以登录某一个系统，就是Controller要做的事儿。
显示此用户信息，就是视图要做的事儿。

它们的依赖关系是这样的：


1. View需要依赖Model
2. Controller需要依赖View和Model
3. Model不需要依赖于Controller和View

这些依赖关系，在下图中，以实线表示。

另外一方面，Model变化时需要通知到View，但是不是通过直接发消息完成的，而是通过观察者模式搞定这个通知。在如下图内，以虚线表达。

![mvc roles](https://svbtleusercontent.com/2ogkmbb1r5luwq_small.png)

数据流过程如下：

![mvc data flow](https://svbtleusercontent.com/q6omneoniko5hw_small.png)


MVC的主要目的，就是为了分离表示逻辑和业务逻辑。表示逻辑就是和用户界面相关的一些组件，比如HTML内的DIV，FORM；业务逻辑则包括了数据模型、计算等等。

因为UI变化总是比较快的，而业务逻辑变化比较慢，因此，分离两种逻辑，有助于保证业务逻辑的稳定性，不会因为修改UI而导致逻辑也需要修改，并且两者的分离也有助于业务逻辑的自动化测试。

## 从应用开始

接下里，我们一起看一个完整的MVC案例。假设这样的一个应用：

1. 一个Model，对象内有一个简单整数
2. 3个View，分别把Model内的简单整数格式化为整数、美元、英里
3. 一个按钮，点击后整数加1，并把此数字同步到View内

要做到这样的简单的应用，只要使用最基础的HTML元素和JS就可以快速完成：

	<input id = "count" type="text" value="0">
	<div>$:<span id="dollar">0</span></div>
	<div>Mile:<span id="mile">0</span></div>
	<button id="inc">inc</button>
	<script type="text/javascript">
		window.onload = function(){
			oldStyle()
		}
		function oldStyle(){
			var count = 0
			var text = document.getElementById('count')
			var dollar = document.getElementById('dollar')
			var mile = document.getElementById('mile')
			var button = document.getElementById('inc')
			button.onclick = function(sender){
				count +=  1
				text.value = count
				dollar.innerHTML = count
				mile.innerHTML = count
			}
		}
	</script>

尽管此案例是完全不需要任何模式的，但是我们为了演示目的，依然会把它用MVC模式做一遍，有价值的是，我们在此过程中，不使用任何框架。

## 无框架的实现MVC

我们知道，实现经典的MVC模型，是需要一个观察者模式的代码来支持的。因此，首先完成一个观察者模式函数:

	function Subject() {
	    const observers = [];
	    return {    
	        add: function(item) {
	            observers.push(item);
	        },
	        removeAll: function() {
	            observers.length = 0;
	        },
	        notifyObservers() {
	        	observers.forEach(elem => {
	                elem.notify && elem.notify();
	            });
	        }
	    };
	}

这个模式的代码就是一个函数，它返回一个对象，其中有三个方法:

1. .add方法，调用此方法，会添加一个观察者
2. .notifyObservers ,需要时，遍历通知全部观察者
3. .removeAll，调用此方法，会清楚全部观察者

其次，实现一个基础的MVC框架，它极其微小，但是表达了MVC最核心的意图：

	class Model{
		constructor(){
			this.observer = Subject()
		}
		notifyObservers(){
			this.observer.notifyObservers()
		}
	}
	class View{
		constructor(m){
			this.m = m
			this.m.observer.add(this)
		}
		notify(){
		}
	}
	class Controller{
		constructor(m,v){
			this.v = v
			this.m = m
			var self = this
			this.button = document.getElementById('inc')
			this.button.onclick = function(sender){
				self.m.inc()
			}
		}
	}

在此，我们再次重复下MVC的依赖关系：

1. View需要依赖Model。通过构造函数传入Model类型对象，并成为View的一个成员
2. Controller需要依赖View和Model。通过构造函数传入View和Model，并成为Controller的两个成员
3. Model不需要依赖于Controller和View。从代码中确实可以看到，Model没有引用任何View和Controller的代码。但是Model内有一个this.observer属性，并提供了一个notifyObservers的方法，当model修改时，可以调用此方法通知观察者。View内通过this.m.observer.add(this)，把自己加入到Model的观察者内。

最后实现应用类：

	class ModelCount extends Model{
		constructor(){
			super()
			this.count = 0
		}
		inc(){
			this.count ++
			this.notifyObservers()
		}
	}
	class ViewMile extends View{
		constructor(m){
			super(m)
			this.mile = document.getElementById('mile')
		}
		notify(){
			this.mile.innerHTML = this.m.count 
		}
	}
	class ViewDollar extends View{
		constructor(m){
			super(m)
			this.dollar = document.getElementById('dollar')
		}
		notify(){
			this.dollar.innerHTML = this.m.count 
		}	
	}
	class ViewCount extends View{
		constructor(m){
			super(m)
			this.count = document.getElementById('count')
		}
		notify(){
			this.count.value = this.m.count 
		}
	}
	class ControllerMile extends Controller{}
	class ControllerCount extends Controller{}
	class ControllerDollar extends Controller{}
	var m = new ModelCount()
	var v = new ViewDollar(m)
	var c = new ControllerDollar(m,v)
	var v = new ViewMile(m)
	var c = new ControllerMile(m,v)
	var v = new ViewCount(m)
	var c = new ControllerCount(m,v)


这里有一个继承于Model的ModelCount模型类，三个继承于Controller的类，三个继承于View的类，最后通过创建这些类，并组织好关系，然后达成系统在分离关注后的集成运行。

代码在此： [demo code](demo/mvccount.html)

## 总结

本文介绍MVC。作为一种曾经非常流行的结构模式，现在并不常见于主流的开发中，它现在演化为MVP、MVVM等模式。但是理解MVC是重要的，理解了它，才能够更好的理解MVP、MVVM等时下流行的模式。



