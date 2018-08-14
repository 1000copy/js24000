require.config({
	    paths : {
	        "jquery" : ["http://cdn.bootcss.com/jquery/1.11.3/jquery.min"],
	        "include":["includeb"],
	        "semantic":["http://cdn.bootcss.com/semantic-ui/2.1.8/semantic.min"],
	    }
	})

require(["jquery","include","semantic"],function($,include){
	$(document).ready(function () {
      window.doload = function (){
	      $('.ui.dropdown').dropdown();
	      console.log("inited")
	  }
      // console.log(window.doload)
    })
})
