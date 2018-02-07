import { ObjectId } from 'mongodb';
import dataBase from '../db';
import { prepare, getObjectId } from './index';

const db = dataBase.get();

const Games = db.collection('games');
const TestingSessions = db.collection('testingSessions');
const Users = db.collection('users');

export const Game = {
  developers: async ({ gameId }) =>
    (await Users.find({ gameIds: gameId }).toArray()).map(prepare),
  testingSessions: async ({ _id }) =>
    (await TestingSessions.find({ game: _id }).toArray()).map(prepare)
};

const games = {
  Query: {
    game: async (root, { _id }) => prepare(await Games.findOne(ObjectId(_id))),
    games: async (root, { checkInvisible }) => {
      const query = checkInvisible ? { invisible: false } : {};
      return (await Games.find(query).toArray()).map(prepare);
    },
    gamesByTags: async (root, { tags }) =>
      (await Games.find({ tags: { $all: tags } }).toArray()).map(prepare),
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
  }
};

export default games;
