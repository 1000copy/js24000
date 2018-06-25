// src : https://codepen.io/cbracco/pen/ywdbm
// import '../../html/vendor/jquery.min.js';
// import '../../html/vendor/semantic.min.js';
var str = 
`
<link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css">
<nav>
  Icon:<button class="button-icon icon-heart"></i></button>
</nav>
<style>
  
</style>
`;
export function make (){
    const template = document.createElement('template');
    template.innerHTML = str 
    class RCounter extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      }
    }
    window.customElements.define('r-demo', RCounter);
}