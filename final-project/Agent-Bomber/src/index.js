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
import { BoxPowerUp } from "./BoxPowerUp.js";

//initialize classes
const gameEnv = new GameEnv(game);
const bomb = new Bomb(game);
const boxPowerUp = new BoxPowerUp(gameEnv.gridArray);

const enemy = new Enemy(gameEnv.agentPosition, gameEnv.gridArray, game);
const enemy2 = new Enemy(gameEnv.agentPosition, gameEnv.gridArray, game);
const enemy3 = new Enemy(gameEnv.agentPosition, gameEnv.gridArray, game);

const init = (speed1, speed2, speed3) => {
  bomb.bombPowerUpCountDisplay(powerUpsBox);
  boxPowerUp.displayBoxPowerUpCount(powerUpsBox);
  bomb.scoreDisplay(scoreBox);
  gameEnv.createGameEnvironment(ENVIRONMENT);
  boxPowerUp.addBoxPowerUp();
  gameEnv.addAgent(game, AGENT_SPRITE.frontView); //add agent to its initial position
  boxPowerUp.addEvilMachine(); 
  enemy.addEnemy();
  enemy2.addEnemyTwo();
  enemy3.addEnemyThree();
  // const enemyMovementInterval = setInterval(enemy.moveEnemy, speed1);
  // const enemyMovementIntervalTwo = setInterval(enemy2.moveEnemyTwo, speed2);
  // const enemyMovementIntervalThree = setInterval(enemy3.moveEnemyThree, speed3);

  // document.addEventListener("keydown", (event) => {
  const listeners = (event) => {
    switch (event.key) {
      case "d":
        bomb.collectBombPowerUps(gameEnv.agentPosition + 1, gameEnv.gridArray);
        gameEnv.toRight();
        gameEnv.addAgent(game, AGENT_SPRITE.rightView);
        bomb.powerW();
        enemy.getAgentPosition(gameEnv.agentPosition);
        enemy2.getAgentPosition(gameEnv.agentPosition);
        const { isEnemyCollision1 } = enemy.agentEnemyCollision();
        boxPowerUp.collectBoxPowerUp(gameEnv.gameDiv, gameEnv.agentPosition);

        console.log("enemy coll", isEnemyCollision1);
        if (isEnemyCollision1) {
          document.removeEventListener("keydown", listeners);
          setTimeout(() => {
            gameOverScreen();
          }, 1500);
        }

        break;

      case "s":
        bomb.collectBombPowerUps(gameEnv.agentPosition + 17, gameEnv.gridArray);
        gameEnv.toBottom();
        gameEnv.addAgent(game, AGENT_SPRITE.frontView);
        bomb.powerW();
        enemy.getAgentPosition(gameEnv.agentPosition);
        enemy2.getAgentPosition(gameEnv.agentPosition);
        const { isEnemyCollision2 } = enemy.agentEnemyCollision();
        boxPowerUp.collectBoxPowerUp(gameEnv.gameDiv, gameEnv.agentPosition);

        if (isEnemyCollision2) {
          document.removeEventListener("keydown", listeners);
          setTimeout(() => {
            gameOverScreen();
          }, 1500);
        }

        break;

      case "a":
        bomb.collectBombPowerUps(gameEnv.agentPosition - 1, gameEnv.gridArray);
        gameEnv.toLeft();
        gameEnv.addAgent(game, AGENT_SPRITE.leftView);
        enemy2.getAgentPosition(gameEnv.agentPosition);

        bomb.powerW();
        enemy.getAgentPosition(gameEnv.agentPosition);
        const { isEnemyCollision3 } = enemy.agentEnemyCollision();
        boxPowerUp.collectBoxPowerUp(gameEnv.gameDiv, gameEnv.agentPosition);

        console.log("enemy coll", isEnemyCollision3);
        if (isEnemyCollision3) {
          document.removeEventListener("keydown", listeners);
          setTimeout(() => {
            gameOverScreen();
          }, 1500);
        }

        break;

      case "w":
        bomb.collectBombPowerUps(gameEnv.agentPosition - 17, gameEnv.gridArray);
        gameEnv.toTop();
        gameEnv.addAgent(game, AGENT_SPRITE.backView);
        enemy2.getAgentPosition(gameEnv.agentPosition);

        bomb.powerW();
        enemy.getAgentPosition(gameEnv.agentPosition);
        const { isEnemyCollision4 } = enemy.agentEnemyCollision();
        boxPowerUp.collectBoxPowerUp(gameEnv.gameDiv, gameEnv.agentPosition);

        console.log("enemy coll", isEnemyCollision4);
        if (isEnemyCollision4) {
          document.removeEventListener("keydown", listeners);
          setTimeout(() => {
            gameOverScreen();
          }, 1500);
        }

        break;

      case " ":
        bomb.bombPlant(
          gameEnv.CURRENT_POSITION_X,
          gameEnv.CURRENT_POSITION_Y,
          gameEnv.agentPosition
        );

        bomb.animateBomb();

        setTimeout(() => {
          const {
            isEnemyOneDead,
            isEnemyTwoDead,
            isEnemyThreeDead,
            isGameOver,
          } = bomb.bombBlast(gameEnv.gridArray, gameEnv.agentPosition);
          console.log(isEnemyOneDead);
          if (isEnemyOneDead) {
            clearInterval(enemyMovementInterval);
          }
          if (isEnemyTwoDead) {
            clearInterval(enemyMovementIntervalTwo);
          }
          if (isEnemyThreeDead) {
            clearInterval(enemyMovementIntervalThree);
          }

          setTimeout(() => {
            if (isGameOver) {
              gameOverScreen();
              document.removeEventListener("keydown", listeners);

              console.log(isGameOver);
            }
          }, 50);
        }, 2000);

        bomb.bombPowerUps(gameEnv.gridArray);

        break;

      case "e":
        boxPowerUp.addNewBox(gameEnv.gameDiv, gameEnv.agentPosition);
    }
  }; //
  document.addEventListener("keydown", listeners);

  // });
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
    init(150, 250, 150);
  };

  extremeMode.onclick = () => {
    openingScreen.remove();
    extremeMode.remove();
    classicMode.remove();
    init(100, 200, 100);
  };
};

gameStartScreen();

export { gameOverScreen };

// init();
