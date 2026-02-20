// ----- BLANK IMAGE (CARD BACK) -----
const blankImage =
  "https://via.placeholder.com/120/ffd166/000000?text=🐾";

// ----- ACTUAL ANIMAL IMAGES (6 PAIRS = 12 TOTAL) -----
let actualImages = [
  // Dog
  "https://static.vecteezy.com/system/resources/previews/012/658/172/original/cute-puppy-dog-cartoon-illustration-vector.jpg",
  "https://static.vecteezy.com/system/resources/previews/012/658/172/original/cute-puppy-dog-cartoon-illustration-vector.jpg",

  // Cat
  "https://img.freepik.com/premium-vector/cute-cat-clip-art-vector-illustration-sweet-kitten-cartoon-style_1020331-19732.jpg?w=1380",
  "https://img.freepik.com/premium-vector/cute-cat-clip-art-vector-illustration-sweet-kitten-cartoon-style_1020331-19732.jpg?w=1380",

  // Bird
  "https://static.vecteezy.com/system/resources/previews/054/870/558/non_2x/cute-bird-clip-art-designs-vector.jpg",
  "https://static.vecteezy.com/system/resources/previews/054/870/558/non_2x/cute-bird-clip-art-designs-vector.jpg",

  // Rabbit
  "https://static.vecteezy.com/system/resources/previews/043/324/194/non_2x/cute-rabbit-clipart-vector.jpg",
  "https://static.vecteezy.com/system/resources/previews/043/324/194/non_2x/cute-rabbit-clipart-vector.jpg",

  // Raccoon
  "https://static.vecteezy.com/system/resources/previews/024/044/198/non_2x/raccoon-clipart-transparent-background-free-png.png",
  "https://static.vecteezy.com/system/resources/previews/024/044/198/non_2x/raccoon-clipart-transparent-background-free-png.png",

  // Fox
  "https://i.etsystatic.com/35554607/r/il/751bf5/4695807502/il_fullxfull.4695807502_kpiz.jpg",
  "https://i.etsystatic.com/35554607/r/il/751bf5/4695807502/il_fullxfull.4695807502_kpiz.jpg"
];

// ----- CREATE BLANK IMAGE ARRAY -----
let blankImages = [];
for (let i = 0; i < 12; i++) {
  blankImages.push(blankImage);
}

// ----- SHUFFLE ACTUAL IMAGES -----
for (let i = actualImages.length - 1; i > 0; i--) {
  let randomIndex = Math.floor(Math.random() * (i + 1));
  let temp = actualImages[i];
  actualImages[i] = actualImages[randomIndex];
  actualImages[randomIndex] = temp;
}

// ----- DISPLAY THE BOARD -----
let board = document.getElementById("gameBoard");

for (let i = 0; i < blankImages.length; i++) {
  let tile = document.createElement("img");
  tile.src = blankImages[i];
  tile.id = i;
  tile.addEventListener("click", revealImage);
  board.appendChild(tile);
}

// ----- REVEAL IMAGE ON CLICK -----
function revealImage() {
  let index = this.id;
  this.src = actualImages[index];
}
