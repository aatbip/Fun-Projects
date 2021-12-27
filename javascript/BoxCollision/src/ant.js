function Ant() {
  this.dx = 1;
  this.dy = 1;

  this.box = document.createElement("div");
  this.box.classList.add("ant");
}

Ant.prototype.init = function (x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.speed = 1;
  this.width = this.radius * 2;
  this.height = this.radius * 2;
  this.box.style.width = this.width + "px";
  this.box.style.height = this.height + "px";
  this.box.style.position = "absolute";
  this.box.style.left = this.x + "px";
  this.box.style.top = this.y + "px";
  this.box.style.backgroundImage = 'url("./images/ant.gif")';
  this.box.style.backgroundSize = this.width + "px " + this.height + "px";
};
Ant.prototype.draw = function (canvas) {
  canvas.appendChild(this.box);
  let that = this;
  this.box.addEventListener("click", function () {
    that.box.parentElement.removeChild(that.box);
  });
};

Ant.prototype.move = function () {
  this.box.style.left = this.x + "px";
  this.box.style.top = this.y + "px";
};
