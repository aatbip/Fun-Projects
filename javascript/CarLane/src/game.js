function Game() {
  this.width = 400;
  this.height = 700;
  this.backgroundY = 0;
  this.score = 0;
  this.obstacles = [];
  this.restart = false;
}

Game.prototype.init = function (gameID) {
  this.highScore = localStorage.getItem("highScore") || 0;

  this.area = document.getElementById(gameID);
  this.area.style.width = this.width + "px";
  this.area.style.height = this.height + "px";
  this.area.style.backgroundImage = 'url("./images/road.png")';
  this.area.style.backgroundPositionY = this.backgroundY + "px";

  this.player = new Player();
  this.player.init();
  this.player.draw(this.area);
  if (!this.restart) {
    this.addListeners();
  }

  let temp = [-50, -300, -600];

  for (let i = 0; i < 3; i++) {
    let obstacle = new Obstacle();
    obstacle.init(this.getRandomValue(2, 0), temp[i]);
    obstacle.draw(this.area);
    this.obstacles.push(obstacle);
  }
  this.createScore();

  this.createStartScreen();
};

Game.prototype.createObstacle = function () {
  let obstacle = new Obstacle();
  obstacle.init(this.getRandomValue(2, 0), -110);
  obstacle.draw(this.area);
  this.obstacles.push(obstacle);
};

Game.prototype.createScore = function () {
  this.gameScore = document.createElement("p");
  this.scoreBody = "Score: ";
  this.gameScore.innerHTML = this.scoreBody;
  this.gameScore.style.position = "absolute";
  this.gameScore.style.top = "5px";
  this.gameScore.style.right = "5px";
  this.gameScore.style.color = "white";
  this.gameScore.style.textShadow = "2px 2px 5px black";
  this.gameScore.classList.add("score-text");

  this.currentHighScore = document.createElement("p");
  this.highscoreBody = "High Score: " + this.highScore;
  this.currentHighScore.innerHTML = this.highscoreBody;
  this.currentHighScore.style.position = "absolute";
  this.currentHighScore.style.top = "20px";
  this.currentHighScore.style.right = "5px";
  this.currentHighScore.style.color = "white";
  this.currentHighScore.style.textShadow = "2px 2px 5px black";
  this.currentHighScore.classList.add("score-text");
  this.area.appendChild(this.gameScore);
  this.area.appendChild(this.currentHighScore);
};

Game.prototype.addListeners = function () {
  let that = this;

  document.addEventListener("keydown", function (e) {
    switch (e.key) {
      case "a":
        that.player.toLeft();
        break;
      case "d":
        that.player.toRight();
        break;
      default:
        console.log("Err");
        break;
    }
  });
};

Game.prototype.update = function () {
  let that = this;
  this.speed = 1;
  this.gameLoop = setInterval(() => {
    that.backgroundY += 2 + this.speed;
    that.area.style.backgroundPositionY = that.backgroundY + "px";
    for (let i = 0; i < this.obstacles.length; i++) {
      this.obstacles[i].y += 1 + this.speed;
      this.obstacles[i].update();

      this.detectCarCollision(this.obstacles[i]);
      this.detectBorderCollision(this.obstacles[i], i);
    }

    this.speed += 0.005;
  }, 16);
};

Game.prototype.getRandomValue = function (max, min) {
  let val = Math.random() * (max - min) + min;
  return Math.round(val);
};

Game.prototype.detectCarCollision = function (obstacle) {
  let that = this;
  if (
    this.player.x <= obstacle.x + obstacle.width &&
    this.player.x + this.player.width >= obstacle.x &&
    this.player.y <= obstacle.y + obstacle.height &&
    this.player.y + this.player.height >= obstacle.y
  ) {
    clearInterval(that.gameLoop);
    if (this.score > this.highScore) {
      localStorage.setItem("highScore", this.score);
    }
    this.createGameOverScreen();
    this.showGameOverScreen();
  }
};

Game.prototype.detectBorderCollision = function (obstacle) {
  if (obstacle.y >= this.height) {
    this.obstacles.shift();
    obstacle.destroy();
    this.score++;

    this.gameScore.innerHTML = this.scoreBody + this.score;
    this.createObstacle();
  }
};

Game.prototype.createStartScreen = function () {
  let that = this;
  this.startScreen = document.createElement("div");
  this.startScreen.style.width = this.width + "px";
  this.startScreen.style.height = this.height + "px";
  this.startScreen.style.textAlign = "center";
  this.startScreen.style.verticalAlign = "center";
  this.startScreen.style.backgroundColor = "blue";
  this.startScreen.style.position = "absolute";
  this.startScreen.style.lineHeight = this.height + "px";
  this.startScreen.style.zIndex = "1";
  this.startScreen.style.backgroundImage = 'url("./images/cover.jpg")';
  let startText = document.createElement("p");
  startText.innerHTML = "CLICK TO START!!!";
  startText.classList.add("start-text");
  this.startScreen.appendChild(startText);

  this.area.appendChild(this.startScreen);
  this.startScreen.addEventListener("click", function () {
    that.startScreen.style.display = "none";
    that.update();
  });
};

Game.prototype.createGameOverScreen = function () {
  let that = this;

  this.screen = document.createElement("div");
  this.screen.style.width = this.width + "px";
  this.screen.style.height = this.height + "px";
  this.screen.style.display = "none";
  this.screen.style.textAlign = "center";
  this.screen.style.verticalAlign = "center";
  this.screen.style.position = "absolute";
  this.screen.style.zIndex = "1";
  this.screen.style.backgroundImage = 'url("./images/end-cover.jpeg")';
  let endText = document.createElement("p");
  endText.innerHTML = "GAME OVER!!!";
  endText.classList.add("end-text");
  this.screen.appendChild(endText);

  this.overText = document.createElement("p");

  this.overText.innerHTML = "Score: " + this.score;
  this.overText.style.position = "absolute";
  this.overText.style.top = "40px";
  this.overText.style.right = "30px";
  this.overText.style.color = "white";
  this.overText.style.fontSize = "30px";

  this.screen.appendChild(this.overText);

  this.highscoreUpdate = document.createElement("p");
  if (this.highScore < this.score) {
    this.highscoreUpdate.innerHTML = "Highscore: " + this.score;
  } else {
    this.highscoreUpdate.innerHTML = "Highscore: " + this.highScore;
  }
  this.highscoreUpdate.style.fontSize = "20px";
  this.screen.appendChild(this.highscoreUpdate);

  let playAgainBtn = document.createElement("p");
  playAgainBtn.innerHTML = "Press Enter to restart";
  playAgainBtn.style.fontSize = "20px";
  playAgainBtn.style.backgroundColor = "whitesmoke";

  this.screen.appendChild(playAgainBtn);
  document.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
      that.hideGameOverScreen();
      that.resetGame();
    }
  });
  this.area.appendChild(this.screen);
};

Game.prototype.showGameOverScreen = function () {
  this.screen.style.display = "block";
};

Game.prototype.hideGameOverScreen = function () {
  let that = this;

  that.screen.style.display = "none";
};

Game.prototype.resetGame = function () {
  let that = this;

  while (this.obstacles.length != 0) {
    this.obstacles.pop();
  }
  that.player = null;
  this.area.innerHTML = "";
  this.area = null;
  this.score = 0;
  this.restart = true;

  this.init("game-area");
};

let game = new Game();
game.init("game-area");
