import dataBase from '../db';
import { prepare } from './index';

const db = dataBase.get();

const Tests = db.collection('tests');

const tests = {
  Mutation: {
    createTest: async (root, { test }) => {
      const res = await Tests.insert(test);
      return prepare(await Tests.findOne({ _id: res.insertedIds[0] }));
    }
  }
};

export default tests;
