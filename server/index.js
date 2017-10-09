import 'babel-core/register';
import 'babel-polyfill';
import db from './db';

db.connectToServer(err => {
  if (!err) {
    require('./server').server();
  } else {
    console.log(err);
  }
});
