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
    var layer = new Layer('/', fn);
    layer.method = 'get';
    this.methods['get'] = true;
    this.stack.push(layer);
    return this;
};
http.METHODS.forEach(function(method) {
    method = method.toLowerCase();
    Route.prototype[method] = function(fn) {
        var layer = new Layer('/', fn);
        layer.method = method;
        this.methods[method] = true;
        this.stack.push(layer);
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
        var layer = stack[idx++];
        if(method !== layer.method) {
            return next(err);
        }
        if(err) {
            //主动报错
            layer.handle_error(err, req, res, next);
        } else {
            layer.handle_request(req, res, next);
        }
    }
    next();
};
function Layer(path, fn) {
    this.handle = fn;
    this.name = fn.name || '<anonymous>';
    this.path = path;
      //是否为*
    this.fast_star = (path === '*' ? true : false);
    if(!this.fast_star) {
       this.path = path;
    }
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
Layer.prototype.match = function(path) {
  //如果为*，匹配
  if(this.fast_star) {
    this.path = '';
    return true;
  }
  //如果是普通路由，从后匹配
  if(this.route && this.path === path.slice(-this.path.length)) {
    return true;
  }
  if (!this.route) {
    //不带路径的中间件
    if (this.path === '/') {
      this.path = '';
      return true;
    }
    //带路径中间件
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
        route[method].call(route, fn);
        return this;
    };
});
proto.handle = function(req, res, done) {
    var self = this,
        method = req.method,
        idx = 0, stack = self.stack,
        removed = '', slashAdded = false;
    //获取当前父路径
    var parentUrl = req.baseUrl || '';
    //保存父路径
    req.baseUrl = parentUrl;
    //保存原始路径
    req.orginalUrl = req.orginalUrl || req.url;
    function next(err) {
        var layerError = (err === 'route' ? null : err);
        //如果有移除，复原原有路径
        if(slashAdded) {
            req.url = '';
            slashAdded = false;
        }
        //如果有移除，复原原有路径信息
        if(removed.length !== 0) {
            req.baseUrl = parentUrl;
            req.url = removed + req.url;
            removed = '';
        }
        //跳过路由系统
        if(layerError === 'router') {
            return done(null);
        }
        if(idx >= stack.length || layerError) {
            return done(layerError);
        }
        //获取当前路径
        var path = require('url').parse(req.url).pathname;
        var layer = stack[idx++];
        //匹配，执行
        if(layer.match(path)) {
            //处理中间件
            if(!layer.route) {
                //要移除的部分路径
                removed = layer.path;
                //设置当前路径
                req.url = req.url.substr(removed.length);
                if(req.url === '') {
                    req.url = '/' + req.url;
                    slashAdded = true;
                }
                //设置当前路径的父路径
                req.baseUrl = parentUrl + removed;
                //调用处理函数
                layer.handle_request(req, res, next);    
            } else if(layer.route._handles_method(method)) {
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
    var layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route;
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
    var layer = new Layer(path, fn);
    layer.route = undefined;
    this.stack.push(layer);
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
