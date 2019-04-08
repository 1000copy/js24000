function getPath(url){
        return require('url').parse(url).pathname;
}
var http = require("http")
var Route = function(path) {
    this.path = path;
    this.stack = [];
    this.methods = {};
};
Route.prototype.support = function(method) {
    var name = method.toLowerCase();
    return Boolean(this.methods[name]);
};
function flatten(answer,arr){
    // var answer = []
    arr.forEach(function(item){
        if (Array.isArray(item))
            flatten(answer,item)
        else
            answer.push(item)
    })
    return answer
}
http.METHODS.forEach(function(method) {
    method = method.toLowerCase();
    Route.prototype[method] = function(fn) {
        this.methods[method] = true;
        var fns = Array.prototype.slice.call(arguments)
        fns = flatten([],fns)
        // console.log('arguments',fns,arguments)
        fns.forEach((fn)=>{
            this.stack.push(new Road(method,fn));    
        })
        
        return this;
    };
});
Route.prototype.handle = function(req, res, done) {
    var self = this,
        method = req.method.toLowerCase(),
        idx = 0, stack = self.stack;
    function next(err) {
        //跳过route
        if(err && err === 'route') {
            return done();
        }
        //跳过整个路由系统
        if(err && err === 'router') {
            return done(err);
        }
        //越界
        if(idx >= stack.length) {
            return done(err);
        }
        //不等枚举下一个
        var road = stack[idx++];
        if(method !== road.method) {
            return next(err);
        }
        if(err) {
            //主动报错
            road.handleError(err, req, res, next);
        } else {
            road.handle(req, res, next);
        }
    }
    next();
};
// Layer
function Layer(path, fn) {
    if (fn){
        this.name = fn.name || '<anonymous>';
        this.handler = fn;
    }
    this.path = path;
}
//简单处理
Layer.prototype.handle = function (req, res, next) {
  var fn = this.handler;
  try {
    fn(req, res, next);
  } catch (err) {
    next(err);
  }
};//简单匹配
Layer.prototype.match = function(req) {
    var path = getPath(req.url)
    if (this.path === '/') {// no path
      this.path = '';
      return true;
    }
    return this.path === path.slice(0, this.path.length)
};
Layer.prototype.handleError = function (error, req, res, next) {
  var fn = this.handler;
  //如果函数参数不是标准的4个参数，返回错误信息
  if(fn && fn.length !== 4) {
    return next(error);
  }
  try {
    fn(error, req, res, next);
  } catch (err) {
    next(err);
  }
};
Layer.prototype.doHandle = function(req,res,next){
	var layer = this
	layer.handle(req, res, next);    
}
// Layer With Route
function RouteLayer(path){
    Layer.call(this,path)
    this.route = new Route(path)
}
RouteLayer.prototype = Object.create(Layer.prototype);
RouteLayer.prototype.handle = function (req, res, next) {
  try {
    this.route.handle(req,res,next)
  } catch (err) {
    next(err);
  }
};
RouteLayer.prototype.match = function(req) {
    var path = getPath(req.url)
    if (this.path === path.slice(-this.path.length))
        return true
    else{
        var rparam = require('./regpath')
        if (rparam.match(this.path,path)){
            var p = rparam.getParam(this.path,path)
            req.params = Object.assign(req.params||{},p)
            return true
        }
    }
    return false;
};
RouteLayer.prototype.doHandle = function(req,res,next){
	var layer = this 
	if(layer.route.support(req.method)) {
        layer.handle(req, res, next);    
    }    
}
// router
var proto = {};
http.METHODS.forEach(function(method) {
    method = method.toLowerCase();
    proto[method] = function(path, fn) {
        var layer = new RouteLayer(path);
        this.stack.push(layer);
        layer.route[method].apply(layer.route, Array.prototype.slice.call(arguments,1));
        return this;
    };
});
function UrlMonster(req){
    this.req = req
    this.removed = ''
    this.parentUrl = this.req.baseUrl || ''
    // The URL path on which a router instance was mounted.
    this.req.baseUrl = this.parentUrl;
    // This property is much like req.url; however, 
    // it retains the original request URL, allowing you to rewrite 
    // req.url freely for internal routing purposes. F
    this.req.orginalUrl = this.req.orginalUrl || this.req.url;
}
UrlMonster.prototype.leave = function(){
    if(this.removed.length !== 0) {
        this.req.baseUrl =this.parentUrl;
        this.req.url = this.removed + this.req.url;
        this.removed = '';
    }
}
UrlMonster.prototype.enter=function(layer){
    if(!layer.route) {
	    this.removed = layer.path;
	    this.req.url = this.req.url.substr(this.removed.length);
	    //设置当前路径的父路径
	    this.req.baseUrl = this.parentUrl + this.removed;
	}
}
proto.handle = function(req, res, done) {
    var idx = 0;
    var urlm = new UrlMonster(req)
    var next = (err)=> {
        if(err && err === 'route') {
            return done();
        }
        //跳过整个路由系统
        if(err && err === 'router') {
            return done(err);
        }
        var layerError = (err === 'route' ? null : err);
        if(layerError || idx >= this.stack.length) {
            return done(layerError);
        }
        var layer = this.stack[idx++];
        urlm.leave()
		//匹配，执行
        if(layer.match(req)) {
        	urlm.enter(layer)
            layer.doHandle(req,res,next)
        } 
    }
    next();
};
proto.use = function(fn) {
    var path = '/';
    //路径挂载
    if(typeof fn !== 'function') {
        path = fn;
        fn = arguments[1];
    }
    var arr = flatten([],Array.prototype.slice.call(arguments))
    // console.log(arr)
    arr.forEach((fn)=>{
        var layer = new Layer(path, fn);
        this.stack.push(layer);    
    })
    return this;
};
var Router = function() {
    function router(req, res, next) {
        router.handle(req, res, next);
    }

    Object.setPrototypeOf(router, proto);

    router.stack = [];
    return router;
};
// Application
function Application() {
    this._router = new Router();
}
Application.prototype.listen = function(port, cb) {
    var self = this;
    var server = http.createServer(function(req, res) {
        self.handle(req, res);
    });
    return server.listen.apply(server, arguments);
};
Application.prototype.handle = function(req, res) {
    if(!res.send) {
        res.send = function(body) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(body);
        };
    }
    var done = function finalhandler(err) {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });

        if(err) {
            res.end('404: ' + err);    
        } else {
            var msg = 'Cannot ' + req.method + ' ' + req.url;
            res.end(msg);    
        }
    };

    // var router = this._router;
    this._router.handle(req, res, done);
};
http.METHODS.forEach(function(method) {
    method = method.toLowerCase();
    Application.prototype[method] = function(path, fn) {
        this._router[method].apply(this._router, arguments);
        return this;
    };
});
Application.prototype.use = function(fn) {
    var path = '/';
    //路径挂载
    if(typeof fn !== 'function') {
        path = fn;
        fn = arguments[1];
    }
    this._router.use(path, fn);
    return this;
};
function createApp(){
    return new Application()
}
function Road(method,fn) {
    this.handler = fn;
    this.method = method;
    this.name = fn.name || '<anonymous>';
}
//简单处理
Road.prototype.handle = function (req, res, next) {
  var fn = this.handler;
  try {
    fn(req, res, next);
  } catch (err) {
    next(err);
  }
};//简单匹配
Road.prototype.handleError = function (error, req, res, next) {
  var fn = this.handler;
  //如果函数参数不是标准的4个参数，返回错误信息
  if(fn.length !== 4) {
    return next(error);
  }
  try {
    fn(error, req, res, next);
  } catch (err) {
    next(err);
  }
};
exports = module.exports = createApp
exports = module.exports.Router = Router

