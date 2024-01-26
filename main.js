let arrRound = [];
let gameCounter; // Game counter
let userCounter;
let isUserTurn = false
// let numberVlaueGuess = null;


function initGame() {
    gameCounter = userCounter = 0;
    arrRound = [];
    console.log('Game initiated...');
    isUserTurn = false
}

// Function (B)
async function playRound() {

    const newStep = createStep();
    arrRound.push(newStep);

    await pcTurn()
    renderRoundCounter()
}

function userTurn(guess) {
    if (isUserTurn) {
        if (guessValidation(guess, userCounter)) {
            userCounter++
            console.log("userCounter-------", userCounter);
            console.log(userCounter, arrRound.length);
            if (userCounter >= arrRound.length) {
                userCounter = 0
                playRound()
            }
            console.log("GUESSED CORRECTLY");
        } else {
            initGame()
            return console.log("Wrong guess");
        }

    } else {
        return console.log("Not your turn");
    }



}



function pcTurn() {
    return new Promise((resolve) => {
        isUserTurn = false
        let arryIntervalCounter = 0
        const intervalID = setInterval(() => {
            if (arryIntervalCounter !== arrRound.length) {
                console.log("From interval of pcTurn", arrRound[arryIntervalCounter]);
                arryIntervalCounter++
            } else {
                clearInterval(intervalID)
                isUserTurn = true
                resolve()
            }

        }, 1000);
    })


}



function renderRoundCounter() {

    gameRoundDisplay.innerText = gameCounter
}


function createStep() {
    return Math.floor(Math.random() * 4) + 1;
}

function handleClickOnSimonBtn(event) {


    if (event.target.id === "green") {
        return userTurn(1)
    }
    if (event.target.id === "red") {
        return userTurn(2)
    }
    if (event.target.id === "yellow") {
        return userTurn(3)
    }
    if (event.target.id === "blue") {
        return userTurn(4)
    }

}

function guessValidation(number, arryIndex) {
    return number === arrRound[arryIndex]
}








initGame();
const gameRoundDisplay = document.getElementById("gameRoundDisplay")
document.getElementById('btnStart').addEventListener('click', playRound);
document.getElementById('green').addEventListener('click', handleClickOnSimonBtn);
document.getElementById('red').addEventListener('click', handleClickOnSimonBtn);
document.getElementById('blue').addEventListener('click', handleClickOnSimonBtn);
document.getElementById('yellow').addEventListener('click', handleClickOnSimonBtn);


