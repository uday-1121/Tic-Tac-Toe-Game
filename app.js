let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newGame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true; //playerX, playerO
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];


//resets the whole game.
const resetGame = () => { 
    turnX = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

//main logic.
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {
            //playerX
            box.innerText = "X";
            turnX = false;
        }
        else {
            //playerO
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});


//logic for draw.
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};


//disable boxes on certain conditions.
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};


// shows the final winner.
const showWinner = (winner) => {
    msg.innerText = `Congratulations!!! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};


// checks the winner.
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);