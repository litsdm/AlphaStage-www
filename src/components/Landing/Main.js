import React from 'react';
import { func, object } from 'prop-types';
import styles from './styles.scss';

import Header from './Header';
import TestingInfo from './TestingInfo';
import SessionProcess from './SessionProcess';
import DownloadSection from './DownloadSection';
import Objectives from './Objectives';
import Footer from './Footer';
import Level from './Level';
import AccessModal from './AccessModal';

const CURRENT_VERSION = '0.1.2';
const STATUS = 'available'; // available, development, closedBeta, preRelease

const Main = ({ submitApplication, submitUser, user, logout }) => (
  <div>
    <Header
      submitUser={submitUser}
      version={CURRENT_VERSION}
      user={user}
      logout={logout}
      status={STATUS}
    />
    <TestingInfo />
    <div className={styles.CurvedDiv} />
    <SessionProcess />
    <DownloadSection version={CURRENT_VERSION} status={STATUS} submitUser={submitUser} />
    <Objectives />
    <div className={styles.Wave}>
      <svg viewBox="0 0 100 25">
        <path fill="#fff" opacity="0.5" d="M0 30 V15 Q30 3 60 15 V30z" />
        <path fill="#fff" d="M0 30 V12 Q30 17 55 12 T100 11 V30z" />
      </svg>
    </div>
    <Level />
    <h1 className={styles.Question}>
      Are you ready to take your game to the next level?
    </h1>
    <div className={styles.CurvedDivBottom} />
    <Footer />
    <AccessModal id="accessModal" submitApplication={submitApplication} />
  </div>
);

Main.propTypes = {
  logout: func.isRequired,
  submitApplication: func.isRequired,
  submitUser: func.isRequired,
  user: object
};

Main.defaultProps = {
  user: null
};

export default Main;
