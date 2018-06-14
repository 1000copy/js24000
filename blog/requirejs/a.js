require.config({
	    paths : {
	        "jquery" : ["http://cdn.bootcss.com/jquery/1.11.3/jquery.min"]
	    }
	})
define(function(){
    require(["jquery"],function($){
    	$("span").text("something new")
    })
})