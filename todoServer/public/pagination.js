import paginate from './paginate.js'

var templateStr = `	
	<template id="progress-bar-template">
	    <div class="progress">
	    	<button class="first">First</button>
	    	<button class="next">Next</button>
	    	<span class="current">1</span>
			/
	    	<span class="pages">1</span>
	    	<button class="prev">Prev</button>
	    	<button class="last">Last</button>
	    </div>
	<style>
	:host{
		display: inline-block;
		margin: 0;
		padding: 0;
		border: 0;}
	.progress { position: relative; border: solid 1px;height: 1.5rem;padding:0px;width:100%}
	</style>
	</template>
`
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
class Pagination extends HTMLElement{
	constructor(){
		super()
		this.sdom = this.attachShadow({mode: 'closed'});
	    this.sdom.appendChild(htmlToElement(templateStr).content.cloneNode(true));
	    this._totalItems = 1
	    this._current = 1
	    this._pagesize = 1
	    this.sdom.querySelector('.last').onclick = ()=>{
	    	this.current = this._totalItems
	    }
	    this.sdom.querySelector('.first').onclick = ()=>{
	    	this.current = 1
	    }
	    this.sdom.querySelector('.prev').onclick = ()=>{
	    	this.current -= 1
	    }
	    this.sdom.querySelector('.next').onclick = ()=>{
	    	this.current += 1

	    }
	    this.onroll_ = new CustomEvent('onroll',
	    	{
		    	 bubbles:true,
		    	 cancelable:false,
		    	 detail:{currentPage:()=>this._current},
		    	 // detail:this,
		    	 // detail:{currentPage:this._current,
		    	 // pageSize:this._pagesize}
		    	 
	    	})
	}
	updateTotalItems(value) {
		this._totalItems = value
		var a = paginate(value)
		this.current = a.currentPage
		// this.sdom.querySelector('.first').disabled = a.currentPage == 1 
		this.updateUI()
    }
    updatePageSize(value) {
		this._pagesize = value
		var a = paginate(this.pages,this.current,value)
    }
    updateCurrent(value) {
    	if(value!=this._current){
	    	this._current = +value
			var a = paginate(this._totalItems,this._current)
			this.updateUI()
			
			if (this.onroll && window[this.onroll]){
				// console.log(this.onroll)
				var e = {detail:{currentPage:()=>this._current}}
				window[this.onroll](e)
			}else{
				this.dispatchEvent(this.onroll_)	
			}
    	}
    	// var b = this.getAttribute('onroll')
		// eval(b)
    }
    updateUI(){
    	this.sdom.querySelector('.current').textContent = this._current
        this.sdom.querySelector('.pages').textContent = this._totalItems
        this.sdom.querySelector('.last').disabled = this._totalItems == this._current 
        this.sdom.querySelector('.first').disabled = 1 == this._current 
        this.sdom.querySelector('.next').disabled = this._totalItems == this._current 
        this.sdom.querySelector('.prev').disabled = 1 == this._current 
    }
    static get observedAttributes() {
	  return ['totalitems','current','pagesize'];
	}
	attributeChangedCallback(name, oldValue, newValue) {
	  switch (name) {
	    case 'totalitems':
	      this.updateTotalItems(newValue)
	      break;
	    case 'current':
	      this.updateCurrent(newValue)
	      break;
	    case 'pagesize':
	      this.updatePageSize(newValue)
	      break;
	  }
	}
	get totalItems(){
		return this.getAttribute('totalitems') || 1
	}
	set totalItems(v){
		this.setAttribute('totalitems',v)
	}
	get current(){
		return +this.getAttribute('current') || 1
	}
	set current(v){
		this.setAttribute('current',v)
		this._current = this.current
	}
	get pagesize(){
		return +this.getAttribute('pagesize') || 1
	}
	set pagesize(v){
		this.setAttribute('pagesize',v)
	}
	get onroll(){
		return this.getAttribute('onroll') || ""
	}
	set onroll(v){
		this.setAttribute('onroll',v)
	}
}
customElements.define('x-pagination',Pagination)