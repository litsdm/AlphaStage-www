import React from 'react';
import styles from './Header.scss';

import icon from '../../resources/icon.png';
import screen from '../../resources/alpha-screen.png';

const Header = () => (
  <div className={styles.Header}>
    <div className={styles.Menu}>
      <div className={styles.Brand}>
        <img src={icon} alt="Alpha Stage logo" />
        <h1>Alpha Stage</h1>
      </div>
      <p className={styles.GameSub}>Games</p>
    </div>
    <div className={styles.Content}>
      <p className={styles.TopText}>Test your games with your target Gamers.</p>
      <p className={styles.Description}>
        User testing platform created specifically for video game developers and gamers alike.
      </p>
      <p className={styles.Description}>
        Get feedback that actually matters out of your game releases.
      </p>
      <div className={styles.NotifyContainer}>
        <input placeholder="Enter your email" />
        <button>Notify me</button>
      </div>
    </div>
    <img className={styles.Screenshot} src={screen} alt="Desktop app screenshot" />
  </div>
);

export default Header;
