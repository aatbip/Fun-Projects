// class Enemy {
//   constructor(gameDiv, gridArray) {
//     this.gameDiv = gameDiv;
//     this.gridArray = gridArray;

//     this.width = 17;

//     this.enemyOne = document.createElement("div");
//     // this.moveEnemy = this.moveEnemy.bind(this);
//   }

//   addEnemy() {
//     this.enemyOne.style.cssText = "left: 600px; top: 300px"; //gridArra = 114
//     this.enemyOne.classList.add("enemy-one");
//     this.gameDiv.append(this.enemyOne);
//   }

//   getPositionCoordinates(currentGridPosition) {
//     return [
//       currentGridPosition % this.width,
//       Math.floor(currentGridPosition / this.width),
//     ];
//   }

//   moveEnemy(gridPositions) {
//     this.enemyOneStartPosition = 114;
//     this.gridPositions = gridPositions;

//     this.directions = [
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

let width = 17;
let enemyOneStartPosition = 114;

const enemyOne = document.createElement("div");

const addEnemy = (gridArray) => {
  // enemyOne.style.cssText = "left: 600px ; top: 300px"; //gridArra = 114
  enemyOne.classList.add("enemy-one");
  // gameDiv.append(enemyOne);
  gridArray[enemyOneStartPosition].classList.add("enemy-one");
  enemyOneAnimation();

};

const getPositionCoordinates = (currentGridPosition) => {
  return [currentGridPosition % width, Math.floor(currentGridPosition / width)];
};

const moveEnemy = (gridArray) => {
  // gridPositions = gridPositions;
  let directions = [-1, +1, +width, -width];

  let enemyTimerId = NaN;
  let direction = Math.floor(Math.random() * directions.length);
  let move = directions[direction];
  enemyTimerId = setInterval(() => {
    console.log("classes", gridArray[enemyOneStartPosition + move]);
    if (
      gridArray[enemyOneStartPosition + move].classList.contains(
        "background-wall"
      )
    ) {
      gridArray[enemyOneStartPosition].classList.remove("enemy-one");

      // //check closer
      // const [enemyPosX, enemyPosY] = getPositionCoordinates(enemyOneStartPosition);

      enemyOneStartPosition += move;
      gridArray[enemyOneStartPosition].classList.add("enemy-one");
      console.log("move", move);
    } else if (detectCollisionToRight(enemyOneStartPosition, gridArray, move)) {
      direction = Math.floor(Math.random() * directions.length);

      move = directions[direction];
      console.log("last", move);
    } else {
      return;
    }
  }, 500);
};

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
let ap = [];
const getAgentPosition = (agentPosition) => {
  console.log("hello");
  ap.push(agentPosition);
};
console.log("ap", ap);

let enemyAnimationInterval = 0;
function enemyOneAnimation() {
  setInterval(() => {
    let posX1 = 50;
    let widthOfSheet1 = 200;
    enemyOne.style.backgroundPositionX = posX1 + "px";
    enemyOne.style.backgroundPositionY = 0 + "px";

    if (posX1 < widthOfSheet1) {
      posX1 = posX1 + 50;
      ++enemyAnimationInterval;
    } else {
      posX1 = 50;
    }
  }, 100);
}

export { addEnemy, moveEnemy, getAgentPosition, enemyOneAnimation };
// export { Enemy };
