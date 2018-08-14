require.config({
      paths : {
          "jquery" : ["../html/vendor/jquery.min"]
      }
  })
// define(function(){
//     require(["jquery","s"],function($){
//      $(document).ready(function () {
//       $('.ui.dropdown').dropdown();
      
//    })
//     })
// })

require(["jquery"],function($){
  includeHTML(null,$)
})

function includeHTML(callback,$) {
  var z = document.querySelectorAll('[r-include]')
  for (i = 0; i < z.length; i++) {
    var elmnt = z[i];
    var file = elmnt.getAttribute("r-include");
    if (file) {
      var xhttp = new XMLHttpRequest();
      xhttp.elmnt = elmnt
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          //when schema is file not http ,this.status == 0
          if (this.status == 200 || this.status == 0) {
            this.elmnt.innerHTML = this.responseText;
            var doload = this.elmnt.getAttribute("onload")
            console.log(doload,window[doload])
            if (typeof window[doload] == 'function'){
              window[doload]($)
            }
          }
          if (this.status == 404) {this.elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          this.elmnt.removeAttribute("r-include");
        }
      } 
      xhttp.open("GET", file, true);
      xhttp.send();
    }
  }
  return;
}
function isSupported(){
  if ('import' in document.createElement('link')) {
        console.log("supported")
  } else {
      console.log("not supported")
  }
}  
