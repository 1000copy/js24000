var slice = Array.prototype.slice
methods = ["get","post","put","delete"]
var http = require('http')
// mixin
var mixin = function(a, b){
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};
// express
function createServer() {
  var app = function (req, res) {
    app.handle(req, res)
  }
  mixin(app, proto, false)
  app.init()
  return app
}
var proto = Object.create(null)
proto.listen = function (port) {
  var server = http.createServer(this)
  return server.listen.apply(server, arguments)
}
// proto.init = function () {
//   this.route = new Route()
// }

// proto.handle = function () {
//   this.route.dispatch.apply(this.route, slice.call(arguments))
// }
// methods.forEach(function (method) {
//   proto[method] = function (fn) {
//     this.route[method].apply(this.route, slice.call(arguments))
//   }
// })
proto.init = function () {

}
proto.lazyrouter = function lazyrouter () {
  if (!this._router) {
    this._router = new Router({})
  }
}
proto.handle = function (req, res, callback) {
  const router = this._router
  router.handle(req, res)
}
methods.forEach(function (method) {
  proto[method] = function (path) {
    this.lazyrouter()
    const route = this._router.route(path)
    route[method].apply(route, slice.call(arguments, 1))
    return this
  }
})
//route
function Route () {
  this.stack = []
  this.methods = {}
}

Route.prototype._handle_method = function (method) {
  var name = method.toLowerCase()
  return Boolean(this.methods[name])
}

Route.prototype.dispatch = function (req, res) {
  var method = req.method.toLowerCase()
  var stack = this.stack
  var idx = 0
  next()
  function next () {
    var layer = stack[idx++]
    if (layer.method && layer.method !== method) {
      return next()
    }
    layer.handle_request(req, res, next)
  }
}

methods.forEach(function (method) {
  Route.prototype[method] = function () {
    var handles = (slice.call(arguments))
    for (var i = 0; i < handles.length; i++) {
      var layer = new Layer(method, handles[i])
      this.methods[method] = true
      this.stack.push(layer)
    }
  }
})
// layer
function Layer(method, fn) {
  this.method = method,
  this.handle = fn
}
Layer.prototype.handle_method = function (req) {
  return this.method.toLowerCase() === req.method.toLowerCase()
}
Layer.prototype.handle_request = function(req, res, next) {

  if (!this.handle_method(req)) return
  var fn = this.handle
  try {
    fn(req, res, next)
  } catch (err) {
    throw err
  }
}
// app
var express = createServer
var app = express()
app.get('/foo', function (req, res, next) {
  res.end('Welcome to GET /foo')
})

app.get('/bar', function (req, res, next) {
  res.end('Welcome to GET /bar')
})

app.post('/foo', function (req, res, next) {
  res.end('Welcome to POST /foo')
})
app.listen(3000)

// curl http://localhost:3000 -X GET
// curl http://localhost:3000 -X POST 
// curl http://localhost:3000 -X PUT 
// curl http://localhost:3000 -X DELETE