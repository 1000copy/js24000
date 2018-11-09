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
    <input value="0"/>
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
  	this.init3(shadow)
 }
 init3(shadow){
  // execuse me but it's not node.js ,it's brower ,must visit file by URL and AJAX.
  // var fs = require('fs')
  // fs.readFile("incdec.vue", "utf8", function(err, data) {...});
  // var url = window.location.pathname;
  // var filename = url.substring(url.lastIndexOf('/')+1);
  // console.log(url,filename);
  //  how to get THIS script file name ?
  // var scripts = document.getElementsByTagName('script');
  // var lastScript = scripts[scripts.length-1];
  // var scriptName = lastScript.src;
  // console.log(scripts)
  var that = this
  fetch('/redbutton.vue').then(function(response){
    return response.text().then(function(htmlStr){
        var wrapper = htmlToElement(`<wrapper>${htmlStr}</wrapper>`)
        var style = wrapper.querySelector('style')
        var template = wrapper.querySelector('template')
        shadow.appendChild(style);
        shadow.appendChild(template.content.cloneNode(true));
        that.attachEvent(shadow)
    })
  })
 }
 init2(shadow){
  var htmlStr = `<style>
    .wrapper {
      position: relative;
      font-size:2rem;
      background:blue;
    }
    input {
      width: 50px;
      font-size:2rem;
    }
    button {
      width: 2rem;
      font-size:2rem;
    }
</style>
<template>
  <span class="wrapper">
    <button id="inc">+</button>
    <input value="1"/>
    <button id="dec">-</button>
  </span>
</template>`
  var wrapper = htmlToElement(`<wrapper>${htmlStr}</wrapper>`)
  var style = wrapper.querySelector('style')
  var template = wrapper.querySelector('template')
  shadow.appendChild(style);
  shadow.appendChild(template.content.cloneNode(true));
  this.attachEvent(shadow)
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