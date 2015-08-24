'use strict';
let app = require('../lib/index');
let request = require('supertest');
let should = require('should');

describe('test for router', function() {
  describe('GET', function() {
    it('get props', function (done) {
      request(app.listen())
        .get('/posts/0/id')
        .end(function (err, res) {
          res.text.should.be.eql('1');
          done();
        });
    });

    it('get props with query', function (done) {
      request(app.listen())
        .get('/posts/0?id=1')
        .expect(200)
        .end(function (err, res) {
          res.body.should.containEql({id: '1'});
          done();
        });
    });
  });
});
