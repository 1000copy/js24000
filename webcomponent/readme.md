
## Draft

## Current 


编写第二个Chrome Extension+Copy URL+Title

[# 编写第一个Chrome Extension - 掘金](https://juejin.im/post/5c03ed44e51d456ac27b48c4)

## TODO 

[Introducing Slot-Based Shadow DOM API | WebKit](https://webkit.org/blog/4096/introducing-shadow-dom-api/)

[Posts About Web Components ← Alligator.io](https://alligator.io/web-components/)

[Custom Elements v1: Reusable Web Components  |  Web Fundamentals  |  Google Developers](https://developers.google.com/web/fundamentals/web-components/customelements?authuser=0)

[HTML Web Component using Plain JavaScript | Codementor](https://www.codementor.io/ayushgupta/vanilla-js-web-components-chguq8goz)

[Doing something with Web Components – Duncan Grant – Medium](https://medium.com/@dalaidunc/doing-something-with-web-components-40b1a1700c32)


https://developers.google.com/web/fundamentals/web-components/shadowdom
https://alligator.io/web-components/composing-slots-named-slots/
https://www.hongkiat.com/blog/html-template-slow-tag-shadow-dom/
https://www.codementor.io/ayushgupta/vanilla-js-web-components-chguq8goz
https://medium.com/@dalaidunc/doing-something-with-web-components-40b1a1700c32

## DONE
[# CSS 绝对定位释义 - 掘金](https://juejin.im/post/5c04f207f265da61530486af)
[How to Create and Publish a Chrome Extension in 20 minutes](https://medium.freecodecamp.org/how-to-create-and-publish-a-chrome-extension-in-20-minutes-6dc8395d7153)
[Firefox 63 - Tricks and Treats! - Mozilla Hacks - the Web developer blog](https://hacks.mozilla.org/2018/10/firefox-63-tricks-and-treats/)

# CSS隔离

：）用来作为postion:relative and absolute css 也不错。

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

