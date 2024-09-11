
const container = document.querySelector(".container");





function createGrid(size){

    function createRow(){

        const box = document.createElement("div");
        box.classList.add("box");
       
        

        const boxRow = document.createElement("div");
        boxRow.setAttribute("id", "boxRow");

        for (let i = 0; i < size; i++){
            const boxToAdd = document.createElement("div");
            boxToAdd.classList.add("box")

            let heightWidth = Math.floor((400/size));

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




createGrid(16);

function initalizeBox(){
    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        box.addEventListener("mouseover", () => {
        let value1 = Math.random()*255;
        let value2 = Math.random()*255;
        let value3 = Math.random()*255;
        
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