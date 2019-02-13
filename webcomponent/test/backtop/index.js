var htmlStr = `
<style>
  #top {
    position: fixed;
    bottom: 40px;
    right: 40px;
    font-size: 24px;
    width : 24px;
    z-index: 1;
    cursor: pointer;
    background: #e9ebec;
    display:none;
  }
  #top:hover {
      background: #e9eb00;
  }
</style>
<template>
  <div href="#" id="top" title="Back to top">&uarr;</div>
</template>`
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
class BackTop extends HTMLElement {
  constructor() {
    super();
    var shadow = this.attachShadow({mode: 'open'});
  	this.init(shadow)
 }
 init(shadow){
  var wrapper = htmlToElement(`<wrapper>${htmlStr}</wrapper>`)
  var style = wrapper.querySelector('style')
  var template = wrapper.querySelector('template')
  shadow.appendChild(style);
  shadow.appendChild(template.content.cloneNode(true));
  this.attachEvent(shadow)
 }
 attachEvent(shadow){
    var d = shadow.getElementById("top");
    var threshold = 100
    function toggle(){
      if (document.body.scrollTop > threshold)
        d.style.display = 'block'
      else
        d.style.display = 'none'
    }
    window.addEventListener('scroll', toggle);   
    d.addEventListener("click",function (e) {
        e.preventDefault();
        window.scrollTo(0, 0)
    })
 }
}
customElements.define('x-backtop', BackTop);