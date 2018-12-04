# 基于Slot的内容组合

我们需要基于Shadow DOM的另一个原因是内容组合。 假设我们有一个联系人列表：


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

从概念上讲，插槽是Shadow DOM中的孔，将由其使用这元素的子元素填充。可以通过slot属性将每个元素分配到特定名称的槽中，如下所示：

在此模板中，我们有名为fullName的插槽，其中包含另外两个名为firstName和lastName的插槽，以及另外两个名为email和address的插槽。 fullName插槽利用了回退内容，并且仅当没有分配给fullName插槽的节点时才显示firstName和lastName。尽管在此示例中只有一个节点分配给每个插槽，但是具有相同插槽属性值的多个元素可以分配给单个插槽，并且它们将按照它们作为主机元素的子节点出现的顺序出现。您还可以使用未命名的默认插槽，该插槽将由未指定插槽属性的所有主机子节点填充。

如您所见，基于插槽的合成是一个功能强大的工具，允许小部件在不克隆或修改DOM的情况下提取页面内容。

## 翻译来自：

[Introducing Slot-Based Shadow DOM API | WebKit](https://webkit.org/blog/4096/introducing-shadow-dom-api/)
