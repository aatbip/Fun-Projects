class GameOverScreen {
  constructor() {
    this.gameOverScreen = document.createElement("div");
  }

  gameOver(gameDiv) {
    this.gameDiv = gameDiv;
    this.gameOverScreen.style.cssText = `width: 200px; height: 200px; position: absolute; top: 100px; left: 50px; font-size: 100px; color: white; z-index: 2;`;
    this.gameOverScreen.innerHTML = "GAMEOVER!!!";
    this.gameDiv.append(this.gameOverScreen);
  }
}

export { GameOverScreen };
