import { ObjectId } from 'mongodb';
import GraphQLJSON from 'graphql-type-json';

import dataBase from './db';

const db = dataBase.get();

const Games = db.collection('games');
const PotentialUsers = db.collection('potentialUsers');
const TestingSessions = db.collection('testingSessions');
const Users = db.collection('users');

const prepare = (o) => {
  o._id = o._id.toString();
  return o;
};

const getObjectId = (id) => (ObjectId.isValid(id) ? new ObjectId(id) : null);

const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    game: async (root, { _id }) => prepare(await Games.findOne(ObjectId(_id))),
    games: async (root, { checkInvisible }) => {
      const query = checkInvisible ? { invisible: false } : {};
      return (await Games.find(query).toArray()).map(prepare);
    },
    gamesByTags: async (root, { tags }) =>
      (await Games.find({ tags: { $all: tags } }).toArray()).map(prepare),
    potentialUsers: async () => (await PotentialUsers.find().toArray()).map(prepare),
    user: async (root, { _id }) => prepare(await Users.findOne(ObjectId(_id))),
    users: async () =>
      (await Users.find({}).toArray()).map(prepare),
  },
  Game: {
    developers: async ({ gameId }) =>
      (await Users.find({ gameIds: gameId }).toArray()).map(prepare),
    testingSessions: async ({ game }) =>
      (await TestingSessions.find({ game }).toArray()).map(prepare)
  },
  User: {
    games: async ({ _id }) =>
      (await Games.find({ developerIds: _id }).toArray()).map(prepare)
  },
  Mutation: {
    createGame: async (root, args) => {
      const res = await Games.insert(args.game);
      return prepare(await Games.findOne({ _id: res.insertedIds[0] }));
    },
    editGame: async (root, { game }) => {
      const _id = getObjectId(game._id);
      game._id = _id;
      await Games.update({ _id }, { $set: game });
      return prepare(await Games.findOne({ _id }));
    },
    createUser: async (root, args) => {
      const res = await Users.insert(args);
      return prepare(await Users.findOne({ _id: res.insertedIds[0] }));
    },
    setProfilePicture: async (root, args) => {
      const id = getObjectId(args.userId);
      await Users.update({ _id: id }, { $set: { profilePic: args.url } });
      return prepare(await Users.findOne({ _id: id }));
    },
    addToMetric: async (root, { gameId, metric }) => {
      const _id = getObjectId(gameId);
      const updateMetric = {}; updateMetric[metric] = 1;
      await Games.update({ _id }, { $inc: updateMetric });
      return prepare(await Games.findOne({ _id }));
    },
    updateGeneralSettings: async (root, { gameId, isPrivate, releaseStatus }) => {
      const _id = getObjectId(gameId);
      await Games.update({ _id }, { $set: { isPrivate, releaseStatus } });
      return prepare(await Games.findOne({ _id }));
    },
    removeDeveloperFromGame: async (root, { id, userId }) => {
      const _id = getObjectId(id);
      await Games.update({ _id }, { $pull: { developerIds: userId } });
      return prepare(await Games.findOne({ _id }));
    },
    deleteGame: async (root, { id }) => {
      const _id = getObjectId(id);
      await Games.update({ _id }, { $set: { developerIds: [], invisible: true } });
      return prepare(await Games.findOne({ _id }));
    },
    addPotentialUser: async (root, args) => {
      const existingUser = await PotentialUsers.findOne({ email: args.email });
      if (existingUser) return prepare(existingUser);

      const res = await PotentialUsers.insert(args);
      return prepare(await PotentialUsers.findOne({ _id: res.insertedIds[0] }));
    },
    createTestingSession: async (root, { session }) => {
      const res = await TestingSessions.insert(session);
      return prepare(await TestingSessions.findOne({ _id: res.insertedIds[0] }));
    }
  },
};

export default resolvers;
