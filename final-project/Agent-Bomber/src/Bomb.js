import {
  findBombBlastTargetVertical,
  findBombBlastTargetHorizontal,
  bombPowerUpAppendPosition,
  findVerticalTargetEnemy,
  findHorizontalTargetEnemy,
  findVerticalTargetEvilMachine,
  findHorizontalTargetEvilMachine,
  rand,
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
    this.bombPowerUp = document.createElement("div");
    this.bombPowerUpDisplay = document.createElement("p");
    this.bombPowerUpDisplay.classList.add("bomb-power-up-count");
    this.displayScore = document.createElement("p");

    this.bombCount = 3;
    this.score = 0;
    this.bombPowerUpCount = 0;
    this.ups = [];
    this.pw = false;

    this.isEnemyOneDead = false;
    this.isEnemyTwoDead = false;
    this.isEnemyThreeDead = false;
    this.isEvilMachineBombed = false;
  }

  bombPlant(agentPositionX, agentPositionY, agentPosition) {
    this.agentPositionX = agentPositionX;
    this.agentPositionY = agentPositionY;
    this.bombPlantPosition = agentPosition;
    this.bombPlanted = false;
    this.bombPowerUpsExist = false;

    clearInterval(this.bombAnimationInterval);
    clearInterval(this.bombPowerUpInterval);
    if (this.bombCount >= 1) {
      const bombPlantAudio = new Audio("./audios/plantbomb.wav");
      bombPlantAudio.play();
      this.newBomb.classList.add("bomb");
      this.newBomb.style.cssText = `top: ${this.agentPositionY}px; left: ${this.agentPositionX}px;`;
      this.gameDiv.append(this.newBomb);
      this.bombCount = this.bombCount - 1;
      this.bombPlanted = true;
      this.firstBombPlant = false;
    }

    this.bombPowerUpInterval = setTimeout(() => {
      this.bombPowerUp.remove();
      this.pw = false;
      this.bombPowerUpsExist = false;
    }, 5000);
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
    // this.isEnemyOneDead = false;
    // this.isEnemyTwoDead = false;
    // this.isEnemyThreeDead = false;
    // this.isEvilMachineBombed = false;
    this.isGameOver = false;

    if (this.bombPlanted == true) {
      const bombBlastAudio = new Audio("./audios/explosion.wav");
      bombBlastAudio.play();
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

      //////////////////////////////
      this._verticalTargetEnemy = findVerticalTargetEnemy(
        this.gridArray,
        // this.gameDiv,
        this.bombPlantPosition
      );
      this._horizontalTargetEnemy = findHorizontalTargetEnemy(
        this.gridArray,
        // this.gameDiv,
        this.bombPlantPosition
      );
      this.verticalTargetEnemy = [...new Set(this._verticalTargetEnemy)];
      this.horizontalTargetEnemy = [...new Set(this._horizontalTargetEnemy)];

      this.verticalTargetEvilMachine = findVerticalTargetEvilMachine(
        this.gridArray,
        // this.gameDiv,
        this.bombPlantPosition
      );
      this.horizontalTargetEvilMachine = findHorizontalTargetEvilMachine(
        this.gridArray,
        // this.gameDiv,
        this.bombPlantPosition
      );

      if (this.bombCount >= 0) {
        this.verticalTargetEnemy.forEach((targets) => {
          if (
            this.gameDiv.childNodes[targets].classList.contains("enemy-one")
          ) {
            // if (this.gridArray[targets].classList.contains("enemy-one")) {
            this.score += 50;
            this.gameDiv.childNodes[targets].classList.remove("enemy-one");
            this.isEnemyOneDead = true;
          }

          if (
            this.gameDiv.childNodes[targets].classList.contains("enemy-two")
          ) {
            // if (this.gridArray[targets].classList.contains("enemy-one")) {
            this.score += 50;
            this.gameDiv.childNodes[targets].classList.remove("enemy-two");
            this.isEnemyTwoDead = true;
            console.log("enemy 2 shud die");
          }

          if (
            this.gameDiv.childNodes[targets].classList.contains("enemy-three")
          ) {
            // if (this.gridArray[targets].classList.contains("enemy-one")) {
            this.score += 50;
            this.gameDiv.childNodes[targets].classList.remove("enemy-three");
            this.isEnemyThreeDead = true;
            console.log("enemy 2 shud die");
          }
        });
        this.horizontalTargetEnemy.forEach((targets) => {
          if (
            this.gameDiv.childNodes[targets].classList.contains("enemy-one")
          ) {
            this.score += 50;
            this.gameDiv.childNodes[targets].classList.remove("enemy-one");
            this.isEnemyOneDead = true;
          }

          if (
            this.gameDiv.childNodes[targets].classList.contains("enemy-two")
          ) {
            this.score += 50;
            this.gameDiv.childNodes[targets].classList.remove("enemy-two");
            this.isEnemyTwoDead = true;
            console.log("enemy 2 shud die");
          }

          if (
            this.gameDiv.childNodes[targets].classList.contains("enemy-three")
          ) {
            this.score += 50;
            this.gameDiv.childNodes[targets].classList.remove("enemy-three");
            this.isEnemyThreeDead = true;
            console.log("enemy 2 shud die");
          }
        });

        this.verticalTargetEvilMachine.forEach((targets) => {
          if (
            this.gameDiv.childNodes[targets].classList.contains("evil-machine")
          ) {
            this.score += 150;

            this.gameDiv.childNodes[targets].classList.remove("evil-machine");
            this.isEvilMachineBombed = true;
          }
        });

        this.horizontalTargetEvilMachine.forEach((targets) => {
          if (
            this.gameDiv.childNodes[targets].classList.contains("evil-machine")
          ) {
            this.score += 150;

            this.gameDiv.childNodes[targets].classList.remove("evil-machine");
            this.isEvilMachineBombed = true;
          }
        });

        this.displayScore.innerHTML = `${this.score}`;
        this.scoreBox.append(this.displayScore);

        //*******GAME-OVER SCREEN TO BE REFACTORED LATORR ******//
        if (
          this.bombPlantPosition - 1 == this.agentPosition ||
          this.bombPlantPosition + 1 == this.agentPosition ||
          this.bombPlantPosition - 17 == this.agentPosition ||
          this.bombPlantPosition + 17 == this.agentPosition ||
          this.bombPlantPosition == this.agentPosition
        ) {
          // const gameOverScreen = new GameOverScreen();
          // gameOverScreen.gameOver(this.gameDiv);

          this.isGameOver = true;
        }
        // return this.isGameOver;

        //******************************************************//
      }
      return {
        isEnemyOneDead: this.isEnemyOneDead,
        isEnemyTwoDead: this.isEnemyTwoDead,
        isEnemyThreeDead: this.isEnemyThreeDead,
        isEvilMachineBombed: this.isEvilMachineBombed,
        isGameOver: this.isGameOver,
      };

      //////////////////////////////

      // //*******GAME-OVER SCREEN TO BE REFACTORED LATORR ******//
      // if (
      //   this.bombPlantPosition - 1 == this.agentPosition ||
      //   this.bombPlantPosition + 1 == this.agentPosition ||
      //   this.bombPlantPosition - 17 == this.agentPosition ||
      //   this.bombPlantPosition + 17 == this.agentPosition ||
      //   this.bombPlantPosition == this.agentPosition
      // ) {
      //   // const gameOverScreen = new GameOverScreen();
      //   // gameOverScreen.gameOver(this.gameDiv);
      //   this.isGameOver = true;
      // }
      // return this.isGameOver;

      // //******************************************************//
    }
  }

  bombPowerUps(gridArray) {
    this.gridArray = gridArray;
    this.posX1 = 50;
    this.widthOfSheet1 = 400;
    if (this.bombPlanted == true) {
      this.bombPowerUp.classList.add("bomb-power-up");
      /////////////**************/////////////////

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
      this.ups = [];

      this.bombBlastTargetsVertical.forEach((targets) => {
        this.ups.push(targets);
      });

      this.bombBlastTargetsHorizontal.forEach((targets) => {
        this.ups.push(targets);
      });

      ///////////////////*************////////////////////

      this.targetPowerUps = bombPowerUpAppendPosition();
      setTimeout(() => {
        this.ups.map((targets) => {
          ///
          if (this.targetPowerUps[targets]) {
            this.bombPowerUp.style.cssText = `left: ${this.targetPowerUps[targets].position_X}px; top: ${this.targetPowerUps[targets].position_Y}px`;
            this.gameDiv.append(this.bombPowerUp);
          }
        });
        if (this.bombPowerUpCount <= 2) {
          this.bombPowerUpCount++;
          this.bombPowerUpsExist = true;
        }
      }, 3000);
    }

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

  collectBombPowerUps(agentPostion, gridArray) {
    this.agentPosition = agentPostion;
    this.gridArray = gridArray;
    this.targetPowerUps = bombPowerUpAppendPosition();
    if (this.bombPlanted == true) {
      this.ups1 = this.targetVectors();
      this.ups1.map((targets) => {
        if (this.targetPowerUps[targets]) {
          if (
            this.gridArray[this.agentPosition] ==
              this.gameDiv.childNodes[
                this.targetPowerUps[targets].bombPowerUpPosition
              ] &&
            this.bombPowerUpsExist == true
          ) {
            const bombPowerUpAudio = new Audio("./audios/gainpowerup.wav");
            bombPowerUpAudio.play();
            // this.bombPowerUp.remove();
            this.pw = true;
          }
        }
      });
    }

    this.bombPowerUpDisplay.innerHTML = `${this.bombCount}`;
    this.powerUpsBox.append(this.bombPowerUpDisplay);
  }

  bombPowerUpCountDisplay(powerUpsBox) {
    this.powerUpsBox = powerUpsBox;

    this.bombPowerUpDisplay.innerHTML = `${this.bombCount}`;
    this.powerUpsBox.append(this.bombPowerUpDisplay);
  }

  targetVectors() {
    this.ups1 = [];
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
      this.ups.push(targets);
    });

    this.bombBlastTargetsHorizontal.forEach((targets) => {
      this.ups.push(targets);
    });

    return this.ups;
  }

  powerW() {
    if (this.pw == true) {
      this.num = this.gameDiv.childNodes.length;
      console.log(this.num);
      if (!this.gameDiv.childNodes[this.num]) {
        this.bombCount += 3;
        this.bombPowerUp.remove();

        this.bombPowerUpDisplay.innerHTML = `${this.bombCount}`;
        this.powerUpsBox.append(this.bombPowerUpDisplay);
        this.pw = false;
        this.bombPowerUpsExist = false;
      }
    }
  }

  scoreDisplay(scoreBox) {
    this.scoreBox = scoreBox;
    this.displayScore.innerHTML = `${this.score}`;
    this.displayScore.classList.add("display-score");
    this.scoreBox.append(this.displayScore);
  }

  returnScore() {
    return this.score;
  }
}

export { Bomb };
