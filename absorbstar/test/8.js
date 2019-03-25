const cheerio = require('cheerio')
const $ = cheerio.load('<h2 class="title">Hello <b>world ,HI</b></h2>')

var s = $('h2.title').html()
// var s = $('h2.title').text()
console.log(s)