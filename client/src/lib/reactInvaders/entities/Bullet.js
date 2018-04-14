class Bullet {
  constructor(x, y, velY, w, h, color) {
    this.x = x;
    this.y = y;
    this.velY = velY;
    this.width = w;
    this.height = h;
    this.color = color;
  }

  update = () => { this.y += this.velY; }
}

export default Bullet;
