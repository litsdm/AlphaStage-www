import dataBase from '../db';
import { prepare } from './index';

const db = dataBase.get();

const TestingSessions = db.collection('testingSessions');
const Users = db.collection('users');
const Tests = db.collection('tests');

export const TestingSession = {
  testers: async ({ testerIds }) =>
    (await Users.find({ _id: { $all: testerIds || [] } }).toArray()).map(prepare),
  tests: async ({ id }) =>
    (await Tests.find({ testingSessionId: id }).toArray()).map(prepare),
};

const testingSessions = {
  Mutation: {
    createTestingSession: async (root, { session }) => {
      session.createdAt = (new Date()).toString();
      const res = await TestingSessions.insert(session);
      return prepare(await TestingSessions.findOne({ _id: res.insertedIds[0] }));
    }
  }
};

export default testingSessions;
