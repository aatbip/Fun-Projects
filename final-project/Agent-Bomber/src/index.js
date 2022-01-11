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
const scoreBox = document.querySelector("#score-box");
const main = document.querySelector("#main");

//
// import {
//   addEnemy,
//   moveEnemy,
//   GetAP

// } from "./Enemies.js";
import { Enemy } from "./Enemies.js";
//

//import class
import { GameEnv } from "./GameEnv.js";
import { Bomb } from "./Bomb.js";

//initialize classes
const gameEnv = new GameEnv(game);
const bomb = new Bomb(game);

const enemy = new Enemy(gameEnv.agentPosition, gameEnv.gridArray, game);

const init = () => {
  bomb.bombPowerUpCountDisplay(powerUpsBox);
  bomb.scoreDisplay(scoreBox);
  gameEnv.createGameEnvironment(ENVIRONMENT);
  gameEnv.addAgent(game, AGENT_SPRITE.frontView); //add agent to its initial position
  enemy.addEnemy();
  const enemyMovementInterval = setInterval(enemy.moveEnemy, 100);

  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "d":
        bomb.collectBombPowerUps(gameEnv.agentPosition + 1, gameEnv.gridArray);
        gameEnv.toRight();
        gameEnv.addAgent(game, AGENT_SPRITE.rightView);
        bomb.powerW();
        enemy.getAgentPosition(gameEnv.agentPosition);
        enemy.agentEnemyCollision();

        break;

      case "s":
        bomb.collectBombPowerUps(gameEnv.agentPosition + 17, gameEnv.gridArray);
        gameEnv.toBottom();
        gameEnv.addAgent(game, AGENT_SPRITE.frontView);
        bomb.powerW();
        enemy.getAgentPosition(gameEnv.agentPosition);
        enemy.agentEnemyCollision();

        break;

      case "a":
        bomb.collectBombPowerUps(gameEnv.agentPosition - 1, gameEnv.gridArray);
        gameEnv.toLeft();
        gameEnv.addAgent(game, AGENT_SPRITE.leftView);
        bomb.powerW();
        enemy.getAgentPosition(gameEnv.agentPosition);
        enemy.agentEnemyCollision();

        break;

      case "w":
        bomb.collectBombPowerUps(gameEnv.agentPosition - 17, gameEnv.gridArray);
        gameEnv.toTop();
        gameEnv.addAgent(game, AGENT_SPRITE.backView);
        bomb.powerW();
        enemy.getAgentPosition(gameEnv.agentPosition);
        enemy.agentEnemyCollision();
        break;

      case " ":
        bomb.bombPlant(
          gameEnv.CURRENT_POSITION_X,
          gameEnv.CURRENT_POSITION_Y,
          gameEnv.agentPosition
        );

        bomb.animateBomb();

        setTimeout(() => {
          const { isEnemyDead, isGameOver } = bomb.bombBlast(
            gameEnv.gridArray,
            gameEnv.agentPosition
          );
          if (isEnemyDead) {
            clearInterval(enemyMovementInterval);
          }

          if (isGameOver) {
            gameOverScreen();
            console.log(isGameOver);
          }
        }, 2000);

        bomb.bombPowerUps(gameEnv.gridArray);

        break;
    }
  });
};

const gameOverScreen = () => {
  const gameOverScreen = document.createElement("div");
  const displayScore = document.createElement("p");
  const playAgainButton = document.createElement("button");

  gameOverScreen.classList.add("game-over-screen");
  main.append(gameOverScreen);

  let score = bomb.returnScore();

  displayScore.classList.add("game-over-screen-score");
  displayScore.innerHTML = `${score}`;
  gameOverScreen.appendChild(displayScore);

  playAgainButton.classList.add("play-again-button");
  gameOverScreen.append(playAgainButton);

  game.remove();
};



init();
