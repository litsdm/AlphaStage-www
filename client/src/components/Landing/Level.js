import React from 'react';
import styles from './Level.scss';

import feedbackSent from '../../resources/feedbackSent.png';
import level from '../../resources/level.png';

const Level = () => (
  <div className={styles.Wrapper}>
    <div className={styles.Column}>
      <h1 className={styles.InfoTitle}>Level up your Alpha Stage account.</h1>
      <p className={styles.InfoText}>
        Why would you care? Well you get exp by giving good feedback and completing
        {' '}objectives so a higher level means your feedback is more valuable.
        {' '}Devs will be able to set a minimum level for players to test their game
        {' '}and you probably don{'\''}t want to miss an opportunity to be selected
        {' '}to test an amazing game do you?
      </p>
    </div>
    <div className={styles.Column}>
      <div className={styles.ImgWrapper}>
        <img src={feedbackSent} className={styles.TestImg} alt="Test display modal from desktop app" />
        <img className={styles.LevelImg} src={level} alt="popout of level section from app" />
      </div>
    </div>
  </div>
);

export default Level;
