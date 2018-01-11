import React from 'react';
import styles from './Header.scss';

import icon from '../../resources/icon.png';

const Header = () => (
  <div className={styles.Header}>
    <div className={styles.Menu}>
      <div className={styles.Brand}>
        <img src={icon} alt="Alpha Stage logo" />
        <p>Alpha Stage</p>
      </div>
      <p className={styles.GameSub}>Games</p>
    </div>
  </div>
);

export default Header;
