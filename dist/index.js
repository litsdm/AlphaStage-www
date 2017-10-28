'use strict';

require('babel-core/register');

require('babel-polyfill');

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_db2.default.connectToServer(function (err) {
  if (!err) {
    require('./server').server();
  } else {
    console.log(err);
  }
});