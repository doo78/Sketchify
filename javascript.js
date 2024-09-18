
// Variables to track the state of certain aspects of the program
let isMouseDown = false;
let currentTool = "draw";
let brushColour = "black";
let currentSize = 16;
let nextRainbowColour = 0;
let isGridLines = false;
let brushSize = "thin";
let galleryImages = [];
let validTitle = false;
let currentTitle = "";
let isMouseIn = false;

// Elements queried from the HTML file
const container = document.querySelector(".container");
const gallery = document.querySelector('#gallery');
const titleConfirmBtn = document.querySelector('#title-confirm-btn');
const saveBtn = document.querySelector('#save-btn');
const sizeBtns = document.querySelectorAll(".sizeBtn");
const colourBtns = document.querySelectorAll(".colour");
const confirmBtn = document.querySelector("#confirm-btn");
const hexPicker = document.querySelector("#hex-colour-picker");
const currentColour = document.querySelector("#current-colour");
const toolBtns = document.querySelectorAll(".tool-btn");
const miscBtns = document.querySelectorAll(".misc-btn");
const downloadGalleryImageBtn = document.querySelector("#download-all-images");


// Tracks the mouse activity, whether it is held down and if it's in the container
document.onmousedown = (e) => {
    // Prevents this from conflicting with when you click the title text box
    if (e.target.tagName !== 'INPUT' || e.target.type !== 'text'){
        isMouseDown = true;
        e.preventDefault(); // Prevents an error when dragging an already coloured square
    }
}

document.addEventListener('mouseup', function() {
    isMouseDown = false;  

});

container.onmouseleave = (e) => {
    isMouseIn = false;
}

container.onmouseenter = (e) => {
    isMouseIn = true;

}

// Removes the specified image from the gallery
function removeImage(newContainer){

    // Removes the image from the galleryImages array
    let index = galleryImages.indexOf(newContainer);
    galleryImages.splice(index, 1);

    const imageContainers = document.querySelectorAll('.image-container');

    let imageContainer;

    imageContainers.forEach((image) => {
        
        // Retrieves the specific container from the gallery
        if (image.getAttribute('id') === newContainer.getAttribute('id')){
            imageContainer = image;
    }
    });

    gallery.removeChild(imageContainer);

    localStorage.removeItem(newContainer.getAttribute('id'));
}

// Clears the gallery
function removeAllImages(){

    galleryImages = [];
    localStorage.clear();

    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
      }
}

// Returns the image with the specified title
function returnTitle(title){
    
    let answer;

    galleryImages.forEach((image) => {
        if (image.getAttribute('id') === title){
            answer = image;
        }
    });

    return answer;    
}

// Checks if the title is already in the gallery
function titleIsUsed(title){

    let used = false;

    for (let i = 0; localStorage.length > i; i++){

        if (localStorage.key(i) === title){
            used = true;
        }
    }

    return used;
}

// Checks if the title is valid, and carries out the appropriate actions
titleConfirmBtn.addEventListener('click', () => {

    const errorMessage = document.querySelector('#error-message');
    const title = document.querySelector('#title');
    const titleText = title.value;

    if (titleText ==="hi"){
        errorMessage.textContent = "Title is already used"
        titleConfirmBtn.style.backgroundColor = "red"
        validTitle = false;
    }

    else if (titleText === ""){
        errorMessage.textContent = "Title cannot be empty"
        titleConfirmBtn.style.backgroundColor = "red"
        validTitle = false;
    }

    else if (titleIsUsed(titleText)){
        errorMessage.textContent = "Title is already used"
        titleConfirmBtn.style.backgroundColor = "red"
        validTitle = false;
    }

    else{
        errorMessage.textContent = ""
        titleConfirmBtn.style.backgroundColor = "green"
        validTitle = true;
        currentTitle = titleText;
    }
});


const downloadBtn = document.getElementById('download-btn');

downloadBtn.addEventListener('click', () => {

    if (validTitle){
        // Creates a download link using the html2canvas library
        html2canvas(container).then(canvas => {
            const pngUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download =  currentTitle +'.png'; // Names the download
        
            downloadLink.click();
        });
    }
    else{
        // Displays an error message if the title is not valid
        const saveMessage = document.querySelector('#save-message');

        saveMessage.textContent = "Please enter a valid title"
        saveMessage.style.color = "red"

        // Waits 3 seconds before clearing the message
        setTimeout(function() {
            saveMessage.textContent = "";
          }, 3000);

    }
});

// Adds the image to the gallery
function addToGallery(titleText, image){

    // Creates divs for the image and the buttons
    let imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    let imageBtnContainer = document.createElement('div');
    imageBtnContainer.classList.add('image-btn-container');

    // Creates the image
    let imageElement = document.createElement('img');
    imageElement.classList.add('saved-image');
    imageElement.src = image;

    // Creates the title
    let titleContainer = document.createElement('div');
    titleContainer.classList.add('title-on-image');
    titleContainer.textContent = titleText;
    
    // Creates the buttons for the images
    let downloadGalleryImageBtn = document.createElement('button');
    downloadGalleryImageBtn.classList.add("download-gallery-image-btn");
    
    const downloadGalleryImg = document.createElement('img');
    downloadGalleryImg.setAttribute('src', "assets/download.png");

    let removeBtn = document.createElement('button');
    removeBtn.classList.add("remove-btn");

    const removeImg = document.createElement('img');
    removeImg.setAttribute('src', "assets/clear.png");

    // Appends all the elements into their respective divs
    removeBtn.appendChild(removeImg);
    downloadGalleryImageBtn.appendChild(downloadGalleryImg);

    imageBtnContainer.appendChild(removeBtn);
    imageBtnContainer.appendChild(downloadGalleryImageBtn);
    
    imageContainer.appendChild(titleContainer);
    imageContainer.appendChild(imageElement);
    imageContainer.appendChild(imageBtnContainer);

    imageContainer.classList.add('image-container');
    imageContainer.setAttribute('id', titleText);

    document.getElementById('gallery').appendChild(imageContainer);

    // Saves the current state of the canvas to galleryImages
    let newContainer = container.cloneNode(true);
    newContainer.setAttribute('id', titleText);
    galleryImages.push(newContainer);                

    removeBtn.addEventListener('click', () => {
        removeImage(newContainer);
    });

    downloadGalleryImageBtn.addEventListener('click', () => {
        const pngUrl = image
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download =  titleText + '.png';
    
        downloadLink.click();
    })

    saveImageToLocalStorage(image, titleText);
}

// Adds the image depending if the image is provided 
//or if the page is being reloaded
function addGalleryImage(titleText, imageDiv, isImage){
    let imageElement;

    if (!isImage){
        html2canvas(imageDiv).then(canvas => {
            const image = canvas.toDataURL('image/png');
                
            addToGallery(titleText, image);
        });
    }

    else{
        addToGallery(titleText, imageDiv);
    }
}

function saveImageToLocalStorage(imageData, title) {
    // Convert the image data to a string so it can be stored
    const imageDataString = JSON.stringify(imageData);
    localStorage.setItem(title, imageDataString);
}

function getImageFromLocalStorage(title) {
    const imageDataString = localStorage.getItem(title);
    if (imageDataString) {
        // Convert the string back to an image
        const imageData = JSON.parse(imageDataString);
        return imageData;
    }
    return null;
}

saveBtn.addEventListener('click', () => {

    const saveMessage = document.querySelector('#save-message');
    const title = document.querySelector('#title');
    const titleText = title.value;

    if (validTitle){

        addGalleryImage(titleText, container, false);
        clearGrid();
        createGrid(currentSize);

        isGridLines = false;

        saveMessage.textContent = "Image saved"
        saveMessage.style.color = "green"

        // Waits 3 seconds before clearing the message
        setTimeout(function() {
            saveMessage.textContent = "";
          }, 3000);

        // Resets the title section
        validTitle = false;
        title.value = "";  
        titleConfirmBtn.style.backgroundColor = "";


    }

    else{
        saveMessage.textContent = "Enter valid title"
        titleConfirmBtn.style.backgroundColor = "red"
        saveMessage.style.color = "red"
    }

  });

// Removes all the elements in the container
function clearGrid(){
    while (container.hasChildNodes()){
        container.removeChild(container.lastChild);
    }
}

// Adds all the boxes to the container, based on the size
function createGrid(size){

    // Creates a row for as many columns there are
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

// Returns a rbg value
function generateRandomColour(){

    let value1 = Math.random()*255;
    let value2 = Math.random()*255;
    let value3 = Math.random()*255;
    
    let randomColour = ("rgb(" + value1 + "," + value2 + "," + value3 + ")")
    
    return randomColour;
}

// Returns the next colour in the rainbow to the last one used
function generateRainbowColour(){

    // If all colours have been used, it returns to the start
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

// Returns all the boxes adjacent to the one specified
function getSurroundingBoxes(box){
    // Converts the HTML container element into an array
    const containerArray = Array.from(container.children);

    // Identifies which row and column the box is in
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

    // Checks if a row exists before this one
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
    
    // Checks if a row exists after this one
    if (boxRow.nextElementSibling) {
      // Get boxes from next row
      const nextRow = boxRow.nextElementSibling;
      surroundingBoxes.push(nextRow.children[boxIndex - 1]);
      surroundingBoxes.push(nextRow.children[boxIndex]);
      surroundingBoxes.push(nextRow.children[boxIndex + 1]);
    }

    return surroundingBoxes;
}

// Colours all the connected boxes of the same colour to the one clicked
function fill(box, startingColour, isRainbow){

    const surroundingBoxes = getSurroundingBoxes(box);
    const validBoxes = [1, 3, 4, 6];

    for (let i = 0; i < surroundingBoxes.length; i++) {

        // Does not colour boxes that are diagonal to the box clicked
        if (!validBoxes.includes(i)){
            continue;
        }

        let boxToFill = surroundingBoxes[i];

        if (boxToFill != undefined){

            if (boxToFill.style.backgroundColor == startingColour){

                // Checks if it is a normal or rainbow fill
                if (isRainbow){
                    boxToFill.style.backgroundColor = generateRainbowColour();
                }
                else{
                    boxToFill.style.backgroundColor = brushColour;
                }

                // Recursively calls itself to colour all connected boxes
                fill(boxToFill, startingColour, isRainbow);
            }
        }
        
    };

}

// Adds event listeners to the boxes in the canvas
function initalizeBox(){

    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {

        box.addEventListener("mouseenter", () => {

            // Adds a border to the box the cursor hovers over
            box.style.border = "0.5px solid black";    

            // Changes the colour if the mouse is held down and in the canvas
            if (isMouseDown && isMouseIn){

                // Changes colour depending on the tool selected
                if (brushSize === "thin"){
                    if (currentTool === "draw"){
                        box.style.backgroundColor = brushColour;    
                    }

                    else if (currentTool == "erase"){
                        box.style.backgroundColor = "#fae6f0";
                    }

                    else if (currentTool == "random"){
                        box.style.backgroundColor = generateRandomColour();
                    }
                    
                    else if (currentTool == "rainbow"){
                        box.style.backgroundColor = generateRainbowColour();
                    }
                }

                // Applies the drawing to all the surrounding boxes as well
                else{
                    let surroundingBoxes = getSurroundingBoxes(box);
                    let colour;

                    // Checks which colour to apply
                    if (currentTool === "draw"){
                        colour = brushColour;    
                    }

                    else if (currentTool == "erase"){
                        colour = "#fae6f0";
                    }

                    else if (currentTool == "random"){
                        colour = generateRandomColour();
                    }
                    
                    else if (currentTool == "rainbow"){
                        colour = generateRainbowColour();
                    }

                    // Applies to the clicked box
                    box.style.backgroundColor = colour;

                    // Applies the determined colour to the surrounding boxes
                    surroundingBoxes.forEach((box) => {

                        if (box != undefined){
                            box.style.backgroundColor = colour;
                        }
                    })
                    
                }
            }

        });

        // Resets the border when the mouse leaves, if grid lines is off
        box.addEventListener("mouseleave", () => {
            if (!isGridLines){
                box.style.border = "none";
            }
            else{
                box.style.border = "0.5px solid gray";
            }
        });

        // Changes the colour of the box when it is clicked instead of dragged past
        box.addEventListener("click", () => {

            if (currentTool == "fill"){
                fill(box, box.style.backgroundColor, false);
                box.style.backgroundColor = brushColour;
            }

            else if (currentTool == "rainbow-fill"){
                fill(box, box.style.backgroundColor, true);
                box.style.backgroundColor = generateRainbowColour();
            }

            else if (currentTool == "draw"){
                box.style.backgroundColor = brushColour;
            }

            else if (currentTool == "rainbow"){
                box.style.backgroundColor = generateRainbowColour();
            }
        });
    });
}

// Adds event listeners to the size buttons
sizeBtns.forEach((sizeBtn) => {

    sizeBtn.addEventListener("click", () => {

        let size = sizeBtn.textContent.slice(0,2);
        currentSize = size;

        clearGrid();
        createGrid(size);

        isGridLines = false;

        // Highlights the selected size, and de-highlights the others
        sizeBtns.forEach((sizeBtn) => {
            
            // The first two letters of sizeBtn is the size
            if (sizeBtn.textContent.slice(0,2) == currentSize){
                sizeBtn.style.backgroundColor = "#585858";
            }
            else{
                sizeBtn.style.backgroundColor = "#222034";
            }
        })
            

    });
});

// Colour palette buttons
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

    // Colours the button divs based on their position in the array
    colourBtn.style.backgroundColor = colours[colourBtnsArray.indexOf(colourBtn)];

    colourBtn.addEventListener("click", () => {

        brushColour = colourBtn.style.backgroundColor;
        currentColour.style.backgroundColor = brushColour;
    });
});

// Confirms the selected colour in the hex picker
confirmBtn.addEventListener("click", () => {
    
    brushColour = hexPicker.value;
    currentColour.style.backgroundColor = hexPicker.value;
});

// Adds event listeners for the tool buttons
toolBtns.forEach((toolBtn) => {

    const toolBtns = document.querySelectorAll(".tool-btn");

    // Highlights the selected tool and unhighlights the others
    toolBtn.addEventListener("click", () => {

        currentTool = toolBtn.getAttribute("id");

            toolBtns.forEach((btn) => {
                // If the button is selected, is it highlighted
                if (btn.id === currentTool) {
                    btn.style.background = "#585858";
                    // The rainbow-fill image isn't transparent, so I need to swap the image
                    if (btn.id === "rainbow-fill"){
                        btn.firstChild.remove();
                        const image = document.createElement("img");
                        image.src = "assets/rainbowfillgrey.png";
                        btn.appendChild(image);
                    }
                    // Swaps the rainbow-fill image back to normal
                    else{
                        const rainbowFillBtn = document.querySelector("#rainbow-fill"); 
                        rainbowFillBtn.firstChild.remove();
                        const image = document.createElement("img");
                        image.src = "assets/rainbowfill.png";
                        rainbowFillBtn.appendChild(image);
                    }

                } else {
                    // Unhighlights the other buttons
                    btn.style.background = "#222034";
                }
            });
    });

    // Adds a listener to the clear button
    if (toolBtn.getAttribute("id") === "clear"){
        
        toolBtn.addEventListener("click", () => {
            
            clearGrid();
            createGrid(currentSize);

            isGridLines = false;
        });
    }

    // Adds a listener to the grid lines button
    if (toolBtn.getAttribute("id") === "grid-lines"){
        
        toolBtn.addEventListener("click", () => {
            
            let box = document.querySelectorAll(".box");
            box.forEach((box) => {
                // Removes or adds grid lines
                if (!isGridLines){
                    box.style.border = "0.5px solid gray";
                }
                else{
                    box.style.border = "none";
                }
            })

            if (isGridLines){
                isGridLines = false;
            }
            else{
                isGridLines = true;
            }
        });
    }

    // Colours the current colour displayer either rainbow or random coloured
    if (toolBtn.getAttribute("id") === "rainbow"){
        toolBtn.addEventListener("click", () => {
            currentColour.style.background = "linear-gradient(to right, red, orange, yellow, green, blue, purple)";
        });
    }
    if (toolBtn.getAttribute("id") === "random"){
        toolBtn.addEventListener("click", () => {
            currentColour.style.background = "linear-gradient(to right, orange, blue, green, grey, black, purple)";            
        });
    }

})

// Flips the background from highlighted to unhighlighted and vice versa
function changeBackground(btn){

    if (!(btn.style.background === "rgb(88, 88, 88)" || getComputedStyle(btn).backgroundColor === "rgb(88, 88, 88)")){
        btn.style.background = "#585858";
    }
    else{
        btn.style.background = "#222034";
    }    

}

// Adds event listeners for the miscellaneous buttons
miscBtns.forEach((miscBtn) => {
    
    if (miscBtn.getAttribute("id") === "grid-lines"){
        
        miscBtn.addEventListener("click", () => {
            
            let box = document.querySelectorAll(".box");
            box.forEach((box) => {

                if (!isGridLines){
                    box.style.border = "0.5px solid gray";
                }
                else{
                    box.style.border = "none";
                }                
            })

            if (isGridLines){
                isGridLines = false;
            }

            else{
                isGridLines = true;
            }

            changeBackground(miscBtn);
        });
    }

    if (miscBtn.classList.contains("brush-size")){
        
        // Changes the brush sizes and highlights the selected one and unhighlights the other
        // Like rainbow-fill, the image isn't transparent, so I need to swap the image
        miscBtn.addEventListener("click", () => {

            const thinBtn = document.querySelector("#thin");
            const thickBtn = document.querySelector("#thick");
            
            // For when the brush is currently thin and you click thick
            if (brushSize === "thin" && miscBtn === thickBtn){
                const image = document.createElement("img");
                image.src = "assets/thickgrey.png";

                thickBtn.firstChild.remove();
                thickBtn.appendChild(image);

                const image2 = document.createElement("img");
                image2.src = "assets/thin.png";

                thinBtn.firstChild.remove();
                thinBtn.appendChild(image2);

                changeBackground(thinBtn);
                changeBackground(thickBtn);                
            }

            // For when the brush is currently thick and you click thin
            else if (brushSize === "thick" && miscBtn === thinBtn){
                const image = document.createElement("img");
                image.src = "assets/thingrey.png";

                thinBtn.firstChild.remove();
                thinBtn.appendChild(image);

                const image2 = document.createElement("img");
                image2.src = "assets/thick.png";

                thickBtn.firstChild.remove();
                thickBtn.appendChild(image2);

                changeBackground(thinBtn);
                changeBackground(thickBtn);          
            }

            brushSize =  miscBtn.getAttribute("id");
        });
    }
    
    // Adds an event listener to the clear gallery button
    if (miscBtn.getAttribute("id") === "clear-gallery"){

        miscBtn.addEventListener("click", () => {
            removeAllImages();
        });
    }

})

downloadGalleryImageBtn.addEventListener("click", () => {

    // Downloads all the images in the gallery
    for (let i = 0; i < localStorage.length; i++){
        const pngUrl = getImageFromLocalStorage(localStorage.key(i));
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        
        // Names the download based on it's title in local storage
        downloadLink.download = localStorage.key(i) + '.png';
    
        downloadLink.click();
    }
});


function load(){
    // Creates the grid with the default size of 32x32
    createGrid(32);

    // Adds the images from local storage to the gallery
    if (gallery.childElementCount === 0){
        if (localStorage.length > 0){
            for (let i = localStorage.length - 1; i >= 0; i--) {
                const title = localStorage.key(i);
                const image = getImageFromLocalStorage(title);
            
                addGalleryImage(title, image, true);
            }
        }
    }
}

load();

