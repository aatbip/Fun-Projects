import {
  TOTAL_GRID,
  GRID_SIZE,
  GRID_TYPE,
  GRID_LIST,
  ENVIRONMENT,
} from "./setup.js";

import { GameEnv } from "./GameEnv.js";
const gameEnv = new GameEnv(game);

class Bomb {
  constructor(gameDiv) {
    this.gameDiv = gameDiv;
    this.bombPlantPosition = null;

    this.newBomb = document.createElement("div");
    this.explosion = document.createElement("div");
    this.bombCount = 3;
  }

  bombPlant(agentPositionX, agentPositionY, agentPosition) {
    this.agentPositionX = agentPositionX;
    this.agentPositionY = agentPositionY;
    this.bombPlantPosition = agentPosition;
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

  bombBlast(gridArray) {
    this.newBomb.remove();
    this.blast = true;
    this.gridArray = gridArray;
    this.posX = 50;
    this.widthOfSheet = 550;

    this.explosion.classList.add("left-explosion");
    this.explosion.style.cssText = `top: ${this.agentPositionY}px; left: ${
      this.agentPositionX - 50
    }px;`;

    this.gameDiv.append(this.explosion);

    this.intervalTime = 0;
    this.bombBlastInterval = setInterval(() => {
      this.explosion.style.backgroundPositionX = this.posX + "px";
      this.explosion.style.backgroundPositionY = 0 + "px";

      if (this.posX < this.widthOfSheet) {
        this.posX = this.posX + 50;
        ++this.intervalTime;
      } else {
        this.posX = 50;
      }
      if (this.intervalTime === 1) {
        clearInterval(this.bombBlastInterval);
        this.explosion.remove();
      }
    }, 400);
    if (
      !this.gridArray[this.bombPlantPosition - 1].classList.contains(
        "metal-wall"
      ) && !this.gridArray[this.bombPlantPosition -1].classList.contains("side-wall")
    ) {
      gameEnv.removeGrid(this.bombPlantPosition - 1);
    }
  }
}

export { Bomb };
