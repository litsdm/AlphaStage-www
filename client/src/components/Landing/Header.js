import React from 'react';
import { Link } from 'react-router-dom';
import { func, string, object } from 'prop-types';
import styles from './Header.scss';

import Access from '../Access';

import logo from '../../resources/logo.png';
import screen from '../../resources/alpha-screen.png';
import controller from '../../resources/controller.png';
import invader from '../../resources/invader.png';
import medal from '../../resources/medal.png';
import swords from '../../resources/swords.png';
import triangle from '../../resources/triangle.svg';

const Header = ({ submitUser, version, user, logout, status }) => (
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
          {
            status === 'available'
              ? <Link className={styles.Join} href="#challenge" to={user ? '/challenge' : '/auth?type=signup&redirect=challenge'}>Challenge the Dev</Link>
              : null
          }
          {
            !user
              ? (
                <div className={styles.AuthOptions}>
                  <Link href="#login" to="/auth?type=login">Log In</Link>
                  <div className={styles.VerticalDivider} />
                  <Link href="#signup" to="/auth?type=signup">Sign Up</Link>
                </div>
              )
              : <button className={styles.Logout} onClick={logout}>Log Out</button>
          }
        </div>
      </div>
    </div>
    <div className={styles.Content}>
      <p className={styles.TopText}>Take your game to the next level</p>
      <p className={styles.Description}>
        Play testing platform created specifically for video game developers and gamers alike.
      </p>
      <p className={styles.Description}>
        Get feedback that actually matters out of your game releases.
      </p>
      <Access submitUser={submitUser} version={version} status={status} user={user} />
      <div className={styles.Available}>
        <p>{status === 'available' ? 'Available on:' : 'Coming soon for:'}</p>
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

Header.propTypes = {
  logout: func.isRequired,
  submitUser: func.isRequired,
  version: string.isRequired,
  user: object,
  status: string
};

Header.defaultProps = {
  user: null,
  status: 'available'
};

export default Header;
