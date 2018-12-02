var template = `
	<button inc>+</button><span>1</span><button dec>-</button>
	<style>
		span{color:red;}
		*{font-size:2rem;}
	</style>
`
class SpinButton extends HTMLElement{
	constructor(){
		super()
		var shadow = this.attachShadow({mode:'open'})
		var t = document.createElement('template')
		t.innerHTML = template
		shadow.appendChild(t.content.cloneNode(true))
		var b1 = shadow.querySelector('[inc]')
		var b2 = shadow.querySelector('[dec]')
		this.s = shadow.querySelector('span')
		var i = 1
		var that = this
		b1.onclick = function(){
			that.s.innerHTML = ++that.value 
		}
		b2.onclick = function(){
			that.s.innerHTML = -- that.value 
		}
	}
	static get observedAttributes() {
	  return ['value'];
	}
	attributeChangedCallback(name, oldValue, newValue) {
	  switch (name) {
	    case 'value':
	      this.s.innerHTML = newValue
	      break;
	  }
	}
	get value(){
		return this.getAttribute('value') || 1
	}
	set value(v){
		this.setAttribute('value',v)
	}
}
customElements.define('spin-button',SpinButton)