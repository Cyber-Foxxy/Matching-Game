document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");

    // 1. List your images exactly as they appear in your /images folder
    const animalPool = [
        "images/crow.jpg", "images/deer.jpg", "images/duck.jpg", 
        "images/fox.jpg", "images/goat.jpg", "images/mouse.jpg", 
        "images/puppy.jpg", "images/rabbit.jpg", "images/raccoon.jpg"
    ];

    // 2. Create pairs (Matching games need 2 of each!)
    let gameGrid = [...animalPool, ...animalPool];

    // 3. Shuffle the array
    gameGrid.sort(() => 0.5 - Math.random());

    // 4. Generate the HTML for the board
    function createBoard() {
        gameGrid.forEach((item) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.name = item;

            // Create the image element
            const img = document.createElement("img");
            img.src = item; 
            img.style.display = "none"; // Hide initially for the game logic

            card.appendChild(img);
            gameBoard.appendChild(card);

            // Add click event to flip
            card.addEventListener("click", () => {
                img.style.display = "block";
                // Add your matching logic here
            });
        });
    }

    createBoard();
});
});
