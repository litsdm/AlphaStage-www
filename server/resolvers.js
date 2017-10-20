import { ObjectId } from 'mongodb';

import dataBase from './db';
const db = dataBase.get();

const Games = db.collection('games');
const Users = db.collection('users');

const prepare = (o) => {
  o._id = o._id.toString();
  return o;
}

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
    setProfilePicture: async(root, args) => {
      const res = await Users.findAndModify({ _id: args.userId }, { $set: { profilePic: args.url } });
    }
  },
}

export default resolvers;
