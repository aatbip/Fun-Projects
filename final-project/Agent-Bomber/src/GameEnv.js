import {
  TOTAL_GRID,
  GRID_SIZE,
  GRID_TYPE,
  GRID_LIST,
  ENVIRONMENT,
} from "./setup.js";

class GameEnv {
  constructor(gameDiv) {
    this.gameDiv = gameDiv;
    this.box = [];
  }

  createGameEnvironment(environment) {
    this.box = [];
    this.gameDiv.innerHTML = "";

    this.gameDiv.style.cssText = `grid-template-columns: repeat(${TOTAL_GRID}, ${GRID_SIZE}px)`;

    environment.forEach((grid) => {
      const grids = document.createElement("div");
      grids.classList.add("grid", GRID_LIST[grid]);
      grids.style.cssText = `width: ${GRID_SIZE}px; height: ${GRID_SIZE}px`;
      this.gameDiv.appendChild(grids);
      this.box.push(grids);
    });
  }
}

export { GameEnv };
