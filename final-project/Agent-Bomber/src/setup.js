const TOTAL_GRID = 17; //total number of grids in a row
const GRID_SIZE = 50; //size of each grid in pixel

const GRID_TYPE = {
  topWall: "top-wall",
  sideWall: "side-wall",
  backgroundWall: "background-wall",
  metalWall: "metal-wall", //same image as topWall
  brickWall: "brick-wall",
  movableWall: "movable-wall",
  agent: "agent"
};

const GRID_LIST = [
  GRID_TYPE.topWall, //0
  GRID_TYPE.sideWall, //1
  GRID_TYPE.backgroundWall, //2
  GRID_TYPE.metalWall, //3
  GRID_TYPE.brickWall, //4
  GRID_TYPE.movableWall, //5
  GRID_TYPE.agent
];

//prettier-ignore
const ENVIRONMENT = [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 2, 4, 2, 5, 4, 2, 2, 4, 2, 2, 2, 5, 2, 2, 2, 1, 
    1, 2, 3, 5, 3, 4, 3, 2, 4, 2, 3, 2, 3, 4, 3, 4, 1, 
    1, 2, 2, 4, 4, 2, 4, 2, 4, 4, 2, 2, 4, 4, 2, 2, 1, 
    1, 4, 3, 2, 3, 5, 3, 4, 3, 2, 3, 2, 3, 5, 3, 2, 1, 
    1, 4, 2, 5, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 5, 4, 1, 
    1, 2, 3, 4, 3, 2, 3, 4, 3, 5, 3, 2, 3, 5, 3, 2, 1, 
    1, 2, 2, 2, 5, 2, 2, 2, 2, 5, 4, 2, 2, 4, 2, 2, 1, 
    1, 4, 3, 2, 3, 2, 3, 2, 3, 2, 3, 4, 3, 2, 3, 4, 1,
    1, 2, 4, 4, 2, 2, 5, 2, 4, 2, 4, 4, 2, 2, 4, 2, 1, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]

//11X17 total 850px

export { TOTAL_GRID, GRID_SIZE, GRID_TYPE, GRID_LIST, ENVIRONMENT };
