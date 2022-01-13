const _backgroundScreenAudio = new Audio("./audios/background.wav");
const _startScreenAudio = new Audio("./audios/gameopening.wav");

const gameStartScreenAudio = () => {
  _startScreenAudio.play();
};

const addwallAudio = () => {
  const _addWallAudio = new Audio("./audios/addwall.wav");
  _addWallAudio.play();
};

const gameOverScreenAudio = () => {
  const _gameOverScreenAudio = new Audio("./audios/gameover.wav");
  _backgroundScreenAudio.pause();
  _gameOverScreenAudio.play();
};

const gameWinScreenAudio = () => {
  const _gameWinScreenAudio = new Audio("./audios/gamewin.wav");
  _backgroundScreenAudio.pause(); 
  _gameWinScreenAudio.play();
};

const startScreenAudio = () => {
  _startScreenAudio.pause();
  _backgroundScreenAudio.play();
  _backgroundScreenAudio.muted = false;
  _backgroundScreenAudio.loop = true;
};

const bombPlantAudio = () => {
  const _bombPlantAudio = new Audio("./audios/plantbomb.wav");
  _bombPlantAudio.play();
};

const bombBlastAudio = () => {
  const _bombBlastAudio = new Audio("./audios/explosion.wav");
  _bombBlastAudio.play();
};

const bombPowerUpAudio = () => {
  const _bombPowerUpAudio = new Audio("./audios/gainpowerup.wav");
  _bombPowerUpAudio.play();
};

const buttonClickAudio = () => {
    const _buttonClickAudio = new Audio("./audios/button-click.wav"); 
    _buttonClickAudio.play(); 
}

export {
  startScreenAudio,
  addwallAudio,
  gameOverScreenAudio,
  gameWinScreenAudio,
  gameStartScreenAudio,
  bombPlantAudio,
  bombBlastAudio,
  bombPowerUpAudio,
  buttonClickAudio
};
