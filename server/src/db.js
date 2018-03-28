import { MongoClient } from 'mongodb';

require('dotenv').config();

const dbName = process.env.AS_ENV === 'production' ? 'alphastage-prod' : 'alphastage-dev';

const MONGO_URL = `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@ds151963.mlab.com:51963/${dbName}`;

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
