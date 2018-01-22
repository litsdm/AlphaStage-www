import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import jwt from 'express-jwt';
import jsonWebToken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import { ObjectId } from 'mongodb';
import aws from 'aws-sdk';

import db from './src/db';
import schema from './src/schema';

require('dotenv').config();

const URL = 'http://localhost';
const PORT = process.env.PORT || 3001;
const { JWT_SECRET } = process.env;
const { S3_BUCKET } = process.env;

export const server = async () => {
  try {
    const Users = db.get().collection('users');

    const app = express();

    aws.config.region = 'us-west-1';

    app.use(jwt({
      secret: JWT_SECRET,
      getToken: function fromHeaderOrQuerystring({ headers, query }) {
        if (headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
          return headers.authorization.split(' ')[1];
        } else if (query && query.token) {
          return query.token;
        }
        return null;
      }
    }).unless({ path: ['/signup', '/login', '/', '/landing'] }));

    app.use(cors());
    app.use(bodyParser.json({ limit: '20mb' }));

    app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

    app.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql'
    }));

    const encryptPassword = (user) => {
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password, salt);
    };

    const comparePassword = (password, userPassword, done) => {
      bcrypt.compare(password, userPassword, (err, isMatch) => {
        done(err, isMatch);
      });
    };

    const signUp = async (req, res) => {
      const { user } = req.body;

      const users = await Users.find(
        { $or: [{ email: user.email }, { username: user.username }] },
        { username: 1, email: 1 }
      ).toArray();

      if (users.length > 0) {
        const error = users[0].email === user.email || users.length === 2
          ? 'Email already in use.'
          : 'Username is taken.';

        res.send({ error });
      } else {
        encryptPassword(user);
        const inserted = await Users.insert(user);
        if (inserted.result.ok === 1) {
          const newUser = inserted.ops[0];
          const token = tokenFromUser(newUser);

          res.send({ token });
        } else {
          res.send({ error: 'There was an error communicating with the DB, please try again or contact support we would love to help.' });
        }
      }
    };

    const login = async (req, res) => {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });

      if (!user) {
        res.send({ message: 'Email not found.' });
      } else {
        comparePassword(password, user.password, (err, isMatch) => {
          if (!isMatch) return res.send({ message: 'Incorrect password, please try again.' });

          const token = tokenFromUser(user);
          res.send({ token });
        });
      }
    };

    const renewToken = async (req, res) => {
      const id = ObjectId.isValid(req.body.userId) ? new ObjectId(req.body.userId) : null;

      const user = await Users.findOne({ _id: id });
      const token = tokenFromUser(user);

      res.send({ token });
    };

    const tokenFromUser = (user) => {
      const {
        _id, username, email, profilePic
      } = user;

      const token = jsonWebToken.sign({
        _id, username, email, profilePic
      }, JWT_SECRET);
      return token;
    };

    const signS3 = (req, res) => {
      const s3 = new aws.S3();
      const fileName = req.query['file-name'];
      const fileType = req.query['file-type'];
      const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
      };

      s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
          console.log(err);
          return res.end();
        }
        const returnData = {
          signedRequest: data,
          url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };
        res.write(JSON.stringify(returnData));
        res.end();
      });
    };

    const deleteS3 = (req, res) => {
      const s3 = new aws.S3();
      const { filename } = req.body;
      const s3Params = {
        Bucket: S3_BUCKET,
        Key: filename
      };

      s3.deleteObject(s3Params, (err) => {
        if (err) console.log(err);

        res.end();
      });
    };

    app.post('/signup', signUp);
    app.post('/login', login);
    app.post('/renewToken', renewToken);
    app.get('/sign-s3', signS3);
    app.post('/delete-s3', deleteS3);

    app.listen(PORT, () => {
      console.log(`Visit ${URL}:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};
