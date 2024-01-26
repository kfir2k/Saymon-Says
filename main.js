const gameRoundDisplay = document.getElementById("gameRoundDisplay")
const startBtn = document.getElementById('btnStart').addEventListener('click', playRound);
document.getElementById('green').addEventListener('click', handleClickOnSimonBtn);
document.getElementById('red').addEventListener('click', handleClickOnSimonBtn);
document.getElementById('blue').addEventListener('click', handleClickOnSimonBtn);
document.getElementById('yellow').addEventListener('click', handleClickOnSimonBtn);
let endModal = document.getElementById("endOfPlayModal").addEventListener('click', playRound);




let sounds = {
    greenSound: new Audio("simonSound1.mp3"),
    redSound: new Audio("simonSound2.mp3"),
    blueSound: new Audio("simonSound3.mp3"),
    yellowSound: new Audio("simonSound4.mp3"),
};








let arrRound = [];
let gameCounter; // Game counter
let userCounter;
let isUserTurn = false
let highScore
let endScore




function initGame() {
    
    gameCounter = userCounter = 0;
    arrRound = [];
    console.log('Game initiated...');
    isUserTurn = false
    renderRoundCounter()
}

// Function (B)
async function playRound() {
    document.getElementById("playModal").style.display = "none"
    document.getElementById("endOfPlayModal").style.display = "none"
    const newStep = createStep();
    arrRound.push(newStep);

    await pcTurn()
    renderRoundCounter()
}

function userTurn(guess) {
    if (isUserTurn) {
        if (guessValidation(guess, userCounter)) {
            userCounter++
            renderRoundCounter()
            console.log("userCounter-------", userCounter);
            console.log(userCounter, arrRound.length);
            if (userCounter >= arrRound.length) {
                userCounter = 0
                gameCounter++
                renderRoundCounter()
                playRound()
                return
            }
            console.log("GUESSED CORRECTLY");
        } else {
            document.getElementById("endOfPlayModal").style.display = "block"
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

                if (arrRound[arryIntervalCounter] === 1) {
                    document.getElementById('green').classList.add("greenOn")
                    sounds.greenSound.play()
                    setTimeout(() => {
                        document.getElementById('green').classList.remove("greenOn")
                    }, 400)
                }
                if (arrRound[arryIntervalCounter] === 2) {
                    document.getElementById('red').classList.add("redOn")
                    sounds.redSound.play()
                    setTimeout(() => {
                        document.getElementById('red').classList.remove("redOn")
                    }, 400)
                }
                if (arrRound[arryIntervalCounter] === 3) {
                    document.getElementById('yellow').classList.add("yellowOn")
                    sounds.yellowSound.play()
                    setTimeout(() => {
                        document.getElementById('yellow').classList.remove("yellowOn")
                    }, 400)
                }
                if (arrRound[arryIntervalCounter] === 4) {
                    document.getElementById('blue').classList.add("blueOn")
                    sounds.blueSound.play()
                    setTimeout(() => {
                        document.getElementById('blue').classList.remove("blueOn")
                    }, 400)
                }





                arryIntervalCounter++
            } else {
                clearInterval(intervalID)
                isUserTurn = true
                resolve()
            }

        }, 600);
    })


}



function renderRoundCounter() {

    gameRoundDisplay.innerText = gameCounter
    document.getElementById("higheScore").innerText = highScore
    document.getElementById("correntScore").innerText = gameCounter

}


function createStep() {
    return Math.floor(Math.random() * 4) + 1;
}

function handleClickOnSimonBtn(event) {


    if (event.target.id === "green") {
        sounds.greenSound.play()
        return userTurn(1)
    }
    if (event.target.id === "red") {
        sounds.redSound.play()
        return userTurn(2)
    }
    if (event.target.id === "yellow") {
        sounds.yellowSound.play()
        return userTurn(3)
    }
    if (event.target.id === "blue") {
        sounds.blueSound.play()
        return userTurn(4)
    }

}

function guessValidation(number, arryIndex) {
    return number === arrRound[arryIndex]
}




function saveHighScore(highScore) {

}



initGame();




