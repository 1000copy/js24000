
const request = require('supertest');
var express = require('../src')
var rparam = require('../src/rparam')
var assert = require('chai').assert
var app
describe('app.server', function(){
  describe('params', function(){
    (function(){
      app = express()
      app.get('/user/:id',function(req,res){
        res.end(req.params.id)
      })
    })()
    it('param', function(){
      request(app.server)
      .get('/user/reco')
      .expect(200)
      .expect('reco')
      .end(function(err, res) {
        if (err) throw err;
      });
    })
    
    it('param multi', function(){
      (function(){
        app = express()
        app.get('/user/:id/name/:name',function(req,res){
          res.end(req.params.id+req.params.name)
        })
      })()
      request(app.server)
      .get('/user/1/name/reco')
      .expect(200)
      .expect('1reco')
      .end(function(err, res) {
        if (err) throw err;
      });
    })
  })
  describe('app.server', function(){
    beforeEach(function(){
        app = express()
        app.use(function(req,res){
          res.setHeader('x-use1','true')
        },function(req,res){
          res.setHeader('x-use2','true')
        })
        var hs = [
            function(req,res){
              res.setHeader('x',1)
            },
            function(req,res){
              res.end('multihandler')
            }
          ]
        app.get('/multihandler1',
          function(req,res){res.setHeader('m2','true')},
          function(req,res){res.setHeader('m3','true');res.end('multihandler1')})
        app.get('/multihandler',hs)
        app.get('/',function(req,res){
          res.end('get')
        })
        app.post('/',function(req,res){
          res.end('post')
        })
        app.delete('/',function(req,res){
          res.end('delete')
        })
        app.put('/',function(req,res){
          res.end('put')
        })
    })
    it('should multihandler', function(){
      request(app.server)
      .get('/multihandler1')    
      .expect(200)
      .expect('m2','true')
      .expect('m3','true')
      .expect('multihandler1')
      .end(function(err, res) {
        if (err) throw err;
      });
    })
    it('get', function(){
      request(app.server)
      .get('/')
      .expect('x-use1','true')
      .expect('x-use2','true')
      .expect(200)
      .expect('get')
      .end(function(err, res) {
        if (err) throw err;
      });
    })
  })
})
