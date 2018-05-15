import { ObjectId } from 'mongodb';
import dataBase from '../db';
import { prepare } from './index';

const db = dataBase.get();

const Applications = db.collection('applications');

const withDefaults = (application) => {
  const status = 'Waiting for review';
  const reasons = [];
  return { ...application, status, reasons };
};

const applications = {
  Query: {
    application: async (root, { _id }) => prepare(await Applications.findOne(ObjectId(_id))),
    applications: async () => (await Applications.find().toArray()).map(prepare),
  },
  Mutation: {
    createApplication: async (root, { application }) => {
      const res = await Applications.insert(withDefaults(application));
      return prepare(await Applications.findOne({ _id: res.insertedIds[0] }));
    }
  }
};

export default applications;
