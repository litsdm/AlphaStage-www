import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

import Header from './Header';
import TestingInfo from './TestingInfo';
import SessionProcess from './SessionProcess';

const Main = ({ submitUser }) => (
  <div>
    <Header submitUser={submitUser} />
    <TestingInfo />
    <div className={styles.CurvedDiv} />
    <SessionProcess />
  </div>
);

Main.propTypes = {
  submitUser: PropTypes.func.isRequired
};

export default Main;
