document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ game.js loaded");

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
  ];

  // Two of each image
  const cards = [...images, ...images];

  // Shuffle cards
  cards.sort(() => Math.random() - 0.5);

  const board = document.getElementById("gameBoard");

  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;

  cards.forEach(imagePath => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = imagePath;
    img.style.display = "none";

    card.appendChild(img);
    board.appendChild(card);

    card.addEventListener("click", () => {
      if (lockBoard) return;
      if (img.style.display === "block") return;

      img.style.display = "block";

      if (!firstCard) {
        firstCard = img;
        return;
      }

      secondCard = img;
      lockBoard = true;

      if (firstCard.src === secondCard.src) {
        resetTurn();
      } else {
        setTimeout(() => {
          firstCard.style.display = "none";
          secondCard.style.display = "none";
          resetTurn();
        }, 800);
      }
    });
  });

  function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }
});
