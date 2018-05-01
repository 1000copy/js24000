var foo = function(){
	const http = require('http')
	const server = http.createServer(function (req,res) {
		res.end('echo')
	})
	server.listen(3000)
}
foo()
// curl localhost:3000
// echo