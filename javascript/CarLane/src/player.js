function Player() {
  this.width = 50;
  this.height = 100;
  this.index = 1;
  this.lanes = 3;
  this.top = 0;
  this.y = 500;
  this.positions = [95, 185, 265];
}
Player.prototype.init = function () {
  this.car = document.createElement("div");
  this.car.style.backgroundImage = 'url("./images/player-car.png")';

  this.car.style.height = this.height + "px";
  this.car.style.width = this.width + "px";
  this.car.style.position = "absolute";
  this.car.style.backgroundSize = "contain";
  this.car.style.backgroundRepeat = "no-repeat";

  this.car.style.left = this.positions[1] + "px";
  this.x = this.positions[1];
  this.index = 1;

  this.car.style.top = this.y + "px";
};

Player.prototype.draw = function (area) {
  area.appendChild(this.car);
};

Player.prototype.toLeft = function () {
  if (this.index <= 0) {
    console.log("collapse");
  } else {
    this.index--;
  }
  this.x = this.positions[this.index];

  this.car.style.left = this.positions[this.index] + "px";
};

Player.prototype.toRight = function () {
  if (this.index >= this.lanes - 1) {
    console.log("collapse");
  } else {
    this.index++;
  }
  this.x = this.positions[this.index];

  this.car.style.left = this.positions[this.index] + "px";
};
