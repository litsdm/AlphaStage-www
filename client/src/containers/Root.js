import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { ApolloProvider } from 'react-apollo';

import client from '../client';
import Routes from '../routes';

const Root = ({ store, history }) => (
  <ApolloProvider store={store} client={client}>
    <ConnectedRouter history={history}>
      <Routes history={history} />
    </ConnectedRouter>
  </ApolloProvider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Root;
