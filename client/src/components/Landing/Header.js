import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import styles from './Header.scss';

import logo from '../../resources/logo.png';
import screen from '../../resources/alpha-screen.png';
import controller from '../../resources/controller.png';
import invader from '../../resources/invader.png';
import medal from '../../resources/medal.png';
import swords from '../../resources/swords.png';
import triangle from '../../resources/triangle.svg';

const CURRENT_VERSION = '0.1.1';

const Header = ({ submitUser }) => {
  const handleNotifyClick = () => {
    const email = document.getElementById('notifyInput').value;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isEmailValid = re.test(email.toLowerCase());

    if (isEmailValid) {
      submitUser(email);
      toastr.success('Thank you! We will notify you when Alpha Stage is about to launch!');
      document.getElementById('notifyInput').value = '';
    } else toastr.error('Invalid Email');
  };

  const getDownloadButtonData = () => {
    const { platform } = window.navigator;
    const data = {};

    if (platform.startsWith('Mac')) {
      data.text = 'Download for MacOS';
      data.url = `https://github.com/cdiezmoran/AlphaStage-2.0/releases/download/v${CURRENT_VERSION}/alpha-stage-${CURRENT_VERSION}.dmg`;
    } else if (platform.startsWith('Win') && platform !== 'WinCE') {
      data.text = 'Download for Windows';
      data.url = `https://github.com/cdiezmoran/AlphaStage-2.0/releases/download/v${CURRENT_VERSION}/alpha-stage-setup-${CURRENT_VERSION}.exe`;
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
            <a href={buttonData.url} className={styles.DownloadButton} download>
              <i className="fa fa-download" /> {buttonData.text}
            </a>
          )
          : null
      }
      {/*
        <button className={styles.SecondaryButton}>
          Open Web App
        </button>
      */}
      <p>Coming soon for web</p>
    </div>
  );

  const renderNotify = () => (
    <div className={styles.NotifyContainer}>
      <input id="notifyInput" placeholder="Enter your email" />
      <button onClick={handleNotifyClick}>Notify me</button>
    </div>
  );

  const buttonData = getDownloadButtonData();
  const isAvailable = true;

  return (
    <div className={styles.Header}>
      <img src={controller} className={`${styles.Controller} ${styles.animated} ${styles.bounce}`} alt="controller icon" />
      <img src={swords} className={`${styles.Mouse} ${styles.animated} ${styles.bounce}`} alt="mouse icon" />
      <img src={invader} className={`${styles.Jewel} ${styles.animated} ${styles.bounce}`} alt="jewel icon" />
      <img src={medal} className={styles.Medal} alt="cards icon" />
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
            <img src={logo} alt="Alpha Stage logo" />
            <h1>Alpha Stage</h1>
          </div>
        </div>
        <div className={styles.Nav}>
          <div className={styles.Left} />
          <div className={styles.Right}>
            <a className={styles.Join} href={buttonData.url} download>
              Join the Beta now!
            </a>
          </div>
        </div>
      </div>
      <div className={styles.Content}>
        <p className={styles.TopText}>Take your game to the next level.</p>
        <p className={styles.Description}>
          Play testing platform created specifically for video game developers and gamers alike.
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
          </span>
        </div>
      </div>
      <img className={styles.Screenshot} src={screen} alt="Desktop app screenshot" />
    </div>
  );
};

Header.propTypes = {
  submitUser: PropTypes.func.isRequired
};

export default Header;
