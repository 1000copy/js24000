var TurndownService = require('turndown')

var tds = new TurndownService()
var markdowns = [
	'<h1>Hello world!</h1>',
	'<h2>Hello world!</h2>',
	'<img src="1.jpg" alt="1.img"></h1>',
	'<ul><li>1</li><li>2</li></ul>'
]
for (var i = markdowns.length - 1; i >= 0; i--) {
	var str = markdowns[i]
	console.log(tds.turndown(str))
}

