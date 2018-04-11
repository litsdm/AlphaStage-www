class WelcomeState {
  name = 'Welcome';

  draw = (game, dt, ctx) => {
    ctx.clearRect(0, 0, game.width, game.height);

    ctx.font = '30px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'center';
    ctx.textAlign = 'center';
    ctx.fillText('Space Invaders', game.width / 2, (game.height / 2) - 40);
    ctx.font = '16px Arial';

    ctx.fillText('Press \'Space\' to start.', game.width / 2, game.height / 2);
  };
}

export default WelcomeState;
