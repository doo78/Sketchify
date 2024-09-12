
const container = document.querySelector(".container");
let isMouseDown = false;

document.body.onmousedown = (e) => {
    isMouseDown = true;
    e.preventDefault();
}

document.addEventListener('mouseup', function() {
    isMouseDown = false;  // Set the flag to true when mouse is down
});

function createGrid(size){

    function createRow(){

        const box = document.createElement("div");
        box.classList.add("box");

        const boxRow = document.createElement("div");
        boxRow.setAttribute("id", "boxRow");
        
        const containerHeight = container.offsetHeight;
        let heightWidth = Math.floor((parseInt(containerHeight)/size));

        for (let i = 0; i < size; i++){
            
            const boxToAdd = document.createElement("div");
            boxToAdd.classList.add("box")

            boxToAdd.style.height = heightWidth + "px";
            boxToAdd.style.width = heightWidth + "px";


            boxRow.appendChild(boxToAdd);
        }

        return boxRow;
    }


    for (let i = 0; i < size; i++){
        
        
        container.appendChild(createRow());
    }

    initalizeBox();
}




createGrid(32);

function initalizeBox(){
    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        box.addEventListener("mouseenter", () => {

            box.style.border = "0.5px solid black";

            if (isMouseDown){
            
            /*
            let value1 = Math.random()*255;
            let value2 = Math.random()*255;
            let value3 = Math.random()*255;
            */
            
            /*
            let randomColour = ("rgb(" + value1 + "," + value2 + "," + value3 + ")")
            box.style.backgroundColor = randomColour;
            


            let currentOpacity = parseFloat(box.style.opacity);
            if (isNaN(currentOpacity)) {
                currentOpacity = 0; 
            }

            console.log("1" + currentOpacity);
            box.style.opacity = currentOpacity + 0.1;
            console.log("2" + box.style.opacity);
            });
            */
            box.style.backgroundColor = "black";
            }
            });

     

        box.addEventListener("mouseleave", () => {
            box.style.border = "none";
        });

        box.addEventListener("click", () => {
            box.style.backgroundColor = "black";
        });
    });
}


const sizeButton = document.querySelector("#size");

sizeButton.addEventListener("click", () => {
    let size = prompt("Enter the number of squares per side you want: ");

    if (size > 100){
        alert("The max size is 100.");
    }

    else{
        while (container.hasChildNodes()){
            container.removeChild(container.lastChild);
        }

        
        createGrid(size);
    }
});