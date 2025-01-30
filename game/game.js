// Maze dimensions and cell size
const width = 11;
const height = 11;
const cellSize = 40;

// Maze data (1 for wall, 0 for path) -  REPRODUCIBLE MAZE
const mazeData = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Initialize Two.js
const elem = document.getElementById("maze");
const two = new Two({
  width: width * cellSize,
  height: height * cellSize,
}).appendTo(elem);

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

// Draw start and end points (you can customize these)
const startX = 1; // Example start (adjust as needed)
const startY = 1;
const endX = width - 2; // Example end (adjust as needed)
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
  // Remove the old player if it exists
  if (player) {
    console.log(player);
      player.remove(); // Use Two.js's remove method
      console.log(player);
  }

  player = two.makeRectangle(
      startX * cellSize + cellSize / 2,
      startY * cellSize + cellSize / 2,
      cellSize / 2,
      cellSize / 2
  );
  player.fill = "yellow";
  player.stroke = "black";
  player.linewidth = 1;
  two.update(); // Important: Update Two.js after creating the player
}

// Place the player at the start point after the maze is drawn
createPlayer(startX, startY); // Use the startX and startY you defined earlier.

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

window.resetGame = function () {
  console.log("Here In reset");
  createPlayer(startX, startY); // Create a *new* player at the start
  // Any other game state resets (score, etc.) would go here
};

// Listen for messages from the parent window
window.addEventListener("message", function (event) {
  var code = event.data;
  try {
    eval(code);
  } catch (error) {
    console.error("Error executing code:", error);
  }
});
