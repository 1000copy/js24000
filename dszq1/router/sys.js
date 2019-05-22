var express = require('express')
var router = express.Router()
var bodyparser = require('body-parser')
var Book = require('../lib/book')
// 1. 用户注册表单 `GET /registion`
router.get('/populate',async function(req,res){
	try{
		await Book.clearall()
		var book = [
			{title:"swift",cover:'swift.png'},
			{title:"vuejs",cover:'vuejs.jpg'},
			{title:"http",cover:'http.jpg'},
			{title:"git",cover:'git.jpg'},]
		book.forEach(async function(item){
			var fs = require('fs')
			book.cover = fs.readFileSync(`public/img/${item.cover}`)
			book.title = item.title
			await Book.save(book)
		})
		res.send('ready')
	}catch(e){
		console.log(e)
	}
})
router.get('/initbookswithsvg',async function(req,res){
	try{
		await Book.clearall()
		var ans = true 
		var total =  23
		for (var i = 0; i < total; i++) {
			var number = i + 1
			var svg = `<?xml version="1.0" encoding="iso-8859-1"?>
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg"
		 viewBox="0 0 100 100">
		<circle cx="50" cy="50" r="48" stroke="black" stroke-width="8" fill="yellow"></circle>
		<text x="50%" y="50%" fill="red" dominant-baseline="middle" text-anchor="middle" font-size="70"
			font-weight="bold">${number}</text>
	</svg>`
			var fs = require('fs')
			var tmp = './tmp';
			if (!fs.existsSync(tmp)){
			    fs.mkdirSync(tmp);
			}
			fs.writeFileSync(`${number}.svg`,svg)
			var command = `qlmanage -t -s 100 -o ${tmp} ${number}.svg `
			const execSync = require('child_process').execSync;
			code = execSync(command);
			var svgfile = `${tmp}/${number}.svg.png`
			ans = ans && fs.existsSync(svgfile)
			var book = {}
			var fs = require('fs')
			book.cover = fs.readFileSync(svgfile)
			book.title = number
			await Book.save(book)
		}
		res.send(ans?'exist':"not exists")	
	}catch(e){
		console.log(e)
	}
})
module.exports = router