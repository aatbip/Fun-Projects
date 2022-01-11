// bomb-blast target grid

let bombBlastTargetsHorizontal = [];
let bombBlastTargetsVertical = [];
let verticalTargetEnemy = [];
let horizontalTargetEnemy = [];
const findBombBlastTargetHorizontal = (gridArray, bombPlantPosition) => {
  bombBlastTargetsHorizontal = [];

  if (
    gridArray[bombPlantPosition - 1].classList.contains("metal-wall") &&
    gridArray[bombPlantPosition + 1].classList.contains("metal-wall")
  ) {
    return;
  } else if (
    gridArray[bombPlantPosition - 1].classList.contains("side-wall") &&
    gridArray[bombPlantPosition + 1].classList.contains("metal-wall")
  ) {
    return;
  } else if (
    gridArray[bombPlantPosition - 1].classList.contains("metal-wall") &&
    gridArray[bombPlantPosition + 1].classList.contains("side-wall")
  ) {
    return;
  }
  if (
    gridArray[bombPlantPosition - 1].classList.contains("metal-wall") &&
    !gridArray[bombPlantPosition + 1].classList.contains("background-wall")
  ) {
    bombBlastTargetsHorizontal.push(bombPlantPosition + 1);
  }
  if (gridArray[bombPlantPosition + 1].classList.contains("metal-wall")) {
    bombBlastTargetsHorizontal.push(bombPlantPosition - 1);
  }

  if (gridArray[bombPlantPosition - 1].classList.contains("side-wall")) {
    bombBlastTargetsHorizontal.push(bombPlantPosition + 1);
  }

  if (gridArray[bombPlantPosition + 1].classList.contains("side-wall")) {
    bombBlastTargetsHorizontal.push(bombPlantPosition - 1);
  }

  if (gridArray[bombPlantPosition - 1].classList.contains("movable-wall")) {
    bombBlastTargetsHorizontal.push(bombPlantPosition - 1);
  }

  if (gridArray[bombPlantPosition + 1].classList.contains("movable-wall")) {
    bombBlastTargetsHorizontal.push(bombPlantPosition + 1);
  }

  if (gridArray[bombPlantPosition - 1].classList.contains("brick-wall")) {
    bombBlastTargetsHorizontal.push(bombPlantPosition - 1);
  }

  if (gridArray[bombPlantPosition + 1].classList.contains("brick-wall")) {
    bombBlastTargetsHorizontal.push(bombPlantPosition + 1);
  }

  return bombBlastTargetsHorizontal;
};

const findBombBlastTargetVertical = (gridArray, bombPlantPosition) => {
  bombBlastTargetsVertical = [];

  if (
    gridArray[bombPlantPosition - 17].classList.contains("metal-wall") &&
    gridArray[bombPlantPosition + 17].classList.contains("metal-wall")
  ) {
    return;
  }
  if (
    gridArray[bombPlantPosition - 17].classList.contains("top-wall") &&
    gridArray[bombPlantPosition + 17].classList.contains("metal-wall")
  ) {
    return;
  }
  if (
    gridArray[bombPlantPosition - 17].classList.contains("metal-wall") &&
    gridArray[bombPlantPosition + 17].classList.contains("top-wall")
  ) {
    return;
  }
  if (gridArray[bombPlantPosition - 17].classList.contains("metal-wall")) {
    bombBlastTargetsVertical.push(bombPlantPosition + 17);
  }
  if (gridArray[bombPlantPosition + 17].classList.contains("metal-wall")) {
    bombBlastTargetsVertical.push(bombPlantPosition - 17);
  }

  if (gridArray[bombPlantPosition - 17].classList.contains("top-wall")) {
    bombBlastTargetsVertical.push(bombPlantPosition + 17);
  }

  if (gridArray[bombPlantPosition + 17].classList.contains("top-wall")) {
    bombBlastTargetsVertical.push(bombPlantPosition - 17);
  }

  if (gridArray[bombPlantPosition - 17].classList.contains("movable-wall")) {
    bombBlastTargetsVertical.push(bombPlantPosition - 17);
  }

  if (gridArray[bombPlantPosition + 17].classList.contains("movable-wall")) {
    bombBlastTargetsVertical.push(bombPlantPosition + 17);
  }

  if (gridArray[bombPlantPosition - 17].classList.contains("brick-wall")) {
    bombBlastTargetsVertical.push(bombPlantPosition - 17);
  }

  if (gridArray[bombPlantPosition + 17].classList.contains("brick-wall")) {
    bombBlastTargetsVertical.push(bombPlantPosition + 17);
  }

  return bombBlastTargetsVertical;
};

const findVerticalTargetEnemy = (gridArray, bombPlantPosition) => {
  verticalTargetEnemy = [];

  if (gridArray[bombPlantPosition + 17].classList.contains("enemy-one")) {
    verticalTargetEnemy.push(bombPlantPosition + 17);
  }

  if (gridArray[bombPlantPosition - 17].classList.contains("enemy-one")) {
    verticalTargetEnemy.push(bombPlantPosition - 17);
  }
  if (gridArray[bombPlantPosition].classList.contains("enemy-one")) {
    verticalTargetEnemy.push(bombPlantPosition);
  }
  return verticalTargetEnemy;
};

const findHorizontalTargetEnemy = (gridArray, bombPlantPosition) => {
  horizontalTargetEnemy = [];
  if (gridArray[bombPlantPosition + 1].classList.contains("enemy-one")) {
    horizontalTargetEnemy.push(bombPlantPosition + 1);
  }

  if (gridArray[bombPlantPosition - 1].classList.contains("enemy-one")) {
    horizontalTargetEnemy.push(bombPlantPosition - 1);
  }

  if (gridArray[bombPlantPosition].classList.contains("enemy-one")) {
    horizontalTargetEnemy.push(bombPlantPosition);
  }
  return horizontalTargetEnemy;
};

// bomb power-ups append position

const bombPowerUpAppendPosition = () => {
  const targetPowerUps = {
    19: {
      bombPowerUpPosition: 19,

      position_X: 100,
      position_Y: 50,
    },

    54: {
      bombPowerUpPosition: 54,

      position_X: 150,
      position_Y: 150,
    },

    111: {
      bombPowerUpPosition: 111,

      position_X: 450,
      position_Y: 300,
    },
  };
  return targetPowerUps;
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

// Random number generator

const rand = () => {
  return Math.random();
};

export {
  findBombBlastTargetHorizontal,
  findBombBlastTargetVertical,
  bombPowerUpAppendPosition,
  findVerticalTargetEnemy,
  findHorizontalTargetEnemy,
  detectCollisionToRight,
  isXcoordinateCloser,
  isYcoordinateCloser,
  rand,
};
