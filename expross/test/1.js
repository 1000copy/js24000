const request = require('supertest');
const app = require('../src');
request(app.server)
  .get('/')
  .expect(200)
  .expect('get')
  .end(function(err, res) {
    if (err) throw err;
    console.log('OK')
  });
request(app.server)
  .post('/')
  .expect(200)
  .expect('post')
  .end(function(err, res) {
    if (err) throw err;
    console.log('OK')
  });
request(app.server)
  .put('/')
  .expect(200)
  .expect('put')
  .end(function(err, res) {
    if (err) throw err;
    console.log('OK')
  });
  request(app.server)
    .delete('/')
    .expect(200)
    .expect('delete')
    .end(function(err, res) {
      if (err) throw err;
      console.log('OK')
    });