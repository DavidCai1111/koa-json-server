'use strict';
let koa = require('koa');
let bodyParser = require('koa-bodyparser');
let gzip = require('koa-gzip');
let json = require('koa-json');
let logger = require('koa-logger');
// let lowdb = require('lowdb');
let config = require('../db');
let router = require('./router');

// let db = lowdb('../db.json');
let app = koa();

app.use(bodyParser());
app.use(logger());
app.use(json());
app.use(gzip());
let webRouter = router(config);
app.use(webRouter.routes());
app.use(webRouter.allowedMethods());

module.exports = app;

app.listen(3000);
console.log(`koa-json-server listened at port 3000, god bless it`);
