# 翻译：Shadow DOM隔离释义

使用shadow DOM的一个主要好处是样式隔离。 要了解这意味着什么，让我们来假设我们要创建自定义进度条组件。 我们可以使用两个嵌套的DIV来显示条形，使用另一个DIV来显示文本以显示百分比，如下所示：

	<style>
	.progress { position: relative; border: solid 1px;width: 100px; height: 1rem; }
	.progress > .bar { background: red; height: 100%; }
	.progress > .label {
      position: absolute; top: 0;
      width: 100%;
	    text-align: center; font-size: 0.8rem;}
	</style>
	<template id="progress-bar-template">
	    <div class="progress">
	        <div class="bar"></div>
	        <div class="label">0%</div>
	    </div>
	</template>
	<script>
	function createProgressBar() {
	    var fragment = document.getElementById('progress-bar-template').content.cloneNode(true);
	    var progressBar = fragment.querySelector('div');
	    progressBar.updateProgress = function (newPercentage) {
          var ps =  newPercentage + '%'
          this.querySelector('.label').textContent = ps 
	        this.querySelector('.bar').style.width = ps
	    }
	    return progressBar;
	}
	var p =  createProgressBar()
	document.body.appendChild(p)
	p.updateProgress(22)
	</script>

请注意模板元素的使用:

1. 它允许作者包含HTML片段，以后可以通过克隆内容来实例化
2. 模板元素可以出现在文档中的任何位置（例如，在表格和tr元素之间）
3. 模板元素中的内容是惰性的，不运行脚本或加载图像和其他类型的子资源。

这个进度条实现的问题是它的两个内部div可以被用户自由访问，它的样式规则也不局限于进度条。 例如，为进度条定义的样式规则将应用于进度条外部的内容，其类名为progress：

	<section class="project">
	    <p class="progress">Pending an approval</p>
	</section>

同样的，为其他元素定义的样式规则可以覆盖进度条中的规则：

	<style>
	.label { font-weight: bold; }
	</style>

虽然我们可以通过使用自定义元素名称（如custom-progressbar）来规范规则，然后通过以下方式初始化所有其他属性来解决这些问题

	all: initial

但Shadow DOM提供了更优雅的解决方案，外部div处引入封装层，以便进度条组件的用户看不到其内部实现（例如为标签和条创建的div）。还有为进度条定义的CSS样式不会干扰页面的其余部分，反之亦然。 为此，我们首先通过调用在进度条上创建一个ShadowRoot：

	attachShadow({mode: 'closed'})

然后在其下附加其实现所需的各种DOM实现。 假设我们仍然使用div来挂接这个Shadow Root，如下所示：

	 <body>
	<template id="progress-bar-template">
	    <div class="progress">
	        <div class="bar"></div>
	        <div class="label">0%</div>
	    </div>
	<style>
	.progress { position: relative; border: solid 1px;width: 100px; height: 1rem; }
	.progress > .bar { background: red; height: 100%; }
	.progress > .label {
      position: absolute; top: 0;
      width: 100%;
	    text-align: center; font-size: 0.8rem;}
	</style>
	</template>
	<script>
	function createProgressBar() {
	    var progressBar = document.createElement('div');
	    var shadowRoot = progressBar.attachShadow({mode: 'closed'});
	    shadowRoot.appendChild(document.getElementById('progress-bar-template').content.cloneNode(true));
	    progressBar.updateProgress = function (newPercentage) {
	        shadowRoot.querySelector('.label').textContent = newPercentage + '%';
	        shadowRoot.querySelector('.bar').style.width = newPercentage + '%';
	    }
	    return progressBar;
	}
	var p =  createProgressBar()
	document.body.appendChild(p)
	p.updateProgress(22)
	</script></body>

请注意，style元素位于模板元素内部，并与div一起克隆到Shadow Root内。这允许在阴影根中定义的样式规则作用域。 在阴影根之外定义的样式规则就无法适用于Shadow Root内的元素。 

使用打开模式，您可以通过HTML元素的shadowRoot属性访问Shadow DOM。关闭模式你不能。 shadowRoot将返回null。封闭模式的设计目标是禁止对来自外部世界的Shadow Root中的节点进行任何访问。

此时，您可能想知道为什么必须在DOM而不是CSS中完成。实际上，CSS范围模块1级的第一个公共工作草案定义了@scope规则，它可以实现这一点。 那么为什么我们需要添加另一种机制来隔离样式呢？

一个动机是允许在节点遍历API（例如querySelectorAll和getElementsByTagName）中隐藏组件实现中使用的元素。 由于默认情况下这些API未找到Shadow Root中的节点，因此使用Shadow DOM的组件的用户无需担心每个组件的实现方式。 每个组件都表示为一个不透明元素，其实现细节封装在其shadow DOM中。

## 翻译来自：

[Introducing Slot-Based Shadow DOM API | WebKit](https://webkit.org/blog/4096/introducing-shadow-dom-api/)
