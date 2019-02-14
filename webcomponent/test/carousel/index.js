var htmlStr = `
<template>
  <div id="carousel" class="carousel">
    <div class="slides">
      <slot></slot>
    </div>
    <div class="indicators">
    </div>
  </div>
</template>
<style>
  .carousel{
    position: relative;
    height: 200px;
    width: 300px;
    background-color:yellow;
  }
  .slides {
    height: 100%;
    width: 100%;
    position: relative;
  }
  ::slotted(.slide) {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    font-size: 3em;
    color: white;
    line-height: 100px;
    text-align: center;
    opacity: 0;
    transition: opacity 1000ms;
  }
  ::slotted(.slide:nth-child(1)) {
      background-color: red;
      opacity: 0;
  }
  ::slotted(.slide:nth-child(2)) {
      background-color: green;
  }
  ::slotted(.slide:nth-child(3)) {
      background-color: blue;
  }
  ::slotted(.slide[data-state=active]) {
    display: block;
  }
  .indicators {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
  .indicator {
      cursor: pointer;
  }
</style>
`
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
function carouselHide(num,indicators,slides) {
      indicators[num].setAttribute('data-state', '');
      slides[num].setAttribute('data-state', '');
      slides[num].style.opacity=0;
  }
  function carouselShow(num,indicators,slides) {
      indicators[num].checked = true;
      indicators[num].setAttribute('data-state', 'active');
      slides[num].setAttribute('data-state', 'active');
      slides[num].style.opacity=1;
  }
  function setSlide(slide,indicators,slides,switcher) {
      return function() {
          // Reset all slides
          for (var i = 0; i < indicators.length; i++) {
              indicators[i].setAttribute('data-state', '');
              slides[i].setAttribute('data-state', '');
              carouselHide(i,indicators,slides);
          }
          // Set defined slide as active
          indicators[slide].setAttribute('data-state', 'active');
          slides[slide].setAttribute('data-state', 'active');
          carouselShow(slide,indicators,slides);
          // Stop the auto-switcher
          clearInterval(switcher);
      };
  }
  function switchSlide(indicators,slides) {
      var nextSlide = 0;
      // Reset all slides
      for (var i = 0; i < indicators.length; i++) {
          // If current slide is active & NOT equal to last slide then increment nextSlide
          if ((indicators[i].getAttribute('data-state') == 'active') && (i !== (indicators.length-1))) {
              nextSlide = i + 1;
          }
          // Remove all active states & hide
          carouselHide(i,indicators,slides);
      }
      // Set next slide as active & show the next slide
      carouselShow(nextSlide,indicators,slides);
  }
  
class Carousel extends HTMLElement {
  connectedCallback(){
    var slides = this.querySelectorAll('.slide');
    console.log("slidesConnected:",slides)
  }
  constructor() {
    super();
    this.s = this.attachShadow({mode: 'open'});
    var shadow = this.s
  	this.init(shadow)
    var carousel = shadow.getElementById('carousel');
    var slides = 3;
    var speed = 5000; // 5 seconds
    
    if (carousel) {
        var slides = this.querySelectorAll('.slide');
        console.log("slides:",slides)
        var indicatorsRoot = carousel.querySelector('.indicators');
        for (var i = 0; i < slides.length; i++) {
          var d = document.createElement('input')
          d.setAttribute('class',"indicator")
          d.setAttribute('name',"indicator")
          d.setAttribute('data-slide',i+1)
          if (slides[i].getAttribute('data-state') == 'active'){
            d.setAttribute('data-state',"active")
            d.setAttribute('checked',"")
          }
          d.setAttribute('type',"radio")
          indicatorsRoot.appendChild(d)
        }
        var indicators = carousel.querySelectorAll('.indicator');
        var switcher = setInterval(function() {
            switchSlide(indicators,slides);
        }, speed);
        for (var i = 0; i < indicators.length; i++) {
            indicators[i].addEventListener("click", setSlide(i,indicators,slides,switcher));
        }
    }
 }
 init(shadow){
  var wrapper = htmlToElement(`<wrapper>${htmlStr}</wrapper>`)
  var style = wrapper.querySelector('style')
  var template = wrapper.querySelector('template')
  //wtf???
  shadow.appendChild(style.cloneNode(true));
  this.appendChild(style);
  shadow.appendChild(template.content.cloneNode(true));
  this.attachEvent(shadow)
 }
 attachEvent(shadow){
    
 }
}
customElements.define('x-carousel', Carousel);