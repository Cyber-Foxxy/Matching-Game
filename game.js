document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("gameBoard");
  const attemptDisplay = document.getElementById("attemptCount");
  const playerNameEl = document.getElementById("playerName");

  let playerData = JSON.parse(localStorage.getItem("playerData"));
  if (!playerData) {
    window.location.href = "index.html";
  }
  playerNameEl.textContent = playerData.firstName;

  let attempts = 0;
  let flippedCards = [];
  let matchedPairs = 0;

  // Unique images
  const images = [
    "images/crow.jpg",
    "images/crow.jpg",
    "images/deer.jpg",
    "images/deer.jpg",
    "images/duck.jpg",
    "images/duck.jpg",
    "images/fox.jpg",
    "images/fox.jpg",
    "images/goat.jpg",
    "images/goat.jpg",
    "images/mouse.jpg",
    "images/mouse.jpg",
    "images/puppy.jpg",
    "images/puppy.jpg",
    "images/rabbit.jpg",
    "images/rabbit.jpg",
    "images/raccoon.jpg",
     "images/raccoon.jpg"
  // Create deck: exactly 2 of each image → 1 match
  const deck = [...images, ...images].sort(() => Math.random() - 0.5);

  // Build board
  deck.forEach(src => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = src;
    img.style.display = "none";

    card.appendChild(img);
    board.appendChild(card);

    card.addEventListener("click", () => flipCard(img));
  });

  function flipCard(card) {
    if (flippedCards.length === 2 || card.style.display === "block") return;

    card.style.display = "block";
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      attempts++;
      attemptDisplay.textContent = attempts;

      if (flippedCards[0].src === flippedCards[1].src) {
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === images.length) {
          playerData.attempts = attempts;
          localStorage.setItem("playerData", JSON.stringify(playerData));
          setTimeout(() => window.location.href = "results.html", 800);
        }
      } else {
        setTimeout(() => {
          flippedCards[0].style.display = "none";
          flippedCards[1].style.display = "none";
          flippedCards = [];
        }, 1000);
      }
    }
  }
});
