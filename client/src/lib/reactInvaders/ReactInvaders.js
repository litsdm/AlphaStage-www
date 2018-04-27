import React, { Component } from 'react';
import { func, number } from 'prop-types';
import styles from './scss/styles.scss';

import AABBIntersect from './helpers/intersect';
import InputHandler from './helpers/inputHandler';

import Bases from './entities/Bases';
import Bullet from './entities/Bullet';
import Invader from './entities/Invader';
import MysteryShip from './entities/MysteryShip';
import Screen from './entities/Screen';
import Sprite from './entities/Sprite';
import Ship from './entities/Ship';

class SpaceInvaders extends Component {
  state = {
    score: 0,
    level: 1,
    lives: 3,
    gameState: 'Welcome',
    lane: 1
  }

  componentDidMount() {
    const canvas = document.getElementById('gameCanvas');

    this.display = new Screen(canvas, 500, 475);
    this.input = new InputHandler();

    const self = this;
    const img = new Image();
    img.addEventListener('load', function onLoad() {
      self.invSprites = [
        [new Sprite(this, 0, 0, 22, 16), new Sprite(this, 0, 16, 22, 16)],
        [new Sprite(this, 22, 0, 16, 16), new Sprite(this, 22, 16, 16, 16)],
        [new Sprite(this, 38, 0, 24, 16), new Sprite(this, 38, 16, 24, 16)]
      ];

      self.shipSprite = new Sprite(this, 62, 0, 22, 16);
      self.baseSprite = new Sprite(this, 84, 8, 36, 24);
    });

    img.src = 'img/invaders.png';

    const mysteryImg = new Image();
    mysteryImg.addEventListener('load', function onLoad() {
      self.mysterySprite = new Sprite(this, 0, 0, 40, 28);
    });
    mysteryImg.src = 'img/mysteryShip.png';
  }

  initialize = () => {
    const { display, shipSprite, baseSprite } = this;

    this.setState({ gameState: 'Play', level: 1, score: 0, lives: 3, lane: 1 });

    this.frames = 0;
    this.spFrame = 0;
    this.lvFrame = 60;
    this.shootMulti = 0.0085;
    this.dir = 1;

    this.ship = new Ship(shipSprite, display.width, display.height);

    this.bullets = [];
    this.rocket = null;

    this.bases = new Bases(baseSprite, display.width, this.ship.y);

    this.createInvaders();

    this.start();
  }

  createInvaders = () => {
    const { level } = this.state;
    let lvlMultiplier = level;

    if (level > 9) {
      lvlMultiplier = 1;
      this.setState({ level: 1 });
    }

    this.invaders = [];
    const rows = [1, 0, 0, 2, 2];
    const arr = [0, 4, 0];
    const types = ['crab', 'squid', 'octopus'];
    rows.forEach((row, i) => {
      for (let j = 0; j < 11; j += 1) {
        const sprite = this.invSprites[row];
        const x = 30 + (j * 30) + arr[row];
        const y = (30 * lvlMultiplier) + (i * 30);
        const { w, h } = sprite[0];
        const type = types[row];

        const invader = new Invader(sprite, x, y, w, h, type);

        this.invaders.push(invader);
      }
    });
  }

  start = () => {
    const { display } = this;
    const loop = () => {
      this.update();
      this.renderOnCanvas();
      this.loopAnimation = window.requestAnimationFrame(loop, display.canvas);
    };
    this.loopAnimation = window.requestAnimationFrame(loop, display.canvas);
  };

  update = () => {
    const { lane } = this.state;
    const { display, input, invaders, ship, shipSprite } = this;
    this.frames += 1;

    if (input.isDown(37) && ship) ship.x -= 4;
    if (input.isDown(39) && ship) ship.x += 4;

    if (ship) ship.x = Math.max(Math.min(ship.x, display.width - (10 + shipSprite.w)), 10);

    if (input.isPressed(32) && !this.rocket && ship) this.rocket = new Bullet(ship.x + 10, ship.y, -8, 3, 9, '#fff');

    if (invaders.length === 0) this.nextLevel();

    if (this.rocket) this.updateRocket();

    this.updateBullets();

    if (!this.mysteryShip && lane > 1) setTimeout(this.spawnMysteryShip(), 800);

    if (this.mysteryShip) this.mysteryShip.update();

    this.invadersShoot();
    this.invadersMove();
  }

  nextLevel = () => {
    const { level } = this.state;

    this.setState({ level: level + 1, lane: level + 1 }, () => {
      const { lane } = this.state;
      const laneMulti = 0.9 - (lane * 0.01);

      this.frames = 0;
      this.spFrame = 0;
      this.lvFrame = Math.ceil(60 * laneMulti);
      this.shootMulti = 0.0095;
      this.dir = 1;

      this.bullets = [];

      this.createInvaders();
    });
  }

  updateRocket = () => {
    const { display, rocket } = this;
    rocket.update();
    if (
      (rocket.y + rocket.height < 0 || rocket.y > display.height) ||
      this.checkBaseCollision(rocket)
    ) {
      this.rocket = null;
      return;
    }

    this.checkRocketCollision();
  }

  updateBullets = () => {
    const { display, bullets, ship } = this;
    bullets.forEach((bullet, i) => {
      bullet.update();

      // remove bullets outside of the canvas
      if (
        (bullet.y + bullet.height < 0 || bullet.y > display.height) ||
        this.checkBaseCollision(bullet)
      ) {
        bullets.splice(i, 1);
        return;
      }

      if (ship) this.checkShipCollision(bullet, i);
    });
  }

  checkBaseCollision = (bullet) => {
    const { bases } = this;
    const halfHeight = bullet.height * 0.5; // half hight is used for

    if (bases.y < bullet.y + halfHeight && (bullet.y + halfHeight) < (bases.y + bases.h)) {
      if (this.bases.hits(bullet.x, bullet.y + halfHeight)) {
        return true;
      }
    }

    return false;
  }

  spawnMysteryShip = () => {
    const { display, mysterySprite } = this;

    if (this.mysteryShip) return;

    const randomCheck = Math.floor(Math.random() * 1000) + 1;

    if (randomCheck <= 2.5) {
      const dir = Math.round(Math.random());
      this.mysteryShip = new MysteryShip(mysterySprite, dir, display.width, 2);
    }
  }

  invadersMove = () => {
    const { display, invaders, frames, lvFrame, ship } = this;
    const { lane } = this.state;
    if (frames % lvFrame === 0) {
      this.spFrame = (this.spFrame + 1) % 2;
      let _max = 0;
      let _min = display.width;

      // iterate through invaders and update postition
      invaders.forEach((inv, i) => {
        invaders[i].x += 10 * this.dir;
        _max = Math.max(_max, inv.x + inv.w);
        _min = Math.min(_min, inv.x);

        if (ship && lane >= 11) this.checkInvaderShipCollision(invaders[i], ship);
      });
      // check if invaders should move down and change direction
      if (_max > display.width - 10 || _min < 10) {
        // mirror direction and update position
        this.setState({ lane: lane + 1 }, this.onLaneChange);
        this.dir *= -1;
        for (let i = 0, len = invaders.length; i < len; i += 1) {
          invaders[i].x += 10 * this.dir;
          invaders[i].y += 30;
        }
      }
    }
  }

  invadersShoot = () => {
    const { invaders, bullets } = this;
    if (Math.random() < this.shootMulti && invaders.length > 0 && this.bullets.length < 3) {
      let inv = invaders[Math.round(Math.random() * (invaders.length - 1))];
      // iterate through invaders and check collision to make
      // sure only shoot from front line
      invaders.forEach(inv2 => {
        if (AABBIntersect(inv.x, inv.y, inv.w, 100, inv2.x, inv2.y, inv2.w, inv2.h)) {
          inv = inv2;
        }
      });
      // create and append new bullet
      bullets.push(new Bullet(inv.x + (inv.w * 0.5), inv.y + inv.h, 4, 2, 4, '#fff'));
    }
  }

  onLaneChange = () => {
    const { lane } = this.state;
    const laneMulti = 0.9 - (lane * 0.01);

    setTimeout(() => { this.lvFrame = Math.ceil(this.lvFrame * laneMulti); }, 100);
  }

  checkRocketCollision = () => {
    const { invaders, rocket } = this;

    invaders.forEach((invader, j) => {
      const collision = AABBIntersect(
        rocket.x,
        rocket.y,
        rocket.width,
        rocket.height,
        invader.x,
        invader.y,
        invader.w,
        invader.h
      );

      if (collision) {
        invaders.splice(j, 1);
        this.rocket = null;

        let score;
        if (invader.type === 'octopus') score = 10;
        else if (invader.type === 'crab') score = 20;
        else score = 30;
        this.setState({ score: this.state.score + score });

        this.setInvaderSpeed(invaders.length);
      }
    });
  }

  setInvaderSpeed = (invadersLen) => {
    switch (invadersLen) {
      case 30: {
        this.lvFrame = 40;
        this.shootMulti = 0.0115;
        break;
      }
      case 10: {
        this.lvFrame = 20;
        this.shootMulti = 0.0135;
        break;
      }
      case 5: {
        this.lvFrame = 15;
        this.shootMulti = 0.0145;
        break;
      }
      case 1: {
        this.lvFrame = 6;
        this.shootMulti = 0.0150;
        break;
      }
      default: {
        break;
      }
    }
  }

  checkShipCollision = (bullet, i) => {
    const { bullets, display, ship, shipSprite } = this;

    if (!bullet || !ship) return;

    const collision = AABBIntersect(
      bullet.x,
      bullet.y,
      bullet.width,
      bullet.height,
      ship.x,
      ship.y,
      ship.w,
      ship.h
    );

    if (collision) {
      this.ship = null;
      bullets.splice(i, 1);
      this.setState({ lives: this.state.lives - 1 }, () => this.checkGameOver());

      setTimeout(() => { this.ship = new Ship(shipSprite, display.width, display.height); }, 1000);
    }
  }

  checkInvaderShipCollision = (invader, ship) => {
    const collision = AABBIntersect(
      invader.x,
      invader.y,
      invader.w,
      invader.h,
      ship.x,
      ship.y,
      ship.w,
      ship.h
    );

    if (collision) this.endGame();
  }

  checkGameOver = () => {
    const { lives } = this.state;

    if (lives === 0) this.endGame();
  }

  endGame = () => {
    this.setState({ gameState: 'GameOver' });
    this.checkHighScore();

    window.cancelAnimationFrame(this.loopAnimation);
  }

  checkHighScore = () => {
    const { highScore, setHighScore } = this.props;
    const { score } = this.state;

    if (score > highScore) {
      setHighScore(score);
    }
  }

  renderOnCanvas = () => {
    const {
      display,
      invaders,
      bases,
      ship,
      spFrame,
      bullets,
      rocket,
      mysteryShip
    } = this;
    display.clear(); // clear the game canvas
    // draw all invaders
    invaders.forEach(invader => {
      display.drawSprite(invader.sprite[spFrame], invader.x, invader.y);
    });

    if (rocket) display.drawBullet(rocket);

    bullets.forEach(bullet => {
      display.drawBullet(bullet);
    });

    if (mysteryShip) display.drawSprite(mysteryShip.sprite, mysteryShip.x, mysteryShip.y);

    display.ctx.restore();
    display.ctx.drawImage(bases.canvas, 0, bases.y);
    if (ship) display.drawSprite(ship.sprite, ship.x, ship.y);
  }

  renderContent = () => {
    const { gameState, score, lives } = this.state;
    const { highScore, devHighScore } = this.props;

    if (gameState === 'Welcome') {
      return (
        <div className={styles.Welcome}>
          <p className={styles.Title}>Alpha Stage Challenge</p>
          <p className={styles.Description}>
            If you can beat the developer{'\''}s high score on a game of Space Invaders
            {' '} you{'\''}ll get instant access to the Alpha Stage Beta and a place
            {' '} on the scoreboard. GLHF!
          </p>
          <div className={styles.Invaders}>
            <span>
              <img src="img/squid.png" alt="squid invader 30 points" /> = 30 Pts
            </span>
            <span>
              <img src="img/crab.png" alt="crab invader 20 points" /> = 20 Pts
            </span>
            <span>
              <img src="img/octopus.png" alt="octopus invader 10 points" /> = 10 Pts
            </span>
            <span>
              <img src="img/spaceShip.png" alt="space ship unknown points" /> = ???
            </span>
          </div>
          <button onClick={() => this.initialize()}>Start Game</button>
        </div>
      );
    } else if (gameState === 'Play') {
      return (
        <div className={styles.Info}>
          <div className={styles.InfoItem}>
            <p>SCORE</p>
            <p>{score}</p>
          </div>
          <div className={styles.InfoItem}>
            <p>HI-SCORE</p>
            <p>{highScore}</p>
          </div>
          <div className={styles.InfoItem}>
            <p>LIVES</p>
            <p>{lives}</p>
          </div>
        </div>
      );
    } else if (gameState === 'GameOver') {
      return (
        <div className={styles.GameOver}>
          <p className={styles.GOTitle}>Game Over</p>
          <div className={styles.Scores}>
            <div className={styles.ScoreItem}>
              <p>Your Score</p>
              <p>{score}</p>
            </div>
            <div className={styles.ScoreItem}>
              <p>Dev{'\''}s Score</p>
              <p>{devHighScore}</p>
            </div>
          </div>
          <button onClick={() => this.initialize()}>Play Again</button>
        </div>
      );
    }
  }

  render() {
    const { gameState } = this.state;
    return (
      <div className={styles.Container} id="SIContainer">
        {this.renderContent()}
        <canvas id="gameCanvas" style={gameState !== 'Play' ? { display: 'none' } : {}} />
      </div>
    );
  }
}

SpaceInvaders.propTypes = {
  devHighScore: number,
  highScore: number,
  setHighScore: func.isRequired
};

SpaceInvaders.defaultProps = {
  devHighScore: 0,
  highScore: 0
};

export default SpaceInvaders;
