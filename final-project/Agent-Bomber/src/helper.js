// bomb-blast target grid

let bombBlastTargetsHorizontal = [];
let bombBlastTargetsVertical = [];
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

// bomb power-ups append position

const bombPowerUpAppendPosition = () => {
  const bombPowerUpTargets = [
    {
      bombPowerUpPosition: 19,
      position_X: 100,
      position_Y: 50,
    },
    {
      bombPowerUpPosition: 54,
      position_X: 150,
      position_Y: 150,
    },
    {
      bombPowerUpPosition: 111,
      position_X: 450,
      position_Y: 300,
    },
  ];
  return bombPowerUpTargets;
};

// Random number generator

const rand = () => {
  return Math.random();
};

export {
  findBombBlastTargetHorizontal,
  findBombBlastTargetVertical,
  bombPowerUpAppendPosition,
  rand,
};
