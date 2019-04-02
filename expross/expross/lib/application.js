var Router = function() {
    this.stack = [{
        path: '*',
        method: '*',
        handle: function(req, res) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('404');
        }
    }];
};
Router.prototype.get = function(path, fn) {
    this.stack.push({
        path: path,
        method: 'GET',
        handle: fn
    });
};
Router.prototype.handle = function(req, res) {
    for(var i=1,len=this.stack.length; i<len; i++) {
        if((req.url === this.stack[i].path || this.stack[i].path === '*') &&
            (req.method === this.stack[i].method || this.stack[i].method === '*')) {
            return this.stack[i].handle && this.stack[i].handle(req, res);
        }
    }
    return this.stack[0].handle && this.stack[0].handle(req, res);
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
        varself = this
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
