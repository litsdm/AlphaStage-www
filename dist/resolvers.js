'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongodb = require('mongodb');

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = _db2.default.get();

var Games = db.collection('games');
var Users = db.collection('users');

var prepare = function prepare(o) {
  o._id = o._id.toString();
  return o;
};

var resolvers = {
  Query: {
    game: function game(root, _ref) {
      var _id = _ref._id;
      return regeneratorRuntime.async(function game$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = prepare;
              _context.next = 3;
              return regeneratorRuntime.awrap(Games.findOne((0, _mongodb.ObjectId)(_id)));

            case 3:
              _context.t1 = _context.sent;
              return _context.abrupt('return', (0, _context.t0)(_context.t1));

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, null, undefined);
    },
    games: function games() {
      return regeneratorRuntime.async(function games$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(Games.find({}).toArray());

            case 2:
              _context2.t0 = prepare;
              return _context2.abrupt('return', _context2.sent.map(_context2.t0));

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, null, undefined);
    },
    user: function user(root, _ref2) {
      var _id = _ref2._id;
      return regeneratorRuntime.async(function user$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = prepare;
              _context3.next = 3;
              return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(_id)));

            case 3:
              _context3.t1 = _context3.sent;
              return _context3.abrupt('return', (0, _context3.t0)(_context3.t1));

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, null, undefined);
    },
    users: function users() {
      return regeneratorRuntime.async(function users$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(Users.find({}).toArray());

            case 2:
              _context4.t0 = prepare;
              return _context4.abrupt('return', _context4.sent.map(_context4.t0));

            case 4:
            case 'end':
              return _context4.stop();
          }
        }
      }, null, undefined);
    }
  },
  Game: {
    developers: function developers(_ref3) {
      var gameId = _ref3.gameId;
      return regeneratorRuntime.async(function developers$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(Users.find({ gameIds: gameId }).toArray());

            case 2:
              _context5.t0 = prepare;
              return _context5.abrupt('return', _context5.sent.map(_context5.t0));

            case 4:
            case 'end':
              return _context5.stop();
          }
        }
      }, null, undefined);
    }
  },
  User: {
    games: function games(_ref4) {
      var userId = _ref4.userId;
      return regeneratorRuntime.async(function games$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(Games.find({ developerIds: userId }).toArray());

            case 2:
              _context6.t0 = prepare;
              return _context6.abrupt('return', _context6.sent.map(_context6.t0));

            case 4:
            case 'end':
              return _context6.stop();
          }
        }
      }, null, undefined);
    }
  },
  Mutation: {
    createGame: function createGame(root, args, context, info) {
      var res;
      return regeneratorRuntime.async(function createGame$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(Games.insert(args));

            case 2:
              res = _context7.sent;
              _context7.t0 = prepare;
              _context7.next = 6;
              return regeneratorRuntime.awrap(Games.findOne({ _id: res.insertedIds[0] }));

            case 6:
              _context7.t1 = _context7.sent;
              return _context7.abrupt('return', (0, _context7.t0)(_context7.t1));

            case 8:
            case 'end':
              return _context7.stop();
          }
        }
      }, null, undefined);
    },
    createUser: function createUser(root, args) {
      var res;
      return regeneratorRuntime.async(function createUser$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(Users.insert(args));

            case 2:
              res = _context8.sent;
              _context8.t0 = prepare;
              _context8.next = 6;
              return regeneratorRuntime.awrap(Users.findOne({ _id: res.insertedIds[0] }));

            case 6:
              _context8.t1 = _context8.sent;
              return _context8.abrupt('return', (0, _context8.t0)(_context8.t1));

            case 8:
            case 'end':
              return _context8.stop();
          }
        }
      }, null, undefined);
    },
    setProfilePicture: function setProfilePicture(root, args) {
      var id, res;
      return regeneratorRuntime.async(function setProfilePicture$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              id = _mongodb.ObjectId.isValid(args.userId) ? new _mongodb.ObjectId(args.userId) : null;
              _context9.next = 3;
              return regeneratorRuntime.awrap(Users.update({ _id: id }, { $set: { profilePic: args.url } }));

            case 3:
              res = _context9.sent;
              _context9.t0 = prepare;
              _context9.next = 7;
              return regeneratorRuntime.awrap(Users.findOne({ _id: id }));

            case 7:
              _context9.t1 = _context9.sent;
              return _context9.abrupt('return', (0, _context9.t0)(_context9.t1));

            case 9:
            case 'end':
              return _context9.stop();
          }
        }
      }, null, undefined);
    }
  }
};

exports.default = resolvers;