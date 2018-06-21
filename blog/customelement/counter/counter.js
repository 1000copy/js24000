(function() {
  const template = document.createElement('template');

  template.innerHTML = `
    <style>
      button,
      span {
        font-size: 3rem;
        color:red;
      }

      button {
        background: pink;
        color: black;
        border: 0;
        border-radius: 6px;
      }

      button:active {
        background: #ad3d55;
        color: white;
      }
    </style>
    <div>
      <button type="button" inc>+</button>
      <button type="button" decrement>-</button>
      <span></span>
    </div>
  `;

  class RCounter extends HTMLElement {
    constructor() {
      super();

      this.inc = this.inc.bind(this);
      this.decrement = this.decrement.bind(this);
      this.shadow(template)
      this.incrementBtn = this.shadowRoot.querySelector('[inc]');
      this.decrementBtn = this.shadowRoot.querySelector('[decrement]');
      this.span = this.shadowRoot.querySelector('span');
    }
    shadow(template){
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback() {
      this.incrementBtn.addEventListener('click', this.inc);
      this.decrementBtn.addEventListener('click', this.decrement);

      if (!this.hasAttribute('value')) {
        this.setAttribute('value', 1);
      }
    }

    inc() {
      // using +myVariable coerces myVariable into a number,
      // we do this because the attribute's value is received as a string
      const step = +this.step || 1;
      const newValue = +this.value + step;

      if (this.max) {
        this.value = newValue > +this.max ? +this.max : +newValue;
      } else {
        this.value = +newValue;
      }
    }

    decrement() {
      const step = +this.step || 1;
      const newValue = +this.value - step;

      if (this.min) {
        this.value = newValue <= +this.min ? +this.min : +newValue;
      } else {
        this.value = +newValue;
      }
    }

    static get observedAttributes() {
      return ['value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.span.innerText = this.value;
    }

    get value() {
      return this.getAttribute('value');
    }

    get step() {
      return this.getAttribute('step');
    }

    get min() {
      return this.getAttribute('min');
    }

    get max() {
      return this.getAttribute('max');
    }

    set value(newValue) {
      this.setAttribute('value', newValue);
    }

    set step(newValue) {
      this.setAttribute('step', newValue);
    }

    set min(newValue) {
      this.setAttribute('min', newValue);
    }

    set max(newValue) {
      this.setAttribute('max', newValue);
    }

    disconnectedCallback() {
      this.incrementBtn.removeEventListener('click', this.inc);
      this.decrementBtn.removeEventListener('click', this.decrement);
    }
  }

  window.customElements.define('r-counter', RCounter);
})();


//// style never bleed out from shadow node
// (function() {
//   class MyTitle extends HTMLElement {
//     constructor() {
//       super();

//       this.attachShadow({ mode: 'open' });
//       this.shadowRoot.innerHTML = `
//         <style>
//           h1 {
//             font-size: 2.5rem;
//             color: hotpink;
//             font-family: monospace;
//             text-align: center;
//             text-decoration: pink solid underline;
//             text-decoration-skip: ink;
//           }
//         </style>
//         <h1>shadow</h1>
//       `;
//     }
//   }

//   window.customElements.define('r-counter', MyTitle);
// })();

//// style will bleed out 

// (function() {
//   class MyTitle extends HTMLElement {
//     connectedCallback() {
//       this.innerHTML = `
//         <style>
//           h1 {
//             font-size: 2.5rem;
//             color: hotpink;
//             font-family: monospace;
//             text-align: center;
//             text-decoration: pink solid underline;
//             text-decoration-skip: ink;
//           }
//         </style>
//         <h1>Hello Alligator!</h1>
//       `;
//     }
//   }

//   window.customElements.define('r-counter', MyTitle);
// })();