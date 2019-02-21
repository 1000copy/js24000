var exp = require('../src')
var app = exp({staticRoot:"./public/"})
// var BodyJsonParser = require('../src/bodyjsonparser')
// var bjp = new BodyJsonParser({})
// app.use(bjp.middleware())
app.listen(3000,function(){
	console.log('listen on 3000')
})
// curl http://localhost:3000 