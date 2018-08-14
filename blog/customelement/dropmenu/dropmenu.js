// import '../../html/vendor/jquery.min.js';
// import '../../html/vendor/semantic.min.js';
var str = 
`
<link rel="stylesheet" href="../font/css/font-awesome.min.css">
<link rel="stylesheet" href="../../html/vendor/semantic.min.css">
<nav>
    <div class="ui buttons">
      <div class="ui  simple dropdown " tabindex="0">
        <i class="text">file</i> 
        <div class="menu" tabindex="-1" style="display:none">
            <a class="item" href="/login.html">Item 1</a>
            <a class="item" href="/logon.html">Item 2</a>
            <div class="divider"></div>
            <a class="item" href="/posts.html">Item 3</a>
            <a class="item" href="/create.html">Item 44</a>
            
        </div>
      </div>
    </div>
</nav>
<style>
  .text{
    font-size: 28px ;

  }
  nav {
    position: fixed;
    left: 50px;
    top: 35px;
    z-index: 999;
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