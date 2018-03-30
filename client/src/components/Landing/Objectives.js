import React from 'react';
import styles from './TestingInfo.scss';

import objectives from '../../resources/objectives.png';

const Objectives = () => (
  <div className={styles.Wrapper} style={{ marginTop: '72px', marginBottom: '48px' }}>
    <div className={styles.Column}>
      <img
        src={objectives}
        className={styles.TestImg}
        alt="objectives highlighted from desktop app"
        style={{ boxShadow: 'none', margin: '0' }}
      />
    </div>
    <div className={styles.Column}>
      <h1 className={styles.InfoTitle}>Set objectives for each session.</h1>
      <p className={styles.InfoText}>
        Objectives let the players know what you would like them to focus on or
        {' '}try out while they are playing. Defining good objectives for the player
        {' '}will get you way more valuable feedback. You can set as many objectives
        {' '}as you like.
      </p>
    </div>
  </div>
);

export default Objectives;
