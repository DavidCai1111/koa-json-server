'use strict';
let _ = require('lodash');

//utils for query
let getVal = function (object, path, query) {
  let ret = 'not found';
  
  if (!_.isEmpty(path) && _.has(object, path)) {
    let result = _.get(object, path);
    if (query && query !== {}) {
      let isArray = _.isArray(result);
      if (!isArray) result = [result];
      if (_.some(result, query)) {
        if (!isArray) result = result[0];
        ret = result;
      }
    }else {
      ret = result
    }
  }
  return ret;
};

//constructors
exports.getVal = getVal;
