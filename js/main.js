console.log("I am connected");

//Variables
const theButtons = document.querySelectorAll("#buttonHolder img");
const puzzleBoard = document.querySelector(".puzzle-board");
const puzzlePieces = document.querySelectorAll(".puzzle-pieces img");
const dropZones = document.querySelectorAll(".drop-zone");
const piecesContainer = document.querySelector(".puzzle-pieces");

//This will handle all dragged items
let draggedPieces;

//This is kind a advance since I am using a array. But creating a variable to map each background ID to
//an array of image makes more easier to solve this bugs.
const puzzleImages = {
  0: ["topLeft0.jpg", "topRight0.jpg", "bottomLeft0.jpg", "bottomRight0.jpg"],
  1: ["topLeft1.jpg", "topRight1.jpg", "bottomLeft1.jpg", "bottomRight1.jpg"],
  2: ["topLeft2.jpg", "topRight2.jpg", "bottomLeft2.jpg", "bottomRight2.jpg"],
  3: ["topLeft3.jpg", "topRight3.jpg", "bottomLeft3.jpg", "bottomRight3.jpg"],
};

//Functions
function changeBGI(e) {
  //Method 1
  console.log(e.currentTarget.id);
  //Using this method, I can extract the background ID from the clicked button
  const id = e.currentTarget.id;
  puzzleBoard.style.backgroundImage = `url("./images/backGround${this.id}.jpg")`;
  //Method 2
  // puzzleBoard.style.backgroundImage = `url("./images/backGround${e.currentTarget.id}.jpg")`;

  //Then call the reset function with the background ID.
  refreshPuzzle(id);
}

//This is the function where I can resets the drop zone and then updates each puzzle piece image.
//based on the provided background IDm using the variable puzzleImages mapping.
//Then re-add the puzzle pieces to the pieces container.
function refreshPuzzle(id) {
  dropZones.forEach((zone) => {
    if (zone.firstChild) {
      zone.firstChild.remove();
    }
    zone.classList.remove("puzzle-image");
  });
  //This will loop and check all images that has been clicked and display the image correspond to
  //the background ID that is triggered.
  //The forEach method passes the current element "piece" and its index to the callback function.
  //This allows us to use the index to select the correct image from our puzzleImage mapping.
  puzzlePieces.forEach((piece, index) => {
    piece.setAttribute("draggable", "true");
    //In this method, the index here is used to access the appropriate image filename from the array
    //corresponding to the selected background ID.
    piece.src = `../images/${puzzleImages[id][index]}`;
    piecesContainer.appendChild(piece);
  });
}

function draggedStart() {
  console.log("start dragging");
  draggedPieces = this;
}

//Added an if statement here allows us to check and prevent from overlapping drop of pieces.
function draggedEnter(e) {
  if (!e.target.classList.contains("puzzle-image")) {
    e.preventDefault();
  }
}
//Added an if statement here allows us to check and prevent from overlapping drop of pieces.
function draggedOver(e) {
  if (!e.target.classList.contains("puzzle-image")) {
    e.preventDefault();
    console.log("dragged over");
  }
}
//Added an attribute here allows us to disable from dragging the pieces once it is been dropped.
function droppedMe(e) {
  this.appendChild(draggedPieces);
  e.target.classList.add("puzzle-image");
  draggedPieces.setAttribute("draggable", "false");
}

//AddEventsListener
theButtons.forEach((button) => button.addEventListener("click", changeBGI));
puzzlePieces.forEach((piece) =>
  piece.addEventListener("dragstart", draggedStart)
);
puzzlePieces.forEach((piece) =>
  piece.addEventListener("dragenter", draggedEnter)
);
dropZones.forEach((Zone) => Zone.addEventListener("dragover", draggedOver));
dropZones.forEach((dropMe) => dropMe.addEventListener("drop", droppedMe));
