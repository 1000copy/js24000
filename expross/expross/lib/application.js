function Layer(path, fn) {
    this.handle = fn;
    this.name = fn.name || '<anonymous>';
    this.path = path;
}
//简单处理
Layer.prototype.handle_request = function (req, res) {
  var fn = this.handle;

  if(fn) {
      fn(req, res);
  }
};
//简单匹配
Layer.prototype.match = function (path) {
    if(path === this.path || path === '*') {
        return true;
    }

    return false;
};
var Router = function() {
    this.stack = [new Layer('*', function(req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('404');        
    })];
};
Router.prototype.handle = function(req, res) {
    var self = this;
    for(var i=1,len=self.stack.length; i<len; i++) {
        if(self.stack[i].match(req.url)) {
            return self.stack[i].handle_request(req, res);
        }
    }
    return self.stack[0].handle_request(req, res);
};
Router.prototype.get = function(path, fn) {
    this.stack.push(new Layer(path, fn));
};
//
var http = require("http")
var router = [{
    path: '*',
    method: '*',
    handle: function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('404');
    }
}];
var app = {
    _router: new Router(),
    get: function(path, fn) {
        return this._router.get(path, fn);
    },
    listen:function(port,cb){
        var self = this
        var server = http.createServer(function(req, res) {
            if(!res.send) {
                res.send = function(body) {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    res.end(body);
                };
            }
            return self._router.handle(req, res);
        });
        return server.listen.apply(server, arguments);
    },
};
exports = module.exports = app
