var posts = [
	{"id":"5b1e1b63a6f55a10f4ba2121","views":22,"comments":5,"title":"title","content":"content","avatar":"avatar.png"},
    {"id":"5b1e1b63a6f55a10f4ba2121","views":22,"comments":42,"title":"title","content":"content","avatar":"avatar.png"},
	{"id":"5b1e1b63a6f55a10f4ba2121","views":22,"comments":1,"title":"title","content":"content","avatar":"avatar.png"}
]

const express = require('express')
const app = express()


const PostModel = require('./models/posts')

app.get('/api/posts', (req, res,next) => {
	// ObjectId("5b1e1b34a6f55a10f4ba211f")
	// PostModel.getPosts()
	PostModel.getPosts("5b1e1b34a6f55a10f4ba211f")
    .then(function (posts) {
    	console.log(posts)
     	res.writeHead(200, {'Content-Type': 'text/json'})
	    res.end(JSON.stringify(posts))
	 })
    .catch(function(err){console.log(err)})
})
app.get('/old/posts.json', (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/json'})
    res.end(JSON.stringify(posts))
})
app.use(express.static('html'))
app.listen(3000, () => console.log('Example app listening on port 3000!'))
