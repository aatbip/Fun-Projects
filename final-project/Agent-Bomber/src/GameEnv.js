import {
  TOTAL_GRID,
  GRID_SIZE,
  GRID_TYPE,
  GRID_LIST,
  ENVIRONMENT,
} from "./setup.js";

const ROW_DIFFERENCE = 17;

import { Agent } from "./Agent.js";
let agent = new Agent();

class GameEnv {
  constructor(gameDiv) {
    this.gameDiv = gameDiv;
    this.gridArray = [];
    console.log(this.gridArray);
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

  detectAgentGridCollisionRight() {
    const { agentPosXnew, agentPositionNew, agentPosYnew, initialPosYNew } =
      agent.toRight();

    if (
      this.gridArray[agentPositionNew].classList.contains("background-wall")
    ) {
      console.log(this.gridArray[agentPositionNew]);

      return true;
    }
  }

  detectAgentGridCollisionLeft() {
    const { agentPosXnew, agentPositionNew, agentPosYnew, initialPosYNew } =
      agent.toLeft();

    if (
      this.gridArray[agentPositionNew].classList.contains("background-wall")
    ) {
      console.log(this.gridArray[agentPositionNew]);

      return true;
    }
  }

  detectAgentGridCollisionTop() {
    const { agentPosXnew, agentPositionNew, agentPosYnew, initialPosYNew } =
      agent.toTop();

    if (
      this.gridArray[agentPositionNew].classList.contains("background-wall")
    ) {
      console.log(this.gridArray[agentPositionNew]);

      return true;
    }
  }

  detectAgentGridCollisionBottom() {
    const { agentPosXnew, agentPositionNew, agentPosYnew, initialPosYNew } =
      agent.toBottom();
    if (
      this.gridArray[agentPositionNew].classList.contains("background-wall")
    ) {
      console.log(this.gridArray[agentPositionNew]);
      console.log("G:toBottomAgentPos", agentPositionNew);
      console.log("G:toBottomY", agentPosYnew);
      console.log("G:toBottomX", agentPosXnew);
      console.log("G:bottom after ini", initialPosYNew);

      return true;
    } else {
      return false;
    }
  }

  static gameEnvStatic(gameDiv, environment) {
    const _gameEnv = new this(gameDiv);
    // _gameEnv.createGameEnvironment(environment);
    return _gameEnv;
  }
}

export { GameEnv };
