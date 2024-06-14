console.log("Javascript is connected");

//variables
const theButtons = document.querySelectorAll("#buttonHolder img");
const puzzleBoard = document.querySelector(".puzzle-board");
const puzzlePieces = document.querySelectorAll(".puzzle-pieces img");
const dropZones = document.querySelectorAll(".drop-zone");
let draggedPiece;

//functions
function changeBGImage(event) {
    //console.log("changeBGimage called");
    //Method 1
    //console.log(this.id);
    //background-image: url('../images/backGround0.jpg');
    // puzzleBoard.style.backgroundImage = `url('./images/backGround${this.id}.jpg')`;

    //Method 2
    console.log(event.currentTarget.id);
    puzzleBoard.style.backgroundImage = `url('./images/backGround${event.currentTarget.id}.jpg')`;
}

function handleStartDrag() {
    console.log(`started dragging ${this}`);
    draggedPiece = this;
}

function handleOver(e) {
    e.preventDefault();
    console.log("Dragged Over")
}

function handleDrop() {
    this.appendChild(draggedPiece);
}

//eventListeners
theButtons.forEach(button => button.addEventListener("click", changeBGImage));

puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));

dropZones.forEach(zone => zone.addEventListener("dragover", handleOver));

dropZones.forEach(zone => zone.addEventListener("drop", handleDrop));