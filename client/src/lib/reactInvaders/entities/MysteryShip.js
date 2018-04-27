class MysteryShip {
  constructor(sprite, dir, dWidth, velX) {
    this.sprite = sprite;
    this.h = sprite.h;
    this.w = sprite.w;
    this.dir = dir;
    this.x = dir === 0 ? dWidth + (30 + this.w) : (this.w + 30) * -1;
    this.y = this.h - 30;
    this.velX = velX;
  }

  update = () => {
    if (this.dir === 0) this.x -= this.velX;
    else this.x += this.velX;
  }
}

export default MysteryShip;
