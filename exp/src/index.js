"use strict"
var http = require('http');
var rparam = require('./regexpparam')
var BodyJsonParser = require('./filter/bodyjsonparser')

class App{
   constructor(options){
   	 this.paths = new Paths()
   	 this.uses = new Uses()
     this.options = options
   	 var self = this
     // use body parser
     var bjp = new BodyJsonParser({})
     this.use(bjp.middleware())
     // use static server
     if (options && options.staticRoot){
       var staticFilter = require('./filter/StaticServer')
       var s = new staticFilter(options)
       this.get('/public',s.middleware())
     }
   	 this.server = http.createServer(async(req,res)=>{
   	 	  res.statusCode = 200;
		    await self.dispatch(req,res)
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
   	  this.paths.add(new Path(path,method,handles))
   }
   get(path,handles){
    if (arguments.length > 2){
      handles = Array.prototype.slice.call(arguments,1)
    }
	  this.HTTPMETHOD(path,'GET',handles)
   }
   post(path,handles){
    if (arguments.length > 2){
      handles = Array.prototype.slice.call(arguments,1)
    }
   	this.HTTPMETHOD(path,'POST',handles)
   }
   put(path,handles){
    if (arguments.length > 2){
      handles = Array.prototype.slice.call(arguments,1)
    }
   	this.HTTPMETHOD(path,'PUT',handles)
   }
   delete(path,handles){
    if (arguments.length > 2){
      handles = Array.prototype.slice.call(arguments,1)
    }
   	this.HTTPMETHOD(path,'DELETE',handles)
   }
   async dispatch(req,res){
      await this.uses.dispatch(req,res)
  	  await this.paths.dispatch(req,res)
   }
   listen(port,cb){
		this.server.listen(port, cb);
   }
}
function createApp(options){
	return new App(options)
}
class Uses{
	constructor(){
		this.uses = []
	}
	add(use){
		this.uses.push(use)
	}
	async dispatch(req,res){
    // console.log(this.uses.length)
		for (var i = 0; i < this.uses.length; i++) {
	   		var use = this.uses[i]
	   		use && await use(req,res)
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
      return req.method == path.method &&
       (req.url == path.path || req.url.indexOf(path.path) == 0 || rparam.match(path.path,req.url) )
      
  }
  normal(url){
      return url.slice(-1) == '/'?url.slice(0,-1):url
  }
	async dispatch(req,res){
    var url = this.normal(req.url)
    for (var i=0;i<this.paths.length;i++) {
   	 	var path = this.paths[i]
      if (this.match(req,path)){
            req.params = rparam.getParam(path.path,url)
            var handles = path.handles
            if (typeof handles == 'function'){
     	 		 	   await handles(req,res) 
            }
     	 	    else{
    		   	 	for (var j=0;j<handles.length;j++) {
    		   	 		var handle = handles[j]
                req.basePath = path.path
    			   	 	await handle(req,res)
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
