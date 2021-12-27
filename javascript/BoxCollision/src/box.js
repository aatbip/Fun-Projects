function Box() {
  this.dx = 1;
  this.dy = 1;
  this.box = document.createElement("div");
}
Box.prototype.init = function (x, y, radius, color, speed) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.speed = speed;
  this.width = this.radius * 2;
  this.height = this.radius * 2;
  this.box.style.height = this.height + "px";
  this.box.style.width = this.width + "px";
  this.box.style.position = "absolute";
  this.box.style.left = this.x + "px";
  this.box.style.top = this.y + "px";
  this.box.style.backgroundColor = this.color;
  this.box.style.borderRadius = this.radius + "px";
};
Box.prototype.draw = function (canvas) {
  canvas.appendChild(this.box);
};

Box.prototype.move = function () {
  this.box.style.left = this.x + "px";
  this.box.style.top = this.y + "px";
};
// }
