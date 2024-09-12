
const container = document.querySelector(".container");
let isMouseDown = false;

// Checks if the user is holding the mouse down
document.body.onmousedown = (e) => {
    isMouseDown = true;
    e.preventDefault(); // Prevents an error when dragging an already black square
}

// Checks if the user has released the mouse
document.addEventListener('mouseup', function() {
    isMouseDown = false;  
});

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

// Adds event listeners to the boxes
function initalizeBox(){

    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {

        box.addEventListener("mouseenter", () => {

            // Adds a border to the box the cursor hovers over
            box.style.border = "0.5px solid black";

            // Changes the colour if the user is holding the mouse down
            if (isMouseDown){
                box.style.backgroundColor = "black";
            }

        });

        // Resets the border when the mouse leaves
        box.addEventListener("mouseleave", () => {
            box.style.border = "none";
        });

        // Changes the colour of the box when it is clicked instead of dragged past
        box.addEventListener("click", () => {
            box.style.backgroundColor = "black";
        });
    });
}

// Buttons for changing the pixel size

const sizeBtns = document.querySelectorAll(".sizeBtn");

sizeBtns.forEach((sizeBtn) => {

    sizeBtn.addEventListener("click", () => {

        while (container.hasChildNodes()){
            container.removeChild(container.lastChild);
        }

        let size = sizeBtn.textContent.slice(0,2);

        createGrid(size);
        
    });
});