const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;  /* Current status of game */

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""]; /* At starting time Values are empety*/
    //UI pr empty bhi karna padega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = ""; // After write X and O, click-New game btn - X and O remove
        boxes[index].style.pointerEvents = "all"; //Again coursor shape change
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active"); /* Hide new game button */
    gameInfo.innerText = `Current Player - ${currentPlayer}`;//current player are visible
}

initGame();

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 

            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    

                //disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none"; // After Win Stop the game
                })

                //now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    //it means we have a winner
    if(answer !== "" ) {
        gameInfo.innerText = `Winner Player - ${answer}`; // Winner mil gya
        newGameBtn.classList.add("active"); // New game btn visible
        return;
    }

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index) {
    if(gameGrid[index] === "" ) {  // Box is empety not X and O any index
        boxes[index].innerText = currentPlayer;   // X -> change in UI
        gameGrid[index] = currentPlayer;   // change in grid made by me ->23 pr hai
        boxes[index].style.pointerEvents = "none"; // print X and Y - coursor pointer not made
        //swap karo turn ko
        swapTurn();
        //check koi jeet toh nahi gya
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => { // After clicking  call the handleclick fun 
        handleClick(index); // Index is show the box which is click and again not click this box
    })
});

newGameBtn.addEventListener("click", initGame);