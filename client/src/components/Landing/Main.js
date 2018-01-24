import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

const Main = ({ submitUser }) => (
  <div>
    <Header submitUser={submitUser} />
  </div>
);

Main.propTypes = {
  submitUser: PropTypes.func.isRequired
};

export default Main;
