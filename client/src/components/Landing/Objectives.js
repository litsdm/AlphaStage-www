import React from 'react';
import sharedStyles from './TestingInfo.scss';
import styles from './Objectives.scss';

import objectives from '../../resources/objectives.png';

const Objectives = () => (
  <div className={`${sharedStyles.Wrapper} ${styles.ObjWrapper}`}>
    <div className={sharedStyles.Column}>
      <img
        src={objectives}
        className={`${sharedStyles.TestImg} ${styles.Img}`}
        alt="objectives highlighted from desktop app"
      />
    </div>
    <div className={sharedStyles.Column}>
      <h1 className={sharedStyles.InfoTitle}>Set objectives for each session.</h1>
      <p className={`${sharedStyles.InfoText} ${styles.Text}`}>
        Objectives let the players know what you would like them to focus on or
        {' '}try out while they are playing. Defining good objectives for the player
        {' '}will get you way more valuable feedback. You can set as many objectives
        {' '}as you like.
      </p>
    </div>
  </div>
);

export default Objectives;
