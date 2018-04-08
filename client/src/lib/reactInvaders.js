import React, { Component } from 'react';
import { bool, number, shape } from 'prop-types';

class SpaceInvaders extends Component {
  constructor(props) {
    super(props);

    this.welcomeState = {
      name: 'Welcome',
      draw: this.welcomeDraw,
      update: null
    };

    this.width = 800;
    this.height = 600;
    this.gameBounds = {
      left: (this.width / 2) - (props.config.gameWidth / 2),
      right: (this.widthx / 2) + (props.config.gameWidth / 2),
      top: (this.height / 2) - (props.config.gameHeight / 2),
      bottom: (this.height / 2) + (props.config.gameHeight / 2),
    };

    this.state = {
      gameState: this.welcomeState,
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

  gameLoop = () => {
    const { gameState } = this.state;
    const { draw, update } = gameState;
    const { config } = this.props;

    if (gameState) {
      const dt = 1 / config.fps;
      const ctx = this.gameCanvas.getContext('2d');

      if (update) update(dt);
      if (draw) draw(dt, ctx);
    }
  }

  stop = () => clearInterval(this.interval);

  welcomeDraw = (dt, ctx) => {
    ctx.clearRect(0, 0, this.width, this.height);

    ctx.font = '30px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'center';
    ctx.textAlign = 'center';
    ctx.fillText('Space Invaders', this.width / 2, (this.height / 2) - 40);
    ctx.font = '16px Arial';

    ctx.fillText('Press \'Space\' to start.', this.width / 2, this.height / 2);
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
