import 'babel-core/register';
import 'babel-polyfill';
import db from './src/db';

db.connectToServer(err => {
  if (!err) {
    require('./server').server(); // eslint-disable-line
  } else {
    console.log(err);
  }
});
