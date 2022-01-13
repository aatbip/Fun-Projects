/**
 * Import constants
 */

import { AGENT_SPRITE } from "./constants.js";
import { KEYBOARD_INPUTS } from "./constants.js";

/**
 * Import functions
 */
import { ENVIRONMENT } from "./setup.js";

import {
  startScreenAudio,
  addwallAudio,
  gameOverScreenAudio,
  gameWinScreenAudio,
  gameStartScreenAudio,
  buttonClickAudio,
} from "./audios.js";

/**
 * Get IDs from HTML
 */
const main = document.querySelector("#main");
const game = document.querySelector("#game");
const scoreBox = document.querySelector("#score-box");
const powerUpsBox = document.querySelector("#power-ups-box");

/**
 * Define constants
 */

const WIDTH = 17;

/**
 * Import Classes
 */
import { Bomb } from "./Bomb.js";
import { Enemy } from "./Enemies.js";
import { GameEnv } from "./GameEnv.js";
import { BoxPowerUp } from "./BoxPowerUp.js";

/**
 * Initialize classes
 */
const gameEnv = new GameEnv(game);
const bomb = new Bomb(game);
const boxPowerUp = new BoxPowerUp(gameEnv.gridArray);

const enemy = new Enemy(gameEnv.agentPosition, gameEnv.gridArray, game);
const enemy2 = new Enemy(gameEnv.agentPosition, gameEnv.gridArray, game);
const enemy3 = new Enemy(gameEnv.agentPosition, gameEnv.gridArray, game);

/**
 *Game Initialization function where all the game environment and key control methods are operating.
 *
 * @param {Number} speed1
 * @param {Number} speed2
 * @param {Number} speed3
 */

const gameInitialization = (speed1, speed2, speed3) => {
  startScreenAudio();

  bomb.bombPowerUpCountDisplay(powerUpsBox);
  boxPowerUp.displayBoxPowerUpCount(powerUpsBox);
  bomb.scoreDisplay(scoreBox);

  gameEnv.createGameEnvironment(ENVIRONMENT);

  boxPowerUp.addBoxPowerUp();
  boxPowerUp.addEvilMachine();

  gameEnv.addAgent(game, AGENT_SPRITE.frontView);

  enemy.addEnemy();
  enemy2.addEnemyTwo();
  enemy3.addEnemyThree();

  const enemyMovementInterval = setInterval(enemy.moveEnemy, speed1);
  const enemyMovementIntervalTwo = setInterval(enemy2.moveEnemyTwo, speed2);
  const enemyMovementIntervalThree = setInterval(enemy3.moveEnemyThree, speed3);

  /**
   * Function to handle keyboard switch press
   *
   * @param {Object} event
   */

  const keyboardSwitchHandlers = (event) => {
    switch (event.key) {
      case KEYBOARD_INPUTS.right:
        bomb.collectBombPowerUps(gameEnv.agentPosition + 1, gameEnv.gridArray);

        gameEnv.toRight();
        gameEnv.addAgent(game, AGENT_SPRITE.rightView);

        bomb.removeBomb();

        enemy.getAgentPosition(gameEnv.agentPosition);
        enemy2.getAgentPosition(gameEnv.agentPosition);

        const { isEnemyCollision1 } = enemy.agentEnemyCollision();
        const { isEnemyCollision5 } = enemy2.agentEnemyCollisionTwo();
        const { isEnemyCollision9 } = enemy3.agentEnemyCollisionThree();

        boxPowerUp.collectBoxPowerUp(gameEnv.gameDiv, gameEnv.agentPosition);

        if (isEnemyCollision1 || isEnemyCollision5 || isEnemyCollision9) {
          document.removeEventListener("keydown", keyboardSwitchHandlers);
          setTimeout(gameOverScreen, 1500);
        }

        break;

      case KEYBOARD_INPUTS.down:
        bomb.collectBombPowerUps(
          gameEnv.agentPosition + WIDTH,
          gameEnv.gridArray
        );

        gameEnv.toBottom();
        gameEnv.addAgent(game, AGENT_SPRITE.frontView);

        bomb.removeBomb();

        enemy.getAgentPosition(gameEnv.agentPosition);
        enemy2.getAgentPosition(gameEnv.agentPosition);

        const { isEnemyCollision2 } = enemy.agentEnemyCollision();
        const { isEnemyCollision6 } = enemy2.agentEnemyCollisionTwo();
        const { isEnemyCollision10 } = enemy3.agentEnemyCollisionThree();

        boxPowerUp.collectBoxPowerUp(gameEnv.gameDiv, gameEnv.agentPosition);

        if (isEnemyCollision2 || isEnemyCollision6 || isEnemyCollision10) {
          document.removeEventListener("keydown", keyboardSwitchHandlers);
          setTimeout(gameOverScreen, 1500);
        }

        break;

      case KEYBOARD_INPUTS.left:
        bomb.collectBombPowerUps(gameEnv.agentPosition - 1, gameEnv.gridArray);
        gameEnv.toLeft();

        gameEnv.addAgent(game, AGENT_SPRITE.leftView);
        enemy2.getAgentPosition(gameEnv.agentPosition);

        bomb.removeBomb();
        enemy.getAgentPosition(gameEnv.agentPosition);

        const { isEnemyCollision3 } = enemy.agentEnemyCollision();
        const { isEnemyCollision7 } = enemy2.agentEnemyCollisionTwo();
        const { isEnemyCollision11 } = enemy3.agentEnemyCollisionThree();

        boxPowerUp.collectBoxPowerUp(gameEnv.gameDiv, gameEnv.agentPosition);

        if (isEnemyCollision3 || isEnemyCollision7 || isEnemyCollision11) {
          document.removeEventListener("keydown", keyboardSwitchHandlers);
          setTimeout(gameOverScreen, 1500);
        }

        break;

      case KEYBOARD_INPUTS.up:
        bomb.collectBombPowerUps(
          gameEnv.agentPosition - WIDTH,
          gameEnv.gridArray
        );

        gameEnv.toTop();
        gameEnv.addAgent(game, AGENT_SPRITE.backView);

        enemy2.getAgentPosition(gameEnv.agentPosition);

        bomb.removeBomb();

        enemy.getAgentPosition(gameEnv.agentPosition);

        const { isEnemyCollision4 } = enemy.agentEnemyCollision();
        const { isEnemyCollision8 } = enemy2.agentEnemyCollisionTwo();
        const { isEnemyCollision12 } = enemy3.agentEnemyCollisionThree();

        boxPowerUp.collectBoxPowerUp(gameEnv.gameDiv, gameEnv.agentPosition);

        if (isEnemyCollision4 || isEnemyCollision8 || isEnemyCollision12) {
          document.removeEventListener("keydown", keyboardSwitchHandlers);
          setTimeout(gameOverScreen, 1500);
        }

        break;

      case KEYBOARD_INPUTS.spaceKey:
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
            isEvilMachineBombed,
            isGameOver,
          } = bomb.bombBlast(gameEnv.gridArray, gameEnv.agentPosition);

          if (
            isEnemyOneDead == true &&
            isEnemyTwoDead == true &&
            isEnemyThreeDead == true &&
            isEvilMachineBombed == true
          ) {
            gameWinScreen();
            document.removeEventListener("keydown", keyboardSwitchHandlers);
          }

          if (isEnemyOneDead) {
            clearInterval(enemyMovementInterval);
          }
          if (isEnemyTwoDead) {
            clearInterval(enemyMovementIntervalTwo);
          }
          if (isEnemyThreeDead) {
            clearInterval(enemyMovementIntervalThree);
          }

          if (isGameOver) {
            document.removeEventListener("keydown", keyboardSwitchHandlers);
            setTimeout(gameOverScreen, 50);
          }
        }, 2000);

        bomb.bombPowerUps(gameEnv.gridArray);

        break;

      case KEYBOARD_INPUTS.eKey:
        addwallAudio();

        boxPowerUp.addNewBox(gameEnv.gameDiv, gameEnv.agentPosition);
    }
  };
  document.addEventListener("keydown", keyboardSwitchHandlers);
};

/**
 * Screen to display after the game is over
 */

const gameOverScreenDisplay = document.createElement("div");

const gameOverScreen = () => {
  gameOverScreenAudio();

  let score = bomb.returnScore();
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

  playAgainButton.onmouseenter = () => {
    buttonClickAudio();
  };

  playAgainButton.onclick = () => {
    buttonClickAudio();
    window.location.reload();
  };

  displayScore.innerHTML = `${score}`;
  if (score < currentHighScore) {
    displayHighScore.innerHTML = `${currentHighScore}`;
  } else if (score > currentHighScore) {
    displayHighScore.innerHTML = `${score}`;
  } else {
    displayHighScore.innerHTML = `${currentHighScore}`;
  }
};

/**
 * Screen to display after the game is won
 */
const gameWinScreen = () => {
  gameWinScreenAudio();

  let score = bomb.returnScore();

  let currentHighScore = localStorage.getItem("high-score") || 0;

  if (score > currentHighScore) {
    window.localStorage.setItem("high-score", score);
  }

  game.style.display = "none";

  const gameWinScreenDisplay = document.createElement("div");

  const buttonContainer = document.createElement("div");
  const scoreContainer = document.createElement("div");
  const highScoreContainer = document.createElement("div");

  const displayScore = document.createElement("p");
  const displayHighScore = document.createElement("p");
  const playAgainButton = document.createElement("button");

  buttonContainer.classList.add("button-container-last");
  scoreContainer.classList.add("score-container");
  highScoreContainer.classList.add("high-score-container");

  gameWinScreenDisplay.classList.add("game-win-screen");
  playAgainButton.classList.add("play-again-button");
  displayScore.classList.add("game-over-screen-score");
  displayHighScore.classList.add("game-over-screen-score");

  main.appendChild(gameWinScreenDisplay);

  gameWinScreenDisplay.append(buttonContainer);
  buttonContainer.append(playAgainButton);

  gameWinScreenDisplay.append(scoreContainer);
  scoreContainer.append(displayScore);

  gameWinScreenDisplay.append(highScoreContainer);
  highScoreContainer.append(displayHighScore);

  playAgainButton.onmouseenter = () => {
    buttonClickAudio();
  };

  playAgainButton.onclick = () => {
    buttonClickAudio();

    window.location.reload();
  };

  displayScore.innerHTML = `${score}`;
  if (score < currentHighScore) {
    displayHighScore.innerHTML = `${currentHighScore}`;
  } else if (score > currentHighScore) {
    displayHighScore.innerHTML = `${score}`;
  } else {
    displayHighScore.innerHTML = `${currentHighScore}`;
  }
};

/**
 * Screen to display at the beginning of the game
 */
const gameStartScreen = () => {
  gameStartScreenAudio();

  const openingScreen = document.createElement("div");
  const manualScreen = document.createElement("div");
  const classicMode = document.createElement("button");
  const extremeMode = document.createElement("button");
  const practiceMode = document.createElement("button");
  const showManualButton = document.createElement("button");

  const buttonContainer = document.createElement("div");
  const manualContainer = document.createElement("div");

  openingScreen.classList.add("opening-screen");
  manualScreen.classList.add("manual-screen");
  buttonContainer.classList.add("button-container");
  manualContainer.classList.add("manual-container");
  classicMode.classList.add("classic-mode");
  extremeMode.classList.add("extreme-mode");
  practiceMode.classList.add("practice-mode");
  showManualButton.classList.add("show-manual");

  main.append(openingScreen);
  openingScreen.appendChild(manualContainer);
  openingScreen.appendChild(buttonContainer);
  buttonContainer.append(classicMode);
  buttonContainer.append(extremeMode);
  buttonContainer.append(practiceMode);
  manualContainer.append(showManualButton);
  manualContainer.append(manualScreen);

  classicMode.onmouseenter = () => {
    buttonClickAudio();
  };
  extremeMode.onmouseenter = () => {
    buttonClickAudio();
  };
  practiceMode.onmouseenter = () => {
    buttonClickAudio();
  };

  classicMode.onclick = () => {
    buttonClickAudio();

    openingScreen.remove();
    extremeMode.remove();
    classicMode.remove();
    gameInitialization(100, 150, 120);
  };

  extremeMode.onclick = () => {
    buttonClickAudio();

    openingScreen.remove();
    extremeMode.remove();
    classicMode.remove();
    gameInitialization(80, 120, 100);
  };

  practiceMode.onclick = () => {
    buttonClickAudio();

    openingScreen.remove();
    extremeMode.remove();
    classicMode.remove();
    gameInitialization(280, 330, 280);
  };
};

gameStartScreen();
