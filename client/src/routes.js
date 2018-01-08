/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import PropTypes from 'prop-types';

import App from './containers/App';
import Landing from './containers/Landing';

const Routes = ({ history }) => (
  <App history={history}>
    <Switch>
      <Route path="/" component={Landing} />
    </Switch>
  </App>
);

Routes.propTypes = {
  history: PropTypes.object.isRequired
};

export default Routes;
