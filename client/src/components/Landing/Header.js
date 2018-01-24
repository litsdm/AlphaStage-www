import React from 'react';
import styles from './Header.scss';

import icon from '../../resources/icon.png';
import screen from '../../resources/alpha-screen.png';
import controller from '../../resources/controller.png';
import mouse from '../../resources/mouse.png';
import jewel from '../../resources/jewel.png';
import cards from '../../resources/cards.png';
import triangle from '../../resources/triangle.svg';

const Header = () => {
  const getDownloadButtonData = () => {
    const { platform } = window.navigator;
    const data = {};

    if (platform.startsWith('Mac')) {
      data.text = 'Download for MacOS';
      data.url = '';
    } else if (platform.startsWith('Win') && platform !== 'WinCE') {
      data.text = 'Download for Windows';
      data.url = '';
    } else {
      return null;
    }

    return data;
  };

  const renderDownload = () => (
    <div className={styles.AppContainer}>
      {
        buttonData
          ? (
            <button className={styles.DownloadButton}>
              <i className="fa fa-download" /> {buttonData.text}
            </button>
          )
          : null
      }
      <button className={styles.SecondaryButton}>
        Open Web App
      </button>
    </div>
  );

  const renderNotify = () => (
    <div className={styles.NotifyContainer}>
      <input placeholder="Enter your email" />
      <button>Notify me</button>
    </div>
  );

  const buttonData = getDownloadButtonData();
  const isAvailable = false;

  return (
    <div className={styles.Header}>
      <img src={controller} className={`${styles.Controller} ${styles.animated} ${styles.bounce}`} alt="controller icon" />
      <img src={mouse} className={`${styles.Mouse} ${styles.animated} ${styles.bounce}`} alt="mouse icon" />
      <img src={jewel} className={`${styles.Jewel} ${styles.animated} ${styles.bounce}`} alt="jewel icon" />
      <img src={cards} className={styles.Cards} alt="cards icon" />
      <img src={triangle} className={`${styles.Triangle} ${styles.a}`} alt="triangle icon" />
      <img src={triangle} className={`${styles.Triangle} ${styles.b}`} alt="triangle icon" />
      <img src={triangle} className={`${styles.Triangle} ${styles.c}`} alt="triangle icon" />
      <i className={`fa fa-times ${styles.Times} ${styles.a}`} />
      <i className={`fa fa-times ${styles.Times} ${styles.b}`} />
      <i className={`fa fa-times ${styles.Times} ${styles.c}`} />
      <i className={`fa fa-square-o ${styles.Square} ${styles.a}`} />
      <i className={`fa fa-square-o ${styles.Square} ${styles.b}`} />
      <i className={`fa fa-square-o ${styles.Square} ${styles.c}`} />
      <i className={`fa fa-circle-o ${styles.Circle} ${styles.a}`} />
      <i className={`fa fa-circle-o ${styles.Circle} ${styles.b}`} />
      <i className={`fa fa-circle-o ${styles.Circle} ${styles.c}`} />
      <i className={`fa fa-key ${styles.SmallIcon} ${styles.key}`} />
      <i className={`fa fa-crosshairs ${styles.SmallIcon} ${styles.crosshairs}`} />
      <i className={`fa fa-bomb ${styles.SmallIcon} ${styles.bomb}`} />
      <i className={`fa fa-flask ${styles.SmallIcon} ${styles.flask}`} />
      <i className={`fa fa-trophy ${styles.SmallIcon} ${styles.trophy}`} />
      <i className={`fa fa-power-off ${styles.SmallIcon} ${styles.power}`} />
      <i className={`fa fa-puzzle-piece ${styles.SmallIcon} ${styles.puzzle}`} />
      <div className={styles.TopBar}>
        <div className={styles.BrandContainer}>
          <div className={styles.Brand}>
            <img src={icon} alt="Alpha Stage logo" />
            <h1>Alpha Stage</h1>
          </div>
          <p className={styles.GameSub}>Games</p>
        </div>
        <div className={styles.Nav}>
          <div className={styles.Left} />
          <div className={styles.Right}>
            <a href="https://github.com/cdiezmoran/AlphaStage-2.0">
              <i className="fa fa-github" />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.Content}>
        <p className={styles.TopText}>Test your games with your target Gamers.</p>
        <p className={styles.Description}>
          User testing platform created specifically for video game developers and gamers alike.
        </p>
        <p className={styles.Description}>
          Get feedback that actually matters out of your game releases.
        </p>
        {
          isAvailable
            ? renderDownload()
            : renderNotify()
        }
        <div className={styles.Available}>
          <p>{isAvailable ? 'Available on:' : 'Coming soon for:'}</p>
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
