import {
  detectCollisionToRight,
  isXcoordinateCloser,
  isYcoordinateCloser,
} from "./helper.js";

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
    this.enemyThreeStartPosition = 93; //random movement
    this.enemyOne = document.createElement("div");
    this.enemyTwo = document.createElement("div");
    this.enemyThree = document.createElement("div");
  }

  addEnemy() {
    this.enemyOne.classList.add("enemy-one");
    this.gridArray[this.enemyOneStartPosition].classList.add("enemy-one");
    this.posX = 50;
    this.widthOfSheet = 200;
  }

  addEnemyTwo() {
    this.enemyOne.classList.add("enemy-two");
    this.gridArray[this.enemyTwoStartPosition].classList.add("enemy-two");
    this.posX = 50;
    this.widthOfSheet = 200;
  }

  addEnemyThree() {
    this.enemyOne.classList.add("enemy-three");
    this.gridArray[this.enemyThreeStartPosition].classList.add("enemy-three");
    this.posX = 50;
    this.widthOfSheet = 200;
  }

  getAgentPosition(agentPosition) {
    this.agentPosition = agentPosition;
    console.log("w", this.agentPosition);   
  }

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

      // //check closer
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
      detectCollisionToRight(
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

  moveEnemyTwo = () => {
    this.directions = [+1, -1, -this.width, +this.width];
    this.direction = Math.floor(Math.random() * this.directions.length);
    this.move = this.directions[this.direction];
    if (
      this.gridArray[this.enemyTwoStartPosition + this.move].classList.contains(
        "background-wall"
      )
    ) {
      this.gridArray[this.enemyTwoStartPosition].classList.remove("enemy-two");
      this.agentEnemyCollision();
      this.animateEnemy(this.enemyTwoStartPosition);

      // //check closer
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
        this.agentEnemyCollision();
      }

      this.gridArray[this.enemyTwoStartPosition].classList.add("enemy-two");
    } else if (
      detectCollisionToRight(
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

  moveEnemyThree = () => {
    this.directions = [+1, -1, -this.width, +this.width];
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
      this.agentEnemyCollision();
      this.animateEnemy(this.enemyThreeStartPosition);
      this.gridArray[this.enemyThreeStartPosition].classList.add("enemy-three");
      // //check closer
      // const [enemyPosX, enemyPosY] = this.getPositionCoordinatesOne(
      //   this.enemyThreeStartPosition
      // );
      // const [enemyNewPosX, enemyNewPosY] = this.getPositionCoordinatesOne(
      //   this.enemyThreeStartPosition + this.move
      // );
      // const [agentPosX, agentPosY] = this.getPositionCoordinatesOne(
      //   this.agentPosition
      // );
      // console.log("from e2", this.agentPosition);

      // if (
      //   isXcoordinateCloser(enemyNewPosX, agentPosX, enemyPosX) ||
      //   isYcoordinateCloser(enemyNewPosY, agentPosY, enemyPosY)
      // ) {
      //   this.enemyThreeStartPosition += this.move;
      //   this.gridArray[this.enemyThreeStartPosition].classList.add("enemy-three");
      //   this.agentEnemyCollision();
      // }

      // this.gridArray[this.enemyThreeStartPosition].classList.add("enemy-three");
    } else if (
      detectCollisionToRight(
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

  agentEnemyCollision() {
    if (
      this.gridArray[this.agentPosition].classList.contains("enemy-one") ||
      this.gridArray[this.agentPosition].classList.contains("enemy-two") ||
      this.gridArray[this.agentPosition].classList.contains("enemy-three")
    ) {
      this.isEnemyCollision = true;
      console.log("enemy stepped");
      // setTimeout(() => {
      //   gameOverScreen();
      // }, 1500);
    }
    return {
      isEnemyCollision1: this.isEnemyCollision,
      isEnemyCollision2: this.isEnemyCollision,
      isEnemyCollision3: this.isEnemyCollision,
      isEnemyCollision4: this.isEnemyCollision,
    };
  }

  animateEnemy(enemyStartPosition) {
    this.enemyStartPosition = enemyStartPosition;
    // this.move = move;
    // this.animateEnemyIntervalTime = 0;
    this.widthOfSheet = 300;
    this.posX = 50;
    this.enemyAnimationInterval = setInterval(() => {
      this.gridArray[this.enemyStartPosition].style.backgroundPositionX =
        this.posX + "px";
      this.gridArray[this.enemyStartPosition].style.backgroundPositionY =
        0 + "px";
      // this.gridArray[this.enemyOneStartPosition - this.move].style.backgroundPositionX =
      // 0 + "px";
      // this.gridArray[this.enemyOneStartPosition - this.move].style.backgroundPositionY =
      // 0 + "px";

      if (this.posX < this.widthOfSheet) {
        this.posX = this.posX + 50;
        // ++this.animateEnemyIntervalTime
      } else {
        this.posX = 50;
      }
    }, 500);
  }
}

// const detectCollisionToRight = (enemyStartPosition, gridArray, move) => {
//   if (gridArray[enemyStartPosition + move].classList.contains("metal-wall")) {
//     return true;
//   }
//   if (gridArray[enemyStartPosition + move].classList.contains("movable-wall")) {
//     return true;
//   }
//   if (gridArray[enemyStartPosition + move].classList.contains("brick-wall")) {
//     return true;
//   }
//   if (gridArray[enemyStartPosition + move].classList.contains("side-wall")) {
//     return true;
//   }
//   if (gridArray[enemyStartPosition + move].classList.contains("top-wall")) {
//     return true;
//   }
// };

// const isXcoordinateCloser = (enemyNewPosX, agentPosX, enemyPosX) => {
//   if (Math.abs(enemyNewPosX - agentPosX) < Math.abs(enemyPosX - agentPosX)) {
//     return true;
//   } else {
//     return false;
//   }
// };

// const isYcoordinateCloser = (enemyNewPosY, agentPosY, enemyPosY) => {
//   if (Math.abs(enemyNewPosY - agentPosY) < Math.abs(enemyPosY - agentPosY)) {
//     return true;
//   } else {
//     return false;
//   }
// };

// export { addEnemy, moveEnemy  };
export { Enemy };
