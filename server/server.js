require('dotenv').config();
import { MongoClient, ObjectId } from 'mongodb';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import jwt from 'express-jwt';
import jsonWebToken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';

const URL = 'http://localhost';
const PORT = 3001;
const MONGO_URL = `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@ds151963.mlab.com:51963/alphastage-dev`;
const JWT_SECRET = process.env.JWT_SECRET;

const prepare = (o) => {
  o._id = o._id.toString();
  return o;
}

export const server = async () => {
  try {
    const db = await MongoClient.connect(MONGO_URL);

    const Games = db.collection('games');
    const Users = db.collection('users');

    const typeDefs = [`
      type Query {
        game(_id: String): Game
        games: [Game]
        user(_id: String): User
        users: [User]
      }
      type Game {
        _id: String
        name: String
        description: String
        img: String
        coverImage: String
        developerIds: [String]
        developers: [User]
      }
      type User {
        _id: String
        email: String
        username: String
        password: String
        gameIds: [String]
        games: [Game]
      }
      type Mutation {
        createGame(name: String, description: String, img: String, coverImage: String, developerIds: [String]): Game
        createUser(email: String, username: String, password: String, gameIds: [String]): User
      }
      schema {
        query: Query
        mutation: Mutation
      }
    `];

    const resolvers = {
      Query: {
        game: async (root, { _id }) => {
          console.log(root);
          return prepare(await Games.findOne(ObjectId(_id)));
        },
        games: async () => {
          return (await Games.find({}).toArray()).map(prepare);
        },
        user: async (root, { _id }) => {
          return prepare(await Users.findOne(ObjectId(_id)));
        },
        users: async () => {
          return (await Users.find({}).toArray()).map(prepare);
        },
      },
      Game: {
        developers: async ({ gameId }) => {
          return (await Users.find({ gameIds: gameId }).toArray()).map(prepare);
        }
      },
      User: {
        games: async ({ userId }) => {
          return (await Games.find({ developerIds: userId }).toArray()).map(prepare);
        }
      },
      Mutation: {
        createGame: async (root, args, context, info) => {
          const res = await Games.insert(args);
          return prepare(await Games.findOne({ _id: res.insertedIds[0] }));
        },
        createUser: async (root, args) => {
          const res = await Users.insert(args);
          return prepare(await Users.findOne({ _id: res.insertedIds[0] }));
        },
      },
    }

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers
    });

    const app = express();

    app.use(jwt({
      secret: JWT_SECRET,
      getToken: function fromHeaderOrQuerystring({ headers, query }) {
        if (headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
          return headers.authorization.split(' ')[1];
        } else if (query && query.token) {
          return query.token;
        }
        return null;
      }
    }).unless({ path: ['/signup', '/login'] }));

    app.use(cors());
    app.use(bodyParser.json({ limit: '20mb' }));

    app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

    app.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql'
    }));

    const encryptPassword = (user) => {
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password, salt);
    }

    const comparePassword = (password, userPassword, done) => {
      bcrypt.compare(password, userPassword, (err, isMatch) => {
        done(err, isMatch);
      });
    }

    const signUp = async (req, res) => {
      const { user } = req.body;

      const users = await Users.find(
        { $or:[ { email: user.email }, { username: user.username } ] },
        { username: 1, email: 1 }
      ).toArray();

      if(users.length > 0) {
        const error = users[0].email === user.email || users.length === 2
        ? 'Email already in use.'
        : 'Username is taken.';

        res.send({ error });
      } else {
        console.log(user.password);
        encryptPassword(user);
        console.log(user.password);
        const inserted = await Users.insert(user);
        if(inserted.result.ok === 1) {
          const newUser = inserted.ops[0];
          const token = jsonWebToken.sign({ _id: newUser._id, username: newUser.username, email: newUser.email }, JWT_SECRET);

          res.send({ token });
        } else {
          res.send({ error: 'There was an error communicating with the DB, please try again or contact support we would love to help.' });
        }
      }
    }

    const login = async (req, res) => {
      const { email, password } = req.body;
      const user = await Users.findOne({ email: email });

      if (!user) {
        res.send({ message: "Email not found." })
      } else {
        comparePassword(password, user.password, (err, isMatch) => {
          if (!isMatch) return res.send({ message: 'Incorrect password, please try again.' });

          const token = jsonWebToken.sign({ _id: user._id, username: user.username, email: user.email }, JWT_SECRET);
          res.send({ token});
        });
      }
    }

    app.post('/signup', signUp);
    app.post('/login', login);

    app.listen(PORT, () => {
      console.log(`Visit ${URL}:${PORT}`);
    })

  } catch (e) {
    console.log(e);
  }
}
