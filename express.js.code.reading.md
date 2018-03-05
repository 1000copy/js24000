此为裁剪过的笔记版本。

原文在此：https://segmentfault.com/a/1190000000577149
原文在此： https://cnodejs.org/topic/5746cdcf991011691ef17b88

感谢@YiQi ，@leijianning 带来的好文章。我稍作修改和合并，只是为了更加清晰一点点。

### 基于的版本

tags：4.4.2。

### 把express代码跑起来

从一个官方示例开始：

    var express = require('express');
    var app = express();
    app.get('/', function(req, res){
      res.send('Hello World');
    });
    app.listen(3000);
    
代码运行后，访问localhost:3000显示Hello World。

## 逐行分析

首先第一行，典型的Node.js模块载入代码。载入了express框架，我们来看express源代码中的index.js。

    module.exports = require('./lib/express');
    
只是简单的导入了./lib/express.js，所以继续深挖看此代码。

    exports = module.exports = createApplication;

从这里我们可以看出，实例程序的第一行导入了函数createApplication函数。第二行则是运行了这个函数，然后返回值赋给了app。

### 函数createApplication

函数createApplication代码如下

    var EventEmitter = require('events').EventEmitter;
    var mixin = require('utils-merge');
    var proto = require('./application');
    var req = require('./request');
    var res = require('./response');
    function createApplication() {
      var app = function(req, res, next) {
        app.handle(req, res, next);
      };
      mixin(app, proto);
      mixin(app, EventEmitter.prototype);
      app.request = { __proto__: req, app: app };
      app.response = { __proto__: res, app: app };
      app.init();
      return app;
    }

### 导入

文件一开始便引入了一些基础模块，先大概介绍下这些模块做了哪些事情：

  EventEmitter: node.js的events模块
  mixin: 用来合并对象的工具
  proto: express应用的原型对象，在application.js里详细定义
  Route: 定义最基本Route对象，包括app.post,app.all等以及Router对象的http方法都是从这里继承的
  Router: 完整的Router对象，继承了Route的http方法，也集合了./router/layer.js下的路由初始化方法及路由处理方法，相当于是路由功能的整合
  req: request对象
  res: response对象

### 分析

代码的开始定义了一个函数，函数有形参req，res，next为回调函数。函数体只有一条语句，执行app.handle，此函数在application.js文件中定义，此处是通过mixin导入，它的作用就是将每对[req,res]进行逐级分发，作用在每个定义好的路由及中间件上，直到最后完成。接下来会对此函数分析。

然后来看看中间的两行：

    mixin(app, proto);
    mixin(app, EventEmitter.prototype);

函数mixin，从功能上来说，就是其实就是让app拷贝proto的所有属性，等同于app继承自proto。是的，JavaScript这样的动态语言，可以动态的指定继承的基础类。proto在头部的require处载入的是./lib/application.js文件，其中定义了大部分express的public api，如app.set,app.get,app.use等。相应的，mixin(app, EventEmitter.prototype)等同于继承EventEmitter，从而让app有了事件处理的能力。

想要具体了解mixin的同学，可以看到，此函数为在头部的require处载入的utils-merge模块，它的代码如下

    exports = module.exports = function(a, b){
      if (a && b) {
        for (var key in b) {
          a[key] = b[key];
        }
      }
      return a;
    };

再来看接下来的两行：
    
    app.request = { __proto__: req, app: app };
    app.response = { __proto__: res, app: app };

这里定义了app的request和response对象，使用了对象的字面量表示法，使其分别继承自req(顶部导入的request.js)和res(顶部导入的response.js)，并反向引用了app自身。

比如此官方实例中调用了res.send，此方法就在response.js内定义，因为指定了app.response的原型为response.js，就等于res也有了response.js的全部属性和方法，自然也就有了send方法。


接下来是app.init();。显然，作用是初始化，做哪些工作呢？

    app.init = function(){
      this.cache = {};
      this.settings = {};
      this.engines = {};
      this.defaultConfiguration();
    };

设定了cache对象(render的时候用到)，各种setting的存储对象，engines对象(模板引擎)，最后进行默认的配置。

好了，createApplication函数就是这些

### 函数get

实例程序第三行中调用了从app.get()方法。才函数是动态定义的。定义在此：

    methods.forEach(function(method){
      app[method] = function(path){
        if ('get' == method && 1 == arguments.length) return this.set(path);
        this.lazyrouter();    
        var route = this._router.route(path);
        route[method].apply(route, [].slice.call(arguments, 1));
        return this;
      };
    });

methods在顶部模块引入中定义，其实是一个包含各个HTTP请求方法的数组，代码在此https://github.com/jshttp/methods/blob/master/index.js 。数组内包括get，put等元素。

而且get方法是被'重载'的，即当app.get();的参数只有一个时候，执行的是获取变量的功能，否则，执行route组件中的route.get方法，将该路由和回调函数(即第二个参数)存储进一个栈中(后续会进一步分析)。回到原来的问题，在这里，关键是看中间的

    this.lazyrouter();
    
我们看它的具体代码
    
    app.lazyrouter = function() {
      if (!this._router) {
        this._router = new Router({
          caseSensitive: this.enabled('case sensitive routing'),
          strict: this.enabled('strict routing')
        }); 
        this._router.use(query());
        this._router.use(middleware.init(this));
      }
    };
    
此代码在第一次执行时，如果`this._route`没有定义的话，就定义它，并添加基本的路由。

注意最后一句用到了middleware模块的init方法，继续上代码：

    exports.init = function(app){
      return function expressInit(req, res, next){
        if (app.enabled('x-powered-by')) res.setHeader('X-Powered-By', 'Express');
        req.res = res;
        res.req = req;
        req.next = next;
        req.__proto__ = app.request;
        res.__proto__ = app.response;
        res.locals = res.locals || Object.create(null);
        next();
      };
    };
    
expressInit函数是一个中间件，可以给req设置X-Powered-By的值，也会初始化request和response，通过设置属性__proto__，把app.request和app.respone继承到request.js和response.js上。

### 函数listen

最开头的官方示例中还有最后一句app.listen(3000)，实现代码如下：

    app.listen = function(){
      var server = http.createServer(this);
      return server.listen.apply(server, arguments);
    };

实际上是调用了Node.js原生的http模块的CreatServer方法，代码：
  
    http.createServer(this);

中的this，就是app，也就是createApplication返回的函数，这个函数指向到app.handle(),因此，app.handle()就是所有请求的主入口。

## 路由模块出场，谈及Router，Route的关系

重新再看this.lazyrouter()，从名字来看，好像是懒加载router，那我们看看源码：

    app.lazyrouter = function lazyrouter() {
      if (!this._router) {
        this._router = new Router({
          caseSensitive: this.enabled('case sensitive routing'),
          strict: this.enabled('strict routing')
        });
    
        this._router.use(query(this.get('query parser fn')));
        this._router.use(middleware.init(this));
      }
    };

果然是，如果_router不存在，就new一个Router出来，而这个Router就是我们刚才在目录结构中看到的router目录，也就是今天的主角Router模块。

##  Router.route

继续上边的代码，加载完_router之后，执行了`this._router.route(path)`这样一行代码，那这行代码做了什么呢？我们在router目录下的index.js中找到了它的实现：

    proto.route = function route(path) {
      var route = new Route(path);
      var layer = new Layer(path, {
          sensitive: this.caseSensitive,
          strict: this.strict,
          end: true
        }, route.dispatch.bind(route));
      layer.route = route;
      this.stack.push(layer);
      return route;
    };
    
我们可以看到，这里new了一个Route对象，并且new了一个Layer对象，然后将Route对象赋值给layer.route，最后将这个Layer添加到stack数组中。那这个Route又是什么呢，它和Router模块有什么关系呢，我来说下我的理解：

1. Route模块对应的是route.js，主要是来处理路由信息的，每条路由都会生成一个Route实例。
2. Router模块对应的是index.js，Router是一个route的集合，在Router模块下可以定义多个route
3. 每个express创建的实例都会懒加载一个_router来进行路由处理，这个_router就是一个Router类型。

这就是Route和Router的关系。

好了，我们接着看`函数get()`的代码，拿到route对象之后，通过apply的方式调用了route的对应method函数，假如我们现在使用的是get函数，那现在method就等于get。看到这里大家就会发现，express实例在处理路由的步骤是这样的：

1. 先创建一个Router对象
2. 然后用Router对象和对应的path来生成一个Route对象
3. 最后由Route对象来处理具体的路由实现

## route.method

好了，那接下来我们继续深入研究，看看route.method究竟做了什么，我们找到route.js文件，发现如下的代码：

    methods.forEach(function(method){
      Route.prototype[method] = function(){
        var handles = flatten(slice.call(arguments));
        for (var i = 0; i < handles.length; i++) {
          var handle = handles[i];
          if (typeof handle !== 'function') {
            var type = toString.call(handle);
            var msg = 'Route.' + method + '() requires callback functions but got a ' + type;
            throw new Error(msg);
          }
          debug('%s %s', method, this.path);
          var layer = Layer('/', {}, handle);
          layer.method = method;
          this.methods[method] = true;
          this.stack.push(layer);
        }
        return this;
      };
    });

原来route和application运用了同样的技巧，通过循环methods来动态添加method函数。

我们直接看函数内部实现，首先通过入参获取到handles，这里的handles就是我们定义的路由中间件函数，这里我们可以看到是一个数组，所以我们可以给一个路由添加多个中间件函数。常用的设置路由函数是这样的，

  route.get("/hello",function(){})

但是，为了方便，设置多个也是可以的：

  route.get("/hello",function(){},function(){},function(){}))

因此，handles是一个数组。接下来循环handles，在每个循环中利用handle来创建一个Layer对象，然后将Layer对象push到stack中去，这个stack其实是Route内部维护的一个数组，用来存放所有的Layer对象。那么，对象Layer是什么东西呢？

我们可以route对象设置Layer的代码：

  route.get("/hello",function(){})

我们可以app对象设置Layer的代码：

  app.get("/hello",function(){})

也就是说，在route层面，也可以如同app一样的设置Layer，因此官方文档中提到了，route被认为是mini app，就是这样来的。
## Layer对象

那我们继续往下看，看看layer.js的源代码：

    function Layer(path, options, fn) {
      if (!(this instanceof Layer)) {
        return new Layer(path, options, fn);
      }
    
      debug('new %s', path);
      var opts = options || {};
    
      this.handle = fn;
      this.name = fn.name || '<anonymous>';
      this.params = undefined;
      this.path = undefined;
      this.regexp = pathRegexp(path, this.keys = [], opts);
    
      if (path === '/' && opts.end === false) {
        this.regexp.fast_slash = true;
      }
    }

上边是Layer的构造函数，我们可以看到这里定义handle，params，path和regexp等几个主要的属性：

1. handle，它就是我们刚刚在route中创建Layer对象传入的中间件函数
2. params其实就是req.params
3. path就是我们定义路由时传入的path。
4. regexp进行路由匹配的时候就是靠它来搞定的，而它的值是由pathRegexp得来的，其实这个pathRegexp对应的是一个第三方模块path-to-regexp，它的功能是将path转换成regexp，具体用法大家可以自行查看。

### Layer.match()

看完属性，我们再来看看Layer有什么方法：

    Layer.prototype.match = function match(path) {
      if (path == null) {
        // no path, nothing matches
        this.params = undefined;
        this.path = undefined;
        return false;
      }
      if (this.regexp.fast_slash) {
        // fast path non-ending match for / (everything matches)
        this.params = {};
        this.path = '';
        return true;
      }
      var m = this.regexp.exec(path);
      if (!m) {
        this.params = undefined;
        this.path = undefined;
        return false;
      }
      // store values
      this.params = {};
      this.path = m[0];
      var keys = this.keys;
      var params = this.params;
      for (var i = 1; i < m.length; i++) {
        var key = keys[i - 1];
        var prop = key.name;
        var val = decode_param(m[i]);
        if (val !== undefined || !(hasOwnProperty.call(params, prop))) {
          params[prop] = val;
        }
      }
      return true;
    };

match函数主要用来匹配path的，当我们向express发送一个http请求时，当前请求对应的是哪个路由，就是通过这个match函数来判断的，如果path中带有参数，match还会把参数提取出来赋值给params，所以说match是整个路由中很重要的一点。

    Layer.prototype.handle_error = function handle_error(error, req, res, next) {
      var fn = this.handle;
    
      if (fn.length !== 4) {
        // not a standard error handler
        return next(error);
      }
    
      try {
        fn(error, req, res, next);
      } catch (err) {
        next(err);
      }
    };

这个是错误处理函数，专门用来处理错误的。

  Layer.prototype.handle_request = function handle(req, res, next) {
    var fn = this.handle;

    if (fn.length > 3) {
      // not a standard request handler
      return next();
    }

    try {
      fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };

从上边的代码我们可以看到调用了fn，而这个fn就是layer的handle属性，就是我们定义路由时传入的路由中间件,现在总结下，Layer到底是做什么的呢，它和Route之间的关系如何。说说我的理解：

 1. 可以发现Route和Layer是一对多的关系,每个Route都会维护一个Layer数组
 2. 每个Route代表一个路由
 3. 每个Layer对应的是路由的每一个中间件函数。Layer存储了每个路由的path和handle等信息，并且实现了match和handle的功能。

讲完了Route和Layer的关系，我们再来回头看看Router和Layer的关系，我们再来看看index.js中prop.route的代码：

    proto.route = function route(path) {
      var route = new Route(path);
      var layer = new Layer(path, {
        sensitive: this.caseSensitive,
        strict: this.strict,
        end: true
      }, route.dispatch.bind(route));
      layer.route = route;
      this.stack.push(layer);
      return route;
    };

从代码我们可以看出来Router每次添加一个route，都会把route包装到layer中，并且将layer添加到自己的stack中。

那为什么要把route包装到layer中呢，前边我们已经仔细研究了Layer模块的代码，我们发现Layer具有match和handle的功能，这样我们就可以通过Layer的match来进行route的匹配了。

## route.dispatch()

这里有一个关键点我们需要特别讲解下，上边的代码中在创建Layer对象的时候传入的handle函数为route.dispatch.bind(route)，我们来看看route.js中的route.dispatch：

    Route.prototype.dispatch = function dispatch(req, res, done) {
      var idx = 0;
      var stack = this.stack;
      if (stack.length === 0) {
        return done();
      }
      var method = req.method.toLowerCase();
      if (method === 'head' && !this.methods['head']) {
        method = 'get';
      }
      req.route = this;
      next();
      function next(err) {
        if (err && err === 'route') {
          return done();
        }
        var layer = stack[idx++];
        if (!layer) {
          return done(err);
        }
        if (layer.method && layer.method !== method) {
          return next(err);
        }
        if (err) {
          layer.handle_error(err, req, res, next);
        } else {
          layer.handle_request(req, res, next);
        }
      }
    };

我们发现dispatch中通过next()获取stack中的每一个layer来执行相应的路由中间件，这样就保证了我们定义在路由上的多个中间件函数被按照定义的顺序依次执行。到这里我们已经知道了单个路由是被如何执行的，那我们定义的多个路由之间又是如何被依次执行的呢，现在我们来看看index.js中的handle函数（有删减）：

    proto.handle = function handle(req, res, out) {
      // middleware and routes
      var stack = self.stack;
      next();
      function next(err) {
        // find next matching layer
        var layer;
        var match;
        var route;
        while (match !== true && idx < stack.length) {
          layer = stack[idx++];
          match = matchLayer(layer, path);
          route = layer.route;
          if (match !== true) {
            continue;
          }
          if (!route) {
            // process non-route handlers normally
            continue;
          }
        }
        // no match
        if (match !== true) {
          return done(layerError);
        }
        // this should be done for the layer
        self.process_params(layer, paramcalled, req, res, function (err) {
          if (err) {
            return next(layerError || err);
          }
          if (route) {
            return layer.handle_request(req, res, next);
          }
          trim_prefix(layer, layerError, layerPath, path);
        });
      }
    };

此处代码也是利用next()，来处理stack中的每一个Layer，这里的stack是Router.stack，stack中存贮了多个route对应的layer

1. 获取到每个layer对象
2. 用请求的path与layer进行匹配，此处匹配用的是layer.match
3.1 如果能匹配到对应的layer，则获得layer.route
3.2 如果route不为空则执行对应的layer.handle_request()
3.3 如果route为空说明这个layer是通过use()添加的非路由中间件

需要特别说明的是，如果通过use()添加的非路由中间件没有指定path，则会在layer.match中默认返回true，也就是说，没有指定path的非路由中间件会匹配所有的http请求。

## 总结

我们接下来来重新梳理一下。看看express究竟是如何对http请求进行路由的。

1. 当客户端发送一个http请求后，会先进入express实例对象对应的router.handle函数中
2. router.handle函数会通过next()遍历stack中的每一个layer进行match
3. 如果match返回true，则获取layer.route，执行route.dispatch函数
4. route.dispatch同样是通过next()遍历stack中的每一个layer，然后执行layer.handle_request，也就是调用中间件函数。
5. 直到所有的中间件函数被执行完毕，整个路由处理结束。

