import React from 'react';
import uuid from 'uuid/v4';
import { array, func, number, object } from 'prop-types';
import styles from './Challenge.scss';

import Game from '../../lib/reactInvaders/ReactInvaders';

const DEFAULT_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

const Challenge = ({ highScore, setProperty, scoreboardUsers, user, devHighScore }) => {
  const handleNewHighScore = (score) => {
    const property = JSON.stringify({ name: 'highScore', value: score });
    setProperty(user._id, property);
  };

  const numberWithCommas = (x) =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const renderScoreBoardRows = () => (
    scoreboardUsers.map(({ profilePic, username, highScore: rowHighScore }, index) => (
      <div className={styles.Row} key={uuid()}>
        <div>
          <span className={styles.Rank}>{index + 1}</span>
          <img className={styles.ProfilePic} src={profilePic || DEFAULT_IMAGE} alt="High score user profile pic" />
          <p>{username}</p>
        </div>
        <p className={styles.Score}>{numberWithCommas(rowHighScore)}</p>
      </div>
    ))
  );

  return (
    <div className={styles.Challenge}>
      <Game highScore={highScore} setHighScore={handleNewHighScore} devHighScore={devHighScore} />
      <div className={styles.ScoreBoardWrapper}>
        <div className={styles.ScoreBoard}>
          <p className={styles.Title}>Score Board</p>
          <div className={styles.Scores}>
            {
              scoreboardUsers.length > 0
                ? renderScoreBoardRows()
                : null
            }
          </div>
        </div>
      </div>
    </div>
  );
};

Challenge.propTypes = {
  devHighScore: number,
  highScore: number,
  setProperty: func.isRequired,
  scoreboardUsers: array,
  user: object
};

Challenge.defaultProps = {
  devHighScore: 0,
  highScore: 0,
  scoreboardUsers: [],
  user: {}
};

export default Challenge;
