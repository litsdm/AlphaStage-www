/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import PropTypes from 'prop-types';

import App from './containers/App';
import Auth from './containers/Auth';
import Landing from './containers/Landing';
import Challenge from './containers/Challenge';
import CreateGame from './containers/CreateGame';

const Routes = ({ history }) => (
  <App history={history}>
    <Switch>
      <Route path="/create" component={CreateGame} />
      <Route path="/auth" component={Auth} />
      <Route path="/challenge" component={Challenge} />
      <Route path="/" component={Landing} />
    </Switch>
  </App>
);

Routes.propTypes = {
  history: PropTypes.object.isRequired
};

export default Routes;
