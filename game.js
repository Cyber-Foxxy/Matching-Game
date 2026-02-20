document.addEventListener("DOMContentLoaded", function () {
  // --- DOM Elements ---
  const board = document.getElementById("gameBoard");
  const winMessage = document.getElementById("winMessage");
  const resetBtn = document.getElementById("resetBtn");
  const moveDisplay = document.getElementById("moveCount");

  // --- Game Images ---
  // The back of the card
  const blankImage = "https://via.placeholder.com/120/ffd166/000000?text=🐾";
  
// --- Game Images (Local Files) ---
  const animalPool = [
    "images/dog.jpg",
    "images/cat.jpg",
    "images/crow.jpg",
    "images/rabbit.jpg",
    "images/raccoon.jpg",
    "images/duck.jpg",
    "images/goat.jpg",
    "images/deer.jpg",
    "images/mouse.jpg",
    "images/fox.jpg"
  ];

  // --- Game State Variables ---
  let firstTile = null;
  let secondTile = null;
  let lockBoard = false;
  let matchesFound = 0;
  let moves = 0;

  // --- The Shuffle Function ---
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // --- Start / Reset Game ---
  function startGame() {
    // 1. Reset Board and Stats
    board.innerHTML = ""; 
    winMessage.style.display = "none";
    matchesFound = 0;
    moves = 0;
    if (moveDisplay) moveDisplay.textContent = moves; 
    [firstTile, secondTile] = [null, null];
    lockBoard = false;

    // 2. Prepare and Shuffle Images (Duplicate the 6 animals to make 12 cards)
    let gameImages = shuffle([...animalPool, ...animalPool]);

    // 3. Create Tiles
    gameImages.forEach((imgSrc) => {
      let tile = document.createElement("img");
      tile.src = blankImage;
      tile.dataset.imageSrc = imgSrc; // Store the real image URL here secretly
      tile.classList.add("tile");
      tile.addEventListener("click", handleFlip);
      board.appendChild(tile);
    });
  }

  // --- Handle Card Clicks ---
  function handleFlip() {
    // Prevent clicking if the board is locked, if we clicked the same card twice, or if it's already matched
    if (lockBoard || this === firstTile || this.classList.contains("matched")) return;

    // Reveal the card
    this.src = this.dataset.imageSrc;

    if (!firstTile) {
      // First card clicked
      firstTile = this;
    } else {
      // Second card clicked
      secondTile = this;
      moves++;
      if (moveDisplay) moveDisplay.textContent = moves;
      checkMatch();
    }
  }

  // --- Check for Matches ---
  function checkMatch() {
    const isMatch = firstTile.dataset.imageSrc === secondTile.dataset.imageSrc;

    if (isMatch) {
      // It's a match!
      firstTile.classList.add("matched");
      secondTile.classList.add("matched");
      matchesFound++;
      
      // Check for win condition
      if (matchesFound === animalPool.length) {
        winMessage.style.display = "block";
      }
      resetTurn();
    } else {
      // Not a match, wait and flip back
      lockBoard = true;
      setTimeout(() => {
        firstTile.src = blankImage;
        secondTile.src = blankImage;
        resetTurn();
      }, 800);
    }
  }

  // --- Reset Turn Variables ---
  function resetTurn() {
    [firstTile, secondTile] = [null, null];
    lockBoard = false;
  }

  // --- Event Listeners ---
  if (resetBtn) resetBtn.addEventListener("click", startGame);

  // --- Initialize Game ---
  startGame();
});
