import React from 'react';
import { object } from 'prop-types';

import AuthView from '../components/Auth/Auth';

const Auth = ({ history, location }) => <AuthView history={history} location={location} />;

Auth.propTypes = {
  history: object.isRequired,
  location: object.isRequired
};

export default Auth;
