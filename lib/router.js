'use strict';
import Router from 'koa-router';
import _ from 'lodash';

function router(db) {
  let router = new Router();
  //GET
  router.get('/:objectName/*', function* (){
    let objectName = this.params.objectName;
    let index = this.params[0].split('/').join('.');

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

export default router;
