
var after = require('after');
var express = require('../')
  , Router = express.Router
  , request = require('supertest')
  , assert = require('assert')
  , methods = require('methods');

describe('mytest', function(){
  it('handle router in router', function(done){
      var app = express();
      var r2 = new express.Router()
      r2.get('/user', function(req, res,next){
        res.send("tj")
      });
      var r1 = new express.Router()
      r1.use(r2)
      app.use("/user",r1)
      console.log(app._router.stack[2].handle.stack[0].handle.stack[0].route.stack[0].handle.toString())
      request(app)
      .get('/user/user')
      .expect('tj', done);
    })
   xit('handle', function(done){
      var app = express();
      var r = new express.Router()
      r.use(function(req, res,next){
        next()
      },function(req, res,next){
        next()
      });
      r.get('/user', function(req, res,next){
        next()
      },function(req, res){
        res.end('tj');
      });
      app.use(r)
      console.log(app._router.stack[2].handle.stack[0])
      request(app)
      .get('/USER')
      .expect('tj', done);
    })
   xit('handle', function(done){
      var app = express();
      app.use(function(req, res,next){
        next()
      },function(req, res,next){
        next()
      });
      app.get('/user', function(req, res,next){
        next()
      },function(req, res){
        res.end('tj');
      });
      app.post('/user', function(req, res){
        res.end('tj');
      });
      console.log(app._router.stack[4].route.stack)
      request(app)
      .get('/USER')
      .expect('tj', done);
    })
  xit('fast_slash fast_star', function(done){
    var app = express();

    app.get('*', function(req,res){res.send(req.params[0])});
    
    request(app)
    .get('/users')
    .expect(200, '/users', done);
  })
  xit('fast_slash fast_star', function(done){
    var app = express();

    app.get('/', function(req,res){res.send(req.params)});
    
    request(app)
    .get('/')
    .expect(200, '1', done);
  })
  xit('should map logic for a single param', function(done){
      var app = express();

      app.param('id', function(req, res, next, id){
        id = Number(id);
        if (isNaN(id)) return next('route');
        // if (true) return next('route');
        req.params.id = id;
        next();
      });

      app.get('/user/:id', function(req, res){
        var id = req.params.id;
        id.should.be.a.Number()
        res.send('' + id);
      });

      request(app)
      .get('/user/123')
      .expect('123', done);
    })
   xit('should support .use of other routers', function(done){
    var router = new Router();
    var another = new Router();

    another.get('/bar', function(req, res){
      res.end();
    });
    router.use('/foo', another);
    console.log(router.stack[0].handle)
    router.handle({ url: '/foo/bar', method: 'GET' }, { end: done });
  });

  xit('should be .use()able', function(done){
    var app = express();

    var calls = [];

    
    app.get('/', function(req, res, next){
      calls.push('before')
      next();
    },function(req, res, next){
      calls.push('GET /')
      next();
      // res.end();
    },function(req, res, next){
      calls.push('after')
      res.end();
    });

    
    request(app)
    .get('/')
    .end(function(res){
      calls.should.eql(['before', 'GET /', 'after'])
      done();
    })
  })
  xit('should overwrite existing req.params by default', function(done){
    var app = express();
    var router = new express.Router();

    router.get('/r1', function(req, res){
      res.send(req.params);
    });
    router.get('/r2', function(req, res){
      res.send(req.params);
    });
    app.use(router);
    app.get('/a1', function(req, res){
      res.send(req.params);
    });
    app.get('/a2', function(req, res){
      // res.send(req.params);
    });
    // console.log(app._router.stack)
    console.log(app._router.stack[2].handle.stack)
    request(app)
    .get('/a1')
    .expect(200, done);
  })
  xit('should be .use()able', function(done){
    var app = express();

    var calls = [];

    app.use(function(req, res, next){
      calls.push('before');
      next();
    });

    app.get('/', function(req, res, next){
      calls.push('GET /')
      next();
      // res.end();
    });

    app.use(function(req, res, next){
      calls.push('after');
      res.end();
    });

    request(app)
    .get('/')
    .end(function(res){
      calls.should.eql(['before', 'GET /', 'after'])
      done();
    })
  })
  xit('should default to the routes defined', function(done){
    var app = express();

    app.del('/', function(){});
    app.get('/users', function(req, res){});
    app.put('/users', function(req, res){});

    request(app)
    .options('/users')
    .expect('Allow', 'GET,HEAD,PUT')
    .expect(200, 'GET,HEAD,PUT', done);
  })
  xit('should restore req.params after leaving router', function(done){
    var app = express();
    var router = new express.Router();

    function handler1(req, res, next){
      res.setHeader('x-user-id', String(req.params.id));
      next()
    }

    function handler2(req, res){
      res.send(req.params.id);
    }

    router.use(function(req, res, next){
      res.setHeader('x-router', String(req.params.id));
      next();
    });

    app.get('/user/:id', handler1, router, handler2);

    request(app)
    .get('/user/1')
    .expect('x-router', 'undefined')
    .expect('x-user-id', '1')
    .expect(200, '1', done);
  })
})
