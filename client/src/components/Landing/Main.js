import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

import Header from './Header';
import TestingInfo from './TestingInfo';
import SessionProcess from './SessionProcess';
import DownloadSection from './DownloadSection';

const CURRENT_VERSION = '0.1.1';

const Main = ({ submitUser }) => (
  <div>
    <Header submitUser={submitUser} version={CURRENT_VERSION} />
    <TestingInfo />
    <div className={styles.CurvedDiv} />
    <SessionProcess />
    <DownloadSection version={CURRENT_VERSION} />
  </div>
);

Main.propTypes = {
  submitUser: PropTypes.func.isRequired
};

export default Main;
