function Flappy() {
  this.width = 35;
  this.height = 25;
  this.x = 72;
  this.y = 250;
  this.index = 0;
  this.images = ["bird-1", "bird-2", "bird-3", "bird-2"];
}

Flappy.prototype.init = function () {
  this.flappy = document.createElement("div");
  this.flappy.style.backgroundImage = 'url("./images/bird-2.png")';
  this.flappy.style.backgroundRepeat = "norepeat";
  this.flappy.style.width = this.width + "px";
  this.flappy.style.height = this.height + "px";
  this.flappy.style.position = "absolute";
  this.flappy.style.left = this.x + "px";
  this.flappy.style.top = this.y + "px";
};

Flappy.prototype.draw = function (area) {
  area.appendChild(this.flappy);
};

Flappy.prototype.animate = function () {
  this.animation = setInterval(() => {
    if (this.index >= 4) {
      this.index = 0;
    }
    let flappyImage = this.images[this.index];
    this.flappy.style.backgroundImage = `url("./images/${flappyImage}.png`;
    this.index++;
  }, 100);
};

Flappy.prototype.update = function () {
  this.flappy.style.top = this.y + "px";
};

Flappy.prototype.fly = function () {
  this.y -= 15;
  this.flappy.style.top = this.y + "px";
};

Flappy.prototype.stopAnimation = function () {
  let that = this;
  clearInterval(that.animationLoop);
};

Flappy.prototype.animateWings = function () {
  if (this.index >= 3) {
    this.index = 0;
  }
  let image = this.images[index];
  this.flappy.style.backgroundImage = `url("./images/${image}.png`;
  this.index++;
};
