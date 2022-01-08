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
  bombAppendPosition,
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
        this.bombPlantPosition + 17 == this.agentPosition
      ) {
        const gameOverScreen = new GameOverScreen();
        gameOverScreen.gameOver(this.gameDiv);
      }

      //******************************************************//
    }
  }

  bombPowerUps(
    gridArray,
    bombPlantPositionX,
    bombPlantPositionY,
    agentPosition,
    gridPositions
  ) {
    this.gridArray = gridArray;
    this.bombPlantPositionX = bombPlantPositionX;
    this.bombPlantPositionY = bombPlantPositionY;
    this.agentPosition = agentPosition;
    this.gridPositions = gridPositions;
    this.posX1 = 50;
    this.widthOfSheet1 = 400;

    if (this.bombPlanted == true) {
      this.bombPowerUp = document.createElement("div");

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

      this.bombAppendPositionArray = bombAppendPosition(
        this.bombPlantPosition,
        this.bombBlastTargetsHorizontal,
        this.bombBlastTargetsVertical,
        this.bombPlantPositionX,
        this.bombPlantPositionY
      );

      this.bombPowerUp.classList.add("bomb-power-up");

      this.randomBombPowerup = rand();
      if (this.bombAppendPositionArray.length !== 0) {
        if (this.randomBombPowerup >= 0.7) {
          this.bombPowerUp.style.cssText = `left: ${this.bombAppendPositionArray[0]}px; top: ${this.bombAppendPositionArray[1]}px`;
        } else if (this.randomBombPowerup < 0.4) {
          return;
        }
      } else {
        return;
      }
      this.gameDiv.append(this.bombPowerUp);

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

  collectBombPowerUps(agentPostion) {
    this.agentPosition = agentPostion;
    this.xPosition = this.bombAppendPositionArray[0];
    this.yPosition = this.bombAppendPositionArray[1];
    console.log(this.xPosition, this.yPosition)
    if (this.bombAppendPositionArray.length !== 0) {
      console.log("hello"); 
      console.log(
        this.agentPosition,
        this.gridPositions[this.xPosition / 50 - 1][this.yPosition / 50 - 1]
      );
      ///*******collect bomb power ups*******////
      if (
        this.agentPosition ==
        this.gridPositions[this.xPosition / 50 - 1][this.yPosition / 50 - 1]
      ) {
        this.bombCount++;
        this.bombPowerUp.remove();
        console.log(this.bombCount);
       
      }

      /////**********////////////
    }
  }
}

export { Bomb };
