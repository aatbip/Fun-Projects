class BoxPowerUp {
  constructor(gridArray) {
    this.gridArray = gridArray;
    this.boxPowerUpCountDisplay = document.createElement("p");
    this.boxPowerUpCountDisplay.classList.add("box-power-up-count");
    // this.agentPosition = agentPosition;

    this.boxPowerUpCount = 0;
    this.boxPowerUpExist = false;

    this.boxPowerUpOnePosition = 30;
    this.boxPowerUpTwoPosition = 163;

    this.evilMachinePosition = 66;
  }

  addBoxPowerUp() {
    const boxPowerUpOne = document.createElement("div");
    const boxPowerUpTwo = document.createElement("div");

    boxPowerUpOne.classList.add("box-power-up-one");
    boxPowerUpTwo.classList.add("box-power-up-two");

    this.gridArray[this.boxPowerUpOnePosition].classList.add(
      "box-power-up-one"
    );
    this.animateBoxPowerUpOne();
    this.gridArray[this.boxPowerUpTwoPosition].classList.add(
      "box-power-up-two"
    );
    this.animateBoxPowerUpTwo();
  }

  collectBoxPowerUp(gameDiv, agentPosition) {
    this.gameDiv = gameDiv;
    this.agentPosition = agentPosition;

    if (
      this.gridArray[this.agentPosition].classList.contains("box-power-up-one")
    ) {
      const wallPowerUpAudio = new Audio("./audios/gainpowerup.wav");
      wallPowerUpAudio.play();
      this.gameDiv.childNodes[this.boxPowerUpOnePosition].classList.remove(
        "box-power-up-one"
      );
      console.log(this.boxPowerUpCount);
      this.boxPowerUpCount++;
      this.boxPowerUpCountDisplay.innerHTML = `${this.boxPowerUpCount}`;
      this.powerUpsBox.append(this.boxPowerUpCountDisplay);
    } else if (
      this.gridArray[this.agentPosition].classList.contains("box-power-up-two")
    ) {
      const wallPowerUpAudio = new Audio("./audios/gainpowerup.wav");
      wallPowerUpAudio.play();
      this.gameDiv.childNodes[this.boxPowerUpTwoPosition].classList.remove(
        "box-power-up-two"
      );
      this.boxPowerUpCount++;
      console.log(this.boxPowerUpCount);
      this.boxPowerUpCountDisplay.innerHTML = `${this.boxPowerUpCount}`;
      this.powerUpsBox.append(this.boxPowerUpCountDisplay);
    }
  }

  addNewBox(gameDiv, agentPosition) {
    this.gameDiv = gameDiv;
    this.agentPosition = agentPosition;

    if (this.boxPowerUpCount > 0) {
      if (
        // this.gridArray[this.agentPosition].classList.contain("background-wall")
        this.gameDiv.childNodes[this.agentPosition].classList.contains(
          "background-wall"
        )
      ) {
        this.gameDiv.childNodes[this.agentPosition].classList.remove(
          "background-wall"
        );
        this.gameDiv.childNodes[this.agentPosition].classList.add(
          "movable-wall"
        );
        this.boxPowerUpCount -= 1;
      }
    }
  }

  displayBoxPowerUpCount(powerUpsBox) {
    this.powerUpsBox = powerUpsBox;

    this.boxPowerUpCountDisplay.innerHTML = `${this.boxPowerUpCount}`;
    this.powerUpsBox.append(this.boxPowerUpCountDisplay);
  }

  animateBoxPowerUpOne() {
    this.animateEnemyIntervalTime = 0;
    this.widthOfSheet = 400;
    this.posX = 50;
    this.enemyAnimationInterval = setInterval(() => {
      this.gridArray[this.boxPowerUpOnePosition].style.backgroundPositionX =
        this.posX + "px";
      this.gridArray[this.boxPowerUpOnePosition].style.backgroundPositionY =
        0 + "px";

      if (this.posX < this.widthOfSheet) {
        this.posX = this.posX + 50;
        ++this.animateEnemyIntervalTime;
      } else {
        this.posX = 50;
      }
    }, 80);
  }

  animateBoxPowerUpTwo() {
    this.animateEnemyIntervalTime = 0;
    this.widthOfSheet = 400;
    this.posX = 50;
    this.enemyAnimationInterval = setInterval(() => {
      this.gridArray[this.boxPowerUpTwoPosition].style.backgroundPositionX =
        this.posX + "px";
      this.gridArray[this.boxPowerUpTwoPosition].style.backgroundPositionY =
        0 + "px";

      if (this.posX < this.widthOfSheet) {
        this.posX = this.posX + 50;
        ++this.animateEnemyIntervalTime;
      } else {
        this.posX = 50;
      }
    }, 150);
  }

  addEvilMachine() {
    this.evilMachineBox = document.createElement("div");
    this.evilMachineBox.classList.add("evil-machine");

    this.gridArray[this.evilMachinePosition].classList.add("evil-machine");
  }
}

export { BoxPowerUp };
