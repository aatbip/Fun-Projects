//import functions
import {
  TOTAL_GRID,
  GRID_SIZE,
  GRID_TYPE,
  GRID_LIST,
  ENVIRONMENT,
} from "./setup.js";



//constants
// let INITIAL_POSITION_X = 50; //left: 750px max
// let INITIAL_POSITION_Y = 50; //top: 450px max

class Agent {
  constructor() {
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

  addAgent(gameDiv) {
    this.gameDiv = gameDiv;
    // const agent = document.createElement("div");
    this.agent.style.cssText = `top: ${this.INITIAL_POSITION_Y}px; left: ${this.INITIAL_POSITION_X}px`;
    this.agent.classList.add(`${GRID_TYPE.agent}`);
    this.gameDiv.append(this.agent);
    console.log("before ini", this.INITIAL_POSITION_X);
  }

  toRight() {
    var that = this;
    that.INITIAL_POSITION_X += 50;
    that.agent.style.cssText = `top: ${that.INITIAL_POSITION_Y}px; left: ${that.INITIAL_POSITION_X}px`;
    that.agentPosY++;
    that.agentPosition = that.gridPositions[that.agentPosX][that.agentPosY];
    console.log("torightAgentPos", that.agentPosition);
    console.log("torightY", that.agentPosY);
    console.log("torightX", that.agentPosX);
    console.log("right after ini", that.INITIAL_POSITION_X);

    return {
      agentPosXnew: that.agentPosX,
      agentPositionNew: that.agentPosition,
      agentPosYnew: that.agentPosY,
      initialPosYNew: that.INITIAL_POSITION_Y,
    };
  }

  toBottom() {
    // var that = this;
    this.INITIAL_POSITION_Y += 50;
    this.agentPosX++;
    this.agentPosition = this.gridPositions[this.agentPosX][this.agentPosY];
    console.log(this.agentPosX, this.agentPosY)
    console.log(this.agentPosition)
    console.log(this.gridArray[this.agentPosition])
    if (
      this.gridArray[this.agentPosition].classList.contains("background-wall")
    ) {
      this.agent.style.cssText = `top: ${this.INITIAL_POSITION_Y}px; left: ${this.INITIAL_POSITION_X}px`;
    }
    // console.log("toBottomAgentPos", that.agentPosition);
    // console.log("toBottomY", that.agentPosY);
    // console.log("toBottomX", that.agentPosX);
    // console.log("bottom after ini", that.INITIAL_POSITION_Y);
    // return {
    //   agentPosXnew: that.agentPosX,
    //   agentPositionNew: that.agentPosition,
    //   agentPosYnew: that.agentPosY,
    //   initialPosYNew: that.INITIAL_POSITION_Y,
    // };
  }

  toLeft() {
    var that = this;
    that.INITIAL_POSITION_X -= 50;
    that.agent.style.cssText = `top: ${that.INITIAL_POSITION_Y}px; left: ${that.INITIAL_POSITION_X}px`;
    that.agentPosY--;
    that.agentPosition = that.gridPositions[that.agentPosX][that.agentPosY];
    console.log("toleftAgentPos", that.agentPosition);
    console.log("toleftY", that.agentPosY);
    console.log("toleftX", that.agentPosX);
    console.log("left after ini", that.INITIAL_POSITION_X);
    return {
      agentPosXnew: that.agentPosX,
      agentPositionNew: that.agentPosition,
      agentPosYnew: that.agentPosY,
      initialPosYNew: that.INITIAL_POSITION_Y,
    };
  }

  toTop() {
    var that = this;
    that.INITIAL_POSITION_Y -= 50;
    that.agent.style.cssText = `top: ${that.INITIAL_POSITION_Y}px; left: ${that.INITIAL_POSITION_X}px`;
    that.agentPosX--;
    that.agentPosition = that.gridPositions[that.agentPosX][that.agentPosY];

    console.log("toTopAgentPos", that.agentPosition);
    console.log("toTopY", that.agentPosY);
    console.log("toTopX", that.agentPosX);
    console.log("Top after ini", that.INITIAL_POSITION_Y);
    return {
      agentPosXnew: that.agentPosX,
      agentPositionNew: that.agentPosition,
      agentPosYnew: that.agentPosY,
      initialPosYNew: that.INITIAL_POSITION_Y,
    };
  }
}

export { Agent };
