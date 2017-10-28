import 'babel-core/register';
import 'babel-polyfill';
import db from './src/db';

db.connectToServer(err => {
  if (!err) {
    require('./server').server();
  } else {
    console.log(err);
  }
});
