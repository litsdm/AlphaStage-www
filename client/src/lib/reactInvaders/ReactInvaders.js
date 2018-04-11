import React, { Component } from 'react';
import { bool, number, shape } from 'prop-types';

import { WelcomeState } from './states';

import Sounds from './Sounds';

class SpaceInvaders extends Component {
  constructor(props) {
    super(props);

    this.width = 800;
    this.height = 600;
    this.gameBounds = {
      left: (this.width / 2) - (props.config.gameWidth / 2),
      right: (this.widthx / 2) + (props.config.gameWidth / 2),
      top: (this.height / 2) - (props.config.gameHeight / 2),
      bottom: (this.height / 2) + (props.config.gameHeight / 2),
    };
    this.pressedKeys = {};

    this.loadSounds();

    this.state = {
      gameState: new WelcomeState(),
      level: 1,
      lives: 3,
      score: 0
    };
  }

  componentDidMount() {
    const { config } = this.props;

    const canvas = document.getElementById('gameCanvas');
    canvas.width = 800;
    canvas.height = 600;

    this.gameCanvas = canvas;
    this.interval = setInterval(() => this.gameLoop(), 1000 / config.fps);
  }

  loadSounds = () => {
    this.sounds = new Sounds();
    this.sounds.loadSound('shoot', 'sounds/shoot.wav');
    this.sounds.loadSound('bang', 'sounds/bang.wav');
    this.sounds.loadSound('explosion', 'sounds/explosion.wav');
  }

  gameLoop = () => {
    const { gameState } = this.state;
    const { draw, update } = gameState;
    const { config } = this.props;

    if (gameState) {
      const dt = 1 / config.fps;
      const ctx = this.gameCanvas.getContext('2d');

      if (update) update(dt);
      if (draw) draw(this, dt, ctx);
    }
  }

  stop = () => clearInterval(this.interval);

  handleKeyDown = (keyCode) => {
    const { gameState } = this.state;
    this.pressedKeys[keyCode] = true;

    if (gameState && gameState.keyDown) gameState.keyDown(this, keyCode);
  }

  setGameState = (state) => {
    if (state.enter) state.enter();
    this.setState({ gameState: state });
  }

  render() {
    return <canvas id="gameCanvas" />;
  }
}

SpaceInvaders.propTypes = {
  config: shape({
    bombRate: number,
    bombMinVelocity: number,
    bombMaxVelocity: number,
    invaderInitialVelocity: number,
    invaderAcceleration: number,
    invaderDropDistance: number,
    rocketVelocity: number,
    rocketMaxFireRate: number,
    gameWidth: number,
    gameHeight: number,
    fps: number,
    debugMode: bool,
    invaderRanks: number,
    invaderFiles: number,
    shipSpeed: number,
    levelDifficultyMultiplier: number,
    pointsPerInvader: number
  })
};

SpaceInvaders.defaultProps = {
  config: {
    bombRate: 0.05,
    bombMinVelocity: 50,
    bombMaxVelocity: 50,
    invaderInitialVelocity: 25,
    invaderAcceleration: 0,
    invaderDropDistance: 20,
    rocketVelocity: 120,
    rocketMaxFireRate: 2,
    gameWidth: 400,
    gameHeight: 300,
    fps: 50,
    debugMode: false,
    invaderRanks: 5,
    invaderFiles: 10,
    shipSpeed: 120,
    levelDifficultyMultiplier: 0.2,
    pointsPerInvader: 5
  }
};

export default SpaceInvaders;
