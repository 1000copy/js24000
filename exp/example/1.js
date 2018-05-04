var exp = require('../src')
var static = require('../src/static')
var app = exp()
app.get('/public',static({root:".",public:"/public"}))
app.listen(3000,function(){
	console.log('listen on 3000')
})
