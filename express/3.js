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
//   this.handles = []
// }
// proto.handle = function (req, res) {
//   for (var i = 0; i < this.handles.length; i++) {
//     var layer = this.handles[i]
//     layer.handle_request(req, res)
//   }
// }
// methods.forEach(function(method) {
//   proto[method] = function(fn) {
//     var layer = new Layer(method, fn)
//     this.handles.push(layer)
//   }
// })
proto.init = function () {
  this.route = new Route()
}

proto.handle = function () {
  // 对handles中的函数进行遍历
  this.route.dispatch.apply(this.route, slice.call(arguments))
}
methods = ["get","post","put","delete"]
methods.forEach(function (method) {
  proto[method] = function (fn) {
    this.route[method].apply(this.route, slice.call(arguments))
  }
})
//route
var slice = Array.prototype.slice

module.exports = Route

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
// app.get(function(req, res) {
//   res.end('You send GET request')
// })
// app.post(function(req, res) {
//   res.end('You send POST request')
// })
// app.put(function(req, res) {
//   res.end('You send PUT request')
// })
// app.delete(function(req, res) {
//   res.end('You send DELETE request')
// })
app.get(function (req, res, next) {
  req.user = {
    name: 'foo'
  }
  next()
})

app.get(function (req, res, next) {
  req.article = {
    title: 'bar'
  }
  next()
}, function (req, res, next) {
  res.end(`User name is ${req.user.name} and Artitle title is ${req.article.title}`)
})
console.dir(app.route.stack)
console.dir(app.route.methods)
app.listen(3000)

// curl http://localhost:3000 -X GET
// curl http://localhost:3000 -X POST 
// curl http://localhost:3000 -X PUT 
// curl http://localhost:3000 -X DELETE

// curl http://localhost:3000 