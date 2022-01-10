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
const powerUpsBox = document.querySelector("#power-ups-box");

//
import {
  addEnemy,
  moveEnemy,
  getAgentPosition,
  enemyOneAnimation,
} from "./Enemies.js";
//

//import class
import { GameEnv } from "./GameEnv.js";
import { Bomb } from "./Bomb.js";
// import { Enemy  } from "./Enemies.js";

//initialize classes
const gameEnv = new GameEnv(game);
const bomb = new Bomb(game);
// const enemy = new Enemy(game, gameEnv.gridArray);

function init() {
  bomb.bombPowerUpCountDisplay(powerUpsBox);
  gameEnv.createGameEnvironment(ENVIRONMENT);
  gameEnv.addAgent(game, AGENT_SPRITE.frontView); //add agent to its initial position
  // enemy.addEnemy();
  // enemy.moveEnemy(gameEnv.gridPositions);
  addEnemy(gameEnv.gridArray);
  moveEnemy(gameEnv.gridArray);

  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "d":
        bomb.collectBombPowerUps(gameEnv.agentPosition + 1, gameEnv.gridArray);
        gameEnv.toRight();
        gameEnv.addAgent(game, AGENT_SPRITE.rightView);
        bomb.powerW();
        getAgentPosition(gameEnv.agentPosition);

        break;

      case "s":
        bomb.collectBombPowerUps(gameEnv.agentPosition + 17, gameEnv.gridArray);
        gameEnv.toBottom();
        gameEnv.addAgent(game, AGENT_SPRITE.frontView);
        bomb.powerW();
        getAgentPosition(gameEnv.agentPosition);

        break;

      case "a":
        bomb.collectBombPowerUps(gameEnv.agentPosition - 1, gameEnv.gridArray);
        gameEnv.toLeft();
        gameEnv.addAgent(game, AGENT_SPRITE.leftView);
        bomb.powerW();
        getAgentPosition(gameEnv.agentPosition);

        break;

      case "w":
        bomb.collectBombPowerUps(gameEnv.agentPosition - 17, gameEnv.gridArray);
        gameEnv.toTop();
        gameEnv.addAgent(game, AGENT_SPRITE.backView);
        bomb.powerW();
        getAgentPosition(gameEnv.agentPosition);

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

        bomb.bombPowerUps(gameEnv.gridArray);

        break;
    }
  });
}

init();
