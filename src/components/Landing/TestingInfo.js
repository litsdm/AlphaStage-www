import React from 'react';
import styles from './TestingInfo.scss';

import test from '../../resources/test.png';

const TestingInfo = () => (
  <div className={styles.Wrapper}>
    <div className={styles.Column}>
      <h1 className={styles.InfoTitle}>Get valuable feedback out of every player</h1>
      <p className={styles.InfoText}>
        During Testing Sessions we record the player{'\''}s gameplay, and if he
        {' '}allows it, his commentary over it for you to review at your convenience.
        {' '}Players can then point to relevant parts of their gameplay using the
        {' '}comments section.
      </p>
    </div>
    <div className={styles.Column}>
      <img src={test} className={styles.TestImg} alt="Test display modal from desktop app" />
    </div>
  </div>
);

export default TestingInfo;
