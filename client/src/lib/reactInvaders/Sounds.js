class Sounds {
  constructor() {
    const Context = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new Context();
    this.mute = false;
    this.sounds = {};
  }

  loadSound = (name, url) => {
    const self = this;
    this.sounds[name] = null;

    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'arraybuffer';
    req.onload = () => {
      self.audioContext.decodeAudioData(req.response, buffer => {
        self.sounds[name] = { buffer };
      });
    };
    req.send();
  }

  playSound = (name) => {
    if (this.sounds[name] === undefined || this.sounds[name] === null || this.mute === true) {
      console.log('sound does not exist');
      return;
    }

    console.log('sound exists and should play');

    const source = this.audioContext.createBufferSource();
    source.buffer = this.sounds[name].buffer;
    source.connect(this.audioContext.destination);
    source.start(0);
  }
}

export default Sounds;
