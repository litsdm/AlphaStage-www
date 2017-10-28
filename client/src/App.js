import React from 'react';

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';

import './App.css';

const isNotProduction = process.env.NODE_ENV !== 'production';
const uri = isNotProduction ? 'http://localhost:3001/graphql' : process.env.REACT_APP_GRAPHQL_URI;

const networkInterface = createNetworkInterface({ uri });
const client = new ApolloClient({ networkInterface });

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <h3>Alpha Stage (UNDER CONSTRUCTION)</h3>
    </div>
  </ApolloProvider>
);

export default App;
