class InputHandler {
  constructor() {
    this.down = {};
    this.pressed = {};

    const self = this;
    document.addEventListener('keydown', e => { self.down[e.keyCode] = true; });
    document.addEventListener('keyup', e => {
      delete self.down[e.keyCode];
      delete self.pressed[e.keyCode];
    });
  }

  isDown = (code) => this.down[code]

  isPressed = (code) => {
    if (this.pressed[code]) return false;
    else if (this.down[code]) return true;

    return false;
  }
}

export default InputHandler;
