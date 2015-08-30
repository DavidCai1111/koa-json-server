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

  describe('POST', function() {
    it('set props', function (done) {
      request(app.listen())
        .post('/posts/0')
        .send({'id': '2'})
        .end(function (err, res) {
          res.body.should.containEql({id: '2'});
          done();
        })
    });

    //tmp
    it('set props back', function (done) {
      request(app.listen())
        .post('/posts/0')
        .send({'id': '1'})
        .end(function (err, res) {
          res.body.should.containEql({id: '1'});
          done();
        })
    });
  });

  describe('PUT', function() {
    it('change props', function (done) {
      request(app.listen())
        .put('/posts/0')
        .send({'id': '2'})
        .end(function (err, res) {
          res.body.should.containEql({id: '2'});
          done();
        })
    });

    it('change undefined props', function (done) {
      request(app.listen())
        .put('/posts/0')
        .send({'idd': '2'})
        .end(function (err, res) {
          res.body.should.not.containEql({idd: '2'});
          done();
        })
    });

    //tmp
    it('change props back', function (done) {
      request(app.listen())
        .put('/posts/0')
        .send({'id': '1'})
        .end(function (err, res) {
          res.body.should.containEql({id: '1'});
          done();
        })
    });
  });

  describe('DELETE', function() {
    it('delete props with query', function (done) {
      request(app.listen())
        .delete('/posts/0/id')
        .expect(200)
        .end(function (err, res) {
          res.body.should.not.containEql({id: '1'});
          done();
        });
    });
  });
});
