'use strict';
import _ from 'lodash';

const tools = {};

tools.parseQs = function  (qs) {
  return _.map(qs, (value, key) => {
    return `${key}.${value}`;
  });
};

export default tools;
