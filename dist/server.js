'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _graphqlServerExpress = require('graphql-server-express');

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _mongodb = require('mongodb');

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();


var URL = 'http://localhost';
var PORT = 3001;
var JWT_SECRET = process.env.JWT_SECRET;

var server = exports.server = function _callee4() {
  var Users, app, encryptPassword, comparePassword, signUp, login, renewToken, tokenFromUser;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          try {
            Users = _db2.default.get().collection('users');
            app = (0, _express2.default)();


            app.use((0, _expressJwt2.default)({
              secret: JWT_SECRET,
              getToken: function fromHeaderOrQuerystring(_ref) {
                var headers = _ref.headers,
                    query = _ref.query;

                if (headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
                  return headers.authorization.split(' ')[1];
                } else if (query && query.token) {
                  return query.token;
                }
                return null;
              }
            }).unless({ path: ['/signup', '/login'] }));

            app.use((0, _cors2.default)());
            app.use(_bodyParser2.default.json({ limit: '20mb' }));

            app.use('/graphql', _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)({ schema: _schema2.default }));

            app.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({
              endpointURL: '/graphql'
            }));

            encryptPassword = function encryptPassword(user) {
              var salt = _bcryptjs2.default.genSaltSync(10);
              user.password = _bcryptjs2.default.hashSync(user.password, salt);
            };

            comparePassword = function comparePassword(password, userPassword, done) {
              _bcryptjs2.default.compare(password, userPassword, function (err, isMatch) {
                done(err, isMatch);
              });
            };

            signUp = function _callee(req, res) {
              var user, users, error, inserted, newUser, token;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      user = req.body.user;
                      _context.next = 3;
                      return regeneratorRuntime.awrap(Users.find({ $or: [{ email: user.email }, { username: user.username }] }, { username: 1, email: 1 }).toArray());

                    case 3:
                      users = _context.sent;

                      if (!(users.length > 0)) {
                        _context.next = 9;
                        break;
                      }

                      error = users[0].email === user.email || users.length === 2 ? 'Email already in use.' : 'Username is taken.';


                      res.send({ error: error });
                      _context.next = 14;
                      break;

                    case 9:
                      encryptPassword(user);
                      _context.next = 12;
                      return regeneratorRuntime.awrap(Users.insert(user));

                    case 12:
                      inserted = _context.sent;

                      if (inserted.result.ok === 1) {
                        newUser = inserted.ops[0];
                        token = tokenFromUser(newUser);


                        res.send({ token: token });
                      } else {
                        res.send({ error: 'There was an error communicating with the DB, please try again or contact support we would love to help.' });
                      }

                    case 14:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, null, undefined);
            };

            login = function _callee2(req, res) {
              var _req$body, email, password, user;

              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _req$body = req.body, email = _req$body.email, password = _req$body.password;
                      _context2.next = 3;
                      return regeneratorRuntime.awrap(Users.findOne({ email: email }));

                    case 3:
                      user = _context2.sent;


                      if (!user) {
                        res.send({ message: "Email not found." });
                      } else {
                        comparePassword(password, user.password, function (err, isMatch) {
                          if (!isMatch) return res.send({ message: 'Incorrect password, please try again.' });

                          var token = tokenFromUser(user);
                          res.send({ token: token });
                        });
                      }

                    case 5:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, null, undefined);
            };

            renewToken = function _callee3(req, res) {
              var id, user, token;
              return regeneratorRuntime.async(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      id = _mongodb.ObjectId.isValid(req.body.userId) ? new _mongodb.ObjectId(req.body.userId) : null;
                      _context3.next = 3;
                      return regeneratorRuntime.awrap(Users.findOne({ _id: id }));

                    case 3:
                      user = _context3.sent;
                      token = tokenFromUser(user);


                      res.send({ token: token });

                    case 6:
                    case 'end':
                      return _context3.stop();
                  }
                }
              }, null, undefined);
            };

            tokenFromUser = function tokenFromUser(user) {
              var _id = user._id,
                  username = user.username,
                  email = user.email,
                  profilePic = user.profilePic;


              var token = _jsonwebtoken2.default.sign({ _id: _id, username: username, email: email, profilePic: profilePic }, JWT_SECRET);
              return token;
            };

            app.post('/signup', signUp);
            app.post('/login', login);
            app.post('/renewToken', renewToken);

            app.listen(PORT, function () {
              console.log('Visit ' + URL + ':' + PORT);
            });
          } catch (e) {
            console.log(e);
          }

        case 1:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, undefined);
};