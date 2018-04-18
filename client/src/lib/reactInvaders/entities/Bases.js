class Base {
  constructor(sprite, dWidth, shipY) {
    this.y = shipY - (30 + sprite.h);
    this.h = sprite.h;
    this.sprite = sprite;

    this.canvas = document.createElement('canvas');
    this.canvas.width = dWidth;
    this.canvas.height = sprite.h;
    this.ctx = this.canvas.getContext('2d');

    for (let i = 0; i < 4; i += 1) this.draw(i);
  }

  draw = (index) => {
    const { ctx, sprite: { img, x, y, w, h } } = this;
    ctx.drawImage(img, x, y, w, h, 68 + (111 * index), 0, w, h);
  }

  generateDamage = (rawX, rawY) => {
    const x = Math.floor(rawX / 2) * 2;
    const y = Math.floor(rawY / 2) * 2;

    this.ctx.clearRect(x - 2, y - 2, 4, 4);
    this.ctx.clearRect(x + 2, y - 4, 2, 4);
    this.ctx.clearRect(x + 4, y, 2, 2);
    this.ctx.clearRect(x + 2, y + 2, 2, 2);
    this.ctx.clearRect(x - 4, y + 2, 2, 2);
    this.ctx.clearRect(x - 6, y, 2, 2);
    this.ctx.clearRect(x - 4, y - 4, 2, 2);
    this.ctx.clearRect(x - 2, y - 6, 2, 2);
  }

  hits = (x, y) => {
    const yPos = y - this.y;

    const data = this.ctx.getImageData(x, yPos, 1, 1);
    if (data.data[3] !== 0) {
      this.generateDamage(x, yPos);
      return true;
    }
    return false;
  }
}

export default Base;
