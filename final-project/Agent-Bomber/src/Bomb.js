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
  bombPowerUpAppendPosition,
  rand,
} from "./helper.js";

import { GameEnv } from "./GameEnv.js";
const gameEnv = new GameEnv(game);

import { GameOverScreen } from "./GameOverScreen.js";

class Bomb {
  constructor(gameDiv) {
    this.gameDiv = gameDiv;
    this.bombPlantPosition = null;

    this.newBomb = document.createElement("div");
    this.explosion = document.createElement("div");
    this.explosion1 = document.createElement("div");
    this.bombPowerUp = document.createElement("div");
    this.bombPowerUpDisplay = document.createElement("p");

    this.bombCount = 3;
    this.bombPowerUpCount = 0;
  }

  bombPlant(agentPositionX, agentPositionY, agentPosition) {
    this.agentPositionX = agentPositionX;
    this.agentPositionY = agentPositionY;
    this.bombPlantPosition = agentPosition;
    this.bombPlanted = false;
    this.bombPowerUpsExist = false;

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

  bombBlast(gridArray, agentPosition) {
    this.agentPosition = agentPosition;
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

      // this.gameDiv.append(this.explosion1);

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
      });

      this.bombBlastTargetsHorizontal.forEach((targets) => {
        gameEnv.blastGrid(targets);
      });

      //*******GAME-OVER SCREEN TO BE REFACTORED LATORR ******//
      if (
        this.bombPlantPosition - 1 == this.agentPosition ||
        this.bombPlantPosition + 1 == this.agentPosition ||
        this.bombPlantPosition - 17 == this.agentPosition ||
        this.bombPlantPosition + 17 == this.agentPosition ||
        this.bombPlantPosition == this.agentPosition
      ) {
        const gameOverScreen = new GameOverScreen();
        gameOverScreen.gameOver(this.gameDiv);
      }

      //******************************************************//
    }
  }

  bombPowerUps(gridArray) {
    this.gridArray = gridArray;
    this.posX1 = 50;
    this.widthOfSheet1 = 400;
    if (this.bombPlanted == true) {
      this.bombPowerUp.classList.add("bomb-power-up");

      this.bombPowerUpTargets1 = bombPowerUpAppendPosition();
      setTimeout(() => {
        this.bombPowerUpTargets1.map((targets, index) => {
          if (
            this.gridArray[targets.bombPowerUpPosition].classList.contains(
              "background-wall"
            )
          ) {
            if (this.bombPowerUpCount <= 2) {
              this.bombPowerUp.style.cssText = `left: ${targets.position_X}px; top: ${targets.position_Y}px`;
              this.gameDiv.append(this.bombPowerUp);
              this.bombPowerUpCount++;
              this.bombPowerUpsExist = true;
              this.bombPowerUpTargets1.splice(index, 1);
              console.log(this.bombPowerUpTargets1);
            }
          }
        });
      }, 3000);

      //******animation of bomb power up****////
      this.bombPowerupIntervalTime = 0;
      this.bombPowerUpInterval = setInterval(() => {
        this.bombPowerUp.style.backgroundPositionX = this.posX1 + "px";
        this.bombPowerUp.style.backgroundPositionY = 0 + "px";

        if (this.posX1 < this.widthOfSheet1) {
          this.posX1 = this.posX1 + 50;
          ++this.bombPowerupIntervalTime;
        } else {
          this.posX1 = 50;
        }
      }, 600);

      ////***************************//////
    }
  }

  collectBombPowerUps(agentPostion, gridArray) {
    this.agentPosition = agentPostion;
    this.gridArray = gridArray;
    this.bombPowerUpTargets = bombPowerUpAppendPosition();

    this.bombPowerUpTargets.forEach((targets) => {
      if (
        this.gridArray[this.agentPosition] ==
          this.gameDiv.childNodes[targets.bombPowerUpPosition] &&
        this.bombPowerUpsExist == true
      ) {
        this.bombPowerUp.remove();
        this.bombCount += 3;
        this.bombPowerUpsExist = false;
      }
    });

    this.bombPowerUpDisplay.innerHTML = `${this.bombCount}`;
    this.powerUpsBox.append(this.bombPowerUpDisplay);
  }

  bombPowerUpCountDisplay(powerUpsBox) {
    this.powerUpsBox = powerUpsBox;

    this.bombPowerUpDisplay.innerHTML = `${this.bombCount}`;
    this.powerUpsBox.append(this.bombPowerUpDisplay);
  }
}

export { Bomb };
