import {
  TOTAL_GRID,
  GRID_SIZE,
  GRID_TYPE,
  GRID_LIST,
  ENVIRONMENT,
} from "./setup.js";

//import class
import { GameEnv } from "./GameEnv.js";

//DOM elements
const game = document.querySelector("#game");


//initialize classes
const gameEnv = new GameEnv(game);

function init() {
  gameEnv.createGameEnvironment(ENVIRONMENT);
}

init();
