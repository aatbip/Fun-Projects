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

  agent.addAgent(game); //add agent to its initial position

  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "d":
        if (gameEnv.detectAgentGridCollisionRight()) {
          agent.toRight();
        } else {
          console.log("no way out right");
        }
        break;

      case "s":
        if (gameEnv.detectAgentGridCollisionBottom()) {
          agent.toBottom();
          console.log("exe");
        } else {
          console.log("no way out bottom");
        }

        break;

      case "a":
        if (gameEnv.detectAgentGridCollisionLeft()) {
          agent.toLeft();
        } else {
          console.log("no way left");
        }
        break;

      case "w":
        if (gameEnv.detectAgentGridCollisionTop()) {
          agent.toTop();
        } else {
          console.log("no way out top");
        }
        break;
    }
  });
}

init();
