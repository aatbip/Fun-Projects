/**
 * Import functions which returns targets in the array which will be destroyed by the bomb.
 */

import {
  findBombBlastTargetVertical,
  findBombBlastTargetHorizontal,
  bombPowerUpAppendPosition,
  findVerticalTargetEnemy,
  findHorizontalTargetEnemy,
  findVerticalTargetEvilMachine,
  findHorizontalTargetEvilMachine,
} from "./helper.js";

import { bombBlastAudio, bombPlantAudio, bombPowerUpAudio } from "./audios.js";

/**
 * Import class
 */
import { GameEnv } from "./GameEnv.js";

/**
 * Initialize class
 */
const gameEnv = new GameEnv(game);

/**
 * Define the constructor
 */
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

    this.bombCount = 6;
    this.score = 0;
    this.bombPowerUpCount = 0;
    this.bombPlantTargets = [];
    this.isPowerUp = false;

    this.isEnemyOneDead = false;
    this.isEnemyTwoDead = false;
    this.isEnemyThreeDead = false;
    this.isEvilMachineBombed = false;
  }

  /**
   * Method to plant the bomb
   *
   * @param {Number} agentPositionX
   * @param {Number} agentPositionY
   * @param {Number} agentPosition
   */
  bombPlant(agentPositionX, agentPositionY, agentPosition) {
    this.agentPositionX = agentPositionX;
    this.agentPositionY = agentPositionY;
    this.bombPlantPosition = agentPosition;

    this.bombPlanted = false;
    this.bombPowerUpsExist = false;

    clearInterval(this.bombAnimationInterval);
    clearInterval(this.bombPowerUpInterval);

    if (this.bombCount >= 1) {
      bombPlantAudio();

      this.newBomb.classList.add("bomb");
      this.newBomb.style.cssText = `top: ${this.agentPositionY}px; left: ${this.agentPositionX}px;`;
      this.gameDiv.append(this.newBomb);

      this.bombCount = this.bombCount - 1;
      this.bombPlanted = true;
      this.firstBombPlant = false;
    }

    this.bombPowerUpInterval = setTimeout(() => {
      this.bombPowerUp.remove();
      this.isPowerUp = false;
      this.bombPowerUpsExist = false;
    }, 5000);
  }

  /**
   * Method to use animation sprite to animate the planted bomb
   */
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

  /**
   * Method to blast the bomb and find the bomb blast directions
   *
   * @param {Array} gridArray
   * @param {Number} agentPosition
   * @returns {Object}
   */

  bombBlast(gridArray, agentPosition) {
    this.agentPosition = agentPosition;
    this.newBomb.remove();

    this.gridArray = gridArray;

    this.posX = 50;
    this.widthOfSheet = 550;

    this.isGameOver = false;

    if (this.bombPlanted == true) {
      bombBlastAudio();

      this.explosion.classList.add("left-explosion");
      this.explosion.style.cssText = `top: ${this.agentPositionY}px; left: ${
        this.agentPositionX - 50
      }px;`;
      this.explosion1.classList.add("top-explosion");
      this.explosion1.style.cssText = `top: ${this.agentPositionY}px; left: ${
        this.agentPositionX - 50
      }px;`;

      this.gameDiv.append(this.explosion);
      this.gameDiv.append(this.explosion1);

      /**
       * Animate bomb blast explosion
       */
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

      /**
       * Call the functions to find the bomb blast target vectors vertical and horizontal
       */

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

      /**
       * Call function to find the blast enemy target vectors to horizontal and vertical
       */
      this._verticalTargetEnemy = findVerticalTargetEnemy(
        this.gridArray,
        this.bombPlantPosition
      );
      this._horizontalTargetEnemy = findHorizontalTargetEnemy(
        this.gridArray,
        this.bombPlantPosition
      );

      this.verticalTargetEnemy = [...new Set(this._verticalTargetEnemy)];
      this.horizontalTargetEnemy = [...new Set(this._horizontalTargetEnemy)];

      /**
       * Call function to find the evil machine target vectors
       */
      this.verticalTargetEvilMachine = findVerticalTargetEvilMachine(
        this.gridArray,
        this.bombPlantPosition
      );
      this.horizontalTargetEvilMachine = findHorizontalTargetEvilMachine(
        this.gridArray,
        this.bombPlantPosition
      );

      /**
       * Blast the enemies and evil machine to the target vectors
       */
      if (this.bombCount >= 0) {
        this.verticalTargetEnemy.forEach((targets) => {
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
          }

          if (
            this.gameDiv.childNodes[targets].classList.contains("enemy-three")
          ) {
            this.score += 50;
            this.gameDiv.childNodes[targets].classList.remove("enemy-three");
            this.isEnemyThreeDead = true;
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
          }

          if (
            this.gameDiv.childNodes[targets].classList.contains("enemy-three")
          ) {
            this.score += 50;
            this.gameDiv.childNodes[targets].classList.remove("enemy-three");
            this.isEnemyThreeDead = true;
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

        /**
         * Condition to check if player remains in the bomb blast position
         */

        if (
          this.bombPlantPosition - 1 == this.agentPosition ||
          this.bombPlantPosition + 1 == this.agentPosition ||
          this.bombPlantPosition - 17 == this.agentPosition ||
          this.bombPlantPosition + 17 == this.agentPosition ||
          this.bombPlantPosition == this.agentPosition
        ) {
          this.isGameOver = true;
        }
      }
      return {
        isEnemyOneDead: this.isEnemyOneDead,
        isEnemyTwoDead: this.isEnemyTwoDead,
        isEnemyThreeDead: this.isEnemyThreeDead,
        isEvilMachineBombed: this.isEvilMachineBombed,
        isGameOver: this.isGameOver,
      };
    }
  }

  /**
   * Method to put the bomb power ups
   *
   * @param {Array} gridArray
   */

  bombPowerUps(gridArray) {
    this.gridArray = gridArray;
    this.posX1 = 50;
    this.widthOfSheet1 = 400;
    if (this.bombPlanted == true) {
      this.bombPowerUp.classList.add("bomb-power-up");

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
      this.bombPlantTargets = [];

      this.bombBlastTargetsVertical.forEach((targets) => {
        this.bombPlantTargets.push(targets);
      });

      this.bombBlastTargetsHorizontal.forEach((targets) => {
        this.bombPlantTargets.push(targets);
      });

      this.targetPowerUps = bombPowerUpAppendPosition();
      setTimeout(() => {
        this.bombPlantTargets.map((targets) => {
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

    /**
     * Animated the bomb power ups using sprite
     */
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
  }

  /**
   * Method to collect the bomb power ups when enemy steps on its position
   *
   * @param {Number} agentPostion
   * @param {Array} gridArray
   */

  collectBombPowerUps(agentPostion, gridArray) {
    this.agentPosition = agentPostion;
    this.gridArray = gridArray;

    this.targetPowerUps = bombPowerUpAppendPosition();

    if (this.bombPlanted == true) {
      this.bombPlantTargets1 = this.targetVectors();
      this.bombPlantTargets1.map((targets) => {
        if (this.targetPowerUps[targets]) {
          if (
            this.gridArray[this.agentPosition] ==
              this.gameDiv.childNodes[
                this.targetPowerUps[targets].bombPowerUpPosition
              ] &&
            this.bombPowerUpsExist == true
          ) {
            bombPowerUpAudio();
            this.isPowerUp = true;
          }
        }
      });
    }

    this.bombPowerUpDisplay.innerHTML = `${this.bombCount}`;
    this.powerUpsBox.append(this.bombPowerUpDisplay);
  }

  /**
   * Method to display bomb count on the display board
   *
   * @param {String} powerUpsBox
   */
  bombPowerUpCountDisplay(powerUpsBox) {
    this.powerUpsBox = powerUpsBox;

    this.bombPowerUpDisplay.innerHTML = `${this.bombCount}`;
    this.powerUpsBox.append(this.bombPowerUpDisplay);
  }

  /**
   * Return target vectors for the bomb plant positions
   *
   * @returns {Array}
   */
  targetVectors() {
    this.bombPlantTargets1 = [];
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
      this.bombPlantTargets.push(targets);
    });

    this.bombBlastTargetsHorizontal.forEach((targets) => {
      this.bombPlantTargets.push(targets);
    });

    return this.bombPlantTargets;
  }

  /**
   * Method to remove bomb power ups
   */
  removeBomb() {
    if (this.isPowerUp == true) {
      this.num = this.gameDiv.childNodes.length;
      if (!this.gameDiv.childNodes[this.num]) {
        this.bombCount += 3;
        this.bombPowerUp.remove();

        this.bombPowerUpDisplay.innerHTML = `${this.bombCount}`;
        this.powerUpsBox.append(this.bombPowerUpDisplay);
        this.isPowerUp = false;
        this.bombPowerUpsExist = false;
      }
    }
  }

  /**
   * Method to display score
   *
   * @param {String} scoreBox
   */

  scoreDisplay(scoreBox) {
    this.scoreBox = scoreBox;
    this.displayScore.innerHTML = `${this.score}`;
    this.displayScore.classList.add("display-score");
    this.scoreBox.append(this.displayScore);
  }

  /**
   * Method to return the score
   *
   * @returns {Number}
   */
  returnScore() {
    return this.score;
  }
}

export { Bomb };
