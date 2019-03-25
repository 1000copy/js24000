var p = require('node-html-parser');
 
const root = p.parse('<ul id="list"><li>Hello World</li></ul>');
 
// console.log(root.firstChild.structure);
// ul#list
//   li
//     #text
 
// console.log(root.querySelector('#list'));
console.log(root.querySelector('#list').innerHTML);