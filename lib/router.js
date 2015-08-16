'use strict';
import Router from 'koa-router';
import _ from 'lodash';

function web_router(db) {
  let router = new Router();
  //GET
  router.get('/*', function* (){
    let keys = this.params['0'].split('/');
    let objectName = keys.shift();
    let index = keys.join('.');
    _.forEach(db[objectName], (entry) => {
      if (_.has(entry, index)) {
        if (_.isEmpty(this.query)){
          this.body = _.get(entry, index);
        }else {
          if (_.every(_.get(entry, index), this.query)) {
            this.body = _.get(entry, index);
          }
        }
      }
    });

    if (this.body === undefined){
      this.body = 'key not exists';
    }
  });

  return router;
}

export default web_router;
