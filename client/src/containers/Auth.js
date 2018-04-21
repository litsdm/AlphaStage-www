import React from 'react';
import { object } from 'prop-types';

import AuthView from '../components/Auth/Auth';

const Auth = ({ history }) => <AuthView history={history} />;

Auth.propTypes = {
  history: object.isRequired
};

export default Auth;
