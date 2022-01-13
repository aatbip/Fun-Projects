import {
  detectEnemyWallCollision,
  isXcoordinateCloser,
  isYcoordinateCloser,
} from "./helper.js";

/**
 * Define class Enemy
 */
class Enemy {
  constructor(agentPosition, gridArray, gameDiv) {
    this.agentPosition = agentPosition;
    this.gridArray = gridArray;
    this.gameDiv = gameDiv;
    this.enemyAnimationInterval = 0;
    this.isGameOver = false;
    this.isEnemyCollision = false;

    this.width = 17;
    this.enemyOneStartPosition = 114;
    this.enemyTwoStartPosition = 168;
    this.enemyThreeStartPosition = 93; //random movement enemy
    this.enemyOne = document.createElement("div");
    this.enemyTwo = document.createElement("div");
    this.enemyThree = document.createElement("div");
  }

  /**
   * Method to add the first enemy to its initial position
   */
  addEnemy() {
    this.enemyOne.classList.add("enemy-one");
    this.gridArray[this.enemyOneStartPosition].classList.add("enemy-one");
    this.posX = 50;
    this.widthOfSheet = 200;
  }

  /**
   * Method to add the second enemy to its initial position
   */
  addEnemyTwo() {
    this.enemyOne.classList.add("enemy-two");
    this.gridArray[this.enemyTwoStartPosition].classList.add("enemy-two");
    this.posX = 50;
    this.widthOfSheet = 200;
  }

  /**
   * Method to add the third enemy to its initial position
   */
  addEnemyThree() {
    this.enemyOne.classList.add("enemy-three");
    this.gridArray[this.enemyThreeStartPosition].classList.add("enemy-three");
    this.posX = 50;
    this.widthOfSheet = 200;
  }

  /**
   * Method to get the current agent position
   *
   * @param {Number} agentPosition
   */
  getAgentPosition(agentPosition) {
    this.agentPosition = agentPosition;
  }

  /**
   * Method to get the current coordinates in the grid array
   *
   * @param {Number} currentGridPosition
   * @returns {Array}
   */
  getPositionCoordinates = (currentGridPosition) => {
    this.currentGridPosition = currentGridPosition;
    return [
      this.currentGridPosition % this.width,
      Math.floor(this.currentGridPosition / this.width),
    ];
  };

  getPositionCoordinatesOne = (currentGridPosition) => {
    this.currentGridPosition = currentGridPosition;
    return [
      this.currentGridPosition % this.width,
      Math.floor(this.currentGridPosition / this.width),
    ];
  };

  /**
   *
   * Method to move the first enemy to follow the agent
   */
  moveEnemy = () => {
    this.directions = [-1, +1, +this.width, -this.width];
    this.direction = Math.floor(Math.random() * this.directions.length);
    this.move = this.directions[this.direction];
    if (
      this.gridArray[this.enemyOneStartPosition + this.move].classList.contains(
        "background-wall"
      )
    ) {
      this.gridArray[this.enemyOneStartPosition].classList.remove("enemy-one");
      this.agentEnemyCollision();
      this.animateEnemy(this.enemyOneStartPosition);

      const [enemyPosX, enemyPosY] = this.getPositionCoordinates(
        this.enemyOneStartPosition
      );
      const [enemyNewPosX, enemyNewPosY] = this.getPositionCoordinates(
        this.enemyOneStartPosition + this.move
      );
      const [agentPosX, agentPosY] = this.getPositionCoordinates(
        this.agentPosition
      );

      if (
        isXcoordinateCloser(enemyNewPosX, agentPosX, enemyPosX) ||
        isYcoordinateCloser(enemyNewPosY, agentPosY, enemyPosY)
      ) {
        this.enemyOneStartPosition += this.move;
        this.gridArray[this.enemyOneStartPosition].classList.add("enemy-one");
        this.agentEnemyCollision();
      }

      this.gridArray[this.enemyOneStartPosition].classList.add("enemy-one");
    } else if (
      detectEnemyWallCollision(
        this.enemyOneStartPosition,
        this.gridArray,
        this.move
      )
    ) {
      this.direction = Math.floor(Math.random() * this.directions.length);

      this.move = this.directions[this.direction];
    } else {
      return;
    }
  };

  /**
   * Method to move the second enemy to follow the agent
   *
   */
  moveEnemyTwo = () => {
    this.directions = [-1, +1, +this.width, -this.width];
    this.direction = Math.floor(Math.random() * this.directions.length);
    this.move = this.directions[this.direction];
    if (
      this.gridArray[this.enemyTwoStartPosition + this.move].classList.contains(
        "background-wall"
      )
    ) {
      this.gridArray[this.enemyTwoStartPosition].classList.remove("enemy-two");
      this.agentEnemyCollisionTwo();
      this.animateEnemy(this.enemyTwoStartPosition);

      const [enemyPosX, enemyPosY] = this.getPositionCoordinatesOne(
        this.enemyTwoStartPosition
      );
      const [enemyNewPosX, enemyNewPosY] = this.getPositionCoordinatesOne(
        this.enemyTwoStartPosition + this.move
      );
      const [agentPosX, agentPosY] = this.getPositionCoordinatesOne(
        this.agentPosition
      );

      if (
        isXcoordinateCloser(enemyNewPosX, agentPosX, enemyPosX) ||
        isYcoordinateCloser(enemyNewPosY, agentPosY, enemyPosY)
      ) {
        this.enemyTwoStartPosition += this.move;
        this.gridArray[this.enemyTwoStartPosition].classList.add("enemy-two");
        this.agentEnemyCollisionTwo();
      }

      this.gridArray[this.enemyTwoStartPosition].classList.add("enemy-two");
    } else if (
      detectEnemyWallCollision(
        this.enemyTwoStartPosition,
        this.gridArray,
        this.move
      )
    ) {
      this.direction = Math.floor(Math.random() * this.directions.length);

      this.move = this.directions[this.direction];
    } else {
      return;
    }
  };

  /**
   * Method to move the third enemy. This enemy's movement is random.
   *
   */
  moveEnemyThree = () => {
    this.directions = [-1, +1, +this.width, -this.width];
    this.direction = Math.floor(Math.random() * this.directions.length);
    this.move = this.directions[this.direction];
    if (
      this.gridArray[
        this.enemyThreeStartPosition + this.move
      ].classList.contains("background-wall")
    ) {
      this.gridArray[this.enemyThreeStartPosition].classList.remove(
        "enemy-three"
      );
      this.enemyThreeStartPosition += this.move;
      this.agentEnemyCollisionThree();
      this.animateEnemy(this.enemyThreeStartPosition);
      this.gridArray[this.enemyThreeStartPosition].classList.add("enemy-three");
    } else if (
      detectEnemyWallCollision(
        this.enemyThreeStartPosition,
        this.gridArray,
        this.move
      )
    ) {
      this.direction = Math.floor(Math.random() * this.directions.length);

      this.move = this.directions[this.direction];
    } else {
      return;
    }
  };

  /**
   * Method to determine the collision between enemy and agent
   *
   * @returns {Object}
   */

  agentEnemyCollision() {
    if (
      this.gridArray[this.agentPosition].classList.contains("enemy-one") ||
      this.gridArray[this.agentPosition].classList.contains("enemy-two") ||
      this.gridArray[this.agentPosition].classList.contains("enemy-three")
    ) {
      this.isEnemyCollision = true;
    }
    return {
      isEnemyCollision1: this.isEnemyCollision,
      isEnemyCollision2: this.isEnemyCollision,
      isEnemyCollision3: this.isEnemyCollision,
      isEnemyCollision4: this.isEnemyCollision,
    };
  }

  agentEnemyCollisionTwo() {
    if (
      this.gridArray[this.agentPosition].classList.contains("enemy-one") ||
      this.gridArray[this.agentPosition].classList.contains("enemy-two") ||
      this.gridArray[this.agentPosition].classList.contains("enemy-three")
    ) {
      this.isEnemyCollision = true;
    }
    return {
      isEnemyCollision5: this.isEnemyCollision,
      isEnemyCollision6: this.isEnemyCollision,
      isEnemyCollision7: this.isEnemyCollision,
      isEnemyCollision8: this.isEnemyCollision,
    };
  }

  agentEnemyCollisionThree() {
    if (
      this.gridArray[this.agentPosition].classList.contains("enemy-one") ||
      this.gridArray[this.agentPosition].classList.contains("enemy-two") ||
      this.gridArray[this.agentPosition].classList.contains("enemy-three")
    ) {
      this.isEnemyCollision = true;
    }
    return {
      isEnemyCollision9: this.isEnemyCollision,
      isEnemyCollision10: this.isEnemyCollision,
      isEnemyCollision11: this.isEnemyCollision,
      isEnemyCollision12: this.isEnemyCollision,
    };
  }

  /**
   * Method to animate the enemy using sprite image
   *
   * @param {Number} enemyStartPosition
   */
  animateEnemy(enemyStartPosition) {
    this.enemyStartPosition = enemyStartPosition;
    this.widthOfSheet = 300;
    this.posX = 50;
    this.enemyAnimationInterval = setInterval(() => {
      this.gridArray[this.enemyStartPosition].style.backgroundPositionX =
        this.posX + "px";
      this.gridArray[this.enemyStartPosition].style.backgroundPositionY =
        0 + "px";

      if (this.posX < this.widthOfSheet) {
        this.posX = this.posX + 50;
      } else {
        this.posX = 50;
      }
    }, 500);
  }
}

export { Enemy };
