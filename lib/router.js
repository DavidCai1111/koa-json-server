'use strict';
let Router = require('koa-router');
let utils = require('./utils');

function webRouter(db) {
  let router = new Router();

  //GET
  router.get('/*', function* () {
    let path = utils.removeTailSlash(this.params['0']).split('/');
    this.body = utils.getVal(db, path, this.query);
  });

  //POST
  router.post('/*', function* () {
    let path = utils.removeTailSlash(this.params['0']).split('/');
    this.body = this.request.body;
    this.body = utils.setVal(db, path, this.query, this.body);
  });

  return router;
}

module.exports = webRouter;
