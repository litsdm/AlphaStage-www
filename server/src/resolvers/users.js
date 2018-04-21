import { ObjectId } from 'mongodb';
import dataBase from '../db';
import { prepare, getObjectId } from './index';

const BASE_EXP = 100;
const FACTOR = 1.32;

const db = dataBase.get();

const Games = db.collection('games');
const PotentialUsers = db.collection('potentialUsers');
const Users = db.collection('users');

export const User = {
  games: async ({ _id }) =>
    (await Games.find({ developerIds: _id }).toArray()).map(prepare)
};

const users = {
  Query: {
    potentialUsers: async () => (await PotentialUsers.find().toArray()).map(prepare),
    user: async (root, { _id }) => prepare(await Users.findOne(ObjectId(_id))),
    users: async () =>
      (await Users.find({}).toArray()).map(prepare),
    scoreboardUsers: async () =>
      (
        await Users
          .find({ $query: { highScore: { $exists: true } }, $orderby: { highScore: 1 } })
          .toArray()
      )
        .map(prepare),
  },
  Mutation: {
    createUser: async (root, args) => {
      const nextLevelExp = Math.round(BASE_EXP * (2 ** FACTOR));
      const user = {
        ...args, nextLevelExp, level: 1, experience: 0
      };
      const res = await Users.insert(user);
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
    },
    addExp: async (root, { input }) => {
      const { _id, exp, level, currentExp } = input;
      const nextLevelExp = Math.round(BASE_EXP * ((level + 1) ** FACTOR));
      const expRest = nextLevelExp - (exp + currentExp);
      let newLevel = level;
      let experience;
      let newLevelExp = nextLevelExp;

      if (expRest <= 0) {
        newLevel += 1;
        experience = Math.round(expRest * -1);
        newLevelExp = Math.round((BASE_EXP * ((newLevel + 1) ** FACTOR)));
      } else {
        experience = currentExp + exp;
      }

      const user = await Users.findAndModify(
        { _id: getObjectId(_id) },
        { _id: 1 },
        { $set: { level: newLevel, experience, nextLevelExp: newLevelExp } },
        { upsert: false, new: true }
      );
      return prepare(user.value);
    },
    setHighScore: async (root, { _id, highScore }) => {
      const user = await Users.findAndModify(
        { _id: getObjectId(_id) },
        { _id: 1 },
        { $set: { highScore } },
        { upsert: false, new: true }
      );

      return prepare(user.value);
    }
  }
};

export default users;
