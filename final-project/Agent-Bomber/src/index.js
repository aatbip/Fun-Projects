import {
  TOTAL_GRID,
  GRID_SIZE,
  GRID_TYPE,
  GRID_LIST,
  ENVIRONMENT,
} from "./setup.js";

const game = document.querySelector("#game");

//import class
import { GameEnv } from "./GameEnv.js";
import { Agent } from "./Agent.js";

//DOM elements

//initialize classes
const gameEnv = new GameEnv(game);
const agent = new Agent();

function init() {
  gameEnv.createGameEnvironment(ENVIRONMENT);

  gameEnv.addAgent(game); //add agent to its initial position

  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "d":
        gameEnv.toRight();
        break;

      case "s":
        gameEnv.toBottom();
        break;

      case "a":
        gameEnv.toLeft();
        break;

      case "w":
        gameEnv.toTop();
        break;
    }
  });
}

init();
