require.config({
	    paths : {
	        "jquery" : ["http://cdn.bootcss.com/jquery/1.11.3/jquery.min"],
	        "include":["include.js"],
	        "semantic":["http://cdn.bootcss.com/semantic-ui/2.1.8/semantic.min.js"],
	    }
	})
define(function(){
    require(["jquery","include","semantic"],function($,include){
    	$(document).ready(function () {
	      window.doload = function (){
	      $('.ui.dropdown').dropdown();
	    }
	    console.log("loaded")
	    })
    })
})