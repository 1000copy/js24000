var exp = require('../src')
var app = exp()
var StaticMiddleware = require('../src/static')
var s = new StaticMiddleware({root:"./public/"})
app.get('/',s.middleware())
// var BodyJsonParser = require('../src/bodyjsonparser')
// var bjp = new BodyJsonParser({})
// app.use(bjp.middleware())
app.listen(3000,function(){
	console.log('listen on 3000')
})
// curl http://localhost:3000 