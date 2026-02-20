document.addEventListener("DOMContentLoaded", function () {
  // --- DOM Elements ---
  const board = document.getElementById("gameBoard");
  const winMessage = document.getElementById("winMessage");
  const resetBtn = document.getElementById("resetBtn");
  const moveDisplay = document.getElementById("moveCount");

  // --- Game Images ---
  const blankImage = "https://via.placeholder.com/120/ffd166/000000?text=🐾";

  // 1. Define the base pool
  const animalPool = [
    "images/dog.jpg", "images/cat.jpg", "images/crow.jpg",
    "images/rabbit.jpg", "images/raccoon.jpg", "images/duck.jpg",
    "images/goat.jpg", "images/deer.jpg", "images/mouse.jpg", "images/fox.jpg"
  ];

  // 2. Duplicate the pool so every animal has a pair (Total 20 cards)
  let gameGrid = [...animalPool, ...animalPool];

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
  }

  // --- Initialize Game ---
  function initGame() {
    board.innerHTML = ""; // Clear existing board
    shuffle(gameGrid);
    matchesFound = 0;
    moves = 0;
    moveDisplay.innerText = moves;
    winMessage.style.display = "none";

    gameGrid.forEach((imagePath) => {
      const card = document.createElement("div");
      card.classList.add("card");
      // Store the actual animal image in a data attribute
      card.dataset.icon = imagePath; 
      
      const img = document.createElement("img");
      img.src = blankImage; // Show the back of the card initially
      card.appendChild(img);

      card.addEventListener("click", flipCard);
      board.appendChild(card);
    });
  }

  function flipCard() {
    if (lockBoard || this === firstTile) return;

    const img = this.querySelector("img");
    img.src = this.dataset.icon; // Reveal the animal

    if (!firstTile) {
      firstTile = this;
      return;
    }

    secondTile = this;
    moves++;
    moveDisplay.innerText = moves;
    checkMatch();
  }

  function checkMatch() {
    let isMatch = firstTile.dataset.icon === secondTile.dataset.icon;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    matchesFound++;
    resetTurn();
    if (matchesFound === animalPool.length) {
      winMessage.style.display = "block";
    }
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstTile.querySelector("img").src = blankImage;
      secondTile.querySelector("img").src = blankImage;
      resetTurn();
    }, 1000);
  }

  function resetTurn() {
    [firstTile, secondTile, lockBoard] = [null, null, false];
  }

  resetBtn.addEventListener("click", initGame);

  // Start the game for the first time
  initGame();
});
