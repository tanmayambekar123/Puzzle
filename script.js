const gridElement = document.getElementById("grid");
const resetButton = document.getElementById("reset-button");
let tiles = [];
const gridSize = 4;

// Initialize the game by creating tiles
function initGame() {
  tiles = [];
  gridElement.innerHTML = '';
  const numbers = [...Array(gridSize * gridSize).keys()].slice(1);
  numbers.push(null); // add an empty tile at the end
  
  // Shuffle the tiles
  shuffleArray(numbers);
  
  // Create tile elements
  numbers.forEach((number, index) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    if (number === null) {
      tile.classList.add("empty");
      tile.textContent = "";
    } else {
      tile.textContent = number;
    }
    tile.addEventListener("click", () => moveTile(index));
    tiles.push(tile);
    gridElement.appendChild(tile);
  });
}

// Shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Move tile if it's adjacent to the empty spot
function moveTile(index) {
  const emptyIndex = tiles.findIndex(tile => tile.classList.contains("empty"));
  const adjacentIndices = [
    emptyIndex - 1, emptyIndex + 1, emptyIndex - gridSize, emptyIndex + gridSize
  ];
  
  if (adjacentIndices.includes(index)) {
    // Swap tiles
    [tiles[index].textContent, tiles[emptyIndex].textContent] = 
      [tiles[emptyIndex].textContent, tiles[index].textContent];
    
    tiles[index].classList.toggle("empty");
    tiles[emptyIndex].classList.toggle("empty");
  }
  
  checkWin();
}

// Check if the player has won
function checkWin() {
  const isSorted = tiles.slice(0, -1).every((tile, i) => {
    return tile.textContent == i + 1;
  });
  
  if (isSorted) {
    setTimeout(() => alert("Congratulations! You solved the puzzle!"), 100);
  }
}

// Event listeners
resetButton.addEventListener("click", initGame);

// Initialize the game on page load
initGame();
