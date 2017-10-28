'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongodb = require('mongodb');

require('dotenv').config();


var MONGO_URL = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PWD + '@ds151963.mlab.com:51963/alphastage-dev';

var _db = void 0;

var dataBase = {
  connectToServer: function connectToServer(done) {
    _mongodb.MongoClient.connect(MONGO_URL, function (err, db) {
      _db = db;
      return done(err);
    });
  },
  get: function get() {
    return _db;
  }
};

exports.default = dataBase;