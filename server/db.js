import { MongoClient } from 'mongodb';

require('dotenv').config();

const dbName = process.env.AS_ENV === 'production'
  ? 'ds125479.mlab.com:25479/alphastage-prod'
  : 'ds151963.mlab.com:51963/alphastage-dev';

const MONGO_URL = `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${dbName}`;

let _db;

const dataBase = {
  connectToServer: (done) => {
    MongoClient.connect(MONGO_URL, (err, db) => {
      _db = db;
      return done(err);
    });
  },
  get: () => _db
};

export default dataBase;
