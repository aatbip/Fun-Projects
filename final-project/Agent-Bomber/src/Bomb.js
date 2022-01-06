import {
  TOTAL_GRID,
  GRID_SIZE,
  GRID_TYPE,
  GRID_LIST,
  ENVIRONMENT,
} from "./setup.js";

class Bomb {
  constructor(gameDiv) {
    this.gameDiv = gameDiv;

    this.newBomb = document.createElement("div");
    this.explosion = document.createElement("div");
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

  bombBlast(agentPos, gridArray) {
    this.newBomb.remove();
    this.blast = true;
    this.agentPos = agentPos;
    this.gridArray = gridArray;
    this.posX = 50;
    this.widthOfSheet = 550;

    if (
      this.gridArray[this.agentPos - 1].classList.contains(
        `${GRID_TYPE.brickWall}`
      ) ||
      this.gridArray[this.agentPos - 1].classList.contains(
        `${GRID_TYPE.backgroundWall}`
      ) ||
      this.gridArray[this.agentPos - 1].classList.contains(
        `${GRID_TYPE.movableWall}`
      )
    ) {
      this.explosion.classList.add("left-explosion");
      this.explosion.style.cssText = `top: ${this.agentPositionY}px; left: ${
        this.agentPositionX - 50
      }px;`;

      this.gameDiv.append(this.explosion);

      this.bombBlastInterval = setInterval(() => {
      this.explosion.style.backgroundPositionX = this.posX + "px";
      this.explosion.style.backgroundPositionY = 0 + "px";

      if (this.posX < this.widthOfSheet) {
        this.posX = this.posX + 50;
      } else {
        this.posX = 50;
      }
      }, 800);
    }
  }
}

export { Bomb };
