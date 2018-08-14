// var t = '\\25AE'
var t = '\\f0c9'
var str = 
`
<style>
  @font-face
  {
      font-family: FA;
      src: url(./fonts/fontawesome-webfont.woff);
  }
  .mytextwithicon {
    position:relative;
  }    
  .mytextwithicon:before {
      content: "${t}";  /* this is your text. You can also use UTF-8 character codes as I do here */
      font-family: FA;
      font-size: 28px ;
      left:-5px;
      position:absolute;
      top:0;
   }
</style>
<i class="mytextwithicon"></i> 

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

      }
      disconnectedCallback() {

      }
    }
    window.customElements.define('r-demo', RCounter);
  })();
}