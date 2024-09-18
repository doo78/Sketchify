
let container = document.querySelector(".container");
let isMouseDown = false;
let currentTool = "draw";
let brushColour = "black";
let currentSize = 16;
let nextRainbowColour = 0;
let isGridLines = false;
let brushSize = "thin";
let galleryImages = [];
let validTitle = false;
let currentMisc = ["thin"];

const gallery = document.querySelector('#gallery');



function removeImage(newContainer){


    let index = galleryImages.indexOf(newContainer);

    galleryImages.splice(index, 1);

    const imageContainers = document.querySelectorAll('.image-container');

    let imageContainer;

    imageContainers.forEach((image) => {

        if (image.getAttribute('id') === newContainer.getAttribute('id')){
            imageContainer = image;
    }
    });

    gallery.removeChild(imageContainer);

    localStorage.removeItem(newContainer.getAttribute('id'));
}

function removeAllImages(){

    galleryImages = [];
    localStorage.clear();

    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
      }
}
function returnTitle(title){
    
    let answer;

    galleryImages.forEach((image) => {
        if (image.getAttribute('id') === title){
            answer = image;
        }
    });

    return answer;    
}

function titleIsUsed(title){

    console.log("hello")
    let used = false;

    for (let i = 0; localStorage.length > i; i++){
        console.log("localStorage.key(i): " + localStorage.key(i))
        console.log("title: " + title);
        if (localStorage.key(i) === title){
            used = true;
        }
    }

    return used;
}

const titleConfirmBtn = document.querySelector('#title-confirm-btn');

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
    }
});

const downloadBtn = document.getElementById('download-btn');

downloadBtn.addEventListener('click', () => {
    /*
    const canvas = document.createElement('canvas');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  
    const ctx = canvas.getContext('2d');
    ctx.drawImage(container, 0, 0, canvas.width, canvas.height);
  
    const pngUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'image.png';
  
    downloadLink.click();
    */

    // Creates a download link using the html2canvas library
    html2canvas(container).then(canvas => {
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'image.png';
    
        downloadLink.click();
      });
});

const saveBtn = document.querySelector('#save-btn');


function addGalleryImage(titleText, imageDiv, isImage){
    let imageElement;

        if (!isImage){
            html2canvas(imageDiv).then(canvas => {
                const image = canvas.toDataURL('image/png');
                    
                imageContainer = document.createElement('div');
                imageContainer.classList.add('image-container');

                imageBtnContainer = document.createElement('div');
                imageBtnContainer.classList.add('image-btn-container');

                imageElement = document.createElement('img');
                imageElement.classList.add('saved-image');
                imageElement.src = image;

                titleContainer = document.createElement('div');
                titleContainer.classList.add('title-on-image');
                titleContainer.textContent = titleText;
                
                /*
                let editBtn = document.createElement('button');
                editBtn.classList.add("edit-btn");
                editBtn.setAttribute("id", titleText);
                editBtn.textContent = "Edit";
                */
                
                let downloadGalleryImageBtn = document.createElement('button');
                downloadGalleryImageBtn.classList.add("download-gallery-image-btn");
                
                const downloadGalleryImg = document.createElement('img');
                downloadGalleryImg.setAttribute('src', "assets/download.png");

                let removeBtn = document.createElement('button');
                removeBtn.classList.add("remove-btn");

                const removeImg = document.createElement('img');
                removeImg.setAttribute('src', "assets/clear.png");

                removeBtn.appendChild(removeImg);
                downloadGalleryImageBtn.appendChild(downloadGalleryImg);

                /*
                imageBtnContainer.appendChild(editBtn);
                */
                imageBtnContainer.appendChild(removeBtn);
                imageBtnContainer.appendChild(downloadGalleryImageBtn);
                

                imageContainer.appendChild(titleContainer);
                imageContainer.appendChild(imageElement);
                imageContainer.appendChild(imageBtnContainer);

                imageContainer.classList.add('image-container');

                imageContainer.setAttribute('id', titleText);

                document.getElementById('gallery').appendChild(imageContainer);

                let newContainer = container.cloneNode(true);

                newContainer.setAttribute('id', titleText);
        
                galleryImages.push(newContainer);

                
                /*
                editBtn.addEventListener('click', () => {
    
                    container = returnTitle(titleText);
                    console.log(container);
                    console.log(container.getAttribute('id'));
                    
                });
                */
                

                removeBtn.addEventListener('click', () => {
    
                    removeImage(newContainer);
                    
                });

                downloadGalleryImageBtn.addEventListener('click', () => {
                    const pngUrl = image
                    const downloadLink = document.createElement('a');
                    downloadLink.href = pngUrl;
                    downloadLink.download = 'image.png';
                
                    downloadLink.click();
                })

                saveImageToLocalStorage(image, titleText);
            });
        }

        else{
            imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');

            imageBtnContainer = document.createElement('div');
            imageBtnContainer.classList.add('image-btn-container');

            imageElement = document.createElement('img');
            imageElement.classList.add('saved-image');
            imageElement.src = imageDiv;

            titleContainer = document.createElement('div');
            titleContainer.classList.add('title-on-image');
            titleContainer.textContent = titleText;
            
            /*
            let editBtn = document.createElement('button');
            editBtn.classList.add("edit-btn");
            editBtn.setAttribute("id", titleText);
            editBtn.textContent = "Edit";
            */
            
            let downloadGalleryImageBtn = document.createElement('button');
            downloadGalleryImageBtn.classList.add("download-gallery-image-btn");
            
            const downloadGalleryImg = document.createElement('img');
            downloadGalleryImg.setAttribute('src', "assets/download.png");

            let removeBtn = document.createElement('button');
            removeBtn.classList.add("remove-btn");

            const removeImg = document.createElement('img');
            removeImg.setAttribute('src', "assets/clear.png");
            /*
            imageBtnContainer.appendChild(editBtn);
            */

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

            let newContainer = container.cloneNode(true);

            newContainer.setAttribute('id', titleText);
    
            galleryImages.push(newContainer);

            
            /*
            editBtn.addEventListener('click', () => {

                container = returnTitle(titleText);
                console.log(container);
                console.log(container.getAttribute('id'));
                
            });
            */
            

            removeBtn.addEventListener('click', () => {

                removeImage(newContainer);
                
            });

            downloadGalleryImageBtn.addEventListener('click', () => {
                const pngUrl = imageDiv
                const downloadLink = document.createElement('a');
                downloadLink.href = pngUrl;
                downloadLink.download = 'image.png';
            
                downloadLink.click();
            })

            saveImageToLocalStorage(imageDiv, titleText);
            
        
        }
}

function saveImageToLocalStorage(imageData, title) {
    const imageDataString = JSON.stringify(imageData);
    localStorage.setItem(title, imageDataString);
}

function getImageFromLocalStorage(title) {
    const imageDataString = localStorage.getItem(title);
    if (imageDataString) {
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

        setTimeout(function() {
            saveMessage.textContent = "";
          }, 3000);

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


// Checks if the user is holding the mouse down
/*
document.body.onmousedown = (e) => {
    isMouseDown = true;
    e.preventDefault(); // Prevents an error when dragging an already black square
}

// Checks if the user has released the mouse
document.addEventListener('mouseup', function() {
    isMouseDown = false;  
});
*/
container.onmousedown = (e) => {
    isMouseDown = true;
    e.preventDefault(); // Prevents an error when dragging an already black square
}

// Checks if the user has released the mouse
container.addEventListener('mouseup', function() {
    isMouseDown = false;  
});

container.onmouseleave = (e) => {
    isMouseDown = false;
}


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

function getSurroundingBoxes(box){
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

    return surroundingBoxes;
}

// To do: make the rainbow fill
// To do: stop algorithm if box clicked is already filled
function fill(box, startingColour, isRainbow){

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

    /*
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

    */


    const surroundingBoxes = getSurroundingBoxes(box);

    const validBoxes = [1, 3, 4, 6];

    for (let i = 0; i < surroundingBoxes.length; i++) {


        if (!validBoxes.includes(i)){
            continue;
        }

        let boxToFill = surroundingBoxes[i];

        /*
        if (boxToFill != undefined){

            if (boxToFill.style.backgroundColor != brushColour){

                boxToFill.style.backgroundColor = brushColour;

                fill(boxToFill);
            }
        }
            */
        if (boxToFill != undefined){

            if (boxToFill.style.backgroundColor == startingColour){

                if (isRainbow){
                    boxToFill.style.backgroundColor = generateRainbowColour();
                }
                else{
                    boxToFill.style.backgroundColor = brushColour;
                }

                fill(boxToFill, startingColour, isRainbow);
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

                else{
                    let surroundingBoxes = getSurroundingBoxes(box);
                    let colour;

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

                    box.style.backgroundColor = colour;

                    surroundingBoxes.forEach((box) => {

                        if (box != undefined){

                            box.style.backgroundColor = colour;
                        }
                    })
                    
                }
            }

        });

        // Resets the border when the mouse leaves
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

            else if (currentTool = "draw"){
                box.style.backgroundColor = brushColour;
            }

            else if (currentTool = "rainbow"){
                box.style.backgroundColor = generateRainbowColour();
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

        isGridLines = false;

        sizeBtns.forEach((sizeBtn) => {
            
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

        currentColour.style.backgroundColor = brushColour;
    });
});

// Hex Picker button

const confirmBtn = document.querySelector("#confirm-btn");
const hexPicker = document.querySelector("#hex-colour-picker");
const currentColour = document.querySelector("#current-colour");

confirmBtn.addEventListener("click", () => {

    brushColour = hexPicker.value;
    currentColour.style.backgroundColor = hexPicker.value;

});

// Toolbar

const toolBtns = document.querySelectorAll(".tool-btn");

toolBtns.forEach((toolBtn) => {

    /*
    toolBtn.addEventListener("click", () => {

        currentTool = toolBtn.getAttribute("id");
        

    });*/
    const toolBtns = document.querySelectorAll(".tool-btn");


    toolBtn.addEventListener("click", () => {
        currentTool = toolBtn.getAttribute("id");
            toolBtns.forEach((btn) => {
                if (btn.id === currentTool) {
                    btn.style.background = "#585858";
                    if (btn.id === "rainbow-fill"){
                        btn.firstChild.remove();
                        const image = document.createElement("img");
                        image.src = "assets/rainbowfillgrey.png";
                        btn.appendChild(image);
                    }
                    else{
                        const rainbowFillBtn = document.querySelector("#rainbow-fill"); 
                        rainbowFillBtn.firstChild.remove();
                        const image = document.createElement("img");
                        image.src = "assets/rainbowfill.png";
                        rainbowFillBtn.appendChild(image);
                    }

                } else {
                    btn.style.background = "#222034";
                }
                
            });
    });


    if (toolBtn.getAttribute("id") === "clear"){
        
        toolBtn.addEventListener("click", () => {
            
            clearGrid();

            createGrid(currentSize);

            isGridLines = false;
        });
    }

    if (toolBtn.getAttribute("id") === "grid-lines"){
        
        toolBtn.addEventListener("click", () => {
            
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
        });
    }

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

const miscBtns = document.querySelectorAll(".misc-btn");

function changeBackground(btn){

    if (!(btn.style.background === "rgb(88, 88, 88)" || getComputedStyle(btn).backgroundColor === "rgb(88, 88, 88)")){
        btn.style.background = "#585858";
    }

    else{
        btn.style.background = "#222034";
    }    

}


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
        
        miscBtn.addEventListener("click", () => {

            const thinBtn = document.querySelector("#thin");
            const thickBtn = document.querySelector("#thick");
            
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

    if(miscBtn.getAttribute("id") === "download-btn"){
        miscBtn.addEventListener("click", () => {

            const canvas = document.getElementById('image-canvas');
            const ctx = canvas.getContext('2d');
            
            // Draw the image on the canvas
            ctx.drawImage(container, 0, 0);
            
            // Generate a PNG image URL
            const pngUrl = canvas.toDataURL('image/png');
            
            // Create a download link
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = 'image.png';

            download.click();
        });
    }
    
    if (miscBtn.getAttribute("id") === "clear-gallery"){

        miscBtn.addEventListener("click", () => {

            removeAllImages();
        });
    }

})

const downloadGalleryImageBtn = document.querySelector("#download-all-images");

downloadGalleryImageBtn.addEventListener("click", () => {

    for (let i = 0; i < localStorage.length; i++){
        const pngUrl = getImageFromLocalStorage(localStorage.key(i));
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = localStorage.key(i) + '.png';
    
        downloadLink.click();
    }


});


function load(){
    if (gallery.childElementCount === 0){
        if (localStorage.length > 0){

            /*
            for (let i = 0; i < localStorage.length; i++){

                const title = localStorage.key(i);
                const image = getImageFromLocalStorage(title);

                addGalleryImage(title, image, true);
            }
                */
            
            for (let i = localStorage.length - 1; i >= 0; i--) {
                const title = localStorage.key(i);
                const image = getImageFromLocalStorage(title);
            
                addGalleryImage(title, image, true);
            }


        }
    }
}

load();

