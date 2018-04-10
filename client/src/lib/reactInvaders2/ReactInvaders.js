import React, { Component } from 'react';

import AABBIntersect from './helpers/intersect';
import InputHandler from './helpers/inputHandler';

import Bases from './entities/Bases';
import Bullet from './entities/Bullet';
import Invader from './entities/Invader';
import Screen from './entities/Screen';
import Sprite from './entities/Sprite';
import Ship from './entities/Ship';

class SpaceInvaders extends Component {
  componentDidMount() {
    const canvas = document.getElementById('gameCanvas');

    this.display = new Screen(canvas, 504, 600);
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

      self.initialize();
    });

    img.src = 'invaders.png';
  }

  initialize = () => {
    const { display, shipSprite, baseSprite } = this;

    this.frames = 0;
    this.spFrame = 0;
    this.lvFrame = 60;
    this.dir = 1;

    this.ship = new Ship(shipSprite, display.width, display.height);

    this.bullets = [];

    this.bases = new Bases(baseSprite, display.width, this.ship.y);

    this.invaders = [];
    const rows = [1, 0, 0, 2, 2];
    const arr = [0, 4, 0];
    rows.forEach((row, i) => {
      for (let j = 0; j < 11; j += 1) {
        const sprite = this.invSprites[row];
        const x = 30 + (j * 30) + arr[row];
        const y = 30 + (i * 30);
        const { w, h } = sprite[0];

        const invader = new Invader(sprite, x, y, w, h);

        this.invaders.push(invader);
      }
    });

    this.start();
  }

  start = () => {
    const { display } = this;
    const loop = () => {
      this.update();
      this.renderOnCanvas();
      window.requestAnimationFrame(loop, display.canvas);
    };
    window.requestAnimationFrame(loop, display.canvas);
  };

  update = () => {
    const { display, input, ship, shipSprite } = this;
    this.frames += 1;

    if (input.isDown(37)) ship.x -= 4;
    if (input.isDown(39)) ship.x += 4;

    ship.x = Math.max(Math.min(ship.x, display.width - (30 + shipSprite.w)), 30);

    if (input.isPressed(32)) this.bullets.push(new Bullet(ship.x + 10, ship.y, -8, 2, 6, '#8DFA00'));

    this.updateBullets();

    this.invadersShoot();
    this.invadersMove();
  }

  updateBullets = () => {
    const { display, bases, bullets } = this;
    bullets.forEach((bullet, i) => {
      bullet.update();
      const halfHeight = bullet.height * 0.5; // half hight is used for

      // remove bullets outside of the canvas
      if (bullet.y + bullet.height < 0 || bullet.y > display.height) {
        bullets.splice(i, 1);
        return;
      }

      if (bases.y < bullet.y + halfHeight && bullet.y + halfHeight < bases.y + bases.h) {
        if (bases.hits(bullet.x, bullet.y + halfHeight)) {
          bullets.splice(i, 1);
          return;
        }
      }

      // check if bullet hit any invaders
      this.checkBulletCollision(bullet, i);
    });
  }

  invadersMove = () => {
    const { display, invaders, frames, lvFrame } = this;
    if (frames % lvFrame === 0) {
      this.spFrame = (this.spFrame + 1) % 2;
      let _max = 0;
      let _min = display.width;

      // iterate through invaders and update postition
      invaders.forEach((inv, i) => {
        invaders[i].x += 30 * this.dir;
        _max = Math.max(_max, inv.x + inv.w);
        _min = Math.min(_min, inv.x);
      });
      // check if invaders should move down and change direction
      if (_max > display.width - 30 || _min < 30) {
        // mirror direction and update position
        this.dir *= -1;
        for (let i = 0, len = invaders.length; i < len; i += 1) {
          invaders[i].x += 30 * this.dir;
          invaders[i].y += 30;
        }
      }
    }
  }

  invadersShoot = () => {
    const { invaders, bullets } = this;
    if (Math.random() < 0.03 && invaders.length > 0) {
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

  checkBulletCollision = (bullet, i) => {
    const { invaders, bullets } = this;

    invaders.forEach((invader, j) => {
      const collision = AABBIntersect(
        bullet.x,
        bullet.y,
        bullet.width,
        bullet.height,
        invader.x,
        invader.y,
        invader.w,
        invader.h
      );

      if (collision) {
        invaders.splice(j, 1);
        bullets.splice(i, 1);
        // increase the movement frequence of the invaders
        // when there are less of them
        switch (invaders.length) {
          case 30: {
            this.lvFrame = 40;
            break;
          }
          case 10: {
            this.lvFrame = 20;
            break;
          }
          case 5: {
            this.lvFrame = 15;
            break;
          }
          case 1: {
            this.lvFrame = 6;
            break;
          }
          default: {
            this.lvFrame = 60;
            break;
          }
        }
      }
    });
  }

  renderOnCanvas = () => {
    const { display, invaders, bases, ship, spFrame, bullets } = this;
    display.clear(); // clear the game canvas
    // draw all invaders
    invaders.forEach(invader => {
      display.drawSprite(invader.sprite[spFrame], invader.x, invader.y);
    });

    bullets.forEach(bullet => {
      display.drawBullet(bullet);
    });

    display.ctx.restore();
    display.ctx.drawImage(bases.canvas, 0, bases.y);
    display.drawSprite(ship.sprite, ship.x, ship.y);
  }

  render() {
    return <canvas id="gameCanvas" style={{ backgroundColor: '#000' }} />;
  }
}

export default SpaceInvaders;
