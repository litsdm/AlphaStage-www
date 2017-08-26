require('dotenv').config();
import { MongoClient, ObjectId } from 'mongodb';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import cors from 'cors';

const URL = 'http://localhost';
const PORT = 3001;
const MONGO_URL = `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@ds151963.mlab.com:51963/alphastage-dev`;

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
        createGame(name: String, description: String, img: String, developerIds: [String]): Game
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

    app.use(cors());

    app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

    app.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql'
    }))

    app.listen(PORT, () => {
      console.log(`Visit ${URL}:${PORT}`);
    })

  } catch (e) {
    console.log(e);
  }
}
