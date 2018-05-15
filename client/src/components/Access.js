import React from 'react';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import { func, string, object, bool } from 'prop-types';
import styles from './Access.scss';

const Access = ({ submitUser, version, status, user, downloadSection }) => {
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

  const openModal = () => {
    document.getElementById('accessModal').style.display = 'block';
  };

  const getDownloadButtonData = () => {
    const { platform } = window.navigator;
    const data = {};

    if (platform.startsWith('Mac')) {
      data.text = 'Download for MacOS';
      data.url = `https://github.com/cdiezmoran/AlphaStage-2.0/releases/download/v${version}/alpha-stage-${version}.dmg`;
    } else if (platform.startsWith('Win') && platform !== 'WinCE') {
      data.text = 'Download for Windows';
      data.url = `https://github.com/cdiezmoran/AlphaStage-2.0/releases/download/v${version}/alpha-stage-setup-${version}.exe`;
    } else {
      return null;
    }

    return data;
  };

  const buttonData = getDownloadButtonData();

  const renderDownload = () => (
    <div className={styles.AppContainer}>
      {
        buttonData
          ? (
            <a href={buttonData.url} className={styles.PrimaryButton} download>
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

  const renderDownloadNow = () => (
    <div className={styles.Buttons}>
      <a
        href={`https://github.com/cdiezmoran/AlphaStage-2.0/releases/download/v${version}/alpha-stage-setup-${version}.exe`}
        download
      >
        <i className="fa fa-windows" />
        Download for Windows
      </a>
      <a
        href={`https://github.com/cdiezmoran/AlphaStage-2.0/releases/download/v${version}/alpha-stage-${version}.dmg`}
        download
      >
        <i className="fa fa-apple" />
        Download for MacOS
      </a>
    </div>
  );

  const renderDownloadClosed = () => (
    <div className={styles.ClosedMessage}>
      Alpha Stage is currently on closed beta for developers only
      {' '}<a href="#header">Sign up above</a> to gain access.
    </div>
  );

  const renderClosedBetaActions = () => (
    <div className={styles.DevActions}>
      <p>Alpha Stage is on closed beta for developers only.</p>
      {
        !user
          ? <Link href="#signup" to="/auth?type=signup&redirect=devOptions" className={styles.PrimaryButton}>Developer Sign Up</Link>
          : (
            <div className={styles.AccessOptions}>
              <Link href="#upload" to="/" className={styles.PrimaryButton}>Upload a Game</Link>
              <button className={styles.SecondaryButton} onClick={openModal}>
                Let us know you are a developer
              </button>
            </div>
          )
      }
    </div>
  );

  const renderNotify = () => (
    <div className={downloadSection ? styles.NotifyDownloadContainer : styles.NotifyContainer}>
      <input id="notifyInput" placeholder="Enter your email" />
      <button onClick={handleNotifyClick}>Notify me</button>
    </div>
  );

  const renderAccess = () => {
    switch (status) {
      case 'available':
        if (downloadSection) return renderDownloadNow();
        return renderDownload();
      case 'development':
        return renderNotify();
      case 'closedBeta':
        if (downloadSection) return renderDownloadClosed();
        return renderClosedBetaActions();
      default:
        break;
    }
  };

  return renderAccess();
};

Access.propTypes = {
  submitUser: func.isRequired,
  version: string,
  status: string.isRequired,
  user: object,
  downloadSection: bool
};

Access.defaultProps = {
  version: '0.1.1',
  user: null,
  downloadSection: false
};

export default Access;
