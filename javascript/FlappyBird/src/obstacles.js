function Obstacle() {
  this.x = 250;
  this.y = 350;

  this.left = 238;
  this.width = 52;
  this.height = 320;
}

Obstacle.prototype.init = function (top, x, y) {
  this.top = top || false;
  this.x = x || 250;
  this.y = y || 350;
  this.pipe = document.createElement("div");
  this.pipe.style.position = "absolute";
  this.pipe.style.width = this.width + "px";
  this.pipe.style.height = this.height + "px";
  this.pipe.style.left = this.left + "px";
  this.pipe.style.top = this.y + "px";

  if (this.top) {
    this.pipe.style.backgroundImage = 'url("./images/obstacle-up.png")';
  } else {
    this.pipe.style.backgroundImage = 'url("./images/obstacle-down.png")';
  }
};

Obstacle.prototype.draw = function (gameArea) {
  gameArea.appendChild(this.pipe);
};

Obstacle.prototype.update = function () {
  this.pipe.style.left = this.x + "px";
};

Obstacle.prototype.destory = function () {
  this.pipe.remove();
};

Obstacle.prototype.moveLeft = function () {
  setInterval(() => {
    this.x -= 5;
    this.pipeTop.style.left = this.x + "px";
  }, 50);
};

Obstacle.prototype.getRandomValue = function (max, min) {
  let val = Math.random() * (max - min) + min;
  return Math.round(val);
};
