import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { ApolloProvider } from 'react-apollo';

import client from '../client';
import Routes from '../routes';

export default function Root({ store, history }) {
  return (
    <ApolloProvider store={store} client={client}>
      <ConnectedRouter history={history}>
        <Routes history={history} />
      </ConnectedRouter>
    </ApolloProvider>
  );
}
