class Bomb {
  constructor(gameDiv) {
    this.gameDiv = gameDiv;

    this.newBomb = document.createElement("div");
    this.bombCount = 3;
  }

  bombPlant(agentPositionX, agentPositionY) {
    this.agentPositionX = agentPositionX;
    this.agentPositionY = agentPositionY;
    clearInterval(this.bombAnimationInterval); 
    if (this.bombCount >= 1) {
      this.newBomb.classList.add("bomb");
      this.newBomb.style.cssText = `top: ${this.agentPositionY}px; left: ${this.agentPositionX}px;`;
      this.gameDiv.append(this.newBomb);
      this.bombCount = this.bombCount - 1;
      console.log(this.bombCount);
    }
  }

  animateBomb() {
    this.posX = 50;
    this.widthOfSheet = 100;
    this.bombAnimationInterval = setInterval(() => {
      this.newBomb.style.backgroundPositionX = -this.posX + "px";
      this.newBomb.style.backgroundPositionY = 0 + "px";

      if (this.posX < this.widthOfSheet) {
        this.posX = this.posX + 50;
      } else {
        this.posX = 50;
      }
    }, 100);
  }
}

export { Bomb };
