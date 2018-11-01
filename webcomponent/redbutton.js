const cssstyle = `
    .wrapper {
      position: relative;
      font-size:2rem;
      background:red;
    }
    input {
      width: 50px;
      font-size:2rem;
    }
    button {
      width: 2rem;
      font-size:2rem;
    }
  `
const htmlStr =`
  <span class="wrapper">
    <button id="inc">+</button>
    <input value="1"/>
    <button id="dec">-</button>
  </span>
`
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
export default class PopUpInfo extends HTMLElement {
  constructor() {
    super();
    var shadow = this.attachShadow({mode: 'open'});
  	// Create spans
  	this.init1(shadow)
 }
 init1(shadow){
  var wrapper = htmlToElement(htmlStr)
  shadow.appendChild(wrapper);
  var style = document.createElement('style');
  style.textContent = cssstyle;
  shadow.appendChild(style);  
  // can not find #inc by document
  // var a = document.querySelector("#inc")
  this.attachEvent(shadow)
 }
 attachEvent(shadow){
  var a = shadow.querySelector("#inc")
  var b = shadow.querySelector("input")
  var c = shadow.querySelector("#dec")
  var value = 1
  a.onclick = function(){
    value += 1
    b.value = value
  }
  c.onclick = function(){
    value -= 1
    b.value = value
  }
 }
 init(shadow){
    var wrapper = document.createElement('span');
    wrapper.setAttribute('class','wrapper');
    var a = document.createElement('button');
    a.innerHTML = '+';
    var b = document.createElement('input');
    b.value = '1';
    var c = document.createElement('button');
    c.innerHTML = '-';
    var style = document.createElement('style');
    style.textContent = cssstyle;
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(a);
    wrapper.appendChild(b);
    wrapper.appendChild(c);
    this.attachEvent(shadow)
 }
}
// customElements.define('popup-info', PopUpInfo);