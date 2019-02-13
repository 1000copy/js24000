var htmlStr = `
<template>
  <div id="carousel" class="carousel">
    <div class="slides">
      <div class="slide" data-state="active">Slide 1</div>
      <div class="slide">Slide 2</div>
      <div class="slide">Slide 3</div>
    </div>
    <div class="indicators">
      <input class="indicator" name="indicator" data-slide="1" data-state="active" checked type="radio" />
      <input class="indicator" name="indicator" data-slide="2" type="radio" />
      <input class="indicator" name="indicator" data-slide="3" type="radio" />
    </div>
  </div>
</template>
<style>
  .carousel {
    position: relative;
    height: 200px;
    width: 300px;
  }
  .slides {
    height: 100%;
    width: 100%;
    position: relative;
  }
  .slide {
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
  .slide:nth-child(1) {
      background-color: red;
      opacity: 1;
  }
  .slide:nth-child(2) {
      background-color: green;
  }
  .slide:nth-child(3) {
      background-color: blue;
  }
  .slide[data-state=active] {
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
  function setSlide(slide,indicators,slides) {
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
  constructor() {
    super();
    var shadow = this.attachShadow({mode: 'open'});
  	this.init(shadow)
    var carousel = shadow.getElementById('carousel');
    var slides = 3;
    var speed = 5000; // 5 seconds
    
    if (carousel) {
        var slides = carousel.querySelectorAll('.slide');
        var indicators = carousel.querySelectorAll('.indicator');
        var switcher = setInterval(function() {
            switchSlide(indicators,slides);
        }, speed);
        for (var i = 0; i < indicators.length; i++) {
            indicators[i].addEventListener("click", setSlide(i,indicators,slides));
        }
    }
 }
 init(shadow){
  var wrapper = htmlToElement(`<wrapper>${htmlStr}</wrapper>`)
  var style = wrapper.querySelector('style')
  var template = wrapper.querySelector('template')
  shadow.appendChild(style);
  shadow.appendChild(template.content.cloneNode(true));
  this.attachEvent(shadow)
 }
 attachEvent(shadow){
    
 }
}
customElements.define('x-carousel', Carousel);