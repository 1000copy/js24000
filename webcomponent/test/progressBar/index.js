var templateStr = `	<template id="progress-bar-template">
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
`
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
class ProgressBar extends HTMLElement{
	constructor(){
		this.shadowRoot = this.attachShadow({mode: 'closed'});
	    this.shadowRoot.appendChild(htmlToElement(templateStr).content.cloneNode(true));
	    this.updateProgress(10)
	}
	updateProgress(newPercentage) {
        this.shadowRoot.querySelector('.label').textContent = newPercentage + '%';
        this.shadowRoot.querySelector('.bar').style.width = newPercentage + '%';
    }
}
customElements.define('x-processbar',ProgressBar)
// function createProgressBar() {
//     var progressBar = document.createElement('div');
//     var shadowRoot = progressBar.attachShadow({mode: 'closed'});
//     shadowRoot.appendChild(document.getElementById('progress-bar-template').content.cloneNode(true));
//     progressBar.updateProgress = function (newPercentage) {
//         shadowRoot.querySelector('.label').textContent = newPercentage + '%';
//         shadowRoot.querySelector('.bar').style.width = newPercentage + '%';
//     }
//     return progressBar;
// }
// var p =  createProgressBar()
// document.body.appendChild(p)
// p.updateProgress(22)
