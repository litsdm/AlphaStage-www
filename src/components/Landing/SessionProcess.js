import React from 'react';
import uuid from 'uuid/v4';
import styles from './SessionProcess.scss';

import first from '../../resources/first.png';
import second from '../../resources/second.png';
import third from '../../resources/third.png';

const parts = [
  {
    image: first,
    description: 'Fill out basic information about your session.'
  },
  {
    image: second,
    description: 'Choose one of our three plans. Starting at $0 to $13.37'
  },
  {
    image: third,
    description: 'Relax and review your feedback at your convenience'
  }
];

const SessionProcess = () => {
  const renderParts = () =>
    parts.map(({ image, description }, index) => (
      <div className={styles.Part} key={uuid()}>
        <p className={styles.Description}>{description}</p>
        <div className={styles.Image}>
          <div className={styles.Badge}>{index + 1}</div>
          <img src={image} alt="part of testing session process" />
        </div>
      </div>
    ));

  return (
    <div className={styles.Content}>
      <h1>How do Testing Sessions work?</h1>
      <div className={styles.Images}>
        {renderParts()}
      </div>
    </div>
  );
};

export default SessionProcess;
