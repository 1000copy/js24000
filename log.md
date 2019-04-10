## 
版本调整到4.16.2 。更简单。

## 单独跑某个testcase

mocha --require test/support/env --reporter spec --bail --check-leaks --no-exit  
mocha --require test/support/env --reporter spec --bail --check-leaks --no-exit test/ test/acceptance/
mocha --require test/support/env --reporter spec --bail --check-leaks --no-exit test/ test/acceptance/ -g ' Router should support .use of other' 

## 挖出 expressjs-obj-model.md


## 2018年03月05日

The Unbelievable History of the Express JavaScript Framework

## 原来5.0.0-alpha.1 / 2014-11-06也在开发了。

## 2.0 可以clone了。终于...

感觉2.0代码超级简洁，从这里开始？

## 1.0.1 依赖connect-form.git，也找不到了。

## 99e3130f3c90a129ab443db853d4698fc6529d60 无法更新js-oo submoduel，估计已经删除了。所以，需要一直向head前进，找到不依赖js-oo的版本了。

##  调试express的方法

1. 激活inspector protocol

    mocha --require test/support/env --reporter spec --bail --check-leaks --no-exit test/app.router.js --inspect-brk -g 'should decode correct params'
    打开chrome ，到这里：chrome://inspect

2. 打印调试信息：

    DEBUG=express:* mocha --require test/support/env --reporter spec --bail --check-leaks --no-exit test/app.router.js -g 'should decode correct params
3. vs code 

首先安装mocha

	npm i mocha

点击到debug标签，添加一个配置，内容为：

	{
	    "version": "0.2.0",
	    "configurations": [
	        {
	            "type": "node",
	            "request": "launch",
	            "name": "mocha",
	            "program": "${workspaceFolder}/node_modules/mocha/bin/_mocha",
	            "args": ["test/unit.js"],
	        }
	    ]
	}

代码unit test

	var assert = require('assert')
	describe('app', function(){
	  it('should be callable', function(){
	    assert.equal(1,1);
	  })
	})

点击debug，点击运行按钮

##  node debug article

# 3天来的代码阅读统计，共400`~`的提交次数

 git shortlog -sne --since="01 Jun 2009" --before="31 Dec 2009"
   359  visionmedia <tj@vision-media.ca>
    34  csausdev <gareth.jones@sensis.com.au>
     1  Justin Lilly <justinlilly@gmail.com>

总数：
	$ git shortlog -sne --since="01 Jun 2009" --before="31 Nov 2019"
	  1891  Tj Holowaychuk <tj@vision-media.ca>
	  1285  visionmedia <tj@vision-media.ca>
	   950  Douglas Christopher Wilson <doug@somethingdoug.com>
	   705  TJ Holowaychuk <tj@vision-media.ca>
	    84  Jonathan Ong <jonathanrichardong@gmail.com>

硬看的话，得看一个月去了 ：）

# 2009.6 - 2009.12  半年的代码，3天看完。我开心的蹦起来。

## 2018-02-08 

###  f200be3 - PHONY 
What is the purpose of .PHONY in a makefile?

### 2052075 - js-oo as submodule 这个玩法具体怎么做？ google : how to git submodule ++  git submodule update
	.gitmodule
	[submodule "lib/support/js-oo"]
		path = lib/support/js-oo
		url = git://github.com/visionmedia/js-oo.git
  
### vs. sinatra
  Currently Express can chew through a request with a two Haml views (_page and layout_) 
  requested *2000* times with concurrency of *80* in *2.7* seconds and *723* 
    An identical Sinatra application was served with the *Thin* HTTP server
  and scored *8.3* seconds and *238* requests per second. In this situation
  Express is currently *68%* faster than Sinatra.

### Google Group ec00ccb - Added Google Groups link
	http://groups.google.com/group/express-js
### f1ce393 - Started Cookie support
	//'expires=Fri, 31-Dec-2010 23:59:59 GMT; data="some ;.= random data"; path=/; domain=.example.net'
	function(cookie) {
	  return $(cookie.split(/ *; */)).reduce({}, function(hash, pair){
	    var parts = pair.split(/ *= */)
	    hash[parts[0].toLowerCase()] = parts[1]
	    return hash
	  })
	}

### 39719af - Started haml-js support

### 190ddaa - Removed view specs for now

	使用伪装的class，重新编写插件，视图渲染，集合等

	get('/user', function(){
      render('user.html.ejs', { context: user }, function(content){
        halt(200, content)
      })
    })
    p(get('/user').body)

### 忙忙碌碌的做了一个Collection 460c2a0 - Collection readme 09-12-4 - 09-12-10 6天

	支持这样的使用方法：

	    $(['tj', 'matt', 'taylor'])
      .select(function(name){ return name.charAt(0) == 't' })
      .reject(function(name){ return name.length < 4 })
      .first()
	
	
### parseNestedParams

	function parseNestedParams(params) {
	  var parts, key
	  for (key in params)
	    if (parts = key.split('['))
	      if (parts.length > 1)
	        for (var i = 0, prop = params, len = parts.length; i < len; ++i) {
	          var name = parts[i].replace(']', '')
	          if (i == len - 1)
	            prop[name] = params[key],
	            prop = params, 
	            delete params[key]
	          else
	            prop = prop[name] = prop[name] || {}
	        }
	            
	  return params
	}
	var parseParams = function(string) {
	  var params = {}, pairs = string.split('&'), pair
	  for (var i = 0, len = pairs.length; i < len; ++i)
	    pair = pairs[i].split('='),
	    params[pair[0]] = pair[1]
	  return parseNestedParams(params)
	}
	function test(){
		var user = { user: { name: 'tj', email: 'tj@vision-media.ca' }}
      	// assert(parseParams('user[name]=tj&user[email]=tj@vision-media.ca') ==  user)
      	// parseParams('foo=bar&baz=1').should.eql { foo: 'bar', baz: '1' }
	}
	test()

### dirname()实现很简单嘛

	dirname = function(path) {
	  return path.split('/').slice(0, -1).join('/')
	}

### 一个函数支持多种参数集合的做法很常见

	function route(method) {
	  return function(path, options, fn){
	    if (options instanceof Function)
	      fn = options, options = {}
	    Express.routes.push(new Route(method, path, fn, options))
	  }
	}


### arguments像是数组，但是不是数组（可以通过console.log验证），因此不能直接argument.slice ,而必须这样：

	function toArray(arr, offset) {
	  return Array.prototype.slice.call(arr, offset)
	}

# Milestone 2603bb4 - Starting fresh

这里开始完全重写，还引入了class方法，做一个伪装的类，以此为基础开始，以伪类的方式重写代码。因为我知道最终代码的样子，所以，隔段时间还得重写
	
新开发者csausdev 进来，把TJ的文件命名的前缀去掉，放到一个新的目录内，感觉符合我的审美
就是express.core.js,express.util.js -> express/core.js ,express/util.js
类似jquery的函数命名，header(key,value),只是传入key的话，就做getter，key和value都传入的话，那么就作为setter来用

### 现成可用的escape

	function escape(html) {
	  if (html instanceof String)
	    return html
	      .replace(/&/g, '&amp;')
	      .replace(/"/g, '&quot;')
	      .replace(/</g, '&lt;')
	      .replace(/>/g, '&gt;')
	}

##  2018-02-07 学到了对user/:id类型的url的剖析方法 

# 2018年02月06日

## 原因

看apracjs，觉得得看看express才能搞懂。

## 方法

然后看了下，代码不多，有点难以阅读，于是决定拉下git repo，然后从第一天开始看。

## 感受

提交每次都不大，甚至几分钟的修改，只要说一个颗粒度的，也会提交到git内。这样就导致从最初代码到现在的代码，每次变化都不大，并且都有spec的补充，因此比较容易看懂。
我就是一个个的commit的看差异，不但可以看到整个编码的过程，感受到高手编码的特点，也从中学到不少js的技巧。TJ是真正的高手，技能全面，思维敏捷，看着代码，沉浸其中，好像高手就在我的身边写代码。它的commit log的写法是可以拿来就用的。
