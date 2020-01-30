/**
 * @param {Number} secretNumber - the random number that players try to figure out
 * @param {Number} minNumber - the smallest number in the guessing range
 * @param {Number} maxNumber - the largest number in the guessing range
 * @param {Number} turn - the number of turns that the game has taken
 * @param {Number} guess - a players guess
 * @param {Number} botDelay - the delay of bot output
 */
let secretNumber;
let minNumber;
let maxNumber;
let turn;
let guess;
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

//Ha kvar var användbart for calculateScores()
//let bots = ["Du", "AverageBert", "LowBert" , "RandomBert", "HighBert", "DumbBert", "SmartBert"];


let startButton = document.querySelector('#startgameButton');

// start playing button in newGameState
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
        secretNumber = getRandom(minNumber, maxNumber);
        state.gameplayState.secretNumber = secretNumber;
        state.gameoverState.winnerDiv.innerHTML = "";
        printGameplay(minNumber, maxNumber);
    }
    addCheckUserGuessButton();
})

function init() {
    turn = 0;
    minNumber = 1;
    //checks local storage for a max value, if non set to 20
    if ("settings" in localStorage) {
        let settings = JSON.parse(localStorage.getItem("settings"));
        maxNumber = parseInt(settings.settingMaxNumber);
    } else {
        maxNumber = 100;
    }
    setSettingValues();
    let previousGuess = maxNumber;
    secretNumber = getRandom(minNumber, maxNumber);
    
    
}

window.addEventListener('load', init);

//randomly assigns a number
function getRandom(minNumber, maxNumber) {
    return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
}
//checks when the player guesses

function addCheckUserGuessButton() {
    timer = 5;
    document.querySelector(".checkUserGuess").addEventListener("click", checkUserGuess);
    let downloadTimer = setInterval(()=> {
        timer--;
        if (timer === 0) {        
          clearInterval(downloadTimer);
        }
      },1000);
               
}

function removeUserGuessButton() {
    document.querySelector(".checkUserGuess").removeEventListener("click", checkUserGuess);
}

function checkUserGuess() {
    //players guess
    // old version. I hope the new version works!! guess = parseInt(document.getElementsByClassName("user-guess")["0"].value);
    guess = parseInt(parseInt(document.querySelector(".user-guess input[type='text']").value));
    let player = "You";
    let stopTheGame = false;
    if (isNaN(guess) || undefined) {
        guess = minNumber + 1;
        //stopTheGame = true;
    }
    botDelay = 0;
    turn = turn + 1;

    
    calculateScore(secretNumber, guess, player, maxNumber, minNumber, timer);


    //Your Player
    if (guess == secretNumber) {
        //showWinner(scoreList, playerScore, numberOfGuesses[])
        displayOutput(player, guess, "win", timer);
        youWin = true;
        //THIS FUNCTION CAN EASILY BE MOVED DEPENDING ON WHEN WE WANT TO TALLY UP AND SAVE FINAL SCORE IN LOCAL STORAGE:
        addHighScoreToLocalStorage(gatherUsername(), playerScore);
        stopTheGame = true;
    } else {
        let previousGuess = guess;
        removeUserGuessButton();
        checkResult(player, guess, timer);
    }

    //stops the bots from guessing if the player wins
    if (stopTheGame == false) {
        // loops out for each bot
        botLoop();
    }
}

function botLoop(){
    // takes a guess for each bot
    let i = 0;
    for (let bot of state.newGameState.selectedBots) {
        if (guess == secretNumber) {
            break;
        } else {
            i++;
            botGuesses(bot);
        }
        if (i == state.newGameState.selectedBots){
            setTimeout(function(){ document.querySelector(".user-guess input[type='text']").select(); }, botDelay);
        }
    }
}

//switch that lets the bots make a guess
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
            // Fixes so that random guesses can't be the same
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

            //Unlike randombert, dumbert can guess already guessed guesses
            //This is to hide if it guesses right
            guess = Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
            calculateScore(secretNumber, guess, player, maxNumber, minNumber, timer);
            //If DumbBert guesses right it istead guesses the highest number
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
                guess = maxNumber; //Because smartBert guesses maxNumber he gets 0 points since that's 0 progress towards correct answer 
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

//decide if the guess was to high or low, or other
function checkResult(player, guess) {
    if (guess > secretNumber && guess > maxNumber) {
        //keeps deliberatly wrong guesses from confusing the bots
        displayOutput(player, guess, "too low", timer);
    } else if(guess > secretNumber){
        displayOutput(player, guess, " guess lower", timer);
    } else if(guess < secretNumber && guess < minNumber && guess < maxNumber){ 
        //keeps deliberatly wrong guesses from confusing the bots
        displayOutput(player, guess, "too high", timer);
    } else if(guess < secretNumber) {
        displayOutput(player, guess, "guess higher", timer);
    } else {
        displayOutput(player, guess, "error", timer);
    }
}

function displayOutput(player, guess, result, timer){
    totalGuess ++;
    let bots = state.newGameState.selectedBots;
    //swaps pictures och text
    // let swapText = document.getElementById("display-text");
    //checks result and put it into words and pictures
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
            console.log(scoreList)
            //swapPic.src = "https://www.wyzowl.com/wp-content/uploads/2019/01/winner-gif.gif";
            // swapText.innerHTML = guess + " Var rätt. " + player + " vann!";
            // display(player + " gissade rätt: " + guess);
            playerScore = scoreList[0];
            state.gameoverState.scoreList = scoreList;
            let index = scoreList.indexOf(Math.max(...scoreList))
            let winnerScore = Math.max(...scoreList);
            let winnerIndex = scoreList.indexOf(winnerScore);
            let winnerName = state.newGameState.selectedBots[winnerIndex]
            printBotGuess(player, guess, result);
            clearOnWin(winnerName, winnerIndex, winnerScore);
            console.log(playerScore + " playerScore")
            console.log(scoreList + " scoreList")
            break;
        case "lower":
            maxNumber = guess;
            // swapText.innerHTML = "Gissa lägre: " + minNumber + "-" + maxNumber;
            // display(player + " gissade " + guess + ", gissa lägre");
            printBotGuess(player, guess, result, minNumber, maxNumber);
            // updateNumberRange(minNumber, maxNumber);
            break;
        case "higher":
            minNumber = guess;
            // swapText.innerHTML = "Gissa högre: " + minNumber + "-" + maxNumber;
            // display(player + " gissade " + guess + ", gissa högre");
            printBotGuess(player, guess, result, minNumber, maxNumber);

            break;
        case "too high":
            // swapText.innerHTML = "Du gissade över maximum: " + maxNumber;
            // display(player + " gissade " + guess + ", gissa mycket lägre");
        case "too low":
            // swapText.innerHTML = "Du gissade under minimum: "  + minNumber + "-" + maxNumber;
            // display(player + " gissade " + guess + ", gissa mycket högre");
            break;
        case "too slow":
            // swapText.innerHTML = "Du gissade under minimum: "  + minNumber + "-" + maxNumber;
            // display(player + " gissade " + guess + ", gissa mycket högre");
            printBotGuess(player, "--", result, minNumber, maxNumber);
            // updateNumberRange(minNumber, maxNumber);
            break;
        case "waits":
            // swapText.innerHTML = player + " väntar..." + minNumber + "-" + maxNumber;
            // display(player + " väntar... ");
            printBotGuess(player, "--", result, minNumber, maxNumber);
            // updateNumberRange(minNumber, maxNumber);
            break;
        case "error":
            // swapText.innerHTML = guess + " är inte en siffra " + minNumber + "-" + maxNumber;
            // display("Inte en siffra " + guess); 
              break;
    }
}

//Just for checking the tests easier
function display(textToDisplay){
    const displayResult = document.getElementById("guessingList")
    const p = document.createElement("p");
    displayResult.append(p);
    p.append(textToDisplay);
}

function calculateScore (secretNumber, guess, player, maxNumber, minNumber, timer) {
    let bots = state.newGameState.selectedBots;
    if (guess > secretNumber) {
        let distanceSecretMax = maxNumber - secretNumber; //Distance between highest possible number and correct answer
        let guessDistanceTowardsSecret = maxNumber - guess; //Distance guess has travelled towards correct answer
        let partOfDistance = guessDistanceTowardsSecret / distanceSecretMax //How much progress have your guess led to in finding the correct answer
        let scoreToAdd = Math.round(partOfDistance * 100 * timer); //Multiply with 100 for "Better looking" score, Multiple with 3 as a decoy if we show scores.
        
        if (player === "You") {
            numberOfGuesses[0]++;
            scoreList[0] += scoreToAdd;
            scoreList[0] = Math.round(scoreList[0]/numberOfGuesses[0]); //Delar på antal gissningar man gjort så att man inte får fördel av att fått gisa fler gånger
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
    } else if (guess < secretNumber) {
        let distanceSecretMin = secretNumber - minNumber; //Distance between lowest(minNumber) score and correct answer
        let guessDistanceFromSecret = guess - minNumber; //Distance between guess and right answer
        let partOfDistance = guessDistanceFromSecret / distanceSecretMin;
        let scoreToAdd = Math.round(partOfDistance * 100 * timer);  //Multiplicera med 100 för snyggare score och 3 som decoy avrunda till heltal
        
        if (player === "You") {
            numberOfGuesses[0]++;
            scoreList[0] += scoreToAdd;
            scoreList[0] = Math.round(scoreList[0]/numberOfGuesses[0]); //Delar på antal gissningar man gjort så att man inte får fördel av att fått gisa fler gånger
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
    // addHighScoreToLocalStorage();
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
