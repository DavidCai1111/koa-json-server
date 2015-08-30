#!/usr/bin/env iojs --harmony-arrow-functions

'use strict';
let R = require('ramda');
let _ = R.__;
let jsonDateBase = process.argv[2];
let port = process.argv[3];

//check json db
R.ifElse(
  R.and(
    R.not(R.equals(undefined, jsonDateBase)),
    R.not(R.equals('.json', R.takeLast(5, jsonDateBase)))
  ),
  () => {
    console.log(`invalid json: ${jsonDateBase}`);
    process.exit(1);
  }
);

//check port
R.ifElse(
  R.isNil(_),
  () => {
    console.log(`invalid port: ${port}`);
    process.exit(1);
  }
)(port);

console.log('=============================');
console.log('welcome to use koa-json-server!');

let path = require('path')
let koa = require('koa');
let bodyParser = require('koa-bodyparser');
let gzip = require('koa-gzip');
let json = require('koa-json');
let logger = require('koa-logger');
let lowdb = require('lowdb');
let router = require('./router');

let dbPath = path.join(process.cwd(), jsonDateBase);
console.log(`use json data base: ${dbPath}`);
let db = lowdb(dbPath);
let app = koa();

app.use(bodyParser());
app.use(logger());
app.use(json());
app.use(gzip());
let webRouter = router(db);
app.use(webRouter.routes());
app.use(webRouter.allowedMethods());

module.exports = app;

app.listen(port);
console.log(`koa-json-server listened at port ${port}, god bless it`);
console.log('=============================');
