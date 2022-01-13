let bombBlastTargetsHorizontal = [];
let bombBlastTargetsVertical = [];
let verticalTargetEnemy = [];
let horizontalTargetEnemy = [];
let horizontalTargetEvilMachine = [];
let verticalTargetEvilMachine = [];

/**
 * Helper function to find the target array to blast the bomb
 *
 * @param {Array} gridArray
 * @param {Number} bombPlantPosition
 * @returns {Array}
 */
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

/**
 * Function to find the vertical targets to plant the bomb
 *
 * @param {Array} gridArray
 * @param {Number} bombPlantPosition
 * @returns {Array}
 */

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

/**
 * Function to find the vertical targets to blast the enemy
 *
 * @param {Array} gridArray
 * @param {Number} bombPlantPosition
 * @returns {Array}
 */

const findVerticalTargetEnemy = (gridArray, bombPlantPosition) => {
  verticalTargetEnemy = [];

  if (
    gridArray[bombPlantPosition + 17].classList.contains("enemy-one") ||
    gridArray[bombPlantPosition + 17].classList.contains("enemy-two") ||
    gridArray[bombPlantPosition + 17].classList.contains("enemy-three")
  ) {
    verticalTargetEnemy.push(bombPlantPosition + 17);
  }

  if (
    gridArray[bombPlantPosition - 17].classList.contains("enemy-one") ||
    gridArray[bombPlantPosition - 17].classList.contains("enemy-two") ||
    gridArray[bombPlantPosition - 17].classList.contains("enemy-three")
  ) {
    verticalTargetEnemy.push(bombPlantPosition - 17);
  }
  if (
    gridArray[bombPlantPosition].classList.contains("enemy-one") ||
    gridArray[bombPlantPosition].classList.contains("enemy-two") ||
    gridArray[bombPlantPosition].classList.contains("enemy-three")
  ) {
    verticalTargetEnemy.push(bombPlantPosition);
  }
  return verticalTargetEnemy;
};

/**
 * Function to find the horizontal targets to blast the enemy
 *
 * @param {Array} gridArray
 * @param {Number} bombPlantPosition
 * @returns {Array}
 */

const findHorizontalTargetEnemy = (gridArray, bombPlantPosition) => {
  horizontalTargetEnemy = [];
  if (
    gridArray[bombPlantPosition + 1].classList.contains("enemy-one") ||
    gridArray[bombPlantPosition + 1].classList.contains("enemy-two") ||
    gridArray[bombPlantPosition + 1].classList.contains("enemy-three")
  ) {
    horizontalTargetEnemy.push(bombPlantPosition + 1);
  }

  if (
    gridArray[bombPlantPosition - 1].classList.contains("enemy-one") ||
    gridArray[bombPlantPosition - 1].classList.contains("enemy-two") ||
    gridArray[bombPlantPosition - 1].classList.contains("enemy-three")
  ) {
    horizontalTargetEnemy.push(bombPlantPosition - 1);
  }

  if (
    gridArray[bombPlantPosition].classList.contains("enemy-one") ||
    gridArray[bombPlantPosition].classList.contains("enemy-two") ||
    gridArray[bombPlantPosition].classList.contains("enemy-three")
  ) {
    horizontalTargetEnemy.push(bombPlantPosition);
  }
  return horizontalTargetEnemy;
};

/**
 * Method to find the horizontal targets to blast the evil machine
 *
 * @param {Array} gridArray
 * @param {Number} bombPlantPosition
 * @returns {Array}
 */

const findHorizontalTargetEvilMachine = (gridArray, bombPlantPosition) => {
  horizontalTargetEvilMachine = [];

  if (gridArray[bombPlantPosition + 1].classList.contains("evil-machine")) {
    horizontalTargetEvilMachine.push(bombPlantPosition + 1);
  }

  if (gridArray[bombPlantPosition - 1].classList.contains("evil-machine")) {
    horizontalTargetEvilMachine.push(bombPlantPosition + 1);
  }
  return horizontalTargetEvilMachine;
};

/**
 * Method to find the vertical targets to blast the evil machine
 *
 * @param {Array} gridArray
 * @param {Number} bombPlantPosition
 * @returns {Array}
 */

const findVerticalTargetEvilMachine = (gridArray, bombPlantPosition) => {
  verticalTargetEvilMachine = [];

  if (gridArray[bombPlantPosition + 17].classList.contains("evil-machine")) {
    verticalTargetEvilMachine.push(bombPlantPosition + 1);
  }

  if (gridArray[bombPlantPosition - 17].classList.contains("evil-machine")) {
    verticalTargetEvilMachine.push(bombPlantPosition + 1);
  }
  return verticalTargetEvilMachine;
};

/**
 * Positions to append the bomb power ups
 *
 * @returns {Object}
 */

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

/**
 * Function to detect the collision between enemies and walls
 *
 * @param {Number} enemyStartPosition
 * @param {Array} gridArray
 * @param {Number} move
 * @returns {Boolean}
 */
const detectEnemyWallCollision = (enemyStartPosition, gridArray, move) => {
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

  if (
    gridArray[enemyStartPosition + move].classList.contains(
      "enemy-one",
      "enemy-two"
    )
  ) {
    return true;
  }
};

/**
 * Function to determine if Y coordinate between enemies and the agent is closer or not
 *
 * @param {Number} enemyNewPosX
 * @param {Number} agentPosX
 * @param {Number} enemyPosX
 * @returns {Boolean}
 */

const isXcoordinateCloser = (enemyNewPosX, agentPosX, enemyPosX) => {
  if (Math.abs(enemyNewPosX - agentPosX) < Math.abs(enemyPosX - agentPosX)) {
    return true;
  } else {
    return false;
  }
};

/**
 * Function to determine if Y coordinate between enemies and the agent is closer or not
 *
 * @param {Number} enemyNewPosY
 * @param {Number} agentPosY
 * @param {Number} enemyPosY
 * @returns {Boolean}
 */

const isYcoordinateCloser = (enemyNewPosY, agentPosY, enemyPosY) => {
  if (Math.abs(enemyNewPosY - agentPosY) < Math.abs(enemyPosY - agentPosY)) {
    return true;
  } else {
    return false;
  }
};

export {
  findBombBlastTargetHorizontal,
  findBombBlastTargetVertical,
  bombPowerUpAppendPosition,
  findVerticalTargetEnemy,
  findHorizontalTargetEnemy,
  findHorizontalTargetEvilMachine,
  findVerticalTargetEvilMachine,
  detectEnemyWallCollision,
  isXcoordinateCloser,
  isYcoordinateCloser,
};
