document.addEventListener("DOMContentLoaded", () => {
  const animals = [
    "images/crow.jpg",
    "images/deer.jpg",
    "images/duck.jpg",
    "images/fox.jpg",
    "images/goat.jpg",
    "images/rabbit.jpg"
  ];

  const backImg = "https://via.placeholder.com/120/ffd166/000000?text=🐾";

  const board = document.getElementById("gameBoard");
  const attemptsText = document.getElementById("attempts");
  const playerName = document.getElementById("playerName");

  let flippedCards = [];
  let attempts = 0;
  let matchedPairs = 0;

  // Load player
  const playerData = JSON.parse(localStorage.getItem("playerData"));
  if (!playerData) {
    window.location.href = "index.html";
    return;
  }
  playerName.textContent = playerData.firstName;

  // Build deck
  const deck = [...animals, ...animals].sort(() => Math.random() - 0.5);

  deck.forEach(animal => {
    const card = document.createElement("img");
    card.src = backImg;
    card.dataset.animal = animal;
    card.dataset.flipped = "false";

    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });

  function flipCard(card) {
    if (flippedCards.length === 2) return;
    if (card.dataset.flipped === "true") return;

    card.src = card.dataset.animal;
    card.dataset.flipped = "true";
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      attempts++;
      attemptsText.textContent = attempts;
      setTimeout(checkMatch, 800);
    }
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.animal === card2.dataset.animal) {
      matchedPairs++;
      if (matchedPairs === animals.length) endGame();
    } else {
      card1.src = backImg;
      card2.src = backImg;
      card1.dataset.flipped = "false";
      card2.dataset.flipped = "false";
    }

    flippedCards = [];
  }

  function endGame() {
    playerData.attempts = attempts;
    localStorage.setItem("playerData", JSON.stringify(playerData));
    setTimeout(() => window.location.href = "results.html", 600);
  }
});
