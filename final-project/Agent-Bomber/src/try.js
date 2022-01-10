if (direction === 1) {
    console.log(
      "right",
      detectCollisionToRight(enemyOneStartPosition, gridArray)
    );
    if (detectCollisionToRight(enemyOneStartPosition, gridArray)) {
      enemyOne.style.cssText = `top: ${indexTop + move[0]}px; left: ${
        indexLeft + move[1]
      }px`;
      enemyOneStartPosition += 1;
      indexLeft += 50;
      console.log(gridArray[enemyOneStartPosition + 1]);
      console.log("if", indexLeft)
    }
  }
  // else {
  //   direction = Math.floor(Math.random() * directions.length);

  //   move = directions[direction - 1];
  // }

  if (direction === 2) {
    console.log(
      "left",
      detectCollisionToLeft(enemyOneStartPosition, gridArray)
    );
    if (detectCollisionToLeft(enemyOneStartPosition, gridArray)) {
      enemyOne.style.cssText = `top: ${indexTop + move[0]}px; left: ${
        indexLeft + move[1]
      }px`;
      enemyOneStartPosition -= 1;
      indexLeft - +50;
      console.log(gridArray[enemyOneStartPosition - 1]);
    }
  }
  // else {
  //   direction = Math.floor(Math.random() * directions.length);

  //   move = directions[direction - 1];
  // }

  if (direction === 3) {
    console.log("top", detectCollisionToUp(enemyOneStartPosition, gridArray));

    if (detectCollisionToUp(enemyOneStartPosition, gridArray)) {
      enemyOne.style.cssText = `top: ${indexTop + move[0]}px; left: ${
        indexLeft + move[1]
      }px`;
      enemyOneStartPosition += 17;
      indexTop += 50;
      console.log(gridArray[enemyOneStartPosition + 17]);
    }
  }
  // else {
  //   direction = Math.floor(Math.random() * directions.length);

  //   move = directions[direction - 1];
  // }

  if (direction === 4) {
    console.log(
      "down",
      detectCollisionToDown(enemyOneStartPosition, gridArray)
    );

    if (detectCollisionToDown(enemyOneStartPosition, gridArray)) {
      enemyOne.style.cssText = `top: ${indexTop + move[0]}px; left: ${
        indexLeft + move[1]
      }px`;
      enemyOneStartPosition -= 17;
      indexTop -= 50;
      console.log(gridArray[enemyOneStartPosition - 17]);
    }
  }