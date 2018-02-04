import { ObjectId } from 'mongodb';
import dataBase from '../db';
import { prepare, getObjectId } from './index';

const db = dataBase.get();

const Games = db.collection('games');
const PotentialUsers = db.collection('potentialUsers');
const Users = db.collection('users');

export const User = {
  games: async ({ _id }) =>
    (await Games.find({ developerIds: _id }).toArray()).map(prepare)
};

const games = {
  Query: {
    potentialUsers: async () => (await PotentialUsers.find().toArray()).map(prepare),
    user: async (root, { _id }) => prepare(await Users.findOne(ObjectId(_id))),
    users: async () =>
      (await Users.find({}).toArray()).map(prepare),
  },
  Mutation: {
    createUser: async (root, args) => {
      const res = await Users.insert(args);
      return prepare(await Users.findOne({ _id: res.insertedIds[0] }));
    },
    setProfilePicture: async (root, args) => {
      const id = getObjectId(args.userId);
      await Users.update({ _id: id }, { $set: { profilePic: args.url } });
      return prepare(await Users.findOne({ _id: id }));
    },
    addPotentialUser: async (root, args) => {
      const existingUser = await PotentialUsers.findOne({ email: args.email });
      if (existingUser) return prepare(existingUser);

      const res = await PotentialUsers.insert(args);
      return prepare(await PotentialUsers.findOne({ _id: res.insertedIds[0] }));
    }
  }
};

export default games;
