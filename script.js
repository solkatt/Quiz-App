let secretNumber;
let minNumber;
let maxNumber;
let turn;
let guess;
/**
 * Sparar spelare och botars poäng under spelomgången.
 */
let scoreList = [0, 0, 0, 0, 0 ,0, 0]; 
/**
 * Sparar spelarens poäng, till för highscore.
 */
let playerScore = 0;
/**
 *  Sparar antal gissningar
 */
let totalGuesses = 0;
/**
 * Sparar tidigare gissningar.
 */
let previousGuess;

/** Array of user selected bots. */
let bots = [];
/** Nodelist of inputs/checkboxes for bots. */
let botCheckboxes = document.querySelectorAll('input[type="checkbox"]');


// start game button in menu
state.menuState.startButton.addEventListener('click', () => {
    // reset selected bots to none
    bots = [];
    // reset checkboxes to unchecked
    botCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    })
})

// start playing button in new-game-state
state.newGameState.startPlayingButton.addEventListener('click', () => {
    scoreList = [0, 0, 0, 0, 0 ,0, 0]; 
    playerScore = 0;
    totalGuess = 0;
    secretNumber = getRandom(minNumber, maxNumber);
})

window.addEventListener("load", init);

function init(){
    minNumber = 1;
    maxNumber = 20;
    turn = 0;
    let previousGuess = maxNumber;
    secretNumber = getRandom(minNumber, maxNumber);

        // add event listener to bot checkboxes
        for (let i = 0; i < botCheckboxes.length; i++) {
            const checkbox = botCheckboxes[i];
            checkbox.addEventListener('change', () => {
                selectBots(checkbox, i);
            })
        }
}

window.addEventListener("load", init);

//randomly assigns a number
function getRandom(minNumber, maxNumber){
    return Math.floor(Math.random()*(maxNumber - minNumber) + minNumber);
}

//checks when the player guesses
document.querySelector(".checkUserGuess").addEventListener("click", checkUserGuess);

function checkUserGuess(){
    //players guess
    guess = parseInt(document.getElementById("user-guess")["0"].value);
    console.log(guess);
    let player = "Du";
    let stopTheGame = false;
    turn = turn + 1;

    if (isNaN(guess)){
        stopTheGame = true;
    }

    calculateScore(secretNumber, guess, player);
    console.log(playerScore)

    //Your Player
    if(guess == secretNumber){
        //showWinner(scoreList, playerScore, totalGuesses)
        displayOutput(player, guess, "win");
        stopTheGame = true;
    } else {
        let previousGuess = guess;
        checkResult(player, guess);
    }

    //stops the bots from guessing if the player wins
    if(stopTheGame == false){
        // takes a guess for each bot
        for (let bot of bots) {
            if(guess == secretNumber){
             break;
            } else {
                botGuesses(bot);
            }
        }
    }
}

//switch that lets the bots make a guess
function botGuesses(player){
    switch (player) {
        case "AverageBert":
            guess = Math.floor((maxNumber - minNumber)/2 + minNumber);
            player = "AverageBert";
            if (secretNumber == guess) {
                displayOutput(player, guess, "win");
                } else {
                checkResult(player, guess);
            }
            break;
        case "LowBert": 
            player = "LowBert";
            if (secretNumber == 0){
                guess = 0;
            } else {
                guess = minNumber+1;
            }
            if (secretNumber == guess) {
                displayOutput(player, guess, "win");
                } else {
                checkResult(player, guess);
            }
            break;
        case "RandomBert":
            // Fixes so that random guesses can't be the same
            if (secretNumber == minNumber){
                guess = Math.floor(Math.random()*((maxNumber-1) - minNumber) + (minNumber));
            } else if (secretNumber == maxNumber) {
                guess = Math.floor(Math.random()*(maxNumber - (minNumber+1))+(minNumber)+1);
            } else {
                guess = Math.floor(Math.random()*((maxNumber-1) - (minNumber+1))+(minNumber+1));
            }
            player = "RandomBert";
                if (secretNumber == guess) {
                    displayOutput(player, guess, "win");

                    } else {
                    checkResult(player, guess);
            }
            break;
        case "HighBert": 
            player = "HighBert";
            if (secretNumber == maxNumber){
                guess = maxNumber;
            } else {
                guess = maxNumber-1;
            }
            if (secretNumber == guess) {
                displayOutput(player, guess, "win");
                } else {
                checkResult(player, guess);
            }
            break;
        case "DumbBert":
            player = "DumbBert";
            //Unlike randombert, dumbert can guess already guessed guesses
            //This is to hide if it guesses right
            guess = Math.floor(Math.random()*(maxNumber - minNumber)+minNumber);
            //If DumbBert guesses right it istead guesses the highest number
            if (secretNumber == guess){
                guess = maxNumber;
                checkResult(player, guess);
            } else {
                checkResult(player, guess);
            }
            break;
        case "SmartBert": 
            player = "SmartBert";
            if(turn <= 2){
                guess = maxNumber;
                displayOutput(player, guess, "wait");
            } else {
                displayOutput(player, guess, "win");
            }
            break;
    }
}

//decide if the guess was to high or low, or other
function checkResult(player, guess){
    if(guess > secretNumber && guess > maxNumber){
        //keeps deliberatly wrong guesses from confusing the bots
        displayOutput(player, guess, "too low");
    } else if(guess > secretNumber){
        displayOutput(player, guess, "lower");
    } else if(guess < secretNumber && guess < minNumber && guess < maxNumber){ 
        //keeps deliberatly wrong guesses from confusing the bots
        displayOutput(player, guess, "too high");
    } else if(guess < secretNumber) {
        displayOutput(player, guess, "higher");
    } else {
        displayOutput(player, guess, "error");
    }
}

function displayOutput(player, guess, result){
    //swaps pictures och text
    let swapText = document.getElementById("display-text");
    //checks result and put it into words and pictures
    switch (result) {
        case "win":
            swapText.innerHTML = guess + " Var rätt. " + player + " vann!";
            display(player + " gissade rätt: " + guess);
            break;
        case "lower":
            maxNumber = guess;
            swapText.innerHTML = "Gissa lägre: " + minNumber + "-" + maxNumber;
            display( player + " gissade " + guess + ", gissa lägre");
            break;
        case "higher":
            minNumber = guess;
            swapText.innerHTML = "Gissa högre: "  + minNumber + "-" + maxNumber;
            display(player + " gissade " + guess + ", gissa högre");
            break;
        case "too low":
            swapText.innerHTML = "Du gissade över maximum: " + maxNumber;
            display( player + " gissade " + guess + ", gissa mycket lägre");
            break;
        case "too high":
            swapText.innerHTML = "Du gissade under minimum: "  + minNumber + "-" + maxNumber;
            display(player + " gissade " + guess + ", gissa mycket högre");
            break;
        case "wait":
            swapText.innerHTML = player + " väntar..." + minNumber + "-" + maxNumber;
            display(player + " väntar... ");
            break;
        case "error":
            swapText.innerHTML = guess + " är inte en siffra "  + minNumber + "-" + maxNumber;
            display("Inte en siffra " + guess);
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

function calculateScore (secretNumber, guess, player) {
    if (guess >= secretNumber) {
        let difPercentage = (guess - secretNumber) / guess; 
        let scoreToAdd = Math.round((1- difPercentage) * 100 * 3);//Hur stor del av distansen mellan rätt nummer är den nya gissningen (*100*3 för att poäng ska se bättre ut och vara svårare att använda för a lista ut svaret(decoy))
        if (player === "Du") {
        playerScore += scoreToAdd;
        scoreList[0] += playerScore;
        }
        else if (player === "SnittBert") {
            scoreList[1] += scoreToAdd;
        }
        else if (player === "DumBert") {
            scoreList[2] += scoreToAdd;
        }
        else if (player === "SlumpBert") {
            scoreList[3] += scoreToAdd;
        }
    } else if (guess < secretNumber) {
        let difPercentage = (secretNumber - guess) / secretNumber;
        let scoreToAdd = Math.round((1 - difPercentage) * 100 * 3);
        if (player === "Du") {
            playerScore += scoreToAdd;
            scoreList[0] += playerScore;
            }
            else if (player === "SnittBert") {
                scoreList[1] += scoreToAdd;
            }
            else if (player === "DumBert") {
                scoreList[2] += scoreToAdd;
            }
            else if (player === "SlumpBert") {
                scoreList[3] += scoreToAdd;
            }
    }
}

// Bot selection
/**
 * Handles bot selection from onclick-event.
 * @param {string} selectedBot The bot that was clicked on, recieved from event listener.
 * @param {number} i Index for the bot that was clicked on.
 */
function selectBots(selectedBot, i) {
    // add selected bot value (bot name) to array of selected bots
    if (selectedBot.checked == true) {
        bots.push(selectedBot.value);
    }
    // remove any doubles, just in case
    else if (selectedBot.value == selectedBot) {
        bots.splice(i, 1);
    }
    // fires if above requirements are not met (checked = false or no doubles)
    // removes selected bot
    else {
        removeBot(selectedBot);
    }
}

/**
 * Remove bot from array of user selected bots.
 * @param {string} botToRemove Bot as string to remove, param recieved from selectBots().
 */
function removeBot(botToRemove) {
    for (let i = 0; i < bots.length; i++) {
        if (bots[i] == botToRemove.value) {
            bots.splice(i, 1);
        }
    }
}