'use strict';
let R = require('ramda');
let _ = R.__

//utils for query
let getVal = function (object, path, query) {
  let ret = 'not found';
  let isValidPath = R.and(
    R.not(R.equals(path, {})),
    R.not(R.equals(R.path(path, object), undefined))
  )
  let hasQuery = R.not(R.equals(query, {}));

  if (isValidPath) {
    let result = R.path(path, object);
    if (hasQuery) {
      let queryResult = R.equals(
        R.pick(R.keys(query), result),
        query
      )
      if (queryResult) ret = result;
    } else {
      ret = result;
    }
  }

  return ret;
};

//constructors
exports.getVal = getVal;
