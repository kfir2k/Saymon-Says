let arrRound = [];
let gameCounter; // Game counter
let userCounter;
let isUserTurn = false


// Function (A)
// Resets the game and ready to play
// This does NOT start the game, you need to press a button to start the game
function initGame() {
    // console.clear();
    gameCounter = userCounter = 0;
    arrRound = [];
    console.log('Game initiated...');
}

// Function (B)
async function playRound() {
    // 1. Create step and add as a last element to the array
    const newStep = createStep();
    arrRound.push(newStep);

    await pcTurn()
    console.log("FINISHED?");
    userTurn();
    renderRoundCounter()
}

function userTurn() {


    gameCounter++;
    playRound()

    }
   


function pcTurn() {
    return new Promise((resolve) => {
        isUserTurn = false
        console.log(isUserTurn);
        let arryIntervalCounter = 0
        const intervalID = setInterval(() => {
            if (arryIntervalCounter !== arrRound.length) {
                console.log(arrRound[arryIntervalCounter]);
                arryIntervalCounter++
            } else {
                clearInterval(intervalID)
                isUserTurn = true
                console.log(isUserTurn);
                resolve()
            }

        }, 1000);
    })
   

}



function renderRoundCounter() {
    
    gameRoundDisplay.innerText = gameCounter
}


// Function (C)
// 1. Creates a random number from 1 to 4
// 2. Returns the result and/or the color (צבע שמייצג את המספר)
function createStep() {
    return Math.floor(Math.random() * 4) + 1;
}



function handleClickOnSimonBtn(event) {
    console.log(event.target.id);
    if (event.target.id === "green") {
        return 1
    }
    if (event.target.id === "red") {
        return 2
    }
    if (event.target.id === "yellow") {
        return 3
    }
    if (event.target.id === "blue") {
        return 4
    }

}








initGame();
const gameRoundDisplay = document.getElementById("gameRoundDisplay")
document.getElementById('btnStart').addEventListener('click', playRound);
document.getElementById('green').addEventListener('click', handleClickOnSimonBtn);
document.getElementById('red').addEventListener('click', handleClickOnSimonBtn);
document.getElementById('blue').addEventListener('click', handleClickOnSimonBtn);
document.getElementById('Yellow').addEventListener('click', handleClickOnSimonBtn);
