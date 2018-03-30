import React from 'react';
import styles from './Footer.scss';

import logo from '../../resources/logo.png';

const Footer = () => (
  <div className={styles.Container}>
    <div className={styles.Brand}>
      <img src={logo} alt="Alpha Stage logo" className={styles.Logo} />
      <h1>Alpha Stage</h1>
    </div>
    <div className={styles.Divider} />
    <div className={styles.Social}>
      <a href="https://www.facebook.com/alphastage.gg/">
        <i className="fa fa-facebook-f" />
      </a>
      <a href="https://twitter.com/AlphaStage_gg">
        <i className="fa fa-twitter" />
      </a>
      <a href="https://www.instagram.com/alpha.stage/">
        <i className="fa fa-instagram" />
      </a>
      <a href="https://github.com/cdiezmoran">
        <i className="fa fa-github" />
      </a>
    </div>
  </div>
);

export default Footer;
