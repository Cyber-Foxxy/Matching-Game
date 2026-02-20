document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("gameBoard");
  const winMessage = document.getElementById("winMessage");
  const resetBtn = document.getElementById("resetBtn");

  const blankImage = "https://via.placeholder.com/120/ffd166/000000?text=🐾";
  
  let actualImages = [
    "https://static.vecteezy.com/system/resources/previews/012/658/172/original/cute-puppy-dog-cartoon-illustration-vector.jpg",
    "https://static.vecteezy.com/system/resources/previews/012/658/172/original/cute-puppy-dog-cartoon-illustration-vector.jpg",
    "https://img.freepik.com/premium-vector/cute-cat-clip-art-vector-illustration-sweet-kitten-cartoon-style_1020331-19732.jpg?w=1380",
    "https://img.freepik.com/premium-vector/cute-cat-clip-art-vector-illustration-sweet-kitten-cartoon-style_1020331-19732.jpg?w=1380",
    "https://static.vecteezy.com/system/resources/previews/054/870/558/non_2x/cute-bird-clip-art-designs-vector.jpg",
    "https://static.vecteezy.com/system/resources/previews/054/870/558/non_2x/cute-bird-clip-art-designs-vector.jpg",
    "https://static.vecteezy.com/system/resources/previews/043/324/194/non_2x/cute-rabbit-clipart-vector.jpg",
    "https://static.vecteezy.com/system/resources/previews/043/324/194/non_2x/cute-rabbit-clipart-vector.jpg",
    "https://static.vecteezy.com/system/resources/previews/024/044/198/non_2x/raccoon-clipart-transparent-background-free-png.png",
    "https://static.vecteezy.com/system/resources/previews/024/044/198/non_2x/raccoon-clipart-transparent-background-free-png.png",
    "https://i.etsystatic.com/35554607/r/il/751bf5/4695807502/il_fullxfull.4695807502_kpiz.jpg",
    "https://i.etsystatic.com/35554607/r/il/751bf5/4695807502/il_fullxfull.4695807502_kpiz.jpg"
  ];

  let firstTile = null;
  let secondTile = null;
  let lockBoard = false;
  let matchesFound = 0;

  function startGame() {
    // 1. Reset variables and UI
    board.innerHTML = ""; 
    winMessage.style.display = "none";
    matchesFound = 0;
    [firstTile, secondTile] = [null, null];
    lockBoard = false;

    // 2. Shuffle actual images
    actualImages.sort(() => 0.5 - Math.random());

    // 3. Create tiles
    for (let i = 0; i < actualImages.length; i++) {
      let tile = document.createElement("img");
      tile.src = blankImage;
      tile.dataset.index = i;
      tile.classList.add("tile"); // Better to use a class for CSS
      tile.addEventListener("click", handleFlip);
      board.appendChild(tile);
    }
  }

  function handleFlip() {
    if (lockBoard || this === firstTile || this.classList.contains("matched")) return;

    this.src = actualImages[this.dataset.index];

    if (!firstTile) {
      firstTile = this;
    } else {
      secondTile = this;
      checkMatch();
    }
  }

  function checkMatch() {
    if (firstTile.src === secondTile.src) {
      firstTile.classList.add("matched");
      secondTile.classList.add("matched");
      matchesFound++;
      if (matchesFound === actualImages.length / 2) {
        winMessage.style.display = "block";
      }
      resetTurn();
    } else {
      lockBoard = true;
      setTimeout(() => {
        firstTile.src = blankImage;
        secondTile.src = blankImage;
        resetTurn();
      }, 800);
    }
  }

  function resetTurn() {
    [firstTile, secondTile] = [null, null];
    lockBoard = false;
  }

  // Event Listeners
  resetBtn.addEventListener("click", startGame);
  
  // Initial Start
  startGame();
});
