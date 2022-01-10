import { GameOverScreen } from "./GameOverScreen.js";

class Enemy {
  constructor(agentPosition, gridArray, gameDiv) {
    this.agentPosition = agentPosition;
    this.gridArray = gridArray;
    this.gameDiv = gameDiv;
    this.enemyAnimationInterval = 0;

    this.width = 17;
    this.enemyOneStartPosition = 114;

    this.enemyOne = document.createElement("div");
  }
  addEnemy() {
    this.enemyOne.classList.add("enemy-one");
    this.gridArray[this.enemyOneStartPosition].classList.add("enemy-one");
  }

  getAgentPosition(agentPosition) {
    this.agentPosition = agentPosition;
  }

  getPositionCoordinates = (currentGridPosition) => {
    this.currentGridPosition = currentGridPosition;
    return [
      this.currentGridPosition % this.width,
      Math.floor(this.currentGridPosition / this.width),
    ];
  };

  moveEnemy = () => {
    // gridPositions = gridPositions;
    // this.gridArray = gridArray;
    this.directions = [-1, +1, +this.width, -this.width];

    this.enemyTimerId = NaN;
    this.direction = Math.floor(Math.random() * this.directions.length);
    this.move = this.directions[this.direction];
    this.enemyTimerId = setInterval(() => {
      if (
        this.gridArray[
          this.enemyOneStartPosition + this.move
        ].classList.contains("background-wall")
      ) {
        this.gridArray[this.enemyOneStartPosition].classList.remove(
          "enemy-one"
        );
        this.agentEnemyCollision();
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
        } else {
          this.gridArray[this.enemyOneStartPosition].classList.add("enemy-one");
          this.direction = Math.floor(Math.random() * this.directions.length);

          this.move = this.directions[this.direction];
        }

        // this.enemyOneStartPosition += this.move;

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
    }, 300);
  };

  agentEnemyCollision() {
    if (
      this.agentPosition == this.enemyOneStartPosition ||
      this.gridArray[this.agentPosition].classList.contains("enemy-one")
    ) {
      const gameOverScreen = new GameOverScreen();
      gameOverScreen.gameOver(this.gameDiv);
    }
  }

  removeEnemy(targets) {
    this.targets = targets;
    console.log("tar", this.targets);
    clearInterval(this.enemyTimerId);

    // if (this.gridArray[this.targets].classList.contains("enemy-one")) {
    //   this.gridArray[this.targets].classList.remove("enemy-one");
    // } 

    // this.gridArray[this.targets[0]].classList.add("background-wall");
    console.log("hello");
    // this.gameDiv.childNodes[this.enemyOneStartPosition].classList.remove("enemy-one")
    // this.gameDiv.childNodes[this.enemyOneStartPosition].classList.add("background-wall")
  }
}

//   addEnemy() {
//     this.enemyOne.style.cssText = "left: 600px; top: 300px"; //gridArra = 114
//     this.enemyOne.classList.add("enemy-one");
//     this.gameDiv.append(this.enemyOne);
//   }

//   getPositionCoordinates(currentGridPosition) {
//     return [
//       currentGridPosition % this.width,
//       Math.floor(currentGridPos= [ition / this.width),
//     ];
//   }

//   moveEnemy(gridPositions) {
//     this.enemyOneStartPosition = 114;
//     this.gridPositions = gridPositions;

//     this.directions
//       [0, 50],
//       [0, -50],
//       [50, 0],
//       [-50, 0],
//     ]; //top, left

//     this.direction = Math.floor(Math.random() * this.directions.length);
//     this.move = this.directions[this.direction - 1];

//     // this.enemyTimerId;

//     setInterval(() => {
//       if (this.direction === 1) {
//         if (
//           this.gridArray[this.enemyOneStartPosition + 1].classList.contains(
//             "background-wall"
//           )
//         ) {
//           this.enemyOne.style.cssText = `top: ${this.move[0]}; left: ${this.move[1]}`;
//           this.enemyOneStartPosition += 1;
//         }
//       } else if (this.direction === 2) {
//         if (
//           this.gridArray[this.enemyOneStartPosition - 1].classList.contains(
//             "background-wall"
//           )
//         ) {
//           this.enemyOne.style.cssText = `top: ${this.move[0]}; left: ${this.move[1]}`;
//           this.enemyOneStartPosition -= 1;
//         }
//       } else if (this.direction === 3) {
//         if (
//           this.gridArray[this.enemyOneStartPosition + 17].classList.contains(
//             "background-wall"
//           )
//         ) {
//           this.enemyOne.style.cssText = `top: ${this.move[0]}; left: ${this.move[1]}`;
//           this.enemyOneStartPosition += 17;
//         }
//       } else if (this.direction === 4) {
//         if (
//           this.gridArray[this.enemyOneStartPosition - 17].classList.contains(
//             "background-wall"
//           )
//         ) {
//           this.enemyOne.style.cssText = `top: ${this.move[0]}; left: ${this.move[1]}`;
//           this.enemyOneStartPosition -= 17;
//         }
//       } else {
//         this.direction = Math.floor(Math.random() * this.directions.length);

//         this.move = this.directions[this.direction - 1];
//       }
//     }, 300);
//   }
// }

/********************************************************* */

// let width = 17;
// let enemyOneStartPosition = 114;

// const enemyOne = document.createElement("div");

// const addEnemy = (gridArray) => {
//   // enemyOne.style.cssText = "left: 600px ; top: 300px"; //gridArra = 114
//   enemyOne.classList.add("enemy-one");
//   // gameDiv.append(enemyOne);
//   gridArray[enemyOneStartPosition].classList.add("enemy-one");
// };

// const getPositionCoordinates = (currentGridPosition) => {
//   return [currentGridPosition % width, Math.floor(currentGridPosition / width)];
// };

// const moveEnemy = (gridArray) => {
//   // gridPositions = gridPositions;
//   let directions = [-1, +1, +width, -width];

//   let enemyTimerId = NaN;
//   let direction = Math.floor(Math.random() * directions.length);
//   let move = directions[direction];
//   enemyTimerId = setInterval(() => {
//     console.log("classes", gridArray[enemyOneStartPosition + move]);
//     if (
//       gridArray[enemyOneStartPosition + move].classList.contains(
//         "background-wall"
//       )
//     ) {
//       gridArray[enemyOneStartPosition].classList.remove("enemy-one");

//       // //check closer
//       // const [enemyPosX, enemyPosY] = getPositionCoordinates(
//       //   enemyOneStartPosition
//       // );

//       enemyOneStartPosition += move;

//       gridArray[enemyOneStartPosition].classList.add("enemy-one");
//       console.log("move", move);
//     } else if (detectCollisionToRight(enemyOneStartPosition, gridArray, move)) {
//       direction = Math.floor(Math.random() * directions.length);

//       move = directions[direction];
//       console.log("last", move);
//     } else {
//       return;
//     }
//   }, 500);
// };

const detectCollisionToRight = (enemyStartPosition, gridArray, move) => {
  if (gridArray[enemyStartPosition + move].classList.contains("metal-wall")) {
    return true;
  }
  if (gridArray[enemyStartPosition + move].classList.contains("movable-wall")) {
    return true;
  }
  if (gridArray[enemyStartPosition + move].classList.contains("brick-wall")) {
    return true;
  }
  if (gridArray[enemyStartPosition + move].classList.contains("side-wall")) {
    return true;
  }
  if (gridArray[enemyStartPosition + move].classList.contains("top-wall")) {
    return true;
  }
};

const isXcoordinateCloser = (enemyNewPosX, agentPosX, enemyPosX) => {
  if (Math.abs(enemyNewPosX - agentPosX) < Math.abs(enemyPosX - agentPosX)) {
    return true;
  } else {
    return false;
  }
};

const isYcoordinateCloser = (enemyNewPosY, agentPosY, enemyPosY) => {
  if (Math.abs(enemyNewPosY - agentPosY) < Math.abs(enemyPosY - agentPosY)) {
    return true;
  } else {
    return false;
  }
};

// export { addEnemy, moveEnemy  };
export { Enemy };
