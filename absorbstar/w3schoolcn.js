var list = "https://www.w3cschool.cn/electronmanual/"
// gethrefs(a,(r)=>{console.log(r)})
var selector = 'div.splitter-sidebar'
var useragent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:65.0) Gecko/20100101 Firefox/65.0'
var prefix = '/electronmanual/'
function gethrefs(url,callback){
  // console.log(url,filename,selector)
  var request = require("request");
  console.log(`retriving url ${url}`);
  request({
    uri: url,
    headers: {
      'User-Agent': useragent
    }
  }, function(error, response, body) {
    // console.log(body);
    if(error){
      console.log(error)
      return
    }else{
      const cheerio = require('cheerio')
      const $ = cheerio.load(body)
      var result = []
      $(selector).find('a').each(function(index,element){
        var href = $(element).attr('href')
        if (href && href.startsWith(prefix) && !href.endsWith('/'))
          // result.push(href)
          result.push(href.slice(prefix.length))
      })
      callback(result)
    }
  });
}

var urlprefix = 'https://www.w3cschool.cn/'
var fileprefix = 'stars/w3cschool/'
function fix3(str){
  return '000' + str.slice(-3)
}
gethrefs(list,(urls)=>{
	console.log(urls)
	var stars = []
	for (var i = 0; i <= urls.length - 1; i++) {
  // for (var i = 0; i <= 3; i++) {
      if(urls[i]!='list'){
  		  var obj = {url : prefix + urls[i],
  			  filename : fix3(i) + "." + urls[i] + '.md',
  			  selector : 'div.project-body'}
  		  stars.push(obj)
      }
	}
	const fs = require('fs')
	const path = require('path')
	// ENOENT
	if (!fs.existsSync(fileprefix)){
		fs.mkdirSync(path.join(__dirname, fileprefix))
	}
	var absort = require('./absort')
	for (var i = stars.length - 1; i >= 0; i--) {
	  if(!stars[i].ignore)
	    absort(urlprefix + stars[i].url,fileprefix + stars[i].filename,stars[i].selector)
	}

})
