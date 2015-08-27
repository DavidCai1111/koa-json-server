'use strict';
let R = require('ramda');
let _ = R.__;

//utils for query
let removeTailSlash = function (path) {
  R.ifElse(
    R.equals('/'),
    () => {
      path = R.dropLast(1, path);
    },
    () => {
      return path;
    }
  )(R.last(path));
  return path;
}

let getObject = function (db, path, query) {
  let ret = null;
  let object = db.object[path.shift()];
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
            R.cond([[R.equals(R.T()), () => ret = result]])(queryResult)
          },
          () => ret = result
        )(hasQuery)
    }]
  ])(isValidPath);

  return ret;
}

let getVal = function (db, path, query) {
  let ret = getObject(db, path, query);
  R.cond([[R.equals(null), () => ret = 'not found']])(ret);
  return ret;
};

let setVal = function (db, path, query, newVal) {
  let rawObject = getObject(db, path, query);
  R.ifElse(
    R.equals(null),
    () => {
      rawObject = 'not found';
    },
    () => {
      R.mapObjIndexed(
        (val, key) => {
          rawObject[key] = val;
        },
        newVal
      );
    }
  )(rawObject);
  db.save();
  
  return rawObject;
};

//constructors
exports.getVal = getVal;
exports.setVal = setVal;
exports.removeTailSlash = removeTailSlash;
