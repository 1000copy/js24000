export default class PopUpInfo extends HTMLElement {
  constructor() {
    super();
    // console.log("hi,super")
    var shadow = this.attachShadow({mode: 'open'});
	// Create spans
	var wrapper = document.createElement('span');
	wrapper.setAttribute('class','wrapper');
	// var icon = document.createElement('span');
	// icon.setAttribute('class','icon');
	// icon.setAttribute('tabindex', 0);
	var info = document.createElement('span');
	info.setAttribute('class','info');
	// Take attribute content and put it inside the info span
	var text = this.getAttribute('text');
	info.textContent = text;
	// Insert icon
	var imgUrl;
	if(this.hasAttribute('img')) {
	  imgUrl = this.getAttribute('img');
	} else {
	  imgUrl = 'img/default.png';
	}
	var img = document.createElement('img');
	img.src = imgUrl;
  img.setAttribute('tabindex', 0);
	var style = document.createElement('style');
	style.textContent = `
      .wrapper {
        position: relative;
      }
      .info {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: white;
        border-radius: 10px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        top: 20px;
        left: 10px;
        z-index: 3;
      }
      img {
        width: 1rem;
      }
      img:hover + .info {
        opacity: 1;
      }
    `;
	shadow.appendChild(style);
	shadow.appendChild(wrapper);
	wrapper.appendChild(img);
	wrapper.appendChild(info);
 }
}
// customElements.define('popup-info', PopUpInfo);