import {
  TOTAL_GRID,
  GRID_SIZE,
  GRID_TYPE,
  GRID_LIST,
  ENVIRONMENT,
} from "./setup.js";

//constants
const AGENT_SPRITE = {
  frontView: 0,
  leftView: 50,
  rightView: 100,
  backView: 150,
};

//DOM
const game = document.querySelector("#game");

//import class
import { GameEnv } from "./GameEnv.js";
import { Bomb } from "./Bomb.js";

//DOM elements

//initialize classes
const gameEnv = new GameEnv(game);
const bomb = new Bomb(game);

function init() {
  gameEnv.createGameEnvironment(ENVIRONMENT);
  gameEnv.addAgent(game, AGENT_SPRITE.frontView); //add agent to its initial position

  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "d":
        gameEnv.toRight();
        gameEnv.addAgent(game, AGENT_SPRITE.rightView);
        break;

      case "s":
        gameEnv.toBottom();
        gameEnv.addAgent(game, AGENT_SPRITE.frontView);

        break;

      case "a":
        gameEnv.toLeft();
        gameEnv.addAgent(game, AGENT_SPRITE.leftView);
        break;

      case "w":
        gameEnv.toTop();
        gameEnv.addAgent(game, AGENT_SPRITE.backView);

        break;

      case " ":

        bomb.bombPlant(
          gameEnv.CURRENT_POSITION_X,
          gameEnv.CURRENT_POSITION_Y,
          gameEnv.agentPosition
        );
        bomb.animateBomb();

        setTimeout(() => {
          bomb.bombBlast(gameEnv.gridArray, gameEnv.agentPosition);
        }, 2000);

        break;
    }
  });
}

init();
