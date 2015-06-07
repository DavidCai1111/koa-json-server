import koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import gzip from 'koa-gzip';
import json from 'koa-json';
import logger from 'koa-logger';
import lowdb from 'lowdb';
import config from '../db';
import tools from './tools';

let db = lowdb('../db.json');
let app = koa();
let router = new Router();

router.get('/:key', function*() {
  let key = this.params.key;
  if (config[key] === undefined) {
    yield this.body = {
      errorMessage: `resource: ${key} not exist`
    };
  } else {
    yield this.body = config[key];
  }
});

router.get('/:key/:id', function*() {
  let [key, id] = [this.params.key, this.params.id];
  let entity;
  if (config[key] === undefined) {
    yield this.body = {
      errorMessage: `resource: ${key} not exist`
    };
  } else if ((entity = tools.findEntityById(config[key], id)) === undefined) {
    yield this.body = {
      errorMessage: `resource: ${key} do not has an entity with id: ${id}`
    };
  } else {
    yield this.body = entity;
  }
});

router.get('/:key/:id/:property', function*() {
  let [key, id, property] = [this.params.key, this.params.id, this.params.property];
  let entity;
  if (config[key] === undefined) {
    yield this.body = {
      errorMessage: `resource: ${key} not exist`
    };
  } else if ((entity = tools.findEntityById(config[key], id)) === undefined) {
    yield this.body = {
      errorMessage: `resource: ${key} do not has an entity with id: ${id}`
    };
  } else if (entity[property] === undefined) {
    yield this.body = {
      errorMessage: `resource: ${key} with id: ${id} do not has the property: ${property}`
    };
  } else {
    yield this.body = {
      [property]: entity[property]
    };
  }
});

app.use(bodyParser());
app.use(logger());
app.use(json());
app.use(gzip());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
console.log(`koa-json-server listen at port 3000, god bless it`);
