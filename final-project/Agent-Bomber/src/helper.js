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
  if (gridArray[bombPlantPosition - 17].classList.contains("metal-wall")) {
    bombBlastTargetsVertical.push(bombPlantPosition + 17);
  }
  if (gridArray[bombPlantPosition + 17].classList.contains("metal-wall")) {
    bombBlastTargetsVertical.push(bombPlantPosition - 17);
  }

  if (gridArray[bombPlantPosition - 17].classList.contains("top-wall")) {
    bombBlastTargetsVertical.push(bombPlantPosition + 17);
    console.log("hello");
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

export { findBombBlastTargetHorizontal, findBombBlastTargetVertical };
