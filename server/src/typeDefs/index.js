import Json from 'graphql-type-json'; // eslint-disable-line

import games from './games';
import users from './users';
import testingSessions from './testingSessions';

const typeDefs = [`
  scalar JSON

  type Query {
    ${games.query}
    ${users.query}
  }

  ${games.types}
  ${testingSessions.types}
  ${users.types}

  type Mutation {
    ${games.mutation}
    ${testingSessions.mutation}
    ${users.mutation}
  }
`];

export default typeDefs;
