import React from 'react';
import uuid from 'uuid/v4';
import { array, func, number, object } from 'prop-types';
import styles from './Challenge.scss';

import Game from '../../lib/reactInvaders/ReactInvaders';

const Challenge = ({ highScore, setHighScore, scoreboardUsers, user, devHighScore }) => {
  const handleNewHighScore = (score) => {
    setHighScore(user._id, score);
  };

  const numberWithCommas = (x) =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const renderScoreBoardRows = () => (
    scoreboardUsers.map(({ profilePic, username, highScore: rowHighScore }) => (
      <div className={styles.Row} key={uuid()}>
        <div>
          <span className={styles.Rank}>1</span>
          <img className={styles.ProfilePic} src={profilePic} alt="High score user profile pic" />
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
          {
            scoreboardUsers.length > 0
              ? renderScoreBoardRows()
              : null
          }
        </div>
      </div>
    </div>
  );
};

Challenge.propTypes = {
  devHighScore: number,
  highScore: number,
  setHighScore: func.isRequired,
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
