function Obstacle() {
  this.width = 50;
  this.height = 70;
  this.index = 1;
  this.lanes = 3;
  this.y = 0;
  this.positions = [95, 185, 265];
}
Obstacle.prototype.init = function (indexes, y) {
  this.y = y || 0;
  this.car = document.createElement("div");
  this.car.style.backgroundImage = "url('./images/obstacle-car.png')";
  this.car.style.width = this.width + "px";
  this.car.style.height = this.height + "px";
  this.car.style.position = "absolute";

  this.car.style.backgroundSize = "contain";
  this.car.style.backgroundRepeat = "no-repeat";
  this.car.style.left = this.positions[indexes] + "px";
  this.x = this.x = this.positions[indexes];
  this.car.style.top = this.y + "px";
};

Obstacle.prototype.draw = function (area) {
  area.appendChild(this.car);
};

Obstacle.prototype.update = function () {
  this.car.style.top = this.y + "px";
};

Obstacle.prototype.destroy = function () {
  this.car.parentElement.removeChild(this.car);
};

Obstacle.prototype.getRandomValue = function (max, min) {
  let val = Math.random() * (max - min) + min;
  return Math.round(val);
};
