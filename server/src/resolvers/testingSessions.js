import dataBase from '../db';
import { prepare } from './index';

const db = dataBase.get();

const TestingSessions = db.collection('testingSessions');
const Users = db.collection('users');

export const TestingSession = {
  testers: async ({ testerIds }) =>
    (await Users.find({ _id: { $all: testerIds || [] } }).toArray()).map(prepare),
};

const games = {
  Mutation: {
    createTestingSession: async (root, { session }) => {
      session.createdAt = (new Date()).toString();
      const res = await TestingSessions.insert(session);
      return prepare(await TestingSessions.findOne({ _id: res.insertedIds[0] }));
    }
  }
};

export default games;
