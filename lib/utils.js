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

  R.cond([
    [R.equals(R.T()),
    () => {
      let result = R.path(path, object);
      R.ifElse(
        R.equals(R.T()),
        () => {
          let queryResult = R.equals(
            R.pick(R.keys(query), result),
            query
          )
          R.cond([
            [R.equals(R.T()), () => ret = result]
          ])(queryResult)
        },
        () => ret = result
      )(hasQuery)
    }]
  ])(isValidPath);

  return ret;
};

//constructors
exports.getVal = getVal;
