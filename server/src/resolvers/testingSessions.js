import dataBase from '../db';
import { prepare, getObjectId } from './index';

const db = dataBase.get();

const TestingSessions = db.collection('testingSessions');
const Users = db.collection('users');
const Tests = db.collection('tests');

export const TestingSession = {
  testers: async (session) => {
    const testerIds = session.testerIds || [];
    const ids = testerIds.map(id => getObjectId(id));
    return (await Users.find({ _id: { $all: ids || [] } }).toArray()).map(prepare);
  },
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
