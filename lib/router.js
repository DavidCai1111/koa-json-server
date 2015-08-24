'use strict';
let Router = require('koa-router');
let _ = require('lodash');
let utils = require('./utils');

function web_router(db) {
  let router = new Router();
  //GET
  router.get('/*', function* (){
    let keys = this.params['0'].split('/');
    let result = db[keys.shift()];
    let path = keys.join('.');
    this.body = utils.getVal(result, path ,this.query);
  });

  return router;
}

module.exports = web_router;
