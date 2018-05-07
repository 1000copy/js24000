var exp = require('../src')
var Static1 = require('../src/static')
var app = exp()
var option = {root:"."}

option.extensionFilter = function(req,res,ext){
	
}
var s = new Static1(option)

app.get('/public',s.getStatic())
app.listen(3000,function(){
	console.log('listen on 3000')
})
