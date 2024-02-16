const gameRoundDisplay = document.getElementById("gameRoundDisplay")
const startBtn = document.getElementById('btnStart').addEventListener('click', playRound);
document.getElementById('green').addEventListener('click', handleClickOnSimonBtn);
document.getElementById('green').addEventListener('touchstart', handleClickOnSimonBtn);

document.getElementById('red').addEventListener('click', handleClickOnSimonBtn);
document.getElementById('red').addEventListener('touchstart', handleClickOnSimonBtn);

document.getElementById('blue').addEventListener('click', handleClickOnSimonBtn);
document.getElementById('blue').addEventListener('touchstart', handleClickOnSimonBtn);

document.getElementById('yellow').addEventListener('click', handleClickOnSimonBtn);
document.getElementById('yellow').addEventListener('touchstart', handleClickOnSimonBtn);

let endModal = document.getElementById("endOfPlayModal").addEventListener('click', playRound);




let sounds = {
    greenSound: new Audio("simonSound1.mp3"),
    redSound: new Audio("simonSound2.mp3"),
    blueSound: new Audio("simonSound3.mp3"),
    yellowSound: new Audio("simonSound4.mp3"),
};

Object.values(sounds).forEach(sound => sound.load());

async function playSound(sound) {
    return new Promise(resolve => {
        sound.addEventListener('ended', resolve);
        sound.play();
    });
}





let arrRound = [];
let gameCounter; // Game counter
let userCounter;
let isUserTurn = false
let highScore = 0
let endScore







function initGame() {
    
    gameCounter = userCounter = 0;
    arrRound = [];
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
            if (userCounter >= arrRound.length) {
                userCounter = 0
                gameCounter++
                endScore = gameCounter
                renderRoundCounter()
                playRound()
                return
            }

        } else {
            document.getElementById("endOfPlayModal").style.display = "block"
            endScore = gameCounter
            saveHighScore(calcHighScore())
            initGame()
            return
        }

    } else {
        return
    }



}


// OLD WAY ("Tried to use interval but its made the btns go crazy")
//async function pcTurn() {
//    return new Promise((resolve) => {
//        isUserTurn = false
//        let arryIntervalCounter = 0
//        const intervalID = setInterval(async () => {
//            if (arryIntervalCounter !== arrRound.length) {
//                console.log("From interval of pcTurn", arrRound[arryIntervalCounter]);

//                if (arrRound[arryIntervalCounter] === 1) {
//                    document.getElementById('green').classList.add("greenOn")
//                    await playSound(sounds.greenSound, 400);
//                    setTimeout(() => {
//                        document.getElementById('green').classList.remove("greenOn")
//                    }, 400)
//                }
//                if (arrRound[arryIntervalCounter] === 2) {
//                    document.getElementById('red').classList.add("redOn")
//                    await playSound(sounds.redSound, 400);
//                    setTimeout(() => {
//                        document.getElementById('red').classList.remove("redOn")
//                    }, 400)
//                }
//                if (arrRound[arryIntervalCounter] === 3) {
//                    document.getElementById('yellow').classList.add("yellowOn")
//                    await playSound(sounds.yellowSound, 400);
//                    setTimeout(() => {
//                        document.getElementById('yellow').classList.remove("yellowOn")
//                    }, 400)
//                }
//                if (arrRound[arryIntervalCounter] === 4) {
//                    document.getElementById('blue').classList.add("blueOn")
//                    await playSound(sounds.blueSound, 400);
//                    setTimeout(() => {
//                        document.getElementById('blue').classList.remove("blueOn")
//                    }, 400)
//                }





//                arryIntervalCounter++
//            } else {
//                clearInterval(intervalID)
//                isUserTurn = true
//                resolve()
//            }

//        }, 600);
//    })


//}




async function pcTurn() {
    return new Promise(async (resolve) => {
        isUserTurn = false
        let arryIntervalCounter = 0
        await delay(1000);
        for (let i of arrRound) {
            

            if (arryIntervalCounter !== arrRound.length) {


                if (i === 1) {
                    await delay(20);
                    await lightUpButton("green")
                    await playSound(sounds.greenSound);
                    await delay(20);
                }
                if (i === 2) {

                    await delay(20);
                    await lightUpButton("red")
                    await playSound(sounds.redSound);
                    await delay(20);

                }
                if (i === 3) {
                    await delay(20);
                    await lightUpButton("yellow")
                    await playSound(sounds.yellowSound);
                    await delay(20);
                }
                if (i === 4) {
                    await delay(20);
                    await lightUpButton("blue")
                    await playSound(sounds.blueSound);
                    await delay(20);
                }

                
                arryIntervalCounter++

            } else {

                isUserTurn = true
                resolve()
            }

        }
        isUserTurn = true

    })


}



function renderRoundCounter() {

    gameRoundDisplay.innerText = gameCounter
    document.getElementById("correntScore").innerText = endScore
    document.getElementById("higheScore").innerText = calcHighScore()



}


function calcHighScore() {

    let savedScore = localStorage.getItem("highScore")
    if (savedScore != 0 && savedScore > endScore) {
        return savedScore
    }
    if (highScore > endScore) {
        return highScore
    } else {
        return highScore = endScore
    }

    
    
}


function createStep() {
    return Math.floor(Math.random() * 4) + 1;
}

async function handleClickOnSimonBtn(event) {
    if (isUserTurn) {
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
    } else {

}



}

function guessValidation(number, arryIndex) {
    return number === arrRound[arryIndex]
}


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function lightUpButton(buttonId) {
    const buttonElement = document.getElementById(buttonId);
    buttonElement.classList.add(`${buttonId}On`);
    await delay(150);
    buttonElement.classList.remove(`${buttonId}On`);
    await delay(150);
}


function saveHighScore(highScore) {
    localStorage.setItem("highScore",highScore)
}






initGame();




