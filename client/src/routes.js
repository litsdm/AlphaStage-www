/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import PropTypes from 'prop-types';

import App from './containers/App';
import LandingPage from './containers/LandingPage';

const Routes = ({ history }) => (
  <App history={history}>
    <Switch>
      <Route path="/" component={LandingPage} />
    </Switch>
  </App>
);

Routes.propTypes = {
  history: PropTypes.object.isRequired
};

export default Routes;
