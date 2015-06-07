'use strict';
import util from 'util';

const tools = {};

tools.findEntityById = function(arr, id) {
  return arr.find((elem) => String(elem.id) === String(id));
};

tools.findEntityByProps = function(arr, propsObj) {
  if (!util.isObject(propsObj)) throw new Error(`${propsObj} must be an object`);
  return arr.find((elem) => this.contains(propsObj, elem));
};

tools.contains = function(obj, fatherObj) {
  for (let [k, v] of Object.entries(obj)) {
    if (v !== fatherObj[k]) {
      return false;
    }
  }
  return true;
};

export default tools;
