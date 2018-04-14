class Screen {
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.canvas.width = this.width = width;
    this.canvas.height = this.height = height;
    this.ctx = this.canvas.getContext('2d');
  }

  clear = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawSprite = (sp, x, y) => {
    this.ctx.drawImage(sp.img, sp.x, sp.y, sp.w, sp.h, x, y, sp.w, sp.h);
  }

  drawBullet = (bullet) => {
    this.ctx.fillStyle = bullet.color;
    this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  }
}

export default Screen;
