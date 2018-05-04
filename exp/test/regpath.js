var rparam = require('../src/rparam')
var assert = require('chai').assert

  describe('regexp', function(){
    it('match', function(){
      var a =rparam.match('/user/:id','/user/reco')
      var b =rparam.getParam('/user/:id','/user/reco')
      assert.equal(a,true)
      assert.equal(b.id,'reco' )
    })
  })