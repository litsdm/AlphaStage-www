import Json from 'graphql-type-json'; // eslint-disable-line

import games from './games';
import users from './users';
import testingSessions from './testingSessions';
import tests from './tests';
import applications from './applications';

const typeDefs = [`
  scalar JSON

  type Query {
    ${games.query}
    ${users.query}
    ${applications.query}
  }

  ${games.types}
  ${testingSessions.types}
  ${tests.types}
  ${users.types}
  ${applications.types}

  type Mutation {
    ${games.mutation}
    ${testingSessions.mutation}
    ${tests.mutation}
    ${users.mutation}
    ${applications.mutation}
  }
`];

export default typeDefs;
