import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import TestingInfo from './TestingInfo';

const Main = ({ submitUser }) => (
  <div>
    <Header submitUser={submitUser} />
    <TestingInfo />
  </div>
);

Main.propTypes = {
  submitUser: PropTypes.func.isRequired
};

export default Main;
