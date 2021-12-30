function Main() {
  this.width = 288;
  this.height = 512;
  this.roadHeight = 112;
  this.gravity = 0.8;
  this.gravityRate = 1.05;
  this.acceleration = 2;
  this.flyHeight = 40;
  this.restart = false;
  this.backgroundposition = 0;
  this.wide = 120;
  this.score = 0;
  this.obstacles = [];
  this.bestScore = localStorage.getItem("bestScore-flappy") || 0;
}

Main.prototype.init = function () {
  this.gameArea = document.getElementById("game-area");
  this.gameArea.style.width = this.width + "px";
  this.gameArea.style.height = this.height + "px";

  this.road = document.createElement("div");
  this.road.style.backgroundImage = "url('./images/road.png')";
  this.road.style.position = "absolute";
  this.road.style.width = this.width + "px";
  this.road.style.height = "56px";
  this.road.style.left = "0px";
  this.road.style.bottom = "0px";
  this.road.style.backgroundPosition = "bottom";
  this.road.style.backgroundPositionX = "0px";
  this.road.style.zIndex = "3";
  this.gameArea.appendChild(this.road);

  this.player = new Flappy();
  this.player.init();
  this.player.draw(this.gameArea);

  this.player.animate();
  this.gameScore();
  this.startScreen();
};

Main.prototype.gameScore = function () {
  this.scoreCount = document.createElement("p");
  this.scoreCount.style.position = "absolute";
  this.scoreCount.style.fontSize = "40px";
  this.scoreCount.style.color = "white";
  this.scoreCount.style.left = "10px";
  this.scoreCount.style.fontWeight = "bold";
  this.scoreCount.style.textShadow = "3px 3px 8px black";
  this.scoreCount.style.zIndex = "1";

  this.scoreCount.innerHTML = this.score;

  this.gameArea.appendChild(this.scoreCount);
};

Main.prototype.startScreen = function () {
  let that = this;
  this.screenStart = document.createElement("div");
  this.screenStart.classList.add("screen-start");
  this.gameArea.appendChild(this.screenStart);

  this.screenStart.addEventListener("click", function () {
    that.screenStart.style.display = "none";
    that.PrimaryObstacles();
    if (!that.restart) {
      that.addListeners();
    }
    that.update();
  });
};

Main.prototype.GameOverScreen = function () {
  this.endScreen = document.createElement("div");
  this.endScreen.classList.add("screen-gameover");

  this.currentScore = document.createElement("p");
  this.currentScore.innerHTML = "Score : " + this.score;
  this.currentScore.classList.add("current-score");
  this.endScreen.append(this.currentScore);

  this.highScore = document.createElement("p");
  this.highScore.innerHTML = "High Score : " + this.bestScore;
  this.highScore.classList.add("high-score");
  this.endScreen.append(this.highScore);

  this.playButton = document.createElement("div");
  this.playButton.classList.add("play-button");
  this.endScreen.appendChild(this.playButton);

  let that = this;

  this.playButton.addEventListener("click", function () {
    that.endScreen.style.display = "none";
    that.resetGame();
  });

  this.gameArea.appendChild(this.endScreen);
};

Main.prototype.resetGame = function () {
  while (this.obstacles.length != 0) {
    this.obstacles.pop();
  }
  this.player = null;
  this.gameArea.innerHTML = "";
  this.gameArea = null;
  this.score = 0;
  this.restart = true;
  this.init();
};

Main.prototype.PrimaryObstacles = function () {
  let obstacle = new Obstacle();
  let temp = this.getRandomValue(350, 150);
  obstacle.init(false, this.width, temp);
  obstacle.draw(this.gameArea);

  let obs = new Obstacle();
  obs.init(true, this.width, temp - this.wide - 320);
  obs.draw(this.gameArea);

  this.obstacles.push(obstacle);
  this.obstacles.push(obs);

  let obstacle2 = new Obstacle();
  let temp2 = this.getRandomValue(350, 150);
  obstacle2.init(false, this.width + 170, temp2);
  obstacle2.draw(this.gameArea);

  let obs2 = new Obstacle();
  obs2.init(true, this.width + 170, temp2 - this.wide - 320);
  obs2.draw(this.gameArea);

  this.obstacles.push(obstacle2);
  this.obstacles.push(obs2);
};

Main.prototype.secondaryObstacles = function () {
  this.score += 1;
  this.scoreCount.innerHTML = this.score;

  let obstacle = new Obstacle();
  let temp = this.getRandomValue(350, 150);
  obstacle.init(false, this.width, temp);
  obstacle.draw(this.gameArea);

  let ob = new Obstacle();
  ob.init(true, this.width, temp - this.wide - 320);
  ob.draw(this.gameArea);

  this.obstacles.push(obstacle);
  this.obstacles.push(ob);
};

Main.prototype.addListeners = function () {
  let that = this;
  this.gameArea.addEventListener("click", function (e) {
    that.player.y -= that.flyHeight;
    that.gravity = 0.5;
    that.player.update();
  });
};

Main.prototype.update = function () {
  let that = this;
  this.animate = setInterval(() => {
    this.player.y += this.gravity;
    this.gravity *= this.gravityRate;
    this.player.update();
    this.backgroundposition -= this.forwardSpeed;
    this.road.style.backgroundPositionX = this.backgroundposition + "px";

    for (let i = 0; i < this.obstacles.length; i++) {
      that.obstacles[i].x -= this.acceleration;
      that.obstacles[i].update();
      this.detectBirdCollision(this.obstacles[i]);
      this.detectBorderFrame(this.obstacles[i]);
      this.detectBirdPass(this.obstacles[i]);
    }

    this.detectBorderCollision();
  }, 16);
};

Main.prototype.detectBorderCollision = function () {
  if (
    this.player.y >= this.height - this.roadHeight - this.player.height ||
    this.player.y <= 0
  ) {
    clearInterval(this.animate);
    this.player.stopAnimation();

    this.GameOverScreen();
  }
};

Main.prototype.detectBorderFrame = function (pipe) {
  if (pipe.x <= 0 - pipe.width) {
    pipe.destory();

    if (pipe.top) {
      if (this.obstacles.length < 4) this.secondaryObstacles();
      setTimeout(() => {
        this.obstacles.shift();
      }, 10);
    }
  }
};

Main.prototype.detectBirdCollision = function (enemy) {
  if (
    this.player.x <= enemy.x + enemy.width &&
    this.player.x + this.player.width >= enemy.x &&
    this.player.y <= enemy.y + enemy.height &&
    this.player.y + this.player.height >= enemy.y
  ) {
    clearInterval(this.animate);
    this.player.stopAnimation();

    if (this.score > this.bestScore) {
      localStorage.setItem("bestscore-flappy", this.score);
      this.bestScore = this.score;
    }
    this.GameOverScreen();
  }
};

Main.prototype.detectBirdPass = function (obs) {
  if (this.player.x + this.player.width == obs.x + obs.width) {
    if (obs.top) {
      console.log("pass");
    }
  }
};

Main.prototype.getRandomValue = function (max, min) {
  let val = Math.random() * (max - min) + min;
  return Math.round(val);
};

let play = new Main();
play.init();
