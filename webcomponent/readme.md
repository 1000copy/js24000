

# Web Component Little Book
## spin案例，来自alligator，展示最基本的Web components
## 定制元素的概念和案例解析
## Shadow DOM 概念和案例解析
- shadow DOM vs light DOM
- 局部化的CSS
- 特殊的选择符 
对Shadow DOM的open/close参数的测试

## 内容分发的方法
## 特殊的css选择符
1. :host选择元素自身 
2. 选择上下文host-context 
3. slotted选择分发的节点（Distribute Node)
## Carousel案例，展示“内容分发”，对分发内容的css选择
## 更多的组件 
## 支持状况

## TODO

一个比较完整的组件清单和Aria设计指南
https://www.w3.org/TR/wai-aria-practices-1.1/#intro
(backtotop button](https://segmentfault.com/a/1190000008164484)
(carousel)[https://codepen.io/LANparty/pen/wePYXb]

## Draft

对于许多前端开发人员而言，组件已成为其开发工作流程的核心概念。组件为构建和扩展复杂应用程序提供了强大的模型，允许从更小和更简单的封装部件组合。组件的概念已经在Web上存在了一段时间，像Dojo Toolkit这样的框架在JavaScript生态系统的早期就在其Dijit小部件系统中支持它们。

现代框架像React，Angular，Vue如同Dojo一样进一步将组件放在开发的最前沿，使它们成为架构中的核心原型。然而，即使组件架构变得越来越普遍，但是框架和库的多样性导致了一个孤立且分散的组件市场。即使时代和技术发生变化，这种分裂也经常使团队陷入特定的框架难以脱身。

解决这种碎片化并使Web组件模型标准化的愿望一直是一项持续的努力。它的起源始于2011年左右的“Web组件”规范的起源，并于同年由Alex Russell首次在Fronteers Conference上向世界展示。 Web组件规范源于提供创建浏览器可以理解的组件的规范方式的愿望。这项工作仍然继续进行，但比以往任何时候都更接近于跨浏览器实施。理论上，这些规范和实现为不同供应商的组件的互操作性和组合铺平了道路。在这里，我们将研究Web组件的构建块。

## 积木

Web组件不是单一技术。相反，它们是由W3C定义的一系列浏览器标准，允许开发人员以浏览器本身可以理解的方式构建组件。这些标准包括：

- HTML模板和插槽 - 可重复使用的HTML标记，带有用户特定标记的入口点
- Shadow DOM  - 用于标记和样式的DOM封装
- 自定义元素 - 定义具有特定行为的命名自定义HTML元素

还有另一个Web组件规范HTML Imports，用于将HTML和有意的Web组件导入到Web页面中;然而，Firefox团队并不认为这是最好的方法，因为它与ES模块规范交叉，并且它已经失去了大部分吸引力。

对Shadow DOM和Custom Elements规范分别有一些迭代，现在它们都处于第二个版本（v1）。在2016年2月，独立的Custom Elements和Shadow DOM规范分别过时，相应的将它们合并到DOM标准内。

## 支持怎么样？

截至2018年6月，Shadow DOM v1和Custom Elements v1支持存在于Chrome，Safari。

截止2018年10月，Firefox的内置支持。

Edge对两项标准目前的态度是仍在考虑中。

在此之前，Web组件GitHub repo中有一组polyfill。这些polyfills允许您在所有常绿浏览器和IE11中运行Web组件。 webcomponentsjs库包含多种口味，包括具有所有必要的polyfill（webcomponents-bundle.js）的脚本，以及执行功能检测以仅加载必要的polyfill（webcomponents-loader.js）的版本。如果使用加载程序，则还必须托管各种polyfill包，以便加载程序可以获取它们。

对于那些在代码中运送ES5软件包的人来说，还需要发送custom-elements-es5-adapter.js文件，该文件必须首先加载而不是与组件代码捆绑在一起。需要此适配器，因为自定义元素必须扩展HTMLElement，这需要在构造函数中对super（）进行ES2015调用（这可能会令人困惑，因为文件中包含es5！）。在IE11上，由于缺乏ES2015类支持，这将引发错误，但这可以忽略。

## Web组件和框架

历史上，Web组件最大的支持者之一是Polymer库。 Polymer在Web组件API周围添加了语法糖，以便更轻松地创作和发布组件。在最新版本的Polymer 3中，它已经转向使用ES2015模块并使用npm作为标准包管理器，使其与其他现代框架保持一致。 

Web组件创作工具最近的另一种风格是那些更像编译器而不是框架的工具。两个这样的框架是Stencil和Svelte。这里使用相应的工具API编写组件，然后编译为原生Web组件。像Dojo 2这样的框架采用允许开发人员编写特定于框架的组件的方法，但也允许编译到原生Web组件。在Dojo 2中，这是使用@dojo / cli工具实现的。

拥有原生Web组件的理想之一是能够跨项目和团队使用它们，即使它们可能使用不同的框架。

## More

October 23, 2018 经过相当长的酝酿之后，我很高兴地宣布，Firefox中已经出现了对现代Web Components API的支持！ 
[Firefox 63 - Tricks and Treats! - Mozilla Hacks - the Web developer blog](https://hacks.mozilla.org/2018/10/firefox-63-tricks-and-treats/)

但是到12月份，微软宣布，正在构建自己的Chromium浏览器，以取代Windows 10上的默认浏览器。该软件巨头三年前首次推出了Edge浏览器，重新设计取代Internet Explorer并使默认浏览体验现代化，以与Chrome和其他人竞争。 虽然现代外观为Edge带来了回报，但底层浏览器引擎（EdgeHTML）一直在努力跟上Chromium的步伐。 微软最终放弃并将其默认的Windows 10浏览器迁移到Chromium。Dec 4, 2018 [Microsoft is building its own Chrome browser to replace Edge - The Verge](https://www.theverge.com/2018/12/4/18125238/microsoft-chrome-browser-windows-10-edge-chromium)

 
## Current 

## TODO 

make a web components like this:

	<x-progress value="50"/>

`:host`的使用方法
	:host{
		display: inline-block;
		width:100px;
		margin: 0;
		padding: 0;
		border: 0;}
外部css设置定制标签的方法：

	<style>
	  x-progressbar {
	  	width: 200px
	  }
	</style>


[Posts About Web Components ← Alligator.io](https://alligator.io/web-components/)

[Custom Elements v1: Reusable Web Components  |  Web Fundamentals  |  Google Developers](https://developers.google.com/web/fundamentals/web-components/customelements?authuser=0)

[Doing something with Web Components – Duncan Grant – Medium](https://medium.com/@dalaidunc/doing-something-with-web-components-40b1a1700c32)


https://developers.google.com/web/fundamentals/web-components/shadowdom
https://alligator.io/web-components/composing-slots-named-slots/
https://www.hongkiat.com/blog/html-template-slow-tag-shadow-dom/
https://www.codementor.io/ayushgupta/vanilla-js-web-components-chguq8goz
https://medium.com/@dalaidunc/doing-something-with-web-components-40b1a1700c32

## DONE

### [tr]
[Web Components in 2018 - Blog | SitePen](https://www.sitepen.com/blog/2018/07/06/web-components-in-2018/)


### 价值不高，不要看了。[HTML Web Component using Plain JavaScript | Codementor](https://www.codementor.io/ayushgupta/vanilla-js-web-components-chguq8goz)

### [编写第二个Chrome Extension+Copy URL+Title](../chromeExtensioncopyTitleURL/*)
### [# 编写第一个Chrome Extension - 掘金](https://juejin.im/post/5c03ed44e51d456ac27b48c4)
### [# CSS 绝对定位释义 - 掘金](https://juejin.im/post/5c04f207f265da61530486af)
### [How to Create and Publish a Chrome Extension in 20 minutes](https://medium.freecodecamp.org/how-to-create-and-publish-a-chrome-extension-in-20-minutes-6dc8395d7153)
### [Firefox 63 - Tricks and Treats! - Mozilla Hacks - the Web developer blog](https://hacks.mozilla.org/2018/10/firefox-63-tricks-and-treats/)
### [Introducing Slot-Based Shadow DOM API | WebKit](https://webkit.org/blog/4096/introducing-shadow-dom-api/)

这一节走不下去了，因为报错
	
	"This element does not support attachShadow" ....

可能是一位文档过时了😯。

然后，我改了案例，变成了 https://stackoverflow.com/questions/50873933/web-component-template-filling-multiple-named-slots 的案例。


