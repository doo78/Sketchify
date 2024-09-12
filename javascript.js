
const container = document.querySelector(".container");
let isMouseDown = false;
let currentTool = "draw";
let brushColour = "black";
let currentSize = 16;
let nextRainbowColour = 0;

// Checks if the user is holding the mouse down
document.body.onmousedown = (e) => {
    isMouseDown = true;
    e.preventDefault(); // Prevents an error when dragging an already black square
}

// Checks if the user has released the mouse
document.addEventListener('mouseup', function() {
    isMouseDown = false;  
});

function clearGrid(){
    while (container.hasChildNodes()){
        container.removeChild(container.lastChild);
    }
}

function createGrid(size){

    function createRow(){

        const box = document.createElement("div");
        box.classList.add("box");

        const boxRow = document.createElement("div");
        boxRow.setAttribute("id", "boxRow");
        
        // Calculates the dimensions of each box based on the height of the container and how many pixels
        const containerHeight = container.offsetHeight;
        let heightWidth = Math.floor((parseInt(containerHeight)/size));

        // Adds a box to the row
        for (let i = 0; i < size; i++){
            
            const boxToAdd = document.createElement("div");
            boxToAdd.classList.add("box")

            boxToAdd.style.height = heightWidth + "px";
            boxToAdd.style.width = heightWidth + "px";


            boxRow.appendChild(boxToAdd);
        }

        return boxRow;
    }

    // Creates a row for as many columns there are
    for (let i = 0; i < size; i++){
        
        container.appendChild(createRow());
    }

    initalizeBox();
}




createGrid(32);

function generateRandomColour(){

    let value1 = Math.random()*255;
    let value2 = Math.random()*255;
    let value3 = Math.random()*255;
    
    let randomColour = ("rgb(" + value1 + "," + value2 + "," + value3 + ")")
    
    return randomColour;
}

function generateRainbowColour(){

    if (nextRainbowColour == 13){
        nextRainbowColour = 0;
    }
    
    const rainbowColours = [
        "#FF0000", // Red
        "#FF3300", // Red-Orange
        "#FF6600", // Orange
        "#FF9900", // Orange-Yellow
        "#FFCC00", // Yellow
        "#FFFF00", // Yellow
        "#CCFF00", // Yellow-Green
        "#00FF00", // Green
        "#00CCFF", // Green-Blue
        "#0000FF", // Blue
        "#3300FF", // Blue-Indigo
        "#6600CC", // Indigo
        "#9900CC", // Indigo-Violet
        "#CC00CC"  // Violet
      ];

    let rainbowColour = rainbowColours[nextRainbowColour];
    nextRainbowColour = nextRainbowColour + 1;

    return rainbowColour;
}

function fill(box){

    /*
    const containerArray = Array.from(container.children);

    let surroundingBoxes;


    console.log(containerArray[0].length);

    for (let row = 0; row < containerArray.length; row++){
        console.log("row", row);
        for (let col = 0; col < containerArray[row].length; col++){
            console.log("col", col);
            if (box === containerArray[row][col]){
                surroundingBoxes = [containerArray[row-1][col-1], containerArray[row-1][col], 
                containerArray[row-1][col+1], containerArray[row][col-1], containerArray[row][col+1], 
                containerArray[row+1][col-1], containerArray[row+1][col], containerArray[row+1][col+1]];
                break;
            }
        }
    }

    surroundingBoxes.forEach((box) => {

        if (box != undefined){

            if (box.style.backgroundColor != brushColour){

                box.style.backgroundColor = brushColour;
            }
        }
    });
    */
    const containerArray = Array.from(container.children);
    let boxRow, boxIndex;
    for (let i = 0; i < containerArray.length; i++) {
      const row = containerArray[i];
      if (row.contains(box)) {
        boxRow = row;
        boxIndex = Array.from(row.children).indexOf(box);
        break;
      }
    }
    
    const surroundingBoxes = [];
    if (boxRow.previousElementSibling) {
      // Get boxes from previous row
      const prevRow = boxRow.previousElementSibling;
      surroundingBoxes.push(prevRow.children[boxIndex - 1]);
      surroundingBoxes.push(prevRow.children[boxIndex]);
      surroundingBoxes.push(prevRow.children[boxIndex + 1]);
    }
    
    // Get boxes from current row
    surroundingBoxes.push(boxRow.children[boxIndex - 1]);
    surroundingBoxes.push(boxRow.children[boxIndex + 1]);
    
    if (boxRow.nextElementSibling) {
      // Get boxes from next row
      const nextRow = boxRow.nextElementSibling;
      surroundingBoxes.push(nextRow.children[boxIndex - 1]);
      surroundingBoxes.push(nextRow.children[boxIndex]);
      surroundingBoxes.push(nextRow.children[boxIndex + 1]);
    }

    const validBoxes = [1, 3, 4, 6];

    for (let i = 0; i < surroundingBoxes.length; i++) {


        if (!validBoxes.includes(i)){
            continue;
        }

        let boxToFill = surroundingBoxes[i];

        if (boxToFill != undefined){

            if (boxToFill.style.backgroundColor != brushColour){

                boxToFill.style.backgroundColor = brushColour;

                fill(boxToFill);
            }
        }
        
    };

}

// Adds event listeners to the boxes
function initalizeBox(){

    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {

        box.addEventListener("mouseenter", () => {

            // Adds a border to the box the cursor hovers over
            box.style.border = "0.5px solid black";

            // Changes the colour if the user is holding the mouse down
            if (isMouseDown){

                if (currentTool === "draw"){
                    box.style.backgroundColor = brushColour;    
                }

                else if (currentTool == "erase"){
                    box.style.backgroundColor = "white";
                }

                else if (currentTool == "random"){
                    box.style.backgroundColor = generateRandomColour();
                }
                
                else if (currentTool == "rainbow"){
                    box.style.backgroundColor = generateRainbowColour();
                }

            }

        });

        // Resets the border when the mouse leaves
        box.addEventListener("mouseleave", () => {
            box.style.border = "none";
        });

        // Changes the colour of the box when it is clicked instead of dragged past
        box.addEventListener("click", () => {
            box.style.backgroundColor = brushColour;

            if (currentTool == "fill"){
                fill(box);
            }
        });
    });
}

// Buttons for changing the pixel size

const sizeBtns = document.querySelectorAll(".sizeBtn");

sizeBtns.forEach((sizeBtn) => {

    sizeBtn.addEventListener("click", () => {

        clearGrid();

        let size = sizeBtn.textContent.slice(0,2);

        createGrid(size);

        currentSize = size;

    });
});

// Colour palette buttons

const colourBtns = document.querySelectorAll(".colour");

const colourBtnsArray = Array.from(colourBtns);

const colours = [
    "#FF0000", // red
    "#00FF00", // green
    "#0000FF", // blue
    "#FFFF00", // yellow
    "#FF00FF", // magenta
    "#00FFFF", // cyan
    "#FFA500", // orange
    "#800080", // purple
    "#FFFFFF", // white
    "#000000", // black
    "#808080", // gray
    "#FF4500", // orange red
    "#FFD700", // gold
    "#008080", // teal
    "#ADD8E6", // light blue
    "#8B008B"  // dark purple
  ];

colourBtns.forEach((colourBtn) => {

    console.log("hi");
    colourBtn.style.backgroundColor = colours[colourBtnsArray.indexOf(colourBtn)];

    colourBtn.addEventListener("click", () => {

        brushColour = colourBtn.style.backgroundColor;
        /*
        brushColour = getComputedStyle(colourBtn).backgroundColor;
        */
    });
});

// Hex Picker button

const confirmBtn = document.querySelector("#confirm-btn");
const hexPicker = document.querySelector("#hex-colour-picker");

confirmBtn.addEventListener("click", () => {

    brushColour = hexPicker.value;
});

// Toolbar

const toolBtns = document.querySelectorAll(".tool-btn");

toolBtns.forEach((toolBtn) => {

    toolBtn.addEventListener("click", () => {

        currentTool = toolBtn.getAttribute("id");
        console.log(currentTool);
    });

    if (toolBtn.getAttribute("id") === "clear"){
        
        toolBtn.addEventListener("click", () => {
            
            clearGrid();

            createGrid(currentSize);
        });
    }

})

