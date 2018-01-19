import React from 'react';
import styles from './Header.scss';

import icon from '../../resources/icon.png';
import screen from '../../resources/alpha-screen.png';

const Header = () => {
  const getDownloadButtonData = () => {
    const { platform } = window.navigator;
    const data = {};

    if (platform.startsWith('Mac')) {
      data.icon = 'fa fa-apple';
      data.text = 'Download for Mac';
    } else if (platform.startsWith('Win') && platform !== 'WinCE') {
      data.icon = 'fa fa-windows';
      data.text = 'Download for Windows';
    } else {
      return null;
    }

    return data;
  };

  const buttonData = getDownloadButtonData();

  return (
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
        <div className={styles.AppContainer}>
          {
            buttonData
              ? (
                <button className={styles.DownloadButton}>
                  <i className={buttonData.icon} /> {buttonData.text}
                </button>
              )
              : null
          }
          <button className={styles.SecondaryButton}>
            Open Web App
          </button>
        </div>
        <div className={styles.Available}>
          <p>Available on:</p>
          <span>
            <div className={styles.Platform}>
              <i className="fa fa-windows" />
              <p>Windows</p>
            </div>
            <div className={styles.Platform}>
              <i className="fa fa-apple" />
              <p>MacOS</p>
            </div>
            <div className={styles.Platform}>
              <i className="fa fa-globe" />
              <p>Web</p>
            </div>
          </span>
        </div>
      </div>
      <img className={styles.Screenshot} src={screen} alt="Desktop app screenshot" />
    </div>
  );
};

export default Header;
