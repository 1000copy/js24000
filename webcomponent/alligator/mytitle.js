// class MyTitle extends HTMLElement {
//   connectedCallback() {
//     this.innerHTML = `
//       <style>
//         h1 {
//           color: hotpink;
//         }
//       </style>
//       <h1>Hello Alligator!</h1>
//     `;
//   }
// }
const template = document.createElement('template');
template.innerHTML = `
      <style>
        h1 {
          color: hotpink;
        }
      </style>
      <h1>Hello Alligator!</h1>
  `;
class MyTitle extends HTMLElement {
  constructor(){
    super()
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('my-title', MyTitle);
// shadwo node is valuable for not seak