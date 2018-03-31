import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

import Header from './Header';
import TestingInfo from './TestingInfo';
import SessionProcess from './SessionProcess';
import DownloadSection from './DownloadSection';
import Objectives from './Objectives';
import Footer from './Footer';
import Level from './Level';

const CURRENT_VERSION = '0.1.1';

const Main = ({ submitUser }) => (
  <div>
    <Header submitUser={submitUser} version={CURRENT_VERSION} />
    <TestingInfo />
    <div className={styles.CurvedDiv} />
    <SessionProcess />
    <DownloadSection version={CURRENT_VERSION} />
    <Objectives />
    <Level />
    <h1 className={styles.Question}>
      Are you ready to take your game to the next level?
    </h1>
    <div className={styles.CurvedDivBottom} />
    <Footer />
  </div>
);

Main.propTypes = {
  submitUser: PropTypes.func.isRequired
};

export default Main;
