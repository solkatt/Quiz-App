/**
 * @param {Number} secretNumber - the random number that players try to figure out
 */
let secretNumber;

 /** 
 * @param {Number} minNumber - the smallest number in the guessing range
 */
let minNumber;
 /** 
 * @param {Number} maxNumber - the largest number in the guessing range
 */
let maxNumber;
 /**
 * @param {Number} turn - the number of turns that the game has taken
 */
let turn;
/**
 * @param {Number} guess - a players guess
 */
 let guess;
 /**
 * @param {Number} botDelay - the delay of bot output
 */
let botDelay;
/** 
 * @param {Array}  scoreList - Saves players and bots scores to an array
*/
let scoreList; 
/** 
* @param {Number} playerScore - Saves the players score, useful for highscore
*/
let playerScore;
/** 
 * @param {Number} totalGuess - Saves total number of guesses in a match, for game-over
*/
let totalGuess;
/** 
 * @param {Number} previousGuess - Saves previous guesses
*/
let previousGuess;
/** 
 * @param {Number} numberOfGuesses - Saves number of guesses for each player and bot 
*/
let numberOfGuesses;
/** 
 * @param {Number} timer - Saves how long it took to guess. 
*/
let timer;
/**
 * If user chooses 0-2 bots before pressing start Playing, this is false.
 */
let isThreeBotsSelected = true;

let addEnter = true;

let startButton = document.querySelector('#startgameButton');

window.addEventListener('load', init);
/**
 * start playing button in newGameState
 */ 
state.newGameState.startPlayingButton.addEventListener('click', () => {
    scoreList = [0, 0, 0, 0, 0, 0, 0];
    playerScore = 0;
    totalGuess = 0;
    numberOfGuesses = [0, 0, 0, 0, 0, 0, 0];
    if (3 <= state.newGameState.selectedBots.length) {
        turn = 0;
        minNumber = 1;
        state.gameoverState.botContainer.innerHTML = "";
        if ("settings" in localStorage) {
            let settings = JSON.parse(localStorage.getItem("settings"));
            maxNumber = parseInt(settings.settingMaxNumber);
            state.gameplayState.maxNumber = maxNumber;
            state.gameplayState.minNumber = minNumber;
        }
        state.gameplayState.secretNumber = secretNumber;
        state.gameoverState.winnerDiv.innerHTML = "";
        printGameplay(minNumber, maxNumber);
    }
    addCheckUserGuessButton();
})

/**
 * handles randomization of number and get settings from local storage
 */
function init() {
    turn = 0;
    minNumber = 1;
    //checks local storage for a max value, if non set to 20
    if ("settings" in localStorage) {
        let settings = JSON.parse(localStorage.getItem("settings"));
        maxNumber = parseInt(settings.settingMaxNumber);
    } else {
        maxNumber = 20;
    }
    setSettingValues();
    let previousGuess = maxNumber;
    secretNumber = getRandom(minNumber, maxNumber); 
}
/**
 * randomly assigns a number
 * @param {number} minNumber - minimum number
 * @param {number} maxNumber - maximum number
 */
function getRandom(minNumber, maxNumber) {
    return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
}

/**
 * checks when the player guesses
 */
function addCheckUserGuessButton() {
    timer = 5;
    document.querySelector(".checkUserGuess").addEventListener("click", checkUserGuess);
    addEnter = true;
    let downloadTimer = setInterval(()=> {
        timer--;
        if (timer === 0) {        
          clearInterval(downloadTimer);
        }
      },1000);              
}

/**
 * handles check user guess
 */
function removeUserGuessButton() {
    document.querySelector(".checkUserGuess").removeEventListener("click", checkUserGuess);
    addEnter = false;
}

/**
 * checks user guess
 */
function checkUserGuess() {
    guess = parseInt(parseInt(document.querySelector(".user-guess input[type='text']").value));
    let player = "You";
    let stopTheGame = false;
    if (isNaN(guess) || undefined) {
        guess = minNumber + 1;
    }
    botDelay = 0;
    turn = turn + 1;
    calculateScore(secretNumber, guess, player, maxNumber, minNumber, timer);

    if (guess == secretNumber) {
        displayOutput(player, guess, "win", timer);
        youWin = true;
        stopTheGame = true;
    } else {
        let previousGuess = guess;
        removeUserGuessButton();
        checkResult(player, guess, timer);
    }

    if (stopTheGame == false) {
        botLoop();
    }
}

/**
 * loops through bot guesses
 */
function botLoop(){
    let i = 0;
    for (let bot of state.newGameState.selectedBots) {
        if (guess == secretNumber) {
            break;
        } else {
            i++;
            botGuesses(bot);
        }
        if (i == state.newGameState.selectedBots.length){
            setTimeout(function(){ document.querySelector(".user-guess input[type='text']").select(); }, botDelay);
        }
    }
}

/**
 * switch that lets the bots make a guess
 * @param {string} player - can be user or bot
 */
function botGuesses(player) {
    switch (player) {
        case "AverageBert":
            timer = 2.5;
            guess = Math.floor((maxNumber - minNumber) / 2 + minNumber);
            player = "AverageBert";
            botDelay = botDelay + 2500;
            calculateScore(secretNumber, guess, player, maxNumber, minNumber, timer);
            if (secretNumber == guess) {
                displayOutput(player, guess, "win", timer);
                } else {
                checkResult(player, guess, timer);
            }
            timer = 5;
            if(totalGuess === state.newGameState.selectedBots.length * turn && secretNumber !== guess) {
                setTimeout(function() {addCheckUserGuessButton();}, botDelay);
            }
            break;
        case "LowBert":
            player = "LowBert";
            timer = 4;
            botDelay = botDelay + 1000;
            if (secretNumber == minNumber) {
                guess = minNumber;
            } else {
                guess = minNumber + 1;
                calculateScore(secretNumber, guess, player, maxNumber, minNumber, timer);
            }
            if (secretNumber == guess) {
                displayOutput(player, guess, "win", timer);
                } else {
                checkResult(player, guess, timer);
            }
            timer = 5;
            if(totalGuess === state.newGameState.selectedBots.length * turn && secretNumber !== guess) {
                setTimeout(function() {addCheckUserGuessButton();}, botDelay);
            }
            break;
        case "RandomBert":
            if (secretNumber == minNumber) {
                guess = Math.floor(Math.random() * ((maxNumber - 1) - minNumber) + (minNumber));
            } else if (secretNumber == maxNumber) {
                guess = Math.floor(Math.random() * (maxNumber - (minNumber + 1)) + (minNumber) + 1);
            } else {
                guess = Math.floor(Math.random() * ((maxNumber - 1) - (minNumber + 1)) + (minNumber + 1));
            }
            player = "RandomBert";
            botDelay = botDelay + 1500;
            timer = 3.5
            calculateScore(secretNumber, guess, player, maxNumber, minNumber, timer);
                if (secretNumber == guess) {
                    displayOutput(player, guess, "win", timer);

                    } else {
                    checkResult(player, guess, timer);
            }
            timer = 5;
            if(totalGuess === state.newGameState.selectedBots.length * turn && secretNumber !== guess) {
                setTimeout(function() {addCheckUserGuessButton();}, botDelay);
            }
            break;
        case "HighBert":
            player = "HighBert";
            botDelay = botDelay + 1000;
            timer = 4;
            if (secretNumber == maxNumber) {
                guess = maxNumber;
                calculateScore(secretNumber, guess, player, maxNumber, minNumber, timer);
            } else {
                guess = maxNumber - 1;
                calculateScore(secretNumber, guess, player, maxNumber, minNumber, timer);
            }
            if (secretNumber == guess) {
                displayOutput(player, guess, "win", timer);
                } else {
                checkResult(player, guess, timer);
            }
            timer = 5;
            if(totalGuess === state.newGameState.selectedBots.length * turn && secretNumber !== guess) {
                setTimeout(function() {addCheckUserGuessButton();}, botDelay);
            }
            break;
        case "DumbBert":
            player = "DumbBert";
            botDelay = botDelay + 500;
            timer = 4.5;
            guess = Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
            calculateScore(secretNumber, guess, player, maxNumber, minNumber, timer);

            if (secretNumber == guess) {
                guess = maxNumber;
                checkResult(player, guess, timer);
                
            } else {
                checkResult(player, guess, timer);
            }
            timer = 5;
            if(totalGuess === state.newGameState.selectedBots.length * turn && secretNumber !== guess) {
                setTimeout(function() {addCheckUserGuessButton();}, botDelay);
            }
            break;
        case "SmartBert":
            player = "SmartBert";
            botDelay = botDelay + 3000;
            timer = 2
            if(turn <= 2){
                guess = maxNumber;
                calculateScore(secretNumber, guess, player, maxNumber, minNumber, timer);
                displayOutput(player, guess, "waits", timer);               
            } else {
                displayOutput(player, guess, "win", timer);
            }
            timer = 5;
            if(totalGuess === state.newGameState.selectedBots.length * turn && secretNumber !== guess) {
                setTimeout(function() {addCheckUserGuessButton();}, botDelay);
            }
            break;
    }
}

/**
 * decide if the guess was to high or low, or other
 * @param {string} player - can be bots or user name
 * @param {number} guess - can be user or bot guess
 */

function checkResult(player, guess) {
    if (guess > secretNumber && guess > maxNumber) {
        //keeps deliberatly wrong guesses from confusing the bots
        if(player = "You") {
            numberOfGuesses[0]++;
        }
        displayOutput(player, guess, "too high", timer);
    } else if(guess > secretNumber){
        displayOutput(player, guess, "lower", timer);
    } else if(guess < secretNumber && guess < minNumber && guess < maxNumber){ 
        //keeps deliberatly wrong guesses from confusing the bots
        if(player = "You") {
            numberOfGuesses[0]++;
        }
        displayOutput(player, guess, "too low", timer);
    } else if(guess < secretNumber) {
        displayOutput(player, guess, "higher", timer);
    } else {
        displayOutput(player, guess, "error", timer);
    }
}

function displayOutput(player, guess, result, timer){
    totalGuess ++;
    let bots = state.newGameState.selectedBots;
    switch (result) {
        case "win":
            let i = bots.indexOf(player);
            if (player === "You") {
                if(timer === 0)  {
                    numberOfGuesses[0]++;
                    scoreList[0] += 100;
                    scoreList[0] = Math.round(scoreList[0]/numberOfGuesses[0]);
                }
                else {
                numberOfGuesses[0]++;
                scoreList[0] += 100 * timer;
                scoreList[0] = Math.round(scoreList[0]/numberOfGuesses[0]);
                }
            } else if(player !== "You"){
                numberOfGuesses[i] ++;
                scoreList[i] += 100 * timer;
                scoreList[i] = Math.round(scoreList[i]/numberOfGuesses[i]);
            }
            playerScore = scoreList[0];
            addHighScoreToLocalStorage(gatherUsername(), playerScore);
            state.gameoverState.scoreList = scoreList;
            let index = scoreList.indexOf(Math.max(...scoreList))
            let winnerScore = Math.max(...scoreList);
            let winnerIndex = scoreList.indexOf(winnerScore);
            let winnerName = state.newGameState.selectedBots[winnerIndex]
            printBotGuess(player, guess, result);
            clearOnWin(winnerName, winnerIndex, winnerScore);
            break;
        case "lower":
            maxNumber = guess;
            printBotGuess(player, guess, result, minNumber, maxNumber);
            break;
        case "higher":
            minNumber = guess;
            printBotGuess(player, guess, result, minNumber, maxNumber);
            break;
        case "too high":
            printBotGuess(player, guess, result, minNumber, maxNumber);
            break;
        case "too low":
            printBotGuess(player, guess, result, minNumber, maxNumber);
            break;
        case "too slow":
            printBotGuess(player, "--", result, minNumber, maxNumber);
            break;
        case "waits":
            printBotGuess(player, "--", result, minNumber, maxNumber);
            break;
        case "error":
              break;
    }
}

/**
 * Just for checking the tests easier
 * @param {string} textToDisplay 
 */
function display(textToDisplay){
    const displayResult = document.getElementById("guessingList")
    const p = document.createElement("p");
    displayResult.append(p);
    p.append(textToDisplay);
}

/**
 * calculates score
 * @param {number} secretNumber - the correct answer
 * @param {number} guess - user or bot guess
 * @param {string} player - user or bot-name
 * @param {number} maxNumber
 * @param {number} minNumber 
 * @param {number} timer 
 */
function calculateScore (secretNumber, guess, player, maxNumber, minNumber, timer) {
    let bots = state.newGameState.selectedBots;
    
    if (guess > secretNumber && guess <= maxNumber) {
        let distanceSecretMax = maxNumber - secretNumber; 
        let guessDistanceTowardsSecret = maxNumber - guess; 
        let partOfDistance = guessDistanceTowardsSecret / distanceSecretMax;
        let scoreToAdd = Math.round(partOfDistance * 100 * timer); 
        if (player === "You") {
            numberOfGuesses[0]++;
            scoreList[0] += scoreToAdd;
            scoreList[0] = Math.round(scoreList[0]/numberOfGuesses[0]); 
        } else {
            bots.forEach(bot => {
                if (player === bot) {
                    let i = bots.indexOf(player);
                    numberOfGuesses[i]++;
                    scoreList[i] += scoreToAdd;
                    scoreList[i] = Math.round(scoreList[i]/numberOfGuesses[i]);
                }
            });
           }
    } else if (guess < secretNumber && guess >= minNumber) {
        let distanceSecretMin = secretNumber - minNumber; 
        let guessDistanceFromSecret = guess - minNumber;
        let partOfDistance = guessDistanceFromSecret / distanceSecretMin;
        let scoreToAdd = Math.round(partOfDistance * 100 * timer);
        
        if (player === "You") {
            numberOfGuesses[0]++;
            scoreList[0] += scoreToAdd;
            scoreList[0] = Math.round(scoreList[0]/numberOfGuesses[0]);
        }  else {
        bots.forEach(bot => {
            if (player === bot) {
                let i = bots.indexOf(player)
                numberOfGuesses[i]++;
                scoreList[i] += scoreToAdd;
                scoreList[i] = Math.round(scoreList[i]/numberOfGuesses[i]);
            }
            
        });
    } }
}

/**
 * Handles button text shown depending on if player has chosen accepted number of bots.
 */
function showCorrectStartbuttonText(){
    if(!isThreeBotsSelected){
        document.querySelector('#submitUsername').textContent = "Choose at least 3 bots...";      
    }
    else{
        document.querySelector('#submitUsername').textContent = "Start playing!";
    }
}