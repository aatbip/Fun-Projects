function Motion() {
  this.INTERVAL_TIME = 1000 / 60;
  this.speed = 5;

  this.colors = [
    "purple",
    "pink",
    "black",
    "green",
    "red",
    "blue",
    "yellow",
    "orange",
  ];
  this.ballPositions = [];
  this.balls = [];
}

Motion.prototype.init = function (
  width,
  height,
  totalBall,
  radius,
  containerId,
  isAntSmasher
) {
  this.canvasWidth = width;
  this.canvasHeight = height;
  this.totalBall = totalBall;
  this.radius = radius;
  this.isAntSmasher = isAntSmasher;
  this.size = this.radius * 2;

  this.canvas = document.getElementById(containerId);
  this.canvas.style.width = this.canvasWidth + "px";
  this.canvas.style.height = this.canvasHeight + "px";

  let x1 = this.getRandomValue(this.canvasWidth - this.size, 0);
  let y1 = this.getRandomValue(this.canvasHeight - this.size, 0);
  this.ballPositions.push({ x: x1, y: y1 });

  while (this.ballPositions.length != this.totalBall) {
    let counter = 0;
    let x = this.getRandomValue(this.canvasWidth - this.size, 0);
    let y = this.getRandomValue(this.canvasHeight - this.size, 0);

    for (var i = 0; i < this.ballPositions.length; i++) {
      if (
        x <= this.ballPositions[i].x + this.radius * 2 &&
        x + this.radius * 2 >= this.ballPositions[i].x &&
        y <= this.ballPositions[i].y + this.radius * 2 &&
        y + this.radius * 2 >= this.ballPositions[i].y
      ) {
        counter++;
      }
    }
    if (counter == 0) {
      this.ballPositions.push({ x: x, y: y });
    }
    counter = 0;
  }

  if (this.isAntSmasher) {
    for (let i = 0; i < this.totalBall; i++) {
      let ball = new Ant();
      ball.init(this.ballPositions[i].x, this.ballPositions[i].y, this.radius);
      ball.draw(this.canvas);
      this.balls.push(ball);
    }
  } else {
    for (let i = 0; i < this.totalBall; i++) {
      let ball = new Box();
      ball.init(
        this.ballPositions[i].x,
        this.ballPositions[i].y,
        this.radius,
        this.colors[this.getRandomValue(8, 0)],
        this.getRandomValue(2, 0.5)
      );
      ball.draw(this.canvas);
      this.balls.push(ball);
    }
  }
  this.detection();
};

Motion.prototype.detection = function () {
  let x = setInterval(() => {
    for (let i = 0; i < this.balls.length; i++) {
      this.detectBorderCollision(i);
      this.detectBallCollision(this.balls[i], i);
      this.balls[i].x += this.balls[i].speed * this.balls[i].dx;
      this.balls[i].y += this.balls[i].speed * this.balls[i].dy;
      this.balls[i].move();
    }
  }, this.INTERVAL_TIME);
};

Motion.prototype.detectBorderCollision = function (ind) {
  if (
    this.balls[ind].x >= this.canvasWidth - this.balls[ind].width ||
    this.balls[ind].x <= 0
  ) {
    this.balls[ind].dx *= -1;
  }
  if (
    this.balls[ind].y >= this.canvasHeight - this.balls[ind].height ||
    this.balls[ind].y <= 0
  ) {
    this.balls[ind].dy *= -1;
  }
};

Motion.prototype.detectBallCollision = function (isBall, indexes) {
  for (var i = 0; i < this.balls.length; i++) {
    if (i == indexes) {
      continue;
    }

    if (
      isBall.x <= this.balls[i].x + this.balls[i].width &&
      isBall.x + isBall.width >= this.balls[i].x &&
      isBall.y <= this.balls[i].y + this.balls[i].height &&
      isBall.y + isBall.height >= this.balls[i].y
    ) {
      if (
        Math.abs(isBall.x - this.balls[i].x) >
        Math.abs(isBall.y - this.balls[i].y)
      ) {
        this.balls[indexes].dx *= -1;
      } else {
        this.balls[indexes].dy *= -1;
      }
    }
  }
};

Motion.prototype.getRandomValue = function (max, min) {
  let val = Math.random() * (max - min) + min;
  return Math.round(val);
};
