"use strict"
var http = require('http');
var rparam = require('./rparam')
class App{
   constructor(){
   	 this.paths = new Paths()
   	 this.uses = new Uses()
   	 var self = this
   	 this.server = http.createServer(function(req,res){
   	 	 res.statusCode = 200;
		    self.dispatch(req,res)
   	 });
   }
   use(handles){
   	  if (arguments.length > 1){
   	  	 handles = Array.prototype.slice.call(arguments,0)
   	  }else{
   	  	 handles = [handles]
   	  }
   	  for (var i = 0; i < handles.length; i++) {
   	  	var handle = handles[i]
   	  	this.uses.add(handle)
   	  }
   }
   HTTPMETHOD(path,method,handles){
   	  if (arguments.length > 3){
   	  	 handles = Array.prototype.slice.call(arguments,2)
   	  }
   	  this.paths.add(new Path(path,method,handles))
   }
   get(path,handles){
     var handles1 = typeof arguments.length >= 3?handles:Array.prototype.slice.call(arguments,1)
     // console.log(handles1)
	  this.HTTPMETHOD(path,'GET',handles1)
   }
   post(path,handles){
   	this.HTTPMETHOD(path,'POST',handles)
   }
   put(path,handles){
   	  this.HTTPMETHOD(path,'PUT',handles)
   }
   delete(path,handles){
   	  this.HTTPMETHOD(path,'DELETE',handles)
   }
   dispatch(req,res){
     // console.log(this.paths.paths)
	  this.uses.dispatch(req,res)
	  this.paths.dispatch(req,res)
   }
   listen(port,cb){
		this.server.listen(port, cb);
   }
}
function createApp(){
	return new App()
}
class Uses{
	constructor(){
		this.uses = []
	}
	add(use){
		this.uses.push(use)
	}
	dispatch(req,res){
		for (var i = 0; i < this.uses.length; i++) {
	   		var use = this.uses[i]
	   		use && use(req,res)
	   	}
	}
}
class Paths{
	constructor(){
		this.paths = []
	}
	add(path){
		this.paths.push(path)
	}
   match(req,path){
      return req.method == path.method && (req.url == path.path || rparam.match(path.path,req.url) )//req.url == '/user/reco')
   }
	dispatch(req,res){
     for (var i=0;i<this.paths.length;i++) {
   	 	var path = this.paths[i]
   	 	if (this.match(req,path)){
            req.params = rparam.getParam(path.path,req.url)
            var handles = path.handles
      		if (typeof handles == 'function')
   	 			handles(req,res)
   	 		else{
		   	 	for (var j=0;j<handles.length;j++) {
		   	 		var handle = handles[j]
			   	 	handle(req,res)
		   	 	}
             }
	   	}
   	  }
	}
}
class Path{
	constructor(path,method,handles){
		this.path = path
		this.method = method
		this.handles = handles
	}
}
// return true if route is /user/:id and url is /user/reco
exports = module.exports = createApp
