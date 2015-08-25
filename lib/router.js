'use strict';
let Router = require('koa-router');
let utils = require('./utils');

function webRouter(db) {
  let router = new Router();
  //GET
  router.get('/*', function* () {
    let path = this.params['0'].split('/');
    let result = db[path.shift()];
    this.body = utils.getVal(result, path, this.query);
  });

  return router;
}

module.exports = webRouter;
