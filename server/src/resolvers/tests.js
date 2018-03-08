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
        { upsert: false }
      );
      const res = await Tests.insert(test);
      return prepare(await Tests.findOne({ _id: res.insertedIds[0] }));
    },
    markTest: async (root, { _id, mark }) => {
      const test = await Tests.findAndModify(
        { _id: getObjectId(_id) },
        { _id: 1 },
        { $set: { mark } },
        { upsert: false, new: true }
      );
      return prepare(test.value);
    }
  }
};

export default tests;
