'use strict';
let request = require('co-supertest');
let app = require('../lib/index');
let should = require('should');

describe('test for router', function() {
  describe('GET', function() {
    it('get props', function* () {
      yield request(app)
        .get('/posts/id')
        .expect(200)
        .end();
    })
  });
});
