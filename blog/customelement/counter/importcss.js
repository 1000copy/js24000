import '../../html/vendor/jquery.min.js';
import '../../html/vendor/semantic.min.js';
export function make (){
  // window.$ = $;
  // window.jQuery = jQuery;
  (function($) {
    
    // import $ from 
    const template = document.createElement('template');

    template.innerHTML = `
  <style>
    @import "../../html/vendor/semantic.min.css" ;
  </style>
  <style>
  .item{
    /*background-color: red;*/
  }
    body {
    margin: 0 auto;
    padding-top: 40px;
  }

  a:hover {
    border-bottom: 3px solid #4fc08d;
  }

  .button {
    background-color: #4fc08d !important;
    color: #fff !important;
  }

  /* ---------- nav ---------- */
  .nav {
    margin-bottom: 20px;
    color: #999;
    text-align: center;
  }

  .nav h1 {
    color: #4fc08d;
    display: inline-block;
    margin: 10px 0;
  }

  /* ---------- navmenu ---------- */

  .navmenu {
    z-index: 999;
  }

  .navmenu .ui.dropdown.button {
    padding: 10px 10px 0 10px;
    background-color: #fff !important;
  }

  .navmenu .icon.bars {
    color: #000;
    font-size: 18px;
  }

</style>
    <div id="content">
        <div class="nav" >
      <div class="ui grid">
        <div class="four wide column"></div>

        <div class="eight wide column">
          <a href="/posts.html"><h1>myblog</h1></a>
          <p>my first blog</p>
        </div>
      </div>
    </div>
      
      <div class="navmenu">
        <div class="ui buttons">
          <div class="ui  dropdown " tabindex="0">
            <i class="icon bars">menu</i>

            <div class="menu" tabindex="-1">

                <a class="item" href="/login.html">登录</a>
                <a class="item" href="/logon.html">注册</a>

                 <a class="item" href="/posts.html">个人主页</a>
                <div class="divider"></div>
                <a class="item" href="/create.html">发表文章</a>
                <a class="item" href="/api/signout">登出</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
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
        $('.ui.dropdown').dropdown();
        $(document).ready(function () {
          console.log("run")
          $('.ui.dropdown').dropdown();
        })
      }
      disconnectedCallback() {

      }
    }
    window.customElements.define('r-demo', RCounter);
  })($);
}