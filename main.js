let arrRound = [];
let gameCounter; // Game counter
let userCounter;
let arrLengthAsIndex

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
function playRound() {
    // 1. Create step and add as a last element to the array
    const newStep = createStep();
    arrRound.push(newStep);
    arrLengthAsIndex = arrRound.length - 1
    console.log(newStep);
    console.log(arrRound);
    


    renderRoundCounter()
    userTurn();
}

function userTurn() {


    for (let i of arrRound) {
        const inputUser = prompt("Please enter your guess")
        if (+inputUser === i) {
            console.log();
            console.log('You guessed correctly');

        } else {
            console.log('You lose, game over');
            initGame();
            return
            
        }
    }
    gameCounter++;
    console.log("test", gameCounter);
    playRound()

    }
   


function pcTurn(){




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

initGame();
const gameRoundDisplay = document.getElementById("gameRoundDisplay")
document.getElementById('btnStart').addEventListener('click', playRound);
