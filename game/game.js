// Maze dimensions and cell size
const width = 24;
const height = 14;
const cellSize = 40;

// Maze data (1 for wall, 0 for path)
const mazeData = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Initialize Two.js
const elem = document.getElementById("maze");
const two = new Two({
  width: width * cellSize,
  height: height * cellSize,
}).appendTo(elem);

const messageDiv = document.getElementById("message");

// Function to draw a cell (wall or path)
function drawCell(x, y, isWall) {
  const rect = two.makeRectangle(
    x * cellSize + cellSize / 2,
    y * cellSize + cellSize / 2,
    cellSize,
    cellSize
  );
  rect.fill = isWall ? "#000" : "#fff"; // Black for walls, white for paths
  rect.stroke = "#000"; // Black border
  rect.linewidth = 1;
}

// Generate the maze
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    drawCell(x, y, mazeData[y][x]);
  }
}

// Draw start and end points
const startX = 1;
const startY = 1;
const endX = width - 2;
const endY = height - 2;

const start = two.makeCircle(
  startX * cellSize + cellSize / 2,
  startY * cellSize + cellSize / 2,
  cellSize / 4
);
start.fill = "green";
const end = two.makeCircle(
  endX * cellSize + cellSize / 2,
  endY * cellSize + cellSize / 2,
  cellSize / 4
);
end.fill = "red";

let player;

function createPlayer(startX, startY) {
  player = two.makeRectangle(
    startX * cellSize + cellSize / 2,
    startY * cellSize + cellSize / 2,
    cellSize / 2,
    cellSize / 2
  );
  player.fill = "yellow";
  player.stroke = "black";
  player.linewidth = 1;
}


function checkGameStatus() {
  const playerX = Math.floor(player.translation.x / cellSize);
  const playerY = Math.floor(player.translation.y / cellSize);

  if (playerX === endX && playerY === endY) {
    messageDiv.innerHTML = "You won!";
  } else {
    messageDiv.innerHTML = "Keep going or press reset button.";
  }
}


// Place the player at the start point after the maze is drawn
createPlayer(startX, startY);

two.update();

window.obstacleDetected = function (direction) {
  let nextX = player.translation.x;
  let nextY = player.translation.y;

  switch (direction) {
      case 'right':
          nextX += cellSize;
          break;
      case 'left':
          nextX -= cellSize;
          break;
      case 'up':
          nextY -= cellSize;
          break;
      case 'down':
          nextY += cellSize;
          break;
      default:
          console.error("Invalid direction:", direction);
          return true; // Treat as obstacle to prevent movement
  }

  const gridX = Math.floor(nextX / cellSize);
  const gridY = Math.floor(nextY / cellSize);

  if (gridX >= 0 && gridX < width && gridY >= 0 && gridY < height && mazeData[gridY][gridX] === 1) {
      return true; // Obstacle detected
  } else {
      return false; // No obstacle
  }
};

window.moveRight = function () {
  if (!obstacleDetected('right')) {
      player.translation.x += cellSize;
      two.update();
  }
};

window.moveLeft = function () {
  if (!obstacleDetected('left')) {
      player.translation.x -= cellSize;
      two.update();
  }
};

window.moveUp = function () {
  if (!obstacleDetected('up')) {
      player.translation.y -= cellSize;
      two.update();
  }
};

window.moveDown = function () {
  if (!obstacleDetected('down')) {
      player.translation.y += cellSize;
      two.update();
  }
};


// This function resets game state to original so that user can 
function resetGameState() {
  two.remove(player);
  createPlayer(startX, startY);
  two.update();
  messageDiv.innerHTML = "";
}


// Listen for messages from the parent window
window.addEventListener("message", function (event) {
  var message = event.data;

  if (message === 'reset') {
    resetGameState();
  } else {
    var code = message;
    try {
      eval(code);
      checkGameStatus();
    } catch (error) {
      console.error("Error executing code:", error, "Caused by this code:", code);
    }
  }

});
