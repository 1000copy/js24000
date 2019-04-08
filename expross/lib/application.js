var http = require("http")
var Route = function(path) {
    this.path = path;
    this.stack = [];
    this.methods = {};
};
Route.prototype._handles_method = function(method) {
    var name = method.toLowerCase();
    return Boolean(this.methods[name]);
};
Route.prototype.get = function(fn) {
    var layer = new Road('get',fn);
    layer.method = 'get';
    this.methods['get'] = true;
    this.stack.push(layer);
    return this;
};
// var arr = Array.prototype.slice.call(arguments,1)
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
Route.prototype.dispatch = function(req, res, done) {
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
            road.handle_error(err, req, res, next);
        } else {
            road.handle_request(req, res, next);
        }
    }
    next();
};
// Layer
function Layer(path, fn,route) {
    this.name = fn.name || '<anonymous>';
    this.handle = fn;
    this.path = path;
    this.route = route
      //是否为*
    this.fast_star = path === '*' ;
}
//简单处理
Layer.prototype.handle_request = function (req, res, next) {
  var fn = this.handle;
  try {
    fn(req, res, next);
  } catch (err) {
    next(err);
  }
};//简单匹配
Layer.prototype.match = function(path,req) {
  //如果为*，匹配
  if(this.fast_star) {
    this.path = '';
    return true;
  }
  if(this.route ) {//route
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
  }else{// middleware
    if (this.path === '/') {// no path
      this.path = '';
      return true;
    }
    // have path
    if(this.path === path.slice(0, this.path.length)) {
      return true;
    }
  }
  return false;
};
Layer.prototype.handle_error = function (error, req, res, next) {
  var fn = this.handle;
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
// router
var proto = {};
http.METHODS.forEach(function(method) {
    method = method.toLowerCase();
    proto[method] = function(path, fn) {
        var route = this.route(path);
        // route[method].call(route, fn);
        route[method].apply(route, Array.prototype.slice.call(arguments,1));
        return this;
    };
});
function UrlMonster(req){
    this.req = req
    this.removed = ''
    this.slashAdded = false
    this.parentUrl = this.req.baseUrl || ''
}
UrlMonster.prototype.init = function(){
    // The URL path on which a router instance was mounted.
    this.req.baseUrl = this.parentUrl;
    // This property is much like req.url; however, 
    // it retains the original request URL, allowing you to rewrite 
    // req.url freely for internal routing purposes. F
    this.req.orginalUrl = this.req.orginalUrl || this.req.url;
}
UrlMonster.prototype.nextBegin = function(){
    // 如果添加过slash
    if(this.slashAdded) {
        this.req.url = '';
        this.slashAdded = false;
    }
    //如果有移除，复原原有路径信息
    if(this.removed.length !== 0) {
        this.req.baseUrl =this.parentUrl;
        this.req.url = this.removed + this.req.url;
        this.removed = '';
    }
}
UrlMonster.prototype.beforeMiddlewareHandle=function(layer){
    //移除上一级路径
    this.removed = layer.path;
    this.req.url = this.req.url.substr(this.removed.length);
    if(this.req.url === '') {
        this.req.url = '/' + this.req.url;
        this.slashAdded = true;
    }
    //设置当前路径的父路径
    this.req.baseUrl = this.parentUrl + this.removed;
}
proto.handle = function(req, res, done) {
    var
        idx = 0, stack = this.stack;
    var urlm = new UrlMonster(req)
    function next(err) {
        if(err === 'router') {
            return done(null);
        }
        var layerError = (err === 'route' ? null : err);
        // var layerError = err;
        //跳过路由系统
        if(layerError) {
            return done(layerError);
        }
        if(idx >= stack.length) {
            return done(layerError);
        }
        urlm.nextBegin()
        //获取当前路径
        var path = require('url').parse(req.url).pathname;
        var layer = stack[idx++];
        //匹配，执行
        if(layer.match(path,req)) {
            //处理中间件
            if(!layer.route) {
                urlm.beforeMiddlewareHandle(layer)
                //调用处理函数
                layer.handle_request(req, res, next);    
            } else if(layer.route._handles_method(req.method)) {
                //处理路由
                layer.handle_request(req, res, next);
            }    
        } else {
            layer.handle_error(layerError, req, res, next);
        }
    }
    next();
};
proto.route =  function route(path) {
    var route = new Route(path);
    var layer = new Layer(path, route.dispatch.bind(route),route);
    // layer.route = route;
    this.stack.push(layer);
    return route;
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

    var router = this._router;
    router.handle(req, res, done);
};
http.METHODS.forEach(function(method) {
    method = method.toLowerCase();
    Application.prototype[method] = function(path, fn) {
        this._router[method].apply(this._router, arguments);
        return this;
    };
});
Application.prototype.use = function(fn) {
    var path = '/',
        router = this._router;
    //路径挂载
    if(typeof fn !== 'function') {
        path = fn;
        fn = arguments[1];
    }
    router.use(path, fn);
    return this;
};
function createApp(){
    return new Application()
}
exports = module.exports.createApp = createApp
exports = module.exports.Router = Router
// Road
// 5. 每个Route内部也是一个Layer对象，但是Route内部的Layer和Router内部的Layer是存在一定的差异性。
// *   Router内部的Layer，主要包含path、route属性。
// *   Route 内部的Layer，主要包含method、handle属性。
// todo : remove this.route ,这里没有可能使用
function Road(method,fn) {
    this.handle = fn;
    this.method = method;
    this.name = fn.name || '<anonymous>';
}
//简单处理
Road.prototype.handle_request = function (req, res, next) {
  var fn = this.handle;
  try {
    fn(req, res, next);
  } catch (err) {
    next(err);
  }
};//简单匹配
Road.prototype.handle_error = function (error, req, res, next) {
  var fn = this.handle;
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
