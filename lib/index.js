'use strict';
import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import gzip from 'koa-gzip';
import json from 'koa-json';
import logger from 'koa-logger';
import lowdb from 'lowdb';
import config from '../db';
import router from './router';

// let db = lowdb('../db.json');
let app = koa();

app.use(bodyParser());
app.use(logger());
app.use(json());
app.use(gzip());
let webRouter = router(config);
app.use(webRouter.routes());
app.use(webRouter.allowedMethods());

app.listen(3000);
console.log(`koa-json-server listened at port 3000, god bless it`);
