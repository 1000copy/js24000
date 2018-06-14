require.config({
	    paths : {
	        "jquery" : ["../html/vendor/jquery.min"],
	        "s":["../html/vendor/semantic.min"]
	    }
	})
// define(function(){
//     require(["jquery","s"],function($){
//     	$(document).ready(function () {
// 		   $('.ui.dropdown').dropdown();
			
// 		})
//     })
// })

require(["jquery","s"],function($){
	function initdropdown(){
    	$(document).ready(function () {
		   $('.ui.dropdown').dropdown();
			
		})
    }
    initdropdown()
})