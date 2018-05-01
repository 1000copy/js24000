const http = require('http')
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
  const app = function (req, res) {
    app.handle(req, res)
  }
  mixin(app, proto, false)
  app.init()
  return app
}
const proto = Object.create(null)
proto.listen = function (port) {
  const server = http.createServer(this)
  return server.listen.apply(server, arguments)
}
proto.init = function () {
  this.handles = []
}
proto.handle = function (req, res) {
  for (var i = 0; i < this.handles.length; i++) {
    var layer = this.handles[i]
    layer.handle_request(req, res)
  }
}
methods = ["get","post","put","delete"]
methods.forEach(function(method) {
  proto[method] = function(fn) {
    const layer = new Layer(method, fn)
    this.handles.push(layer)
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
  const fn = this.handle
  try {
    fn(req, res, next)
  } catch (err) {
    throw err
  }
}
// app
const express = createServer

const app = express()
app.get(function(req, res) {
  res.end('You send GET request')
})
app.post(function(req, res) {
  res.end('You send POST request')
})
app.put(function(req, res) {
  res.end('You send PUT request')
})
app.delete(function(req, res) {
  res.end('You send DELETE request')
})
console.dir(app)
app.listen(3000)

// curl http://localhost:3000 -X GET
// curl http://localhost:3000 -X POST 
// curl http://localhost:3000 -X PUT 
// curl http://localhost:3000 -X DELETE

