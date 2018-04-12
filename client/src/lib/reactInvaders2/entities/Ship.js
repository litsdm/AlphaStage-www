class Ship {
  constructor(sprite, dHeight, dWidth) {
    this.sprite = sprite;
    this.x = (dWidth - sprite.w) / 2;
    this.y = dHeight - (30 + sprite.h);
  }
}

export default Ship;
