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
  if (gridArray[bombPlantPosition - 1].classList.contains("metal-wall")) {
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

let bombAppendPositionArray = [];
const bombAppendPosition = (
  bombPlantPosition,
  bombBlastTargetsHorizontal,
  bombBlastTargetsVertical,
  bombPlantPositionX,
  bombPlantPositionY
) => {
  bombAppendPositionArray = [];

  if (bombPlantPosition - bombBlastTargetsHorizontal[0] <= 1) {
    bombAppendPositionArray.push(bombPlantPositionX + 50);
    bombAppendPositionArray.push(bombPlantPositionY);
  }
  if (bombPlantPosition - bombBlastTargetsHorizontal[1] <= 1) {
    bombAppendPositionArray.push(bombPlantPositionX - 50);
    bombAppendPositionArray.push(bombPlantPositionY);
  }

  if (bombPlantPosition - bombBlastTargetsVertical[0] < -2) {
    bombAppendPositionArray.push(bombPlantPositionX);
    bombAppendPositionArray.push(bombPlantPositionY - 50);
  }

  if (bombPlantPosition - bombBlastTargetsVertical[0] > 1) {
    bombAppendPositionArray.push(bombPlantPositionX);
    bombAppendPositionArray.push(bombPlantPositionY + 50);
  }

  bombAppendPositionArray = bombAppendPositionArray.map(function (val, i) {
    return val === 0 ? 50 : val;
  });

  return bombAppendPositionArray;
};




// Random number generator

const rand = () => {
  return Math.random(); 
}

export {
  findBombBlastTargetHorizontal,
  findBombBlastTargetVertical,
  bombAppendPosition,
  rand
};