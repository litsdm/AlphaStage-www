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
    (await TestingSessions.find({ game: _id }).sort({ createdAt: -1 }).toArray()).map(prepare)
};

const withDefaults = (game) => {
  const playable = {
    allTime: true,
    onTestingSession: false,
    certainDate: {
      active: false,
      startDate: null,
      endDate: null
    },
    certainRelease: {
      active: false,
      status: 'Released - Game is ready.'
    }
  };

  return { ...game, playable: JSON.stringify(playable), invisible: false };
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
    createGame: async (root, { game }) => {
      const res = await Games.insert(withDefaults(game));
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
    setStrProperty: async (root, { gameId, propName, propValue }) => {
      const _id = getObjectId(gameId);
      await Games.update({ _id }, { $set: { [propName]: propValue } });
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
    invite: async (root, { id, email }) => {
      const game = await Games.findAndModify(
        { _id: getObjectId(id) },
        { _id: 1 },
        { $push: { inviteEmails: email } },
        { upsert: false, new: true }
      );
      return prepare(game.value);
    }
  }
};

export default games;
