import {
  TOTAL_GRID,
  GRID_SIZE,
  GRID_TYPE,
  GRID_LIST,
  ENVIRONMENT,
} from "./setup.js";

class GameEnv {
  constructor(gameDiv) {
    this.gameDiv = gameDiv;
    this.gridArray = [];
    console.log(this.gridArray);

    ///from agent///
    this.agent = document.createElement("div");
    this.INITIAL_POSITION_X = 50; //left: 750px max
    this.INITIAL_POSITION_Y = 50;

    //prettier-ignore
    this.gridPositions = [
      
      [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], 
      [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 
      [52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66], 
      [69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83], 
      [86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100], 
      [103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117], 
      [120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133 ,134], 
      [137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150 ,151], 
      [154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167 ,168]
    ]
    this.agentPosX = 0;
    this.agentPosY = 0;
    this.agentPosition = this.gridPositions[this.agentPosX][this.agentPosY];
  }

  createGameEnvironment(environment) {
    // this.gridArray = [];
    this.gameDiv.innerHTML = "";
    this.gameDiv.style.cssText = `grid-template-columns: repeat(${TOTAL_GRID}, ${GRID_SIZE}px)`;

    environment.forEach((grid) => {
      const grids = document.createElement("div");
      grids.classList.add("grid", GRID_LIST[grid]);
      grids.style.cssText = `width: ${GRID_SIZE}px; height: ${GRID_SIZE}px`;
      this.gameDiv.appendChild(grids);
      this.gridArray.push(grids);
    });
  }

  addAgent(gameDiv) {
    this.gameDiv = gameDiv;
    // const agent = document.createElement("div");
    this.agent.style.cssText = `top: ${this.INITIAL_POSITION_Y}px; left: ${this.INITIAL_POSITION_X}px`;
    this.agent.classList.add(`${GRID_TYPE.agent}`);
    this.gameDiv.append(this.agent);
  }

  toBottom() {
    this.INITIAL_POSITION_Y += 50;
    this.agentPosX++;

    if (this.agentPosX < 9) {
      this.agentPosition = this.gridPositions[this.agentPosX][this.agentPosY];
    }

    if (this.agentPosX > 8) {
      this.agentPosX -= 1;
      this.INITIAL_POSITION_Y -= 50;

      this.agentPosition = this.gridPositions[this.agentPosX][this.agentPosY];
    } else if (
      this.gridArray[this.agentPosition].classList.contains("background-wall")
    ) {
      this.agent.style.cssText = `top: ${this.INITIAL_POSITION_Y}px; left: ${this.INITIAL_POSITION_X}px`;
    } else {
      this.agentPosX -= 1;
      this.INITIAL_POSITION_Y -= 50;

      this.agentPosition = this.gridPositions[this.agentPosX][this.agentPosY];
    }
  }

  toTop() {
    this.INITIAL_POSITION_Y -= 50;
    this.agentPosX--;
    if (this.agentPosX > -1) {
      this.agentPosition = this.gridPositions[this.agentPosX][this.agentPosY];
    }

    if (this.agentPosX < 0) {
      this.agentPosX++;
      this.INITIAL_POSITION_Y += 50;
      this.agentPosition = this.gridPositions[this.agentPosX][this.agentPosY];
    } else if (
      this.gridArray[this.agentPosition].classList.contains("background-wall")
    ) {
      this.agent.style.cssText = `top: ${this.INITIAL_POSITION_Y}px; left: ${this.INITIAL_POSITION_X}px`;
    } else {
      this.agentPosX++;
      this.INITIAL_POSITION_Y += 50;

      this.agentPosition = this.gridPositions[this.agentPosX][this.agentPosY];
    }
  }

  toRight() {
    this.INITIAL_POSITION_X += 50;
    this.agentPosY++;
    if (this.agentPosY < 15) {
      this.agentPosition = this.gridPositions[this.agentPosX][this.agentPosY];
    }

    if (this.agentPosY > 14) {
      this.agentPosY--;
      this.INITIAL_POSITION_X -= 50;
      this.agentPosition = this.gridPositions[this.agentPosX][this.agentPosY];
    } else if (
      this.gridArray[this.agentPosition].classList.contains("background-wall")
    ) {
      this.agent.style.cssText = `top: ${this.INITIAL_POSITION_Y}px; left: ${this.INITIAL_POSITION_X}px`;
    } else {
      this.agentPosY--;
      this.INITIAL_POSITION_X -= 50;
      this.agentPosition = this.gridPositions[this.agentPosX][this.agentPosY];
    }
  }

  toLeft() {
    this.INITIAL_POSITION_X -= 50;
    this.agentPosY--;
    if (this.agentPosY > -1) {
      this.agentPosition = this.gridPositions[this.agentPosX][this.agentPosY];
    }

    if (this.agentPosY < 0) {
      this.agentPosY++;
      this.INITIAL_POSITION_X += 50;
      this.agentPosition = this.gridPositions[this.agentPosX][this.agentPosY];
    } else if (
      this.gridArray[this.agentPosition].classList.contains("background-wall")
    ) {
      this.agent.style.cssText = `top: ${this.INITIAL_POSITION_Y}px; left: ${this.INITIAL_POSITION_X}px`;
    } else {
      this.agentPosY++;
      this.INITIAL_POSITION_X += 50;
      this.agentPosition = this.gridPositions[this.agentPosX][this.agentPosY];
    }
  }

  static gameEnvStatic(gameDiv, environment) {
    const _gameEnv = new this(gameDiv);
    // _gameEnv.createGameEnvironment(environment);
    return _gameEnv;
  }
}

export { GameEnv };
