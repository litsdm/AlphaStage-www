import React from 'react';
import { array, func, number, object } from 'prop-types';
import styles from './Challenge.scss';

import Game from '../../lib/reactInvaders/ReactInvaders';

const Challenge = ({ highScore, setHighScore, scoreboardUsers, user }) => {
  const handleNewHighScore = (score) => {
    setHighScore(user._id, score);
  };

  return (
    <div>
      <Game highScore={highScore} setHighScore={handleNewHighScore} />
    </div>
  );
};

Challenge.propTypes = {
  highScore: number,
  setHighScore: func.isRequired,
  scoreboardUsers: array,
  user: object
};

Challenge.defaultProps = {
  highScore: 0,
  scoreboardUsers: [],
  user: {}
};

export default Challenge;
