import dataBase from '../db';
import { prepare, getObjectId } from './index';

const db = dataBase.get();

const Tests = db.collection('tests');
const TestingSessions = db.collection('testingSessions');

const tests = {
  Mutation: {
    createTest: async (root, { test }) => {
      await TestingSessions.findAndModify(
        { _id: getObjectId(test.testingSessionId) },
        { _id: 1 },
        { $push: { testerIds: test.testerId } },
        { upsert: true }
      );
      const res = await Tests.insert(test);
      return prepare(await Tests.findOne({ _id: res.insertedIds[0] }));
    }
  }
};

export default tests;
