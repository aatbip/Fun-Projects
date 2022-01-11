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

const init = (speed) => {
  bomb.bombPowerUpCountDisplay(powerUpsBox);
  bomb.scoreDisplay(scoreBox);
  gameEnv.createGameEnvironment(ENVIRONMENT);
  gameEnv.addAgent(game, AGENT_SPRITE.frontView); //add agent to its initial position
  enemy.addEnemy();
  const enemyMovementInterval = setInterval(enemy.moveEnemy, speed);

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

          setTimeout(() => {
            if (isGameOver) {
              gameOverScreen();
              console.log(isGameOver);
            }
          }, 1500);
        }, 2000);

        bomb.bombPowerUps(gameEnv.gridArray);

        break;
    }
  });
};

const gameOverScreenDisplay = document.createElement("div");

const openingScreen = document.createElement("div");
const classicMode = document.createElement("button");
const extremeMode = document.createElement("button");

const gameOverScreen = () => {
  let score = bomb.returnScore(); //get score
  let currentHighScore = localStorage.getItem("high-score") || 0;

  if (score > currentHighScore) {
    window.localStorage.setItem("high-score", score);
  }

  game.style.display = "none";

  const buttonContainer = document.createElement("div");
  const scoreContainer = document.createElement("div");
  const highScoreContainer = document.createElement("div");

  const displayScore = document.createElement("p");
  const displayHighScore = document.createElement("p");
  const playAgainButton = document.createElement("button");

  buttonContainer.classList.add("button-container-last");
  scoreContainer.classList.add("score-container");
  highScoreContainer.classList.add("high-score-container");

  gameOverScreenDisplay.classList.add("game-over-screen");
  playAgainButton.classList.add("play-again-button");
  displayScore.classList.add("game-over-screen-score");
  displayHighScore.classList.add("game-over-screen-score");

  main.appendChild(gameOverScreenDisplay);

  gameOverScreenDisplay.append(buttonContainer);
  buttonContainer.append(playAgainButton);

  gameOverScreenDisplay.append(scoreContainer);
  scoreContainer.append(displayScore);

  gameOverScreenDisplay.append(highScoreContainer);
  highScoreContainer.append(displayHighScore);

  playAgainButton.onclick = () => {
    window.location.reload();

    // gameStartScreen();
  };

  displayScore.innerHTML = `${score}`;
  if (score < currentHighScore) {
    displayHighScore.innerHTML = `${currentHighScore}`;
  } else if (score > currentHighScore) {
    displayHighScore.innerHTML = `${score}`;
  }
};

const gameStartScreen = () => {
  // gameOverScreenDisplay.remove();
  const buttonContainer = document.createElement("div");

  openingScreen.classList.add("opening-screen");
  buttonContainer.classList.add("button-container");
  classicMode.classList.add("classic-mode");
  extremeMode.classList.add("extreme-mode");

  main.append(openingScreen);
  openingScreen.appendChild(buttonContainer);
  buttonContainer.append(classicMode);
  buttonContainer.append(extremeMode);

  classicMode.onclick = () => {
    openingScreen.remove();
    extremeMode.remove();
    classicMode.remove();
    init(200);
  };

  extremeMode.onclick = () => {
    openingScreen.remove();
    extremeMode.remove();
    classicMode.remove();
    init(100);
  };
};

gameStartScreen();

export { gameOverScreen }; 

// init();
