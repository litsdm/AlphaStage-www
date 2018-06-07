// eslint-disable react/no-typos
import React from 'react';
import { bool, string } from 'prop-types';
import styles from './styles.scss';

const Info = ({ message, isNewUser }) => (
  <div className={[styles.Info, isNewUser ? styles.NewUser : ''].join(' ')}>
    <img src="img/logo.png" alt="logo" style={{ width: '100px' }} />
    <h2>{message}</h2>
  </div>
);

Info.propTypes = {
  message: string.isRequired,
  isNewUser: bool.isRequired
};

export default Info;
