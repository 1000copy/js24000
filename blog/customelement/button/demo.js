// src : https://codepen.io/cbracco/pen/ywdbm
// import '../../html/vendor/jquery.min.js';
// import '../../html/vendor/semantic.min.js';
var str = 
`
<link rel="stylesheet" href="../../font/css/font-awesome.min.css">
<link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css">

<nav>
<div class="content">
    <p>
      <button class="button">Press me</button>
      <button class="button button_primary">Press me</button>
      <button class="button button_secondary"><i class="button-icon icon-heart"></i>点击我</button>
    </p>
</nav>
<style>
    .button {
      display: inline-block;
      margin: 0;
      padding: 0.75rem 1rem;
      border: 0;
      border-radius: 0.317rem;
      background-color: #aaa;
      color: #fff;
      text-decoration: none;
      font-weight: 700;
      font-size: 1rem;
      line-height: 1.5;
      font-family: "Helvetica Neue", Arial, sans-serif;
      cursor: pointer;
      -webkit-appearance: none;
      -webkit-font-smoothing: antialiased;
    }

    .button:hover {
      opacity: 0.85;
    }

    .button:active {
      box-shadow: inset 0 3px 4px hsla(0, 0%, 0%, 0.2);
    }

    .button:focus {
      outline: thin dotted #444;
      outline: 5px auto -webkit-focus-ring-color;
      outline-offset: -2px;
    }

    .button_primary {
      background-color: #1fa3ec;
    }

    .button_secondary {
      background-color: #e98724;
    }

    .button-icon {
      display: inline-block;
      position: relative;
      top: -0.1em;
      vertical-align: middle;
      margin-right: 0.317rem;
    }
</style>
`;
export function make (){
  (function() {
    // import $ from 
    const template = document.createElement('template');

    template.innerHTML = str 
    class RCounter extends HTMLElement {
      constructor() {
        super();
        this.shadow(template)
      }
      shadow(template){
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      }
      connectedCallback() {
        // console.log("run",$('template.ui.dropdown'))
        // $('template.ui.dropdown').dropdown();
      }
      disconnectedCallback() {

      }
    }
    window.customElements.define('r-demo', RCounter);
  })();
}