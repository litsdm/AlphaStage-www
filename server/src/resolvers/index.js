import { ObjectId } from 'mongodb';
import GraphQLJSON from 'graphql-type-json';

import games, { Game } from './games';
import users, { User } from './users';
import testingSessions, { TestingSession } from './testingSessions';
import tests from './tests';

export const prepare = (o) => {
  o._id = o._id.toString();
  return o;
};

export const getObjectId = (id) => (ObjectId.isValid(id) ? new ObjectId(id) : null);

const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    ...games.Query,
    ...users.Query
  },
  Mutation: {
    ...games.Mutation,
    ...testingSessions.Mutation,
    ...tests.Mutation,
    ...users.Mutation
  },
  Game,
  TestingSession,
  User
};

export default resolvers;
