import {
  TOTAL_GRID,
  GRID_SIZE,
  GRID_TYPE,
  GRID_LIST,
  ENVIRONMENT,
} from "./setup.js";

import {
  findBombBlastTargetVertical,
  findBombBlastTargetHorizontal,
} from "./helper.js";

import { GameEnv } from "./GameEnv.js";
const gameEnv = new GameEnv(game);

class Bomb {
  constructor(gameDiv) {
    this.gameDiv = gameDiv;
    this.bombPlantPosition = null;

    this.newBomb = document.createElement("div");
    this.explosion = document.createElement("div");
    this.explosion1 = document.createElement("div");
    this.bombCount = 3;
  }

  bombPlant(agentPositionX, agentPositionY, agentPosition) {
    this.agentPositionX = agentPositionX;
    this.agentPositionY = agentPositionY;
    this.bombPlantPosition = agentPosition;
    this.bombPlanted = false;

    clearInterval(this.bombAnimationInterval);
    if (this.bombCount >= 1) {
      this.newBomb.classList.add("bomb");
      this.newBomb.style.cssText = `top: ${this.agentPositionY}px; left: ${this.agentPositionX}px;`;
      this.gameDiv.append(this.newBomb);
      this.bombCount = this.bombCount - 1;
      this.bombPlanted = true;
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
    this.gridArray = gridArray;
    this.posX = 50;
    this.widthOfSheet = 550;

    if (this.bombPlanted == true) {
      this.explosion.classList.add("left-explosion");
      this.explosion.style.cssText = `top: ${this.agentPositionY}px; left: ${
        this.agentPositionX - 50
      }px;`;
      this.explosion1.classList.add("top-explosion");
      this.explosion1.style.cssText = `top: ${this.agentPositionY}px; left: ${
        this.agentPositionX - 50
      }px;`;

      this.gameDiv.append(this.explosion1);

      this.gameDiv.append(this.explosion);
      this.gameDiv.append(this.explosion1);

      this.intervalTime = 0;
      this.bombBlastInterval = setInterval(() => {
        this.explosion.style.backgroundPositionX = this.posX + "px";
        this.explosion.style.backgroundPositionY = 0 + "px";

        this.explosion1.style.backgroundPositionX = this.posX + "px";
        this.explosion1.style.backgroundPositionY = 0 + "px";
        if (this.posX < this.widthOfSheet) {
          this.posX = this.posX + 50;
          ++this.intervalTime;
        } else {
          this.posX = 50;
        }
        if (this.intervalTime === 2) {
          clearInterval(this.bombBlastInterval);
          this.explosion.remove();
          this.explosion1.remove();
        }
      }, 400);

      this._bombBlastTargetsVertical = findBombBlastTargetVertical(
        this.gridArray,
        this.bombPlantPosition
      );
      this._bombBlastTargetsHorizontal = findBombBlastTargetHorizontal(
        this.gridArray,
        this.bombPlantPosition
      );
      this.bombBlastTargetsVertical = [
        ...new Set(this._bombBlastTargetsVertical),
      ];
      this.bombBlastTargetsHorizontal = [
        ...new Set(this._bombBlastTargetsHorizontal),
      ];

      this.bombBlastTargetsVertical.forEach((targets) => {
        gameEnv.blastGrid(targets);
        console.log(this.gridArray[targets]);
      });

      this.bombBlastTargetsHorizontal.forEach((targets) => {
        gameEnv.blastGrid(targets);
        console.log(this.gridArray[targets]);
        console.log(targets);
      });
    }
  }
}

export { Bomb };
